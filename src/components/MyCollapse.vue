<template>
  <div >
      <h2>联系开发者</h2>
      <div class="contact">
        <p>我一般活跃在以下社交平台，欢迎你到这些平台来追踪我的动态，也欢迎你分享游玩海龟汤模拟器时的感受。</p>

        <br>
        <ElLink href="https://www.xiaohongshu.com/user/profile/635f85b8000000001901fe43" target="_blank">
          <div class="iconContainer">
            <img src="../assets/小红书.png" alt="小红书图标"/>
          </div>
           小红书账号：6719436164
        </ElLink>
        <br>
        <ElLink href="https://space.bilibili.com/3461581803358706" target="_blank">
          <div class=" iconContainer">
            <img src="../assets/哔哩哔哩.png" />
          </div>
           哔哩哔哩UID：3461581803358706

        </ElLink>
      </div>
      
   


  
  
  </div>
</template>
<script setup lang="ts">
import { ElLink } from 'element-plus';
import { ref } from 'vue';
const activeItems = ref(["contact"])
</script>
<style scoped>
p {
  font-size: 16px;
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
</style>