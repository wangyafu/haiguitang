<template>
    <ElDropdown class="dropdown" split-button="true" placement="bottom-end" @command="handleCommand">
        <ElText>{{dropdownText}}</ElText>
        <template  #dropdown>
       <ElDropdownMenu>
          <ElDropdownItem v-for="item in itemList" :key="item.position" :command="item.position" >
            {{item.text}}
          </ElDropdownItem>
       </ElDropdownMenu>
        </template>
      </ElDropdown>
</template>
<style scoped>
.dropdown{
    display: inline-block;
    padding-right: 20px;
  }
</style>
<script setup lang="ts">
import {ref} from 'vue';
import { dropdownSelected,currentPage } from '@/stores'
const props=defineProps<{
  text:string,
  name:string,
  content:Array<{text:string,position:number}>
}>()
const dropdownText=ref(props.text)
const itemList=ref(props.content)
//下面这行代码参见handleCommand函数
dropdownText.value=dropdownSelected[props.name]?props.content[dropdownSelected[props.name]].text:props.text
function handleCommand(command:number){
    currentPage.value=1
    dropdownText.value=command==0?props.text:itemList.value[command].text
    dropdownSelected[props.name]=command
}
</script>