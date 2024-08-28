<template>
  <CommonHeader @show-login="loginStore.show=true"></CommonHeader>
  
  <div class="max-w-full  flex flex-col mx-0  mr-auto items-center">
    
    <!--<HomePageAlert />-->
    <div class="flex md:w-4/5  w-full flex-col  bg-gray-50 md:px-4 px-6">
      <div class="self-center md:w-2/6 w-full mx-2 my-2">
        <img src="@/assets/巫女.png">
      </div>

      <h1 class="md:text-2xl text-xl ">欢迎使用海龟汤模拟器 Web 版</h1>
      <br>
      <p class="md:text-lg text-xl">海龟汤是一种猜测情境型事件真相的智力游戏。在海龟汤模拟器中，文本大模型将扮演主持人，你可以提出提出任何问题来接近真相。
      </p>
      <br>
      <div class="flex flex-row flex-wrap space-x-4">
      <ElButton size="large"><a href="#通关秘籍">通关秘籍</a></ElButton>
      <ElButton type="primary" size="large"><a href="#联系开发者">联系开发者</a></ElButton>
      <ElLink href="https://docs.qq.com/form/page/DS1FPT3B6aVpBU2hw">
        贡献海龟汤
      </ElLink>
    </div>
      
      <p class="md:text-xl text-lg text-red-500">⚠️注意：部分谜题包含恐怖元素，请谨慎选择！ </p>
      <PuzzleShow />
      <div  class="leading-loose">
        <a id="通关秘籍"></a>
        <h2 class="md:text-2xl text-xl">通关秘籍</h2>
        <p class="font-bold">尝试一下这些技巧，也许你能获得更棒的游戏体验！</p>
        <ul class="flex flex-col space-y-3">
          <li class="myLi">主动要求主持人给你进行<span class="marker-effect ">思路上的引导</span>。你可以这样说：“引导一下”。</li>
          <li class="myLi"><span class="marker-effect ">提示</span>是关于汤底的隐晦暗示，你可以放心获取。</li>
          <li class="myLi">在提问时，首先从<span class="marker-effect ">大方向</span>上着手，如是否有超自然元素、是否存在隐藏人物等。</li>
          <li class="myLi">让主持人总结你当前获得的<span class="marker-effect ">线索</span>。</li>
        </ul>
        <a id="联系开发者"></a>
          <h2 class="md:text-2xl text-xl">联系开发者</h2>
          <div class="contact">
            <p class="md:text-lg text-xl">我一般活跃在以下社交平台，欢迎你到这些平台来追踪海龟汤模拟器的更新计划，也欢迎你分享游玩海龟汤模拟器时的感受。感谢你的支持！</p>
    
            <br>
            <ElLink href="https://www.xiaohongshu.com/user/profile/635f85b8000000001901fe43" target="_blank">
              <div class="iconContainer">
                <img src="@/assets/小红书.png" alt="小红书图标"/>
              </div>
               小红书：wonderful王海龟汤模拟器
            </ElLink>
            <br>
            <ElLink href="https://space.bilibili.com/3461581803358706" target="_blank">
              <div class=" iconContainer">
                <img src="@/assets/哔哩哔哩.png" />
              </div>
               哔哩哔哩UID：3461581803358706
    
            </ElLink>
            <br>
            <ElLink href="https://weibo.com/u/7482944364" target="_blank">
              <div class="iconContainer">
                <img src="@/assets/微博.png" />
              </div>
              微博:wonderful王04
            </ElLink>
          </div>
          
       
    
    
      
      
      </div>

    </div>
  </div>
  <CommonFooter />
</template>
<script setup lang="ts">
import PuzzleShow from './PuzzleShow.vue';
import CommonFooter from './CommonFooter.vue';
import  {useLoginStore} from "@/stores"
import {ElButton} from 'element-plus'
const loginStore=useLoginStore()
</script>
<style scoped>
p {
  line-height: 1.5;
}


.block {
  display: block;
}

.contact {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.iconContainer img{
  width: 22px;

}
.iconContainer{
  margin-right: 3px;
}
.marker-effect {
  background-color:  rgba(255, 255, 0, 0.5)
 
}
.myLi{
  border-left: 3px;
  border-color: #409eff;
  border-style: solid;
  background-color: rgb(245,245,245);
  padding-top:10px;
  padding-bottom:10px;
  padding-left:10px;
}
</style>