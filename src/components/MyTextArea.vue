<template>
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
    :maxlength="textAreaMaxLen" rows="3" cols="50" :placeholder="textAreaPlaceholder">
    <button class="btn btn-circle btn-outline hover:bg-primary sendButton absolute top-6 right-1" @click="inputSubmit">
        <img class="w-6 sendIcon" src="../assets/发送.svg"></img>
      </button>
    </textarea>
    
    
    
</template>
<script setup lang="ts">
import { ref ,computed} from 'vue'
import {useRoute} from 'vue-router'
import { useMessagesStore } from '@/stores/messages';
import { removeLineBreaks,getPercentageStr  } from '../assets/utils'
import { usePuzzlesStore } from '@/stores/puzzles'
import { ElMessage } from 'element-plus'
import {useInputStore} from '@/stores/data'
import Cookies from 'js-cookie'
import {useCandidateStore} from '@/stores/candidate'
import {userMessageCounter} from '@/assets/counter'
const candidateStore=useCandidateStore()
const puzzlesStore=usePuzzlesStore()
const id = ref(useRoute().params.id)
const textAreaMaxLen = ref(200)
const textAreaPlaceholder = ref("快提出问题来验证你的猜想！当你认为自己已经猜到汤底时，请以“汤底”开始你对汤底的叙述。")
const inputStore=useInputStore()
const isDisabled = ref(false)
const congratulationText = ref("")
const props=defineProps({getPromptTimes: Number})
const routeId=useRoute().params.id
inputStore.clear()

import {request} from '@/assets/request'
const messagesStore=useMessagesStore()


// 调用初始化方法
userMessageCounter.init();



 
function textareaKeydown(){
    if (inputStore.input.length >= textAreaMaxLen.value) {
        inputStore.input = inputStore.input.substring(0, textAreaMaxLen.value)
    }
}
type MessageIn={
    code:number,
    aiContent:string,
    num:number,
    rate:number
}
function dealWithCode(resData:MessageIn){
    
    
        
        messagesStore.win()
        document.getElementById("congratulation")?.showModal()
        puzzlesStore.passPuzzle(Number(id.value as string))
       
        if (resData.code == 1) {
            
            congratulationText.value = `你是全球第${resData.num}位通关者！`
            
            if (resData.rate > 0.1) {
                if(props.getPromptTimes!=0){
                    congratulationText.value+=`你仅用了${props.getPromptTimes}个提示就通关了游戏，`
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
    const toPost = { "messages": messagesStore.getRecentMessages(7), "getPromptTimes": props.getPromptTimes,"userUuid": uuid,chatRounds:0 }
    toPost.chatRounds=messagesStore.chatRounds
    messageId = messagesStore.newMessage(false)
    console.log(toPost)
    request.post('/chat/' + String(id.value), toPost, {
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
</script>
<style scoped>
textarea{
    width: 90%
}
</style>