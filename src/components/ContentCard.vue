<template>
    <div class=" rounded-lg bg-white  md:w-3/6 w-5/6 p-4  border">
        <div class="cardHeader">

            <span class="font-medium"></span>
            <span class="font-medium">{{ face }}</span>
            <span class="shareButton p-4">
                <el-button :icon="Share" @click="ShareUrl" type="primary" plain="true">
                    分享
                </el-button>
                
            </span>
        </div>

        
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { ruleIntroduction } from '../assets/text.js';
import { Share } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router'
import { ElMessage,ElNotification } from 'element-plus';
import  {BaseUrl} from '../assets/request'
const ruleIntroductionRef = ref(ruleIntroduction);
const props = defineProps({
    face: String,
})
const activeName = ref('instruction');
const id = useRoute().params.id
const maxChatRounds = ref(25)
const Url=BaseUrl+"/puzzles/"+String(id)
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
