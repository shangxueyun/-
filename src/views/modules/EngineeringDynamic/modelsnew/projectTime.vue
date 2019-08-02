<template>
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="topTime">
            <span class="allTime">
              <img src="~@/assets/img/home/time.png" alt="">
              <span>总工期</span>
            </span>
          <ul class="day">
            <li v-for="item in allDays">{{item}}</li>

          </ul>
          <span>日历天</span>
          <span class="safeTime">
              <img src="~@/assets/img/home/safeItem.png" alt="">
              <span>已安全生产</span>
            </span>
          <ul class="day">
            <li v-for="item in nowSafeDays">{{item}}</li>

          </ul>
          <span>日历天</span>
        </div>

      </el-col>
      <el-col :span="24">
          <div class="progress">
            <p class="step1" :style="{width:(getDays(startTime,getNowFormatDate())/getDays(startTime,endTime))*proIndex+'px'}">

                 <span class="leftItem">开工</span>
                 <span class="leftItem btItem">{{starttimesnew}}</span>
                 <span class="circle" style="left: 0"></span>

            </p>
             <template v-for="item in result">
            <p class="step2"   :style="{'left':(getDays(startTime,item.milestoneDate)/getDays(startTime,endTime))*proIndex+'110'+'px'}">
                <span style="bottom:17px">{{item.milestoneName}}</span>
                 <span style="top:25px">{{item.milestoneDates}}</span>
              <span class="circle" ></span>
            </p>
             </template>
            <p class="step3" >

                <span class="rtItem">竣工</span>

                 <span class="rtItem btItem" style="right: -12px">{{endTimenew}}</span>
              <span class="circle"  style="right: 0"></span>
            </p>
          </div>
      </el-col>
    </el-row>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'projectTime',
    data (){
      return {
        allDays: [],
        nowSafeDays: [],
        proIndex: 0,
        result: [],
        startTime: '',
        endTime: '',
        starttimesnew:'',
        endTimenew:''
      }
    },
    mounted (){
      this.proIndex=$('.progress').width()
    },
    methods: {
      getLcbData (){
        this.$http({
          url: this.$http.adornUrl('/bim/index/milestoneList'),
          method: 'get'

        }).then((data) => {
          if(data.data.code==0){
            if(data.data.result == ''){
                return
            }
            let result=data.data.result
            // console.log(result)
            data.data.result.forEach((item) =>{
                let date = new Date(item.milestoneDate.replace(/-/g, "/"));
                let years = date.getFullYear();
                let months = date.getMonth() + 1;
                let strDates = date.getDate();
                if (months >= 1 && months <= 9) {
                  months = "0" + months;
                }
                if (strDates >= 0 && strDates <= 9) {
                  strDates = "0" + strDates;
                }
                var year = years < 2000 ? years + 1900 : years 
                var yy = year.toString().substr(2, 2); 
                item.milestoneDates = yy+'/'+months+'/'+strDates
                item.starttimesnew= item.startDate
                item.endTimenew= item.endDate
                
            })

            this.result=data.data.result
            // console.log("this.result",this.result)
            this.startTime=  this.result[0].startDate


            this.starttimesnew = this.result[0].starttimesnew
            let datestartTime = new Date(this.starttimesnew.replace(/-/g, "/"));
            var date = new Date(datestartTime);
            var  yeartimes = date.getYear() + 1900;
            var  monthtimes= date.getMonth() + 1;
            var  daytimes = date.getDate();

            var year = yeartimes < 2000 ? yeartimes + 1900 : yeartimes 
            var yy = year.toString().substr(2, 2); 
            var results = yy +'/'+ (monthtimes>9?monthtimes:'0'+monthtimes) +'/'+ (daytimes>9?daytimes:'0'+daytimes);
            
            this.starttimesnew = results

            //
            this.endTimenew = this.result[0].endTimenew
            let dateendTime = new Date(this.endTimenew.replace(/-/g, "/"));
            var dateend = new Date(dateendTime);
            var  yeartimesend= dateend.getYear() + 1900;
            var  monthtimesend= dateend.getMonth() + 1;
            var  daytimesend = dateend.getDate();

            var yearend = yeartimesend < 2000 ? yeartimesend + 1900 : yeartimesend 
            var yyend = yearend.toString().substr(2, 2); 
            var resultsend = yyend +'/'+ (monthtimesend>9?monthtimesend:'0'+monthtimesend) +'/'+ (daytimesend>9?daytimesend:'0'+daytimesend);
            
            this.endTimenew = resultsend


            this.endTime= this.result[0].endDate
            this.allDays=this.changeDays(this.getDays(result[0].startDate, result[0].endDate))
            // console.log(this.allDays)
            this.nowSafeDays=this.changeDays(this.getDays(result[0].startDate, this.getNowFormatDate()))
            // console.log(this.nowSafeDays)
          }
        })
      },
      getNowFormatDate () {
        var date = new Date()
        var seperator1 = '-'
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate
        return currentdate
      },
      changeDays (day){
          // console.log(day)
        if(day<=9){
          day='000'+day
        }else if(day<=99){
          day='00'+day
        }else if(day<=999){
          day='0'+day
        }else{

        }
        day=day.toString().split('')

        return day
      },
      getDays (strDateStart, strDateEnd){ // 获取天数
        var strSeparator = '-' // 日期分隔符
        var oDate1
        var oDate2
        var iDays
        oDate1= strDateStart.split(strSeparator)
        oDate2= strDateEnd.split(strSeparator)
        var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2])
        var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2])
        iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 /24)// 把相差的毫秒数转换为天数

        return iDays 
      }
    }
  }
