<template>
    <div class=" rounded-lg bg-white  md:w-3/6 w-5/6 p-4  border">
        <div>

            <span class="font-medium text-base"></span>
            <span class="font-medium text-base">{{ face }}</span>
            
            <span class="shareButton p-4" v-show="true">
                <el-button :icon="Share" @click="ShareUrl" type="primary" plain="true">
                    分享
                </el-button>
                
            </span>
        </div>
        <div class="text-xl">
            <ElCollapse v-model="activeName">
                <ElCollapseItem name="instruction">
                    <!--
                    <ul class="text-base">
                        <li v-for="(item,index) in ruleIntroductionRef" :key="index">{{index+1}}.{{item}}</li>
                    </ul>
                -->
                    <p class="myLi">当你认为自己已经猜到汤底时，请尽可能完整地表述你对汤底的猜测。如果你的猜测与汤底中的关键性情节吻合，主持人将回复你“完全正确”，判定你通关！
                        <br>
                        如果你实在猜不到，可以在更多选项中结束游戏，然后查看汤底。
                    </p>
                    <template #title>
                        <div class="text-xl font-semibold">
                            <p>通关指南</p>
                        </div>
                    </template>
    
                </ElCollapseItem>
            </ElCollapse>
        </div>

        
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { ruleIntroduction } from '../assets/text.js';
import { Share } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router'
import { ElMessage,ElNotification } from 'element-plus';
import  {DomainUrl} from '../assets/request'
const ruleIntroductionRef = ref(ruleIntroduction);
const props = defineProps({
    face: String,
})
const activeName = ref('instruction');
const id = useRoute().params.id
const maxChatRounds = ref(25)
const Url=DomainUrl+"/puzzles/"+String(id)
function copyToClipboard(text:string) {
    // 检查浏览器是否支持 Clipboard API
    if (!navigator.clipboard) {
        // 如果不支持，则使用传统的 document.execCommand("copy") 方式
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        return 1;
    }

    // 使用 Clipboard API 复制内容到剪切板
    navigator.clipboard.writeText(text).then(() => {
        console.log("内容已成功复制到剪切板");
    })
    return 1;

    // 调用 copyToClipboard 函数，传入要复制的文本作为参数
}
function ShareUrl() {
    if (copyToClipboard(Url)) {
        ElNotification({
            title: '链接已复制到剪贴板',
            message: '快邀请你的朋友来挑战这个谜题',
            type: 'success',
            duration: 3000,
        })
    }
}

</script>
<style scoped>
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
