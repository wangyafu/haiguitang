<template>
  <CommonHeader @show-login="showLogin=true"></CommonHeader>
  <Login v-show="showLogin" @close="showLogin=false"></Login>
  <router-view class="routerView"></router-view>
  
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {ref} from 'vue' 
import CommonHeader from './components/CommonHeader.vue'
import Login from './components/Login.vue';
const showLogin=ref(false)
console.log("重新加载")
//获取当前时间并打印
let now = new Date();
console.log(now);
</script>

