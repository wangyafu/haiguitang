import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useMessagesStore } from './messages'
import type {CandidateInWithStream} from "@/types/entity"
export const useCandidateStore = defineStore('candidate', () => {
    const candidate = ref<string[]>([])
    const messagesStore=useMessagesStore()

    const shouldShow = computed(() => {
        return candidate.value.length!=0&&!messagesStore.GameIsEnd
    })
    let maxChatRounds=-1
    function clear(){
        candidate.value = []
        return 
    }
    function setCandidate(candidateMessage:CandidateInWithStream){
        if(candidateMessage.chatRounds<maxChatRounds){
            return
        }
        else{

            maxChatRounds=candidateMessage.chatRounds
            candidate.value.push(candidateMessage.content)

        }
    }
    return {candidate,shouldShow,clear,setCandidate}
})

