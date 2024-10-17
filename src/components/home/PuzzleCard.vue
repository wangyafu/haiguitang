<template>
    <div class="flex flex-col bg-white border border-gray p-2 pr-10 rounded hover:shadow-lg hover:border-primary">
        <div class=" flex flex-row justify-between flex-wrap " 
            @click="tryGoToPuzzle">

            <span class="text-lg  py-3 pl-5">{{ title }}</span>
            <div class="moreinfo">
                <div class="mr-1">
                    <ElTag size="large" :type="type" effect="light" :round="true" :plain="true">
                        {{ wholeTimes }}次（通关率{{ rateStr }}）</ElTag>
                </div>
                <div  v-for="item in tags">
                    <ElTag  type="primary" size="large" :plain="true">{{ item }}</ElTag>
                </div>
                <span>
                    <ElTag v-if="!isSuccess"  size="large" type="info" effect="light">未通关</ElTag>
                    <ElTag v-if="isSuccess" size="large" type="success">已通关</ElTag>
                </span>
                
            </div>
            
        </div>
        <div class="text-xs font-thin">
            {{ shortFace }}
        </div>
    </div>
</template>
<script setup lang="ts">

import { ref,reactive,computed } from 'vue'
import { useRouter } from 'vue-router'
import { getPercentageStr, getPuzzleRank} from '@/assets/utils'
import { usePuzzlesStore } from '@/stores';
import { ElMessageBox } from 'element-plus'
const typeList = ["primary", "warning", "danger"]

const iconSize = ref(15)
const puzzlesStore = usePuzzlesStore()
const router = useRouter()
const props = defineProps({
    title: String,
    id: Number,
    wholeTimes: Number,
    successTimes: Number,
    isSuccess: Boolean,
    tags: Array,
    shortFace: String
})

const rate = computed(() => {
      if (props.successTimes === undefined || props.wholeTimes === undefined) {
        console.log("getRate error");
        return 0;
      }
      
      if (props.wholeTimes !== 0) {
        return props.successTimes / props.wholeTimes;
      } else {
        return 0;
      }
    });

// let rank = getPuzzleRank(rate.value)
const rank = computed(() => getPuzzleRank(rate.value))
const type = computed(() => typeList[rank.value - 1])

const rateStr = computed(() => getPercentageStr(rate.value))
const Url = ref("/puzzles/" + props.id)
const border=props.shortFace?"1px":"0px"

const borderStyle=reactive({
    borderBottom: "10px"
})

function confirmGoToPuzzle(confirmContent: string) {
   
    ElMessageBox.confirm(confirmContent, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        goToPuzzle()
    }).catch(() => {
        console.log("取消进入")
    });
}
function tryGoToPuzzle() {
    
    if (rank.value == 3) {
        confirmGoToPuzzle(`这个谜题的通关率仅为${rateStr.value}，确定要挑战吗？也许尝试其它谜题会带来更好的体验。`)
    } else if (props.isSuccess) {
        confirmGoToPuzzle(`你已经成功通关过这个谜题，确定要再来一次吗？`)


    } else {
        goToPuzzle()
    }
}
function goToPuzzle() {

    router.push(Url.value);
}
</script>
<style scoped>



.moreinfo {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}



@media(max-width: 768px) {
    .puzzlecard {
        padding-right: 10px;
        margin-top: 10px;
    }

}
</style>