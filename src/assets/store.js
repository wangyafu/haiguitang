import { reactive, ref } from 'vue';

    
export const currentPage=ref(1);
/*
if (process.env.NODE_ENV === 'development') {
  console.log('当前是开发环境');
} else {
  console.log('当前不是开发环境（可能是生产环境）');
}
*/
//export const BaseUrl="http://101.43.50.164:8081/";
export const DomainUrl="http://www.hgtang.com/#/";
export const BaseUrl="http://127.0.0.1:8000/";
const difficultyRanksContent = [{ "text": "不限", "id": 0, "position": 0 }, { "text": "简单", "id": 1, "position": 1 }, { "text": "中等", "id": 2, "position": 2 }, { "text": "困难", "id": 3, "position": 3 }] 
const topicListContent = [{ "text": "不限", "id": 0, "position": 0 }, { "text": "恐怖", "id": 1, "position": 1 }, { "text": "日常", "id": 2, "position": 2 }]
const  stateListContent=[{ "text": "不限", "id": 0, "position": 0 }, { "text": "未通关", "id": 1, "position": 1 }, { "text": "已通关", "id": 2, "position": 2 }]
export const difficultyRanks={"text":"难度","name":"rank","content":difficultyRanksContent}
export  const  topicList={"text":"主题","name":"topic","content":topicListContent}
export const stateList={"text":"状态","name":"state","content":stateListContent}
export  const  dropdownList=[difficultyRanks,stateList]
export const userInput=ref("")
let dropdownSelectedObj={}
//遍历一个数组中的元素
for(let i=0;i<dropdownList.length;i++)
{
  dropdownSelectedObj[dropdownList[i].name]=0
}
//
export const dropdownSelected=reactive(

    {
      "rank":0,
      "topic":0,
      "state":0
    }
  )
export const haveShowAlert=ref(false)