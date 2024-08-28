<template>
  <Login v-if="loginStore.show" @close="loginStore.show=false"></Login>
  <router-view class="routerView" ></router-view>
  
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import {useLoginStore} from "@/stores"

const loginStore=useLoginStore()


</script>

