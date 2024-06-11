<template>
    <div class="w-full flex flex-col items-center relative">
    
    <div class="bg-gray-50 flex flex-row  w-4/5 items-center  pb-2 px-3 justify-between header font-semibold border/">
  
        <span class=" cursor-pointer  text-xl hover:text-blue-400 " @click="goHome">海龟汤模拟器</span>
        
        <button class="myBtn  text-base px-2 py-1 font-normal rounded-lg " v-show="!userStore.isLogin" @click="()=>{emit('showLogin')}" >登录/注册</button>
        <div class="flex flex-row items-center space-x-2" v-show="userStore.isLogin">
        <span class="text-xl" :style="dynamicNameColor" >{{userStore.userInfo.userName}}</span>
        <button class="myBtn  text-base px-2 py-1 font-normal rounded-lg "  @click.prevent="userStore.Logout" >退出登录</button>
        </div>
        
    </div>
</div>
</template>
<script setup lang="ts">
import {onMounted, ref,computed} from 'vue'
import router from "@/router"
import {useUserStore,usePuzzlesStore} from "@/stores"
import { request } from '../assets/request';
import type {PuzzleIn} from '@/types/entity';

const emit = defineEmits(['showLogin'])
const puzzlesStore = usePuzzlesStore()
const userStore=useUserStore()
const showLogin=ref(false)
const colors=["black","green","blue","purple","red"]
const dynamicNameColor=computed(()=>{
    let rate=puzzlesStore.puzzleSuccessNum/puzzlesStore.puzzlesRef.length
   
    return {
        color:colors[Math.floor(rate*colors.length)]
    }
})
onMounted(()=>{
    getUuid()
    tryGetPuzzles(userStore.uuid)
    
    
   
})
function tryGetPuzzles(uuid:string){
    if(puzzlesStore.puzzlesRef.length==0){
        getPuzzles(uuid)
    }
    return
}
function getPuzzles(uuid: string) {
      
      
      request
        .post(
          "/getPuzzles",
          {
            userUuid: uuid,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
            puzzlesStore.setPuzzles(response.data as PuzzleIn[])
        })
        .catch((error) => {
          console.error(error);
          
        });

    }
function goHome(){
    router.push("/")
}
function getUuid(){
    if(userStore.uuid==""){
    request.get("/newUser",{
    withCredentials: true,}
).then((res)=>{
    
    const uuid=res.data.uuid
    userStore.setUuid(uuid)
    
}).catch(err=>{
    console.log(err)
})

}
}






/*
let value=Cookies.get("uuid")
if(value===undefined){
    request.get("/newUser",{
    withCredentials: true,}
).then((res)=>{
    
    const uuid=res.data.uuid
    Cookies.set("uuid",uuid)
    puzzlesStore.getPuzzles(uuid)
}).catch(err=>{
    console.log(err)
})
}
else{
    console.log(value)
    puzzlesStore.getPuzzles(value)
}
*/
</script>
<style scoped>

.header {
    
    
    border-bottom: #EBEDF0 solid;
    
}

</style>@/stores/modules/puzzles