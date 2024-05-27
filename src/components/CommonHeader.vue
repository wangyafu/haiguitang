<template>
    <div class="header">
  
        <span @click="goHome">{{name}}</span>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import router from "@/router"
import Cookies from 'js-cookie'
import { request } from '../assets/request';
import { usePuzzlesStore } from '@/stores/puzzles';
const name=ref("海龟汤模拟器")
const puzzlesStore = usePuzzlesStore()
//console.log(import.meta.env.VUE_APP_BASE_URL)
function goHome(){
    router.push("/")
}
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

</script>
<style scoped>
.header {
    background-color: #FAFCFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    font-weight: bolder;
    z-index: 2;
    top:0px;
    left:50px;
    right: 50px;
    flex-direction: column;
    border-bottom: #EBEDF0 solid;
  }

</style>