<!-- 点击后用户跳转的页面 -->
<template>

    <div class="relative  h-full z-10" v-show="showThis">
  
      <!-- 个人信息展示 -->
      <div class="absolute loginDiv  -translate-x-1/2 -translate-y-3/4 card lg:w-1/2 md:w-full  bg-base-100 shadow-2xl py-4 ">
        <div class="text-center">
          <h2 class="card-title  inline" v-show="!showRegister">登陆</h2>
          <h2 class="card-title  inline" v-show="showRegister">注册</h2>
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click.prevent="()=>{loginStore.show=false}">✕</button>
        </div>
  
        <div class="card-body  font-bold font-serif text-gray-500 items-center text-center">
          <el-form :model="form" label-width="auto" style="max-width: 600px" class="m-auto w-full">
            <el-form-item>
              <label class="input input-bordered flex items-center gap-1 w-full ">
                用户名:
                <input type="text" class="grow" v-model="form.userName" />
              </label>
            </el-form-item>
  
            <el-form-item>
              <label class="input input-bordered flex items-center gap-1 w-full ">
                密码 :
                <input type="password" class="grow" v-model="form.password" />
              </label>
            </el-form-item>
            <el-form-item v-show="showRegister">
              <label class="input input-bordered flex items-center gap-1 w-full ">
                再次输入密码:
                <input type="password"class="grow" v-model="form.repeat" />
              </label>
            </el-form-item>
  
            <div class="flex flex-row justify-between items-center w-full ">
              <div>
              <button class="btn w-[100px] " @click.prevent="Login()" v-show="!showRegister">登陆</button>
              <button class="btn w-[100px] " @click.prevent="Register()" v-show="showRegister">注册</button>
              </div>
              <div>
                <button class="text-base text-primary  " @click.prevent="goToRegiter" v-show="!showRegister">还没有账号？立即注册</button>
              </div>
            </div>
          </el-form>
  
        </div>
      </div>
    </div>
  
  </template>
<script setup lang="ts">

import { reactive,toRaw } from "vue";
import { ElMessage } from "element-plus";
import {hash} from "../assets/utils"
import {request} from "../assets/request"
import type {LogOutInfo,RegisterIn} from "@/types/entity.d.ts"
import {ref} from "vue"
import {useLoginStore,useUserStore,usePuzzlesStore} from "@/stores"
interface Form {
  userName: string;
  password: string;
  repeat?: string;
}
let initForm: Form = {
  userName: "",
  password: "",
  
};
const emit=defineEmits(["close"])
const form = reactive(
  initForm
);
const loginStore=useLoginStore()
const userStore = useUserStore();
const puzzlesStore=usePuzzlesStore()
const showRegister=ref(false)
const showThis=ref(true)
function dealWithInfo(data:RegisterIn){
  userStore.setUserInfo({
          userName:form.userName,
          registerDate:data.registerDate
          
        })
  userStore.Login()
  puzzlesStore.passPuzzles(data.passPuzzles)
  emit("close")
} 
function Login(){
  let copyForm=toRaw(form)
  if (copyForm.userName.trim() === "" || copyForm.password.trim() === "") {
    ElMessage({
      message: "用户名和密码不能为空哦",
      type: "error",
    });
    return;
  }
  else{
    copyForm.password=hash(copyForm.password)
    request.post("/login",copyForm).then((res)=>{
      const resData :LogOutInfo=res.data
      
      if(resData.code===0){
        console.log("登录失败")
        ElMessage({
          message: resData.message,
          type: "error",
        });
      }
      else{
        
        ElMessage({
          message: `欢迎回来，亲爱的${form.userName}`,
          type: "success",
        });
        userStore.setUuid(resData.uuid)
        puzzlesStore.passPuzzles(resData.passPuzzles)
        dealWithInfo(resData)

       


      }
    })
  }
}
function goToRegiter(){
  showRegister.value=true
  return 
}
function Register(){
  let copyForm={...toRaw(form)}
  
  if(!copyForm.repeat){
    console.log("出错了")
    return

  }
  if(copyForm.userName.trim()===""||copyForm.password.trim()===""||copyForm.repeat.trim()===""){
    ElMessage({
      message: "用户名和密码不能为空哦",
})
  }
  else if(copyForm.password!==copyForm.repeat){
    ElMessage({
      message: "两次密码不一致哦",
      type: "error",
    });
  }
  else if (copyForm.password.length<6){
    ElMessage({
      message: "密码长度不能小于6位哦",
      type: "error",
    });
  }
  else{
    copyForm.password=hash(copyForm.password)
    request.post("/register",{
      userName:copyForm.userName,
      password:copyForm.password,
      uuid:userStore.uuid
    }).then((res)=>{
        const resData=res.data
        if(resData.code===0){
          ElMessage({
            message: resData.message,
            type: "error",
          });
        }
        else{
          ElMessage({
            message: "注册成功",
            type: "success",
          });
          dealWithInfo(resData)




    }
  }).finally(()=>{
    return
  })
}
}
</script>
<style scoped>
.loginDiv {
  top: 50vh;
  left: 50%;
}

</style>@/type/entity@/stores/modules/puzzles