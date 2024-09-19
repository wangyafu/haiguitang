<template>
    <!-- 主容器，设置宽度和背景色 -->
    <div class="max-w-full bg-gray-50 flex flex-col items-center container h-[100vh]" >
        <CommonHeader @show-login="loginStore.show=true"></CommonHeader>
        
        <!-- 通关恭喜对话框 -->
        <dialog id="congratulation" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg" >恭喜你，通关了!</h3>
                <p class="py-4">{{congratulationText}}</p>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-primary">关闭</button>
                    </form>
                </div>
            </div>
        </dialog>
        <!-- 可滚动区域 -->
        <div class="flex flex-col overflow-y-scroll items-center myScroll mt-4 w-[100vw]" ref="scrollbarRef" id="scrollArea">
            <!-- 内容卡片组件，展示谜面 -->
            <ContentCard :face="puzzle.face" />
            <!-- 消息卡片容器，用v-for循环渲染消息 -->
            <div class="w-full">
                <MessageCard v-for="item in messagesStore.messages" :key="item.id" :text="item.text" :isHuman="item.isHuman"
                    :isHorrible="item.isHorrible ? true : false" :is-loading="!item.haveLoaded">
                </MessageCard>
                <!-- 候选项卡片，点击触发候选项显示 -->

                <div class="md:ml-16 ml-3 "  v-for="(item,index) in candidateStore.candidate">
                    <div class="chat chat-start" v-show="candidateStore.shouldShow&&showCandidate" @click="clickCandidate(index)">
                        <div class="chat-bubble bg-gray-200 text-primary">{{item}}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部输入区域，包含提示按钮、文本输入和提交按钮等 -->
        <div class=" md:bottom-6 bottom-1 mt-5 md:mt-10 border-4
        rounded-xl pt-2 flex flex-col items-center md:w-3/5
        w-11/12 md:px-4 px-1 "  v-show="!messagesStore.GameIsEnd">
            <div class="flex flex-row items-center justify-items-start   space-x-4  md:w-5/6 w-11/12 flex-wrap" v-show="!messagesStore.GameIsEnd">
                <!-- 提示按钮，点击获取提示，显示剩余提示次数 -->
                 <ElBadge :value="puzzle.prompts.length-getPromptTimes" type="primary">
                <button @click="getPrompt" class="btn btn-primary text-white">提示
                    </button>
                 </ElBadge>
                <!-- 查看汤面按钮，悬停显示汤面完整内容 -->
               
                <!-- 汤底字数显示 -->
                <!-- <span>
                    <ElText>汤底共{{ puzzle.answerCount }}字</ElText>
                </span> -->
                <!-- 聊天轮次组件 -->
                <span><ChatRounds/></span>
                <ElTooltip content="候选项" placement="top" effect="light">
                    <ElSwitch v-model="showCandidate"></ElSwitch>
                </ElTooltip>
                <ElTooltip content="结束游戏" placement="top" effect="light">
                    <button class="btn btn-circle btn-outline hover:bg-primary border-primary hover:border-primary" @click="tryEndInAdvance">
                        <el-icon color="#418ff1" size="20"><SwitchButton /></el-icon>
                        </button>
                </ElTooltip>
                <!-- 提交按钮，点击提交输入 -->
                 <ElTooltip content="发送" placement="top" effect="light">
                <button class="btn btn-circle btn-outline hover:bg-primary border-primary hover:border-primary" @click="inputSubmit" :disabled="isDisabled">
                    <img class="w-6" src="@/assets/发送.svg"></img>
                </button>
                </ElTooltip>
                

                <!-- <div class="dropdown dropdown-top">
                    <div tabindex="0" role="button" class="mt-1"><button class="btn btn-circle btn-outline  hover:border-primary border-gray-400 hover:bg-white" @click="">
                        <img class="w-6" src="@/assets/更多.svg"></img>
                        </button></div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li> <el-popover placement="top" trigger="hover" width="400px" :content="puzzle.face" >
                        <template #reference>
                            
                        <span class="text-base hover:text-primary">查看汤面</span>
                        </template>
                    </el-popover></li>
                   <li @click="tryEndInAdvance">
                    <span class="text-base hover:text-primary">结束游戏</span></li>

                    </ul>
                  </div> -->
            </div>
            
            <!-- 输入区域，显示输入框，游戏未结束时可见 -->
            <textarea v-show="!messagesStore.GameIsEnd" class="textarea textarea-primary  relative my-3 border " :disabled="isDisabled"
                @keyup.enter="inputSubmit" onKeyDown="textareaKeyDown" v-model="inputStore.input" 
                :maxlength="textAreaMaxLen" rows="1" cols="50" :placeholder="textAreaPlaceholder">
            </textarea>
        </div>
        <!-- 游戏结束按钮区域，游戏结束时显示 -->
        <MyButtons v-if="messagesStore.GameIsEnd" />
        <!-- 提示对话框，点击按钮显示，确认获取提示 -->
        
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch} from 'vue'
import { useRoute } from 'vue-router'
import {request,websocketUrl} from '@/assets/request'
import {  getRandomInt } from '@/assets/utils'
import { ElTooltip, ElNotification, ElBadge,ElMessage,ElSwitch,ElMessageBox} from 'element-plus';
import { openingRemarks } from '@/assets/text'
import ChatRounds  from '../ChatRounds.vue'
import MyButtons  from './MyButtons.vue';
import MessageCard  from '../MessageCard.vue';
import ContentCard  from './ContentCard.vue';
import {useMessagesStore,useCandidateStore,useInputStore,useUserStore,useLoginStore,usePuzzlesStore,userInput} from "@/stores"
import { userMessageCounter } from '@/assets/counter'  
import {getPercentageStr  } from '@/assets/utils'

