<template>



    <div class="max-w-full  bg-gray-50 flex flex-col items-center container" >

        <div class="scrollArea" ref="scrollbarRef" id="scrollArea">

            <ContentCard :face="puzzle.face" />

            <div class="w-full">
                <MessageCard v-for="item in messagesStore.messages" :key="item.id" :text="item.text" :isHuman="item.isHuman"
                    :isHorrible="item.isHorrible ? true : false" v-loading="!item.haveLoaded">
                </MessageCard>
                <div class="md:ml-16 ml-3 " @click="clickCandidate">
                    <div class="chat chat-start" v-show="candidateStore.shouldShow">
                        
                    <div class="chat-bubble bg-gray-200">{{candidateStore.candidate}}</div>
                      </div>
                      </div>

            </div>
        </div>
        <div class="absolute md:bottom-6  bottom-1 mt-5 md:mt-10 border-4
        rounded-xl pt-2 flex flex-col items-center md:w-3/6 
        w-11/12 md:px-4 px-1  ">
            <div class="flex flex-row items-center justify-items-start   space-x-4  md:w-5/6 w-11/12" v-show="!messagesStore.GameIsEnd">
                <button @click="tryGetPrompt" class="btn btn-primary text-white">来个提示  {{getPromptTimes }}/{{puzzle.promptNum }}
                    </button>
                <el-popover placement="top" trigger="hover" width="400px" :content="puzzle.face" v-if="false">
                    <template #reference>
                        <button class="myButton">
                            <span>查看汤面</span></button>
                    </template>
                </el-popover>
                <span>
                    <ElText>汤底共{{ puzzle.answerCount }}字</ElText>
                </span>
                <span>
                <ChatRounds/>
            </span>
            <button class="btn btn-circle btn-outline hover:bg-primary " @click="inputSubmit">
                <img class="w-6 sendIcon" src="../assets/发送.svg"></img>
              </button>
                
                
                    
                
                
                </div>

                <dialog id="congratulation" class="modal">
                    <div class="modal-box">
                      <h3 class="font-bold text-lg" >恭喜你，通关了!</h3>
                      <p class="py-4">{{congratulationText}}</p>
                      <div class="modal-action">
                        <form method="dialog">
                          <!-- if there is a button in form, it will close the modal -->
                          <button class="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                
                <textarea v-show="!messagesStore.GameIsEnd" class="textarea textarea-primary  relative my-3 border h-30 " :disabled="isDisabled"
                
                 @keyup.enter="inputSubmit" onKeyDown="textareaKeydown" v-model="inputStore.input" 
                :maxlength="textAreaMaxLen" rows="2" cols="50" :placeholder="textAreaPlaceholder">
                
                </textarea>
                
                
        </div>
        <MyButtons v-show="messagesStore.GameIsEnd" />
        <ElDialog v-model="isDialogVisible" title="确定要获取提示吗">也许放弃提示，你能获得更棒的游戏体验。
            <template #footer>
                <ElButton @click="() => { isDialogVisible = false }">取消</ElButton>
                <ElButton type="primary" @click="getPrompt">确定</ElButton>

            </template>
        </ElDialog>

    </div>


</template>
<script setup lang="ts">
import { ref, watch} from 'vue'
import { useRoute } from 'vue-router'
import {request} from '../assets/request'
import { userInput } from '../stores/data'
import {  getRandomInt } from '../assets/utils'
import { ElButton, ElDialog, ElNotification, ElText } from 'element-plus';
import { openingRemarks } from '../assets/text'
import ChatRounds  from './ChatRounds.vue'
import MyButtons  from './MyButtons.vue';
import MessageCard  from './MessageCard.vue';
import ContentCard  from './ContentCard.vue';
import {useMessagesStore} from "../stores/messages"
import {useCandidateStore} from "../stores/candidate" 
import { userMessageCounter } from '@/assets/counter'  
import {useInputStore} from "../stores/data"
import {usePuzzlesStore} from "../stores/puzzles"
import {getPercentageStr  } from '../assets/utils'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'

