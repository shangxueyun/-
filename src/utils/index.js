import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui';
/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

export function ObjectClear (obj = {},ble = true) {
  let newObj = {};
  if(ble)
  {
    for(let i in obj)
    {
      newObj[i] = '';
    }
    return JSON.stringify(newObj);
  }else{
    Object.keys(obj).forEach((v,i)=>{
      if(obj[v] == '')
      return false
    });    
  }
}

export function DateTimeDay (start = '2018-06-20', end = new Date().toLocaleDateString().replace(/\//g,"-")) {
  //计算两个日期之间相差多少年多少月多少天
  let d1 = start,d2 = end;
	d1  =  new Date(d1.replace(/-/g, '/')); //开始时间
	d2  =  new Date(d2.replace(/-/g, '/')); //结束时间
	var obj = {},
		M1 = d1.getMonth() + 1,
		D1 = d1.getDate(),
		M2 = d2.getMonth() + 1,
		D2 = d2.getDate();
	obj.Y = d2.getFullYear()  -  d1.getFullYear()  +   (M1 * 100 + D1  >  M2 * 100 + D2  ?   - 1  :  0); //相差年份计算
	obj.M = (d2.getFullYear()  -  d1.getFullYear())  *  12  +  M2  -  M1  +   (D1  >  D2  ?   - 1  :  0);
	if (D2 > D1) { //结束时间的日期大于开始时间的日期，则相差天数为结束日期天数减开始日期天数加1
		   obj.D = D2 - D1 + 1;   
		if (M2 == 1 || M2 == 3 || M2 == 5 || M2 == 7 || M2 == 8 || M2 == 10 || M2 == 12) {     setDay(obj, "31");
		} else  if (M2 == 4 || M2 == 6 || M2 == 9 || M2 == 11) {     setDay(obj, "30");    
		} else  if (M2 == 2) {     
			if (d2.getFullYear() % 4 == 0) {
             setDay(obj, "29");    
			} else {      
        setDay(obj, "28");     
			}    
		} 
	} else  if (D2 == D1) {
		//结束时间的日期等于开始时间的日期，则相差天数为1
		   obj.D = 1;  
	} else {
		//结束时间的日期小于于开始时间的日期，则相差天数为开始时间所在月的天数减去开始时间日期加上结束时间的日期
		if (M1 == 1 || M1 == 3 || M1 == 5 || M1 == 7 || M1 == 8 || M1 == 10 || M1 == 12) {    obj.D = 31 - D1 + D2 + 1;     
			setDay(obj, "31");    
		} else  if (M1 == 4 || M1 == 6 || M1 == 9 || M1 == 11) {     obj.D = 30 - D1 + D2 + 1;     setDay(obj, "30");    
		} else  if (M1 == 2) {     
			if (d1.getFullYear() % 4 == 0) {      obj.D = 29 - D1 + D2 + 1;      setDay(obj, "29");     
			} else {      obj.D = 28 - D1 + D2 + 1;      setDay(obj, "28");     
			}    
		};  
  };     
  obj.M = obj.M >= 12 ? obj.M % 12 : obj.M; 
	var text = "";     
	if (obj.D > 0) {
		text = obj.D + "天";     
	};     
	if (obj.M > 0) {  text = obj.M + "个月" + text;  
		if (obj.Y > 0) {   text = obj.Y + "年" + text;  
		}     
	};     
	if (obj.M == 0) {  
		if (obj.Y > 0) {   
			if (text) {    text = obj.Y + "年零" + text;   
			} else {    text = obj.Y + "年";   
			};  
		};     
	};     
	return  text; 
}

export function setDay (obj, dTime) {
	//当两个时间通过计算后的相差天数等于开始时间所在月的天数时，月份加一，天数重置为零
	if (obj.D >= parseInt(dTime)) {    obj.D = obj.D - parseInt(dTime);    obj.M = obj.M >= 12 ? obj.M % 12 : obj.M;    obj.M += 1;    
		if (obj.M >= 12) {    obj.Y += 1;    
		}    
	}; 
}

/**
 * 树形数据转换
 * @param {*} obj 当前时间格式'2019-05-10 00:00:00'
 * @param {*} dTime 转换时间格式'yyyy-MM-dd HH:mm:ss'
 */
//当前时间差八小时处理
export function  dateFormat (date, format) {
  var date = new Date(date);
  var o = {
      'M+' : date.getMonth() + 1, //month
      'd+' : date.getDate(), //day
      'H+' : date.getHours()+8, //hour+8小时
      'm+' : date.getMinutes(), //minute
      's+' : date.getSeconds(), //second
      'q+' : Math.floor((date.getMonth() + 3) / 3), //quarter
      'S' : date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format))
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

  for (var k in o)
      if (new RegExp('(' + k + ')').test(format))
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));

  return format;
}
/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  Vue.cookie.delete('token')
  store.commit('resetStore')
  router.options.isAddDynamicMenuRoutes = false
}
export function  getExcelDetailData(id,that){
  return new Promise((resolve,reject)=>{
    that.$http({
      url: that.$http.adornUrl(`/bim/budget/queryById?id=${id}`),
      method:"post",
      // data:this.$http.adornParams({'id':id})
    }).then((data)=>{
      if(data.data.code==0){

        let result=changeResult(data.data.result)
        data.data.result.sheets=result
        sessionStorage.setItem('tabList',JSON.stringify(data.data.result))
        resolve(data.data.result)

      }else{
        ElementUI.Message.error('请求失败');
      }
    }).catch((err)=>{
      reject(err)
    })
  })
}
export function  changeResult(result) {
  let arr = [];
  result.budgetSheet.forEach((a, i) => {
    let obj = {};
    obj.id = i;
    obj.sheetName = a.sheetName;
    arr.push(obj)
  })
  return arr;
}
