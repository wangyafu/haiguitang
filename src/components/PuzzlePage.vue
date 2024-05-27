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
                
                
                    
                
                
                </div>

            <MyTextArea :getPromptTimes="getPromptTimes"   />
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
import { ref, watch ,computed} from 'vue'
import { useRoute } from 'vue-router'
import {request} from '../assets/request'
import { userInput } from '../stores/data'
import {  getRandomInt } from '../assets/utils'
import { ElButton, ElDialog, ElNotification, ElText } from 'element-plus';
import { openingRemarks } from '../assets/text'
import ChatRounds  from './ChatRounds.vue'
import MyButtons  from './MyButtons.vue';
import MessageCard  from './MessageCard.vue';
import MyTextArea from './MyTextArea.vue';
import ContentCard  from './ContentCard.vue';
import {useMessagesStore} from "../stores/messages"
import {useCandidateStore} from "../stores/candidate"   
type PuzzleInfo={
    face: string,
    answerCount: number,
    topic: number,
    title:string,
    promptNum: number,
}
const messagesStore = useMessagesStore()
const candidateStore=useCandidateStore()
const inputStyle = {
    border: "solid black",
    borderRadius: "1vw",
}
const scrollbarRef = ref();

const noPrompt = ref(false);
const getPromptMessage = ref("已经获取了所有提示")

const routeId = ref(useRoute().params.id)
messagesStore.refresh();
const initMessageId = messagesStore.newMessage(false)
const openRemark = openingRemarks[getRandomInt(0, openingRemarks.length - 1)]
messagesStore.loadMessage(initMessageId, openRemark)
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
const isDisabled = ref(true)





request.get('/getPuzzle/' + routeId.value, {
    withCredentials: true,
}).then(response => {
    puzzle.value = response.data
    
})

function clickCandidate() {
    userInput.value = candidateStore.candidate
    candidateStore.clear()
    
}
watch(() => messagesStore.messages.length, (newLength, oldLength) => {
    console.log(newLength)
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
    request.get('/getPrompt/' + String(routeId.value) + "/" + String(getPromptTimes.value), {
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












