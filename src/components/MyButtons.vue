<template>
<div class="flex flex-col items-center   space-y-7 container mb-3 md:mb-5">
    <span class="text-primary" v-show="showRate">让好谜题脱颖而出</span>
<div class="flex flex-row items-center flex-wrap space-x-3" v-show="showRate" >

<span>为谜题评分:</span>
<ElRate v-model="rate" :show-text="false"  :texts="['极差', '差', '中等', '好', '妙极']"/>
<button class="btn btn-circle btn-outline hover:bg-primary border-primary hover:border-primary" @click="submitRate" >
    <img class="w-6 sendIcon" src="../assets/发送.svg"></img>
</button>
</div>
<div class="flex flex-row items-center space-x-7">
    <ElButton  @click="showAnswer" size="large" :disabled="isDisabld">
        查看汤底
        </ElButton>
    <ElButton  type="primary" @click="goNext" size="large">
        继续挑战
    <el-icon><ArrowRight/></el-icon>
    </ElButton>
    </div>
</div>
</template>
<script setup lang="ts">
import { ArrowRight} from '@element-plus/icons-vue'
import { usePuzzlesStore,useMessagesStore } from '@/stores'
import router from "../router/index"
import {request} from "../assets/request"
import {ref, watch} from 'vue'
import { ElIcon,ElButton,ElRate,ElNotification,ElMessage } from 'element-plus'

const id=router.currentRoute.value.params.id
const isDisabld=ref(false)
const  haveLoad=ref(false)
const showRate=ref(false)
const puzzlesStore=usePuzzlesStore()
const messagesStore=useMessagesStore()
const rate=ref(3)
watch(haveLoad,()=>{
    setTimeout(()=>{
        router.go(0)
    },200)

})
function submitRate(){
    showRate.value=false

    ElNotification({
        title:'评分成功',
        message:'感谢您的反馈!',
        type:'success'
    })
    request.put('/rate/'+String(id),{
        rate:rate.value
    }).catch(err=>{
    console.log(err)
})
}
function goNext(){
    let findRes=puzzlesStore.findNextPuzzle(Number(id as string))
    
    if(findRes<0){
        ElMessage({type:'success',message:'你已经刷完了所有谜题!'})
        router.push('/')
    }
    else{
    haveLoad.value=true
    router.push('/puzzles/'+String(findRes))
    
    
    }
}
function showAnswer(){
   
    let messageId=messagesStore.newMessage(false)
    showRate.value=true
    request.post('/getAnswer/'+String(id)).then(res=>{
    
        messagesStore.loadMessage(messageId,res.data.answer)
        isDisabld.value=true
    }).catch(err=>{
        console.log(err)
    })
    


}


</script>
