<template>
    <dialog id="my_modal_1" class="modal" v-show="(!closed)&&(!announcementStore.haveShow)">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closed=true">✕</button>
          </form>
          <h3 class="font-bold text-lg">更新公告</h3>
          <p class="py-4">此次更新中，加入了查看汤面和提前结束游戏的功能。</p>
        </div>
    </dialog>
</template>
<script setup lang="ts">
import { useAnnouncementStore } from '@/stores';
import { ElAlert } from 'element-plus';
import { ref ,onMounted,computed} from 'vue';
const closed=ref(false)

const announcementStore=useAnnouncementStore()

onMounted(()=>{

    if((!closed.value)&&(!announcementStore.haveShow)){
    my_modal_1.showModal()
}
})

announcementStore.show()
</script>


<style scoped>

</style>