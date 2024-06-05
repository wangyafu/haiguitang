<template>
  <Login v-show="loginStore.show" @close="showLogin=false"></Login>
  <router-view class="routerView" ></router-view>
  
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {useLoginStore} from "@/stores/data"

const loginStore=useLoginStore()
console.log("重新加载")
//获取当前时间并打印
let now = new Date();
console.log(now);
</script>

