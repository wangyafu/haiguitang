import { ref,reactive } from 'vue'
import { defineStore } from "pinia";

const difficultyRanksContent = [{ "text": "不限", "position": 0 }, { "text": "简单", "position": 1 }, { "text": "中等", "position": 2 }, { "text": "困难", "position": 3 }] 
const topicListContent = [{ "text": "不限", "position": 0 }, { "text": "恐怖", "position": 1 }, { "text": "日常", "position": 2 }]
const  stateListContent=[{ "text": "不限", "position": 0 }, { "text": "未通关", "position": 1 }, { "text": "已通关", "position": 2 }]
export const difficultyRanks={"text":"难度","name":"rank","content":difficultyRanksContent}
export  const  topicList={"text":"主题","name":"topic","content":topicListContent}
export const stateList={"text":"状态","name":"state","content":stateListContent}
export  const  dropdownList=[difficultyRanks,stateList]
export const userInput=ref("")
const dropdownSelectedMap=new Map<string,number>()
//遍历一个数组中的元素
for(let i=0;i<dropdownList.length;i++)
{
  dropdownSelectedMap.set(dropdownList[i].name,0)
}
interface dropdownSelectedType{
  [key:string]:number
}
let dropdownInit:dropdownSelectedType={
  "rank":0,
  "topic":0,
  "state":0
}


export const dropdownSelected=reactive(
    dropdownInit
  )
export const useAnnouncementStore=defineStore("announcement",()=>{
  const shouldShow=ref(true)
  
  function close(){
    shouldShow.value=false
  }
  return {shouldShow,close}

})
export const currentPage=ref(1);
export const useInputStore=defineStore("userInput",()=>{
  const  input=ref("")
  function setInput(value:string){
    input.value=value
  }
  function clear(){
    input.value=""
  }
  return {input,setInput,clear}
}
)
export interface User{
  
  userName?: string
  
  registerDate?:string
}
export const useLoginStore=defineStore(
  "login",
  ()=>{
    const show=ref<boolean>(false)
    return {show}
  }
)
export const useUserStore = defineStore(
  'user',
  () => {
    // 是否登陆
    const isLogin = ref<boolean>(false)
    const Login = (): void => {
      isLogin.value = true
    }
    const userInfo = ref<User>({})

    const Logout = (): void => {
      isLogin.value = false
      userInfo.value = {}
    }

    // uuid值
    const uuid = ref<string>('')
    const setUuid = (resUuid: string) => {
      uuid.value = resUuid
    }


    // 用户信息
    
    const setUserInfo = (resUserInfo: User) => {
      userInfo.value = resUserInfo
    }
    return {
      isLogin,
      Login,
      Logout,
      uuid,
      setUuid,
      userInfo,
      setUserInfo
  } 
},
{
  // 网页端配置
  persist: true,
}
  )