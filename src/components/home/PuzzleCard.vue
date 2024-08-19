<template>
    <div class="flex flex-col bg-white border p-2 pr-10 rounded hover:shadow-lg hover:border-primary">
        <div class=" flex flex-row justify-between flex-wrap " 
            @click="tryGoToPuzzle">

            <span class="titleSpan">{{ title }}</span>
            <div class="moreinfo">
                <div class="rate">
                    <ElTag size="large" :type="type" effect="light" :round="true" :plain="true">
                        {{ wholeTimes }}次（通关率{{ rateStr }}）</ElTag>
                </div>
                <div class="tag" v-for="item in tags">
                    <ElTag size="large" type="primary" :plain="true">{{ item }}</ElTag>
                </div>
                <span>
                    <ElTag v-show="!isSuccess" size="large" type="info" effect="light">未通关</ElTag>
                    <ElTag v-show="isSuccess" size="large" type="success">已通关</ElTag>
                </span>
                
            </div>
            
        </div>
        <div class="text-sm font-thin">
            {{ shortFace }}
        </div>
    </div>
</template>
<script setup lang="ts">

import { ref,reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getPercentageStr, getPuzzleRank, getRate } from '@/assets/utils'
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

let rate = getRate(props.successTimes, props.wholeTimes)

let rank = getPuzzleRank(rate)
const type = ref("")
//rank取值1-3，越大说明越难
type.value = typeList[rank - 1]
const rateStr = getPercentageStr(rate)
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
    
    if (puzzlesStore.puzzleSuccessNum == 0 && rank == 3) {
        confirmGoToPuzzle(`这个谜题的通关率仅为${rateStr}，确定要挑战吗？也许尝试其它谜题会带来更好的体验。`)
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
.puzzlecard {
    background-color: white;
    margin-top: 15px;
    border-radius: 8px;
    border: solid 1px #EBEEF5;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 60px;
    flex-wrap: wrap;

}

.puzzlecard:hover {
    border: solid 1px #409EFF;
}

.rate {
    margin-right: 5px;
}

.moreinfo {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}


.marginTop {
    margin-top: 10px;
}

.titleSpan {
    font-size: 20px;
    padding-top: 14px;
    padding-bottom: 14px;
    padding-left: 10px;
}

@media(max-width: 768px) {
    .puzzlecard {
        padding-right: 10px;
        margin-top: 10px;
    }

}
</style>@/stores/modules/puzzles