/**
 * Created by Administrator on 2017/6/26.
 */
export function urlParse () {
 let searchstring = window.location.search;
 let reg = /[?&][^?&]+=[^?&]+/g;
 let arr = searchstring.match(reg);
 let obj = {};
 if (arr) {
   arr.forEach(item => {
     let tempArr = item.substring(1).split('=');
     let key = decodeURIComponent(tempArr[0]);
     let val = decodeURIComponent(tempArr[1]);
     obj[key] = val;
   });
 }
 return obj;
}
