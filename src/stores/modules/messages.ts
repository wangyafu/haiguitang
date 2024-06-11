import {ref,computed} from 'vue'
import { defineStore } from "pinia";

type Message={
    isHuman: boolean,
    isPrompt: boolean, 
    id:number,
    haveLoaded:boolean,
    text:string,
    isHorrible:boolean
}
type MessageOut={
    role:string,
    content:string,
    
}

export const maxChatRounds=ref(25)
export const useMessagesStore=defineStore("messages",()=>{
    const messages=ref<Message[]>([])
    const chatRounds=ref(0)
    const endIsHuman=ref(false)
    const haveEnd=ref(false)
    const GameIsEnd=computed(
        ()=>{
            return ((chatRounds.value>=maxChatRounds.value) && !endIsHuman.value)|| haveEnd.value
        })
    function end(){
        haveEnd.value=true
    }
    function newMessage(isHuman:boolean,isPrompt=false):number{
        let length=messages.value.length
        messages.value.push({ "isHuman": isHuman,"isHorrible":false, "isPrompt": isPrompt, "id":length,"haveLoaded":false,"text":""})
        
        return length
    }
    function loadMessage(id:number,text:string,isHorrible=false){
    if(!messages.value[id].haveLoaded){
        messages.value[id].text=text
        messages.value[id].haveLoaded=true
        messages.value[id].isHorrible=isHorrible
        if(messages.value[id].isHuman){
            chatRounds.value+=1
        }
        endIsHuman.value=messages.value[id].isHuman
    }
    else{
        console.log("出现了错误")
    }
    }
    function refresh(){
        messages.value=[]
        chatRounds.value=0
        haveEnd.value=false
    }
    function getRecentMessages(maxNum:number){
        const length=messages.value.length
        let num=0
        let p=length-1
        let recentMessages:MessageOut[]=[]
        while(num<maxNum){
            if(p==0){
                break
            }
            if(!messages.value[p].isPrompt){

                recentMessages.push({"content":messages.value[p].text,"role":messages.value[p].isHuman?"user":"assistant"})
                num+=1
            }
            p--;
            
        }
        return recentMessages.reverse()
    }
    return {messages,chatRounds,endIsHuman,newMessage,loadMessage,refresh,getRecentMessages,GameIsEnd,end}
})