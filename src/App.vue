<template>
  <Login v-show="loginStore.show" @close="loginStore.show=false"></Login>
  <router-view class="routerView" ></router-view>
  
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {useLoginStore} from "@/stores"

const loginStore=useLoginStore()

//获取当前时间并打印
let now = new Date();

</script>

