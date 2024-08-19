<template>
    <div class="footer">
        <ElLink href="https://beian.miit.gov.cn/#/Integrated/index" type="info" :underline=false>豫ICP备2024061618号</ElLink>
        <ElLink href="https://beian.mps.gov.cn/#/query/webSearch" type="info" :underline=false>
            闽公网安备35021102002125号

        </ElLink>
    </div>

</template>
<script setup lang="ts">
import {ref} from 'vue'
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