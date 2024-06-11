<template>
  <CommonHeader @show-login="loginStore.show=true"></CommonHeader>
  
  <div class="max-w-full  flex flex-col mx-0  mr-auto items-center">
    
    <HomePageAlert />
    <div class="flex md:w-4/5  w-full flex-col  bg-gray-50 md:px-4 px-6">
      <div class="self-center md:w-2/5 w-full mx-2 my-2">
        <img src="../assets/巫女.png">
      </div>

      <h1 class="md:text-2xl text-xl ">欢迎使用海龟汤模拟器 Web 版</h1>
      <br>
      <p class="md:text-lg text-xl">海龟汤是一种猜测情境型事件真相的智力游戏。在海龟汤模拟器中，由文本大模型扮演的主持人提出一个难以理解的事件，你可以提出任何问题以试图缩小范围并找出事件背后真正的原因。
      </p>
      <br>
      <p class="md:text-2xl text-xl">👇选择一个剧本，享受海龟汤游戏的快乐！ </p>
      <PuzzleShow />
      <MyCollapse />

    </div>
  </div>
  <CommonFooter />
</template>
<script setup lang="ts">
import {ref} from "vue"
import HomePageAlert from './HomePageAlert.vue';
import MyCollapse from './MyCollapse.vue';
import PuzzleShow from './PuzzleShow.vue';
import CommonFooter from './CommonFooter.vue';
import  {useLoginStore} from "@/stores"
const loginStore=useLoginStore()
</script>
<style scoped>
p {
  line-height: 1.5;
}
</style>