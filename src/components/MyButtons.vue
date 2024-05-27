<template>
<div class="buttons">

<div class="buttonContainer">
    <ElButton  @click="showAnswer" size="large" :disabled="isDisabld">
        查看汤底
        </ElButton>
</div>
<div class="buttonContainer">
    <ElButton  type="primary" @click="goNext" size="large">
        继续挑战
    <el-icon><ArrowRight/></el-icon>
    </ElButton>
    </div>
</div>

</template>
<script setup lang="ts">
import { ArrowRight} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { usePuzzlesStore } from '@/stores/puzzles'
import { useMessagesStore } from '@/stores/messages'
import router from "../router/index"
import {request} from "../assets/request"
import {ref, watch} from 'vue'
import { ElIcon } from 'element-plus'
import { timePanelSharedProps } from 'element-plus/es/components/time-picker/src/props/shared'

const id=router.currentRoute.value.params.id
const isDisabld=ref(false)
let  haveLoad=ref(false)
const puzzlesStore=usePuzzlesStore()
const messagesStore=useMessagesStore()
watch(haveLoad,()=>{
    setTimeout(()=>{
        router.go(0)
    },200)

})

function goHome(){  
    router.push('/')
}
function goNext(){
    let findRes=puzzlesStore.findPuzzle(Number(id as string))
    
    if(findRes==-1){
        goHome()
    }
    else{
    haveLoad.value=true
    router.push('/puzzles/'+String(findRes))
    
    
    }
}
function showAnswer(){
    let messageId=messagesStore.newMessage(false)
    request.post('/getAnswer/'+String(id)).then(res=>{
    
        messagesStore.loadMessage(messageId,res.data.answer)
        isDisabld.value=true
    }).catch(err=>{
        console.log(err)
    })
    


}


</script>
<style scoped>
.buttons{
    position: absolute;
    bottom: 60px;
    margin-top: 40px auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    
    justify-content:space-between;
    width: 28vw;
}
@media(max-width: 768px){
.buttons{
        width: 50vw;
    }
}
</style>