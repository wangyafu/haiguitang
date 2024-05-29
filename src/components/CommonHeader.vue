<template>
    <div class="w-full flex flex-col items-center relative">
    
    <div class="bg-gray-50 flex flex-row  w-5/6 items-center  pb-2 px-3 justify-between header font-semibold border/">
  
        <span class=" cursor-pointer  text-xl hover:text-blue-400 " @click="goHome">独玩海龟汤</span>
        
        <button class="myBtn  text-base px-2 py-1 font-normal rounded-lg " @click="()=>{emit('showLogin')}" v-show="!userStore.isLogin">登录/注册</button>
        
    </div>
</div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import router from "@/router"
import {useUserStore} from "@/stores/data"
import { request } from '../assets/request';
import { usePuzzlesStore } from '@/stores/puzzles';
const emit = defineEmits(['showLogin'])
const puzzlesStore = usePuzzlesStore()
const userStore=useUserStore()
const showLogin=ref(false)
//console.log(import.meta.env.VUE_APP_BASE_URL)
function goHome(){
    router.push("/")
}
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
console.log(userStore.uuid)

puzzlesStore.getPuzzles(userStore.uuid)

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

</style>