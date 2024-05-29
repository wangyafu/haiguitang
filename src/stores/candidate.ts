import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {request} from '../assets/request'
import { useMessagesStore } from './messages'
export const useCandidateStore = defineStore('candidate', () => {
    const candidate = ref('')
    const messagesStore=useMessagesStore()
    const haveCandidate=ref(false)
    const shouldShow = computed(() => {
        return haveCandidate.value&&!messagesStore.GameIsEnd
    })
    function clear(){
        haveCandidate.value=false
        return candidate.value = ''
    }
    function getCandidate(routeId:number){
        console.log("被调动了")
        if (candidate.value.length > 0) {
            return
        }
        else if(messagesStore.messages.length<3){
            return
        }
        else if(messagesStore.GameIsEnd){
            return
        }
        const toSubmit = messagesStore.getRecentMessages(7)
    
        const toPost = { "messages": toSubmit}
        
        
        request.post( '/candidate/' + String(routeId), toPost, {
            withCredentials: true,
        }).then(response => {
            candidate.value = response.data.content
            console.log(response.data)
            haveCandidate.value=true
        }).catch(err=>console.log(err))
    }
    return {candidate,shouldShow,clear,getCandidate}
})

