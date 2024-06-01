<template>
    <dialog id="my_modal_1" class="modal" v-show="(!closed)&&(!announcementStore.haveShow)">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closed=true">✕</button>
          </form>
          <h3 class="font-bold text-lg">更新公告</h3>
          <p class="py-4">此次更新中，我们进一步优化了页面，同时增强了系统的稳定性，并增加了AI智能生成候选项、为汤评分和登录/注册功能。</p>
        </div>
    </dialog>
</template>
<script setup lang="ts">
import { useAnnouncementStore } from '@/stores/data';
import { ElAlert } from 'element-plus';
import { ref ,onMounted,computed} from 'vue';
const closed=ref(false)

const announcementStore=useAnnouncementStore()

onMounted(()=>{
    if((!closed)&&(!announcementStore.haveShow)){
    my_modal_1.showModal()
}
})

announcementStore.show()
</script>


<style scoped>

</style>