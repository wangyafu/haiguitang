import {Md5} from 'ts-md5/dist/md5';
 export function getPercentageStr(decimalValue:number) {
    const percentageValue = decimalValue * 100; // 将小数转换为百分比
    const formattedPercentage = percentageValue.toFixed(2); // 保留两位小数
  
    return String(formattedPercentage)+"%"
  }
export function removeLineBreaks(text:string) {
    return text.replace(/\r?\n/g, '');
  }
export function getRandomInt(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getRate(successTimes:number|undefined,wholeTimes:number|undefined){
  if(successTimes===undefined || wholeTimes===undefined){
    console.log("getRate error")
    return 0
  }
  let rate=0;
  if(wholeTimes!=0){
    rate=successTimes/wholeTimes
}
return rate
}
export function getPuzzleRank(rate:number){
  if(rate<0.1){
    return 3
}
else if(rate<0.3){
    return 2
}
else{
    return 1
}
}
export function hash(text:string):string{
  return Md5.hashStr(text+"haiguitang")

}
