<template>
  <div class="dropdownline">
    <MyDropdown v-for="item in dropdownList" :name="item.name" :key="item.name" :text="item.text" :content="item.content"/>
    <ElButton type="primary" @click="goPuzzle" :text="true">开始挑战🚀</ElButton>
  </div>
  
  <div class="space-y-5 pt-7">
    <PuzzleCard v-for="item in puzzlesStore.puzzlesRef" :key="item.puzzleId" :tags="item.tagContents" :isSuccess="item.isSuccess"
      :title="item.title" :id="item.puzzleId" v-show="puzzleShouldShow(item,currentPage)" :wholeTimes="item.wholeTimes" :successTimes="item.successTimes" />
  </div>
  <div class="paginationContainer">
  
    <ElPagination :total="puzzlesStore.compliantPuzzleNum" :pageSize="pageSize"  layout="prev, pager, next" v-model:currentPage="currentPage" ></ElPagination>
  </div>
  
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { dropdownSelected,dropdownList} from "../stores/data"
import {currentPage} from "../stores/data"
import {usePuzzlesStore} from "../stores/puzzles"
import type {Puzzle} from "../stores/puzzles"
import {getPuzzleRank,getRate} from "../assets/utils.js"
import { useRouter } from 'vue-router'
import { ElSwitch,ElMessage } from 'element-plus'
import MyDropdown from './MyDropdown.vue'
import PuzzleCard from './PuzzleCard.vue'
const puzzlesStore=usePuzzlesStore()
const dropdownListRef=ref(dropdownList)
const pageSize=ref(10)
const onlyShowPassed=ref(false)
const router = useRouter()
console.log(puzzlesStore.puzzlesRef)
function goPuzzle(){
  let findRes=puzzlesStore.findPuzzle(-1)
  if(findRes==-1){
        ElMessage.error('没有可挑战的题目')
    }
    else{
  
    router.push('/puzzles/'+String(findRes))
    
    
    }
}
//遍历一个js对象是否每个属性都等于零的函数
function isAllZero(obj:any) {
  for (let key in obj) {
    if (obj[key] !== 0) {
      return false
    }
  }
  return true
}
function getDropdownAllowable(itemRank:number, itemTopic:number,itemState:number) {
  let rankAllowable = (itemRank == dropdownSelected.rank || dropdownSelected.rank == 0)
  let topicAllowable = (itemTopic == dropdownSelected.topic || dropdownSelected.topic == 0)
  let stateAllowable = (itemState == dropdownSelected.state || dropdownSelected.state == 0)
  return rankAllowable && topicAllowable&&stateAllowable
}
const puzzleShouldShow = function (item:Puzzle,currentPage:number)  {
  let itemRank=getPuzzleRank(getRate(item.successTimes,item.wholeTimes))
  let itemTopic=item.topic
  let dropdownAllowable=getDropdownAllowable(itemRank, itemTopic,Number(item.isSuccess)+1)
  
  let itemId
  if(isAllZero(dropdownSelected)){
     itemId=item.puzzleId
  }
  else{
      itemId=item.puzzleId
  }
  const pageAllowable1=(currentPage-1)*pageSize.value<=itemId
  const pageAllowable2=itemId<(currentPage)*pageSize.value
  return dropdownAllowable&&pageAllowable1&&pageAllowable2
}


watch(dropdownSelected, () => {
  
  let tempNum=0
  for(let i = 0; i < puzzlesStore.puzzlesRef.length; i++){
    let rate=getRate(puzzlesStore.puzzlesRef[i].successTimes,puzzlesStore.puzzlesRef[i].wholeTimes)
    let itemRank=getPuzzleRank(rate)
    let itemTopic=puzzlesStore.puzzlesRef[i].topic
    let itemState=Number(puzzlesStore.puzzlesRef[i].isSuccess)+1
    
    if(getDropdownAllowable(itemRank, itemTopic,itemState)){
      
      tempNum++
    }
    }
    puzzlesStore.compliantPuzzleNum=tempNum
    
  },{immediate:true}
)

</script>
<style scoped>
.dropdownline {
  display: flex;
  flex-direction: row;
}
.paginationContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>