type PuzzleInfo={
    face: string,
    answerCount: number,
    topic: number,
    title:string,
    promptNum: number,
}
type MessageIn={
    code:number,
    aiContent:string,
    num:number,
    rate:number
}
const messagesStore = useMessagesStore()
const candidateStore=useCandidateStore()
const inputStore=useInputStore()
const puzzlesStore=usePuzzlesStore()
const textAreaPlaceholder = ref("快提出问题来验证你的猜想！当你认为自己已经猜到汤底时，请以“汤底”开始你对汤底的叙述。")
const isDisabled = ref(false)
const congratulationText = ref("")
const inputStyle = {
    border: "solid black",
    borderRadius: "1vw",
}
const scrollbarRef = ref();

const noPrompt = ref(false);
const getPromptMessage = ref("已经获取了所有提示")

const routeId = useRoute().params.id
messagesStore.refresh();
const initMessageId = messagesStore.newMessage(false)
const openRemark = openingRemarks[getRandomInt(0, openingRemarks.length - 1)]
messagesStore.loadMessage(initMessageId, openRemark)
const textAreaMaxLen=200
let puzzleInit={
    face: "正在加载中，请稍候",
    answerCount: 0,
    topic: 0,
    title: "",
    promptNum: 0
}
const puzzle = ref(puzzleInit)
const isDialogVisible = ref(false)
const getPromptTimes = ref(0)




// 调用初始化方法
userMessageCounter.init();


function textareaKeydown(){
    if (inputStore.input.length >= textAreaMaxLen) {
        inputStore.input = inputStore.input.substring(0, textAreaMaxLen)
    }
}

function dealWithCode(resData:MessageIn){
    
    
        const id=routeId
        messagesStore.win()
        document.getElementById("congratulation")?.showModal()
        puzzlesStore.passPuzzle(Number(id as string))
       
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
    let uuid=Cookies.get("uuid")
    const toPost = { "messages": messagesStore.getRecentMessages(7), "getPromptTimes": getPromptTimes.value,"userUuid": uuid,chatRounds:0 }
    toPost.chatRounds=messagesStore.chatRounds
    
    messageId = messagesStore.newMessage(false)
    
    request.post('/chat/' + String(routeId), toPost, {
        withCredentials: true,
    }).then(response=> {
        const resData=response.data
        messagesStore.loadMessage(messageId, resData.aiContent)
        if (resData.code != 0) {
            dealWithCode(resData)
        }
        
        
        candidateStore.getCandidate(Number(routeId as string))
        
    }).catch((err)=>console.log(err))
    .finally(()=>{ isDisabled.value = false})
}
function inputSubmit(){
    if(inputStore.input.trim().length==0){
        ElMessage({ message: '输入不能为空！', type: "warning" })
    }
    else{
    
    userMessageCounter.sendMessage(chat)
    }
}




request.get('/getPuzzle/' + routeId, {
    withCredentials: true,
}).then(response => {
    puzzle.value = response.data
    
})

function clickCandidate() {
    userInput.value = candidateStore.candidate
    candidateStore.clear()
    
}
watch(() => messagesStore.messages.length, (newLength, oldLength) => {
    
    setTimeout(() => {
        scrollbarRef.value.scrollTop = scrollbarRef.value.scrollHeight
    }, 300)
}
)


function tryGetPrompt() {
    if (getPromptTimes.value < puzzle.value.promptNum) {
        isDisabled.value = true
        isDialogVisible.value = true
        isDisabled.value = false
    }
    else  {
        //messageList.value.push({ "isHuman": false, "text": "你已经获取了所有提示哦,请开动脑筋吧！", "id": MessageList.value.length })
        noPrompt.value = true
        ElNotification({
            title: '已获取所有提示',
            type: 'warning',
            duration: 3000,
        })
    }
}
function getPrompt() {
    let messageId = messagesStore.newMessage(false,true)
    request.get('/getPrompt/' + String(routeId) + "/" + String(getPromptTimes.value), {
        withCredentials: true,
    }).then(response => {
        //MessageList.value.push({ "isHuman": false, "text": "提示:" + response.data.content, "id": MessageList.value.length  }) })

        let isHorrible = puzzle.value.topic == 1

        messagesStore.loadMessage(messageId, response.data.content, isHorrible)
        getPromptTimes.value += 1
        isDialogVisible.value = false
    })
}

</script>


<style scoped>
.container{
    max-height: 100vh;
}
span{
    font-size: 16px;
}
.scrollArea {
    overflow-y: scroll;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0px;
    width: 100vw;
    height: 60vh;
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












