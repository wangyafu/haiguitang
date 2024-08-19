<template>
    <div class="rounds">
        
<div>
    <ElText :type="chatRoundsType">{{messagesStore.chatRounds }}/{{maxChatRounds}}</ElText> 


</div>
    </div>
</template>
<script setup lang="ts">
import { computed} from 'vue'
import { useMessagesStore ,maxChatRounds} from '@/stores';
const messagesStore=useMessagesStore()
const typeList = ["success", "warning", "danger"]
const chatRoundsType = computed(()=>{
    if(messagesStore.chatRounds<maxChatRounds.value-10){
        return typeList[0]
    }else if(messagesStore.chatRounds<maxChatRounds.value-5){
        return typeList[1]
    }else{
        return typeList[2]
    }
})

</script>
<style scoped >
.rounds{
    display: flex;
    flex-direction: row;
    justify-content:start;
    align-items: center;
    color:black;
    font-size: 14px;
    
}

</style>