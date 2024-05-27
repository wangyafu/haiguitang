<template>
    <div class="footer">
        <ElLink href="https://beian.miit.gov.cn/#/Integrated/index" type="info" :underline=haveUnderline>备案号：豫ICP备2024061618号</ElLink>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
const haveUnderline=ref(false)
</script>
<style scoped>
.footer {
    background-color: #FAFCFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    font-weight: bolder;
    z-index: 2;
    bottom:0px;
    left:50px;
    right: 50px;
    flex-direction: column;
    
  }
</style>