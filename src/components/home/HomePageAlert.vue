<template>
    <!--<dialog id="my_modal_1" class="modal" v-show="announcementStore.shouldShow">-->
      <dialog id="my_modal_1" class="modal" v-if="false">
      
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:border-primary" @click="announcementStore.close()">✕</button>
          </form>
          <h3 class="font-bold text-lg">更新公告 </h3>
          <p class="py-4">{{announcementText}}</p>
          <p class="py-4">{{announcementDate}}</p>
        </div>
    </dialog>
</template>
<script setup lang="ts">
import { useAnnouncementStore } from '@/stores';
import { ElAlert } from 'element-plus';
import { ref ,onMounted,computed} from 'vue';
import {announcementText,announcementDate} from "@/assets/text"
const closed=ref(false)

const announcementStore=useAnnouncementStore()

onMounted(()=>{

    if(announcementStore.shouldShow
    ){
    my_modal_1.showModal()
}
})


</script>


<style scoped>

</style>