<template>
  <div class="flex flex-row flex-wrap">
    <MyDropdown v-for="item in dropdownList" :name="item.name" :key="item.name" :text="item.text" :content="item.content"/>
    <el-dropdown @command="handleSortChange" split-button="true" placement="bottom-end">
      
        {{sortByText}}
      
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="rate">按评分降序</el-dropdown-item>
          <el-dropdown-item command="wholeTimes">按热度降序</el-dropdown-item>
          <el-dropdown-item command="difficultyDesc">按难度降序</el-dropdown-item>
          <el-dropdown-item command="difficultyAsc">按难度升序</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    
    <!-- <ElButton type="primary" @click="goPuzzle" :text="true">开始挑战🚀</ElButton> -->
  </div>
  
  <div class="space-y-5 pt-7">
    <PuzzleCard v-for="item in sortedPuzzles" :key="item.puzzleId" :tags="item.tagContents" :isSuccess="item.isSuccess"
      :title="item.title" :id="item.puzzleId" v-show="puzzleShouldShow(item,currentPage)" :wholeTimes="item.wholeTimes" :successTimes="item.successTimes"
      :short-face="item.shortFace" />
  </div>
  <div class="paginationContainer">
  
    <ElPagination :total="puzzlesStore.compliantPuzzleNum" :pageSize="pageSize"  layout="prev, pager, next" v-model:currentPage="currentPage" ></ElPagination>
  </div>
  
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { dropdownSelected,dropdownList,usePuzzlesStore,currentPage} from "@/stores"
import type {Puzzle} from "@/stores"
import {getPuzzleRank,getRate} from "@/assets/utils.js"
import { useRouter } from 'vue-router'
import {ElMessage } from 'element-plus'
import MyDropdown from './MyDropdown.vue'
import PuzzleCard from './PuzzleCard.vue'
const puzzlesStore=usePuzzlesStore()
const dropdownListRef=ref(dropdownList)
const pageSize=ref(10)
const onlyShowPassed=ref(false)
const router = useRouter()
const sortBy = ref('rate')
const sortByText=ref('按评分降序')
function goPuzzle(){
  let findRes=puzzlesStore.findNextPuzzle(-1)
  if(findRes==-1){
        ElMessage.error('没有可挑战的题目')
    }
    else{
    router.push('/puzzles/'+String(findRes))
    }
}
//遍历一个js对象是否每个属性都等于零的函数
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
  //先筛选出符合dropdownAllowable的元素
  let filteredPuzzles=puzzlesStore.puzzlesRef.filter(item => getDropdownAllowable(getPuzzleRank(getRate(item.successTimes,item.wholeTimes)), item.topic,Number(item.isSuccess)+1))
  const pageAllowable1=(currentPage-1)*pageSize.value <= filteredPuzzles.indexOf(item)
  const pageAllowable2=filteredPuzzles.indexOf(item) <(currentPage)*pageSize.value
  return dropdownAllowable&&pageAllowable1&&pageAllowable2
}

const sortedPuzzles = computed(() => {
  // let puzzles = puzzlesStore.puzzlesRef.filter(item => puzzleShouldShow(item, currentPage.value))
  let puzzles=puzzlesStore.puzzlesRef
  switch (sortBy.value) {
    case 'rate':
      sortByText.value='按评分降序'
      return puzzles.sort((a, b) => b.rate - a.rate)
    case 'wholeTimes':
      sortByText.value='按热度降序'
      return puzzles.sort((a, b) => b.wholeTimes - a.wholeTimes)
    case 'difficultyAsc':
      sortByText.value='按难度升序'
      return puzzles.sort((a, b) => (b.successTimes/b.wholeTimes+1) - (a.successTimes/a.wholeTimes+1))
    case 'difficultyDesc':
      sortByText.value='按难度降序'
      return puzzles.sort((a, b) => (a.successTimes/a.wholeTimes+1) - (b.successTimes/b.wholeTimes+1))
    // default:
    //   return puzzles
  }
})

function handleSortChange(value: string) {
  sortBy.value = value
}

watch(dropdownSelected, () => {
  
  // let tempNum=0
  // for(let i = 0; i < puzzlesStore.puzzlesRef.length; i++){
  //   let rate=getRate(puzzlesStore.puzzlesRef[i].successTimes,puzzlesStore.puzzlesRef[i].wholeTimes)
  //   let itemRank=getPuzzleRank(rate)
  //   let itemTopic=puzzlesStore.puzzlesRef[i].topic
  //   let itemState=Number(puzzlesStore.puzzlesRef[i].isSuccess)+1
    
  //   if(getDropdownAllowable(itemRank, itemTopic,itemState)){
      
  //     tempNum++
  //   }
  //   }
    puzzlesStore.compliantPuzzleNum=puzzlesStore.puzzlesRef.reduce((acc, cur) => {
      let rate=getRate(cur.successTimes,cur.wholeTimes)
      let itemRank=getPuzzleRank(rate)
      let itemTopic=cur.topic
      let itemState=Number(cur.isSuccess)+1
      
      return getDropdownAllowable(itemRank, itemTopic,itemState) ? acc + 1 :acc;
    },0)
    
  },{immediate:true}
)

</script>
<style scoped>

.paginationContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>