import type {PuzzleInfo,CandidateOutWithStream,CandidateInWithStream} from "@/types/entity"

type MessageIn={
    code:number,
    aiContent:string,
    num:number,
    rate:number
}
const loginStore=useLoginStore()
const messagesStore = useMessagesStore()
const candidateStore=useCandidateStore()
const inputStore=useInputStore()
const puzzlesStore=usePuzzlesStore()
const userStore=useUserStore()
const textAreaPlaceholder = ref("快提出问题来验证你的猜想！当你认为自己已经猜到汤底时，请以“汤底”开始你对汤底的叙述。")
const isDisabled = ref(false)
const congratulationText = ref("")
const scrollbarRef = ref();
const noPrompt = ref(false);
const routeId = useRoute().params.id
messagesStore.refresh();
const initMessageId = messagesStore.newMessage(false)
const openRemark = openingRemarks[getRandomInt(0, openingRemarks.length - 1)]
messagesStore.loadMessage(initMessageId, openRemark)
const textAreaMaxLen=200
let puzzleInit: PuzzleInfo ={
    face: "正在加载中，请稍候",
    answerCount: 0,
    topic: 0,
    title: "",
    prompts: [],
}
const puzzle = ref(puzzleInit)
const isDialogVisible = ref(false)
const getPromptTimes = ref(0)
const showCandidate = ref(false)
// 调用初始化方法
userMessageCounter.init();
function textareaKeydown(){
    if (inputStore.input.length >= textAreaMaxLen) {
        inputStore.input = inputStore.input.substring(0, textAreaMaxLen)
    }
}
function tryEndInAdvance(){
ElMessageBox.confirm('确定要提前结束游戏吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',

}).then(() => {
    messagesStore.end()
})}
    
function dealWithCode(resData:MessageIn){
        if(resData.code===0){
            return
        }
        
        
        messagesStore.end()
        document.getElementById("congratulation")?.showModal()
        puzzlesStore.passPuzzle(Number(routeId as string))
       
        if (resData.code == 1) {
            
            congratulationText.value = `你是全球第${resData.num}位通关者！`
            
            if (resData.rate > 0.1) {
                if(getPromptTimes.value!=0){
                    congratulationText.value+=`你仅用了${getPromptTimes}个提示就通关了游戏，`
                }
                else{
                    congratulationText.value+=`你没有使用提示就通关了游戏,`
                }
                congratulationText.value += `超越了全球${getPercentageStr(resData.rate)}的玩家。`
            }

        }
}
//获取messages

