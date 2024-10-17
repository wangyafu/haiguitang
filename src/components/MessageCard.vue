<template>
    <div class="md:ml-16 ml-3">
    <div class="chat chat-start" v-if="!props.isHuman">
        <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img alt="主持人头像" src="@/assets/电脑.svg" />
            </div>
          </div>
        <div class="chat-bubble chat-bubble-primary text-white " v-loading="props.isLoading">{{props.text}}</div>
      </div>
      <div class="chat chat-end" v-if="props.isHuman">
        <div class="chat-image avatar" >
            <div class="w-10 rounded-full">
              <img alt="用户头像" src="@/assets/用户.svg" />
            </div>
          </div>
        <div class="chat-bubble chat-bubble-info text-sm" v-loading="props.isLoading">{{props.text}}

        </div>
      </div>
      </div>

</template>
<script setup lang="ts">
import {ref} from 'vue';
const props=defineProps({
    isHuman:Boolean,
    text:String,
    isHorrible:Boolean,
    isLoading:Boolean
})

const BaseImageUrl="@/assets/"


const imageUrl=ref(BaseImageUrl+(props.isHuman?"用户":"电脑")+".svg")

const backgroundColor=ref((props.isHuman?"black":"#DCDFE6"))




</script>
<style scoped>
p{
    
    line-height: 1.2;
    margin-left: 10px;
}
.card{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top:10px;
    padding-bottom: 10px;
    padding-left: 13vw;
    border-bottom: 1px solid #CDD0D6;
}

.isHuman{
    background-color: #F5F7FA;
}
@media(max-width: 768px){
p{
    font-size: 16px;

}
.card{
    padding-left: 5vw;
}
}
</style>