</script>

<style lang="scss" scoped>
    .topTime{
      color: #00EAFF;
      font-size: 19px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 10px;
      .allTime{
         width: 159px;
         height: 48px;
        font-weight: bold;
        background: url("~@/assets/img/home/allTime.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img{
          width: 26px;
          height: 26px;
          margin:0 12px;
        }
      }
      .safeTime{
        width:191px;
        height: 48px;
        font-weight: bold;
        background: url("~@/assets/img/home/safe.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img{
          width: 26px;
          height: 26px;
          margin:0 12px;
        }
      }
      ul{
        list-style: none;
        display: flex;
        padding:0;
        margin:0;
        li{
          width: 46px;
          height: 52px;
          font-size: 40px;
          text-align: center;
          line-height: 52px;
          margin-right: 5px;
          background:url("~@/assets/img/home/dayItem.png");
          background-size: 100% 100%;
        }
      }
    }
  .progress{
    display: flex;
    /*margin:0 auto;*/
    width: 95%;
    color: #00EAFF;
    margin:45px auto;
    justify-content:space-between;
    height: 15px;
    background:rgba(255,255,255,0.1);
    border-radius: 10px;
    position: relative;
    font-size: 12px;
    .step2{
      position: absolute;
      top:-0.13px
    }
    p{
      margin: 0;
      .circle{
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background:#fff;
        position: absolute;

      }
      &:first-child{
        border-radius: 10px;
        background: -webkit-linear-gradient(left, #2A6BCD , #34F6F8); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #2A6BCD, #34F6F8); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #2A6BCD, #34F6F8); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #2A6BCD , #34F6F8); /* 标准的语法 */
        /*background:#0BB2D4;*/
      }
      &:nth-child(2){
        /*background:#00b7ee;*/
      }
      &:nth-child(3){
        /*background:#2D64B3;*/
      }
      span{
        position: absolute;
        white-space :nowrap;


      }
      .leftItem{
        bottom:30px;
        left: -5px;

      }
      .leftItem.btItem{
        top:26px;
        left: -3px;
      }
      .rtItem{
        bottom:30px;
        right: -20px;
      }
      .rtItem.btItem{
        top:26px;
        right: -36px;
      }

    }

  }
</style>