function chat() {
    
    let messageId = messagesStore.newMessage(true)
    messagesStore.loadMessage(messageId, inputStore.input)
    inputStore.input = ""
    isDisabled.value = true
    let uuid=userStore.uuid
    const toPost = { "messages": messagesStore.getRecentMessages(15), "getPromptTimes": getPromptTimes.value,"userUuid": uuid,chatRounds:0 }
    toPost.chatRounds=messagesStore.chatRounds
    
   
    messageId = messagesStore.newMessage(false)
    
    request.post('/chat/' + String(routeId), toPost).then(response=> {
        const resData=response.data
        messagesStore.loadMessage(messageId, resData.aiContent)
        
        
        dealwithWebsocket({
            "messages":messagesStore.getRecentMessages(63),
            "chatRounds":messagesStore.chatRounds
            
        })
        dealWithCode(resData as MessageIn)
        
        
        
        
    }).catch((err)=>console.log(err))
    .finally(()=>{ isDisabled.value = false})
}
function inputSubmit(){

    if(inputStore.input.trim().length==0){
        ElMessage({ message: '输入不能为空！', type: "warning" })
    }
    else{
    
    chat()
    }
}
function dealwithWebsocket(message:CandidateOutWithStream){
    if (showCandidate.value===false){
        return
    }
    
    const ws=new WebSocket(websocketUrl+"/ws/candidate/"+routeId)

    ws.onopen=()=>{
        console.log("成功建立websocket连接")
        candidateStore.clear()
        ws.send(JSON.stringify(message))
    }
    ws.onmessage=function(event){
        const resData=JSON.parse(event.data)
       // console.log("收到了消息")
        //console.log(resData)
        candidateStore.setCandidate(resData as CandidateInWithStream)
        
    }
    ws.onclose=()=>{
        console.log("websocket连接关闭")
        console.log(candidateStore.candidate)
    }
    
}
request.get('/getPuzzle/' + routeId, {
    withCredentials: true,
}).then(response => {
    puzzle.value = response.data as PuzzleInfo
   
})

function clickCandidate(index:number) {
    inputStore.setInput(candidateStore.candidate[index])
    candidateStore.clear()
    
}
watch(() => messagesStore.messages.length, () => {
    
    setTimeout(() => {
        scrollbarRef.value.scrollTop = scrollbarRef.value.scrollHeight
    }, 300)
}
)
// let lastChatRound=0
// watch(showCandidate,()=>{
//     if(messagesStore.chatRounds!=lastChatRound){
//     dealwithWebsocket({
//         "messages":messagesStore.getRecentMessages(63,true),
//         "chatRounds":messagesStore.chatRounds
//     })
//     lastChatRound=messagesStore.chatRounds
// }
// }
// )


function getPrompt() {
    if (getPromptTimes.value < puzzle.value.prompts.length) {
        isDialogVisible.value = true
        let messageId = messagesStore.newMessage(false,true)
    
        let isHorrible = puzzle.value.topic == 1

        messagesStore.loadMessage(messageId, puzzle.value.prompts[getPromptTimes.value], isHorrible)
        getPromptTimes.value += 1
        isDialogVisible.value = false
    }
    else  {
        //messageList.value.push({ "isHuman": false, "text": "你已经获取了所有提示哦,请开动脑筋吧！", "id": MessageList.value.length })
        noPrompt.value = true
        ElNotification({title: '已获取所有提示',type: 'warning',duration: 3000})
    }
}


onMounted(() => {
    dealwithWebsocket({
        "messages":messagesStore.getRecentMessages(63,true),
        "chatRounds":messagesStore.chatRounds
    })})
</script>


<style scoped>
.container{
    max-height: 100vh;
}
span{
    font-size: 16px;
}
.myScroll{
    flex:1;
}


.buttonArea {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap; /* 防止换行 */
    overflow-x: auto; /* 当内容溢出时显示水平滚动条 */
}

textarea{
    width: 90%
}





@media(max-width: 768px) {

    .contentcard {
        width: 96vw;
    }

    .scrollArea {
        scrollbar-width: 0;
        height: 55vh;
    }

    .scrollArea::-webkit-scrollbar {
        display: none;
        /* 隐藏滚动条 */
    }
    
    
}
</style>












