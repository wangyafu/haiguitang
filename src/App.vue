<template>
  <CommonHeader></CommonHeader>
  <router-view class="routerView"></router-view>
  
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CommonHeader from './components/CommonHeader.vue';

</script>

