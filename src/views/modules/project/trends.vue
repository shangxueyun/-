<template>
<div>
<div class="teamDistributions teamDistributionsmar">
      <h2>项目里程碑</h2>
      <div class="projectMilestones">
            <div class="topTimes">
                <div class="allTime">
                    <div class="timetits totalPeriod">
                        <icon-svg name="config" class="iconsvgs"></icon-svg>
                        <span>总工期</span>
                    </div>
                    <ul class="day">
                      <li v-for="item in allDays">{{item}}</li>
                    </ul>
                    <span class="dates">日历天</span>
                </div>
                <div class="allTime">
                    <div class="timetits safetyProduction">
                        <icon-svg name="jiesuo" class="iconsvgs"></icon-svg>
                        <span>已安全生产</span>
                    </div>
                    <ul class="day">
                      <li v-for="item in nowSafeDays">{{item}}</li>
                    </ul>
                    <span class="dates">日历天</span>
                </div>
            </div>
            <div class="progress">
              <p class="step1" :style="{width:(getDays(startTime,getNowFormatDate())/getDays(startTime,endTime))*proIndex+'px'}">
                  <span class="leftItem">开工</span>
                  <span class="leftItem btItem">{{starttimesnew}}</span>
                  <span class="circle" style="left: 0"></span>

              </p>
              <template v-for="item in result">
              <p class="step2"   :style="{'left':(getDays(startTime,item.milestoneDate)/getDays(startTime,endTime))*proIndex+'110'+'px'}">
                  <span style="bottom:5px">{{item.milestoneName}}</span>
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
      </div>
</div> 
<el-row :gutter="20">
    <el-col :span="6">
        <div class="teamDistributions">
              <h2>质量管理</h2>
              <div class="superviselist">
                  <el-row :gutter="20">
                      <el-col :span="12">
                          <b>问题总量</b><el-tag type="danger">{{getQualitytotal}}</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>待整改</b><el-tag type="warning">{{toBeRectifiedTotal}}</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>待复查</b><el-tag>{{toBeReviewedTotal}}</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>完成</b><el-tag type="info">{{completeTotal}}</el-tag>
                      </el-col>
                  </el-row>
                  <div ref="pieTopWeight" id="pieTopWeight" style="width: 100%;height: 300px"></div>
                  <div ref="pieBtWeight" style="width: 100%;height: 300px"></div>
              </div>

        </div>  
    </el-col>
    <el-col :span="12"> 
        <el-carousel :interval="4000" type="card" height="240px" class="dongtaicarousel">
          <el-carousel-item v-for="item in listImage" :key="item.id">
              <img :src="item.img">
              <ul class="itemcontens">
                  <li>单体：{{item.monomerName}}</li>
                  <li>流水段：{{item.flowSectionName}}</li>
                  <li>楼层：{{item.floorName}}</li>
                  <li>劳动力总数：{{item.totalNumber}}</li>
                  <!-- <li>上传人：{{item.createUser}}</li> -->
                  <li class="up">上传日期：{{item.createTime}}</li>
              </ul>
          </el-carousel-item>
        </el-carousel>
        <div ref="fenxiBox" style="width: 100%;height: 240px;margin-top:20px;"></div>
        <div ref="containerShadow" style="width: 100%;height: 240px;"></div>

    </el-col>
    <el-col :span="6">
        <div class="teamDistributions"  >
              <h2>安全管理</h2>
              <div class="superviselist">
                  <el-row :gutter="20">
                      <el-col :span="12">
                          <b>问题总量</b><el-tag type="danger">{{getQualitytotalA}}</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>待整改</b><el-tag type="warning">{{toBeRectifiedTotalA}}</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>待复查</b><el-tag>{{toBeReviewedTotalA}}</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>完成</b><el-tag type="info">{{completeTotalA}}</el-tag>
                      </el-col>
                  </el-row>
                  <div ref="pieTopSafe" style="width: 100%;height: 300px"></div>
                  <div ref="pieBtSafe" style="width: 100%;height: 300px"></div>
              </div>
        </div>  

    </el-col>
</el-row>

</div>

</template>

<script>

  import {pie, pieTopWeightPie, option, teamoption, safepieToptPie, safepieToptTeamPie, fenxioption} from './trends.js'

  export default {
    data () {
      return {
        getQualitytotal:'',
        toBeRectifiedTotal:'',
        toBeReviewedTotal:'',
        completeTotal:'',
        
        getQualitytotalA:'',
        toBeRectifiedTotalA:'',
        toBeReviewedTotalA:'',
        completeTotalA:'',

        allDays: [],
        nowSafeDays: [],
        proIndex: 0,
        result: [],
        startTime: '',
        endTime: '',
        starttimesnew:'',
        endTimenew:'',
        listImage:[]
      }
    },
    activated(){
      this.proIndex=$('.progress').width()
        // this.getDataList()
        this.startFinish()
        this.getLcbData()
        this.getQuality() //质量管理
        this.getSafety() //安全管理
        this.listImageProgress()   // 形象进度
        this.getProblemCount() // 质量安全统计
        this.analysisChart()  // 产值
    },
    methods: {
      // 获取数据列表

      analysisChart (year){ // 产值
        this.$http({
          url: this.$http.adornUrl('/bim/index/analysisChart'),
          method: 'post',
          data: this.$http.adornData({
            'dateTime': new Date().getFullYear()
          })
        }).then((data) => {
          if(data.data.code==0){
            this.analysisChartOption=option
            let result=data.data.result,
              arr=[],
              subcontractingOutputValueArr=[],
              constructionOutputValueArr=[],
              installationOutputValueArr=[]
            for(var item in result.production){
              let obj={}
              obj.index=Number(item.split('-')[1])
              obj.subcontractingOutputValue=result.production[item].subcontractingOutputValue
              obj.constructionOutputValue=result.production[item].constructionOutputValue
              obj.installationOutputValue=result.production[item].installationOutputValue
              arr.push(obj)
            }

            for(let i=1; i<13; i++){
              subcontractingOutputValueArr.push(0)
              constructionOutputValueArr.push(0)
              installationOutputValueArr.push(0)
            }
            // console.log(arr)
            subcontractingOutputValueArr=this.publicFun(subcontractingOutputValueArr, arr, 'subcontractingOutputValue')
            constructionOutputValueArr=this.publicFun(constructionOutputValueArr, arr, 'constructionOutputValue')
            installationOutputValueArr=this.publicFun(installationOutputValueArr, arr, 'installationOutputValue')
            this.analysisChartOption.series[0].data=subcontractingOutputValueArr
            this.analysisChartOption.series[1].data=constructionOutputValueArr
            this.analysisChartOption.series[2].data=installationOutputValueArr
            this.getEchart('containerShadow', option)
          }
        })
      },
      publicFun (data, arr, str){
        data.forEach((a, i) => {
          arr.forEach((m, n) => {
            if(i+1==m.index){
              data[i]=m[str]
            }
          })
        })
        // console.log(data)
        return data
      },
      getProblemCount (){
        this.$http({
          url: this.$http.adornUrl('/bim/index/getProblemCount'),
          method: 'post',
          data: this.$http.adornData({

          })
        }).then((data) => {
          if(data.data.code==0){
            this.fenxiOptionData=fenxioption
            this.fenxiOptionData.series[0].data=this.changeFenxiData(data.data.result.result).qualityProblemTotalArr
            this.fenxiOptionData.series[1].data=this.changeFenxiData(data.data.result.result).safetyProblemTotalArr
            this.fenxiOptionData.series[2].data=this.changeFenxiData(data.data.result.result).totalArr
           console.log(data.data.result.result)
            this.getEchart('fenxiBox', this.fenxiOptionData)
          }
        })
      },
      changeFenxiData (data){
        let qualityProblemTotalArr=[],
          safetyProblemTotalArr=[],
          totalArr=[]
        data.forEach((a, i) => {
          qualityProblemTotalArr.push(a.qualityProblemTotal)
          safetyProblemTotalArr.push(a.safetyProblemTotal)
          totalArr.push(a.qualityProblemTotal+a.safetyProblemTotal)
        })
        // console.log(qualityProblemTotalArr, safetyProblemTotalArr, totalArr)
        return {
          qualityProblemTotalArr,
          safetyProblemTotalArr,
          totalArr
        }
      },
      listImageProgress(){
        this.$http({
          url: this.$http.adornUrl('/bim/index/listImageProgress'),
          method: 'post',
          data: this.$http.adornData({})
        }).then((data) => {
          if(data.data.code==0){
              data.data.result.forEach((item) =>{
                let date = new Date(item.createTime.replace(/-/g, "/"));
                let years = date.getFullYear();
                let months = date.getMonth() + 1;
                let strDates = date.getDate();
                if (months >= 1 && months <= 9) {
                  months = "0" + months;
                }
                if (strDates >= 0 && strDates <= 9) {
                  strDates = "0" + strDates;
                }
                item.createTime = years + '-' + months + '-' + strDates
                
            })
            this.listImage = data.data.result
          }
        })
      },
      getSafety () {
        this.$http({
          url: this.$http.adornUrl('/bim/index/getSafetyProblemCount'),
          method: 'post',
          data: this.$http.adornData({

          })
        }).then((data) => {
          if(data.data.code==0){
            this.getQualitytotalA =  data.data.result.total
            this.toBeRectifiedTotalA = data.data.result.toBeRectifiedTotal
            this.toBeReviewedTotalA = data.data.result.toBeReviewedTotal
            this.completeTotalA = data.data.result.completeTotal
            this.safeResult=data.data.result
            this.safepieToptPieData=safepieToptPie
            this.safepieToptTeamPieData=safepieToptTeamPie
            this.safepieToptPieData.legend.data=this.getLegend(this.safeResult.problemTypeList).arr
            this.safepieToptPieData.series[0].data=this.getLegend(this.safeResult.problemTypeList).arr1
            this.safepieToptPieData.title.text='共'+this.getLegend(this.safeResult.problemTypeList).total+'条'
            // 班组
            this.safepieToptTeamPieData.legend.data=this.getLegend(this.safeResult.teamList).arr
            this.safepieToptTeamPieData.series[0].data=this.getLegend(this.safeResult.teamList).arr1
            this.safepieToptTeamPieData.title.text='共'+this.getLegend(this.safeResult.teamList).total+'条'
            this.getEchart('pieTopSafe', safepieToptPie)
            this.getEchart('pieBtSafe', safepieToptTeamPie)
          }
        })
      },
      startFinish(){
          this.$http({
            url: this.$http.adornUrl('/bim/index/getSchedule'),
            method: 'get',
            params: this.$http.adornParams({})
          }).then(({data}) => {
            if (data && data.code === 0) {
                if(data.result !== null){
                this.starttimesnew = this.zhdate(data.result.startDate)
                this.endTimenew = this.zhdate(data.result.endDate)  
                console.log("this.starttimesnew",this.starttimesnew)
                console.log("this.endTimenew",this.endTimenew)
                this.allDays=this.changeDays(this.getDays(data.result.startDate, data.result.endDate))
                console.log(this.allDays)
                this.nowSafeDays=this.changeDays(this.getDays(data.result.startDate, this.getNowFormatDate()))
                }
            }
          })
      },
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
                // item.starttimesnew= item.startDate
                // item.endTimenew= item.endDate
                
            })

            this.result=data.data.result
            // console.log("this.result",this.result)
            this.startTime=  this.result[0].startDate


            // this.starttimesnew = this.result[0].starttimesnew
            let datestartTime = new Date(this.starttimesnew.replace(/-/g, "/"));
            var date = new Date(datestartTime);
            var  yeartimes = date.getYear() + 1900;
            var  monthtimes= date.getMonth() + 1;
            var  daytimes = date.getDate();

            var year = yeartimes < 2000 ? yeartimes + 1900 : yeartimes 
            var yy = year.toString().substr(2, 2); 
            var results = yy +'/'+ (monthtimes>9?monthtimes:'0'+monthtimes) +'/'+ (daytimes>9?daytimes:'0'+daytimes);
            
            // this.starttimesnew = results

            //
            // this.endTimenew = this.result[0].endTimenew
            let dateendTime = new Date(this.endTimenew.replace(/-/g, "/"));
            var dateend = new Date(dateendTime);
            var  yeartimesend= dateend.getYear() + 1900;
            var  monthtimesend= dateend.getMonth() + 1;
            var  daytimesend = dateend.getDate();

            var yearend = yeartimesend < 2000 ? yeartimesend + 1900 : yeartimesend 
            var yyend = yearend.toString().substr(2, 2); 
            var resultsend = yyend +'/'+ (monthtimesend>9?monthtimesend:'0'+monthtimesend) +'/'+ (daytimesend>9?daytimesend:'0'+daytimesend);
            
            // this.endTimenew = resultsend


            this.endTime= this.result[0].endDate
            // this.allDays=this.changeDays(this.getDays(result[0].startDate, result[0].endDate))

            // console.log(this.allDays)
            // this.nowSafeDays=this.changeDays(this.getDays(result[0].startDate, this.getNowFormatDate()))
            // console.log(this.nowSafeDays)
          }
        })
      },
      getQuality(){
          this.$http({
            url: this.$http.adornUrl('/bim/index/getQualityProblemCount'),
            method: 'post',
            data: this.$http.adornData({

            })
          }).then((data) => {
            if(data.data.code==0){
              this.getQualitytotal =  data.data.result.total
              this.toBeRectifiedTotal = data.data.result.toBeRectifiedTotal
              this.toBeReviewedTotal = data.data.result.toBeReviewedTotal
              this.completeTotal = data.data.result.completeTotal
              this.pieTopWeightPieData= pieTopWeightPie
              this.teamoptionData=teamoption
              this.weightData=data.data.result
              this.pieTopWeightPieData.legend.data=this.getLegend(this.weightData.problemTypeList).arr
              this.pieTopWeightPieData.series[0].data=this.getLegend(this.weightData.problemTypeList).arr1
              this.pieTopWeightPieData.title.text='共'+this.getLegend(this.weightData.problemTypeList).total+'条'
              // 班组
              this.teamoptionData.legend.data=this.getLegend(this.weightData.teamList).arr
              this.teamoptionData.series[0].data=this.getLegend(this.weightData.teamList).arr1
              this.teamoptionData.title.text='共'+this.getLegend(this.weightData.teamList).total+'条'
              this.getEchart('pieBtWeight', teamoption)
              this.getEchart('pieTopWeight', this.pieTopWeightPieData)
            }
          })
      },
      getLegend (data){
        let arr=[], arr1=[], total=0
        data.forEach((a, i) => {
          total+=a.number
          var obj={}
          arr.push(a.name||'')
          obj.name=a.name||'',
            obj.value=a.number
          arr1.push(obj)
        })
        // console.log(arr, arr1)
        return {
          arr,
          arr1,
          total
        }
      },
      getEchart (id, data){
        // let chart = this.$echarts.init(this.$refs[id], 'macarons')
        
        let chart1 = echarts.init(this.$refs['pieTopWeight'])
        let chart2 = echarts.init(this.$refs['pieBtWeight'])
        let chart3 = echarts.init(this.$refs['pieTopSafe'])
        let chart4 = echarts.init(this.$refs['pieBtSafe'])
        let chart5 = echarts.init(this.$refs['fenxiBox'])
        let chart6 = echarts.init(this.$refs['containerShadow'])
        
        let chart = echarts.init(this.$refs[id])
        chart.setOption(data, true)
        window.onresize = function(){
            chart1.resize();
            chart2.resize();
            chart3.resize();
            chart4.resize();
            chart5.resize();
            chart6.resize();
        }
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
      zhdate(timedata){
        let datestartTime = new Date(timedata.replace(/-/g, "/"));
        var date = new Date(datestartTime);
        var  yeartimes = date.getYear() + 1900;
        var  monthtimes= date.getMonth() + 1;
        var  daytimes = date.getDate();

        var year = yeartimes < 2000 ? yeartimes + 1900 : yeartimes 
        var yy = year.toString().substr(2, 2); 
        var results = yy +'/'+ (monthtimes>9?monthtimes:'0'+monthtimes) +'/'+ (daytimes>9?daytimes:'0'+daytimes);
         return results 
      }, 
      changeDays (day){
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
<style>
  .dongtaicarousel .el-carousel__indicators--outside{
     display: none;
   
  }
</style>


<style lang="scss" scoped>
.teamDistributions{
  // box-shadow: 0 2px 1px 0 rgba(0,0,0,.1);
  border:1px solid #ebeef5;
  border-radius: 4px;
  h2{
    border-bottom:1px solid #ebeef5;
    color:#303133;
    height:40px;
    line-height: 40px;
    font-size: 16px;
    text-indent: 20px;
    color:#000;
  }
}
.superviselist{
  padding:10px 15px;
  .el-col{
    // border:1px solid red;
    line-height: 40px;
    height:40px;
    overflow: hidden;
    
    
  }
  b{
    float: left;
    font-size:12px;
    color:#616161;
  }
  span{
    float: right;
    margin:5px 0 0 0;
  }
}
.teamDistributionsmar{
  margin-bottom:20px;
}
.projectMilestones{
  line-height: 30px;
  .el-col{
    padding:20px 0;
    text-align: center;
  }
  .pbor{
    border-left:1px solid #cdcdcd;
  }
}


 .topTimes{
      // color: #00EAFF;
      font-size: 19px;
      text-align: center;
      margin: 25px 0;
      height: 52px;
      overflow: hidden;
      line-height: 52px;
      .allTime{
        height: 52px;
        font-weight: bold;
        display: inline-block;
        margin:0 15px;
      }
      .timetits{
        // display: inline-block;
        border:1px solid #ebeef5;
        height: 52px;
        width:180px;
        float: left;
        margin: 0 5px 0 0;
        .iconsvgs{
          font-size:36px;
          vertical-align:top;
          margin:8px 0 0 0;
        }
      }
      .totalPeriod{
        background: #d55508;
        border:1px solid #d55508;
        color:#fff;
      }
      .safetyProduction{
        background: #02932a;
        border:1px solid #02932a;
        color:#fff;
      }
      .dates{
        float: left;
      }
      ul{
        list-style: none;
        float: left;
        padding:0;
        margin:0;
        li{
          width: 46px;
          height: 52px;
          display: inline-block;
          font-size: 40px;
          text-align: center;
          line-height: 52px;
          margin-right: 5px;
          border:1px solid #ebeef5;
          // background:url("~@/assets/img/home/dayItem.png");
          background-size: 100% 100%;
        }
      }
    }

.progress{
    width:90%;
    display: flex;
    color: #616161;
    margin:45px auto;
    justify-content:space-between;
    height: 25px;
    background:rgba(0,0,0,0.4);
    // background: #000;
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
        width: 20px;
        height: 20px;
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
        right: -8px;
      }
      .rtItem.btItem{
        top:26px;
        right: -36px;
      }

    }
    .step1{
      font-weight:bold;
      .circle{
          margin:2px 0 0 2px;
      }
    }
    .step3{
      font-weight:bold;
      .circle{
          margin:2px 2px 0 0;
      }
    }
    .step2{
      font-weight:bold;
      .circle{
          margin:2px 0 0 0;
      }
    }
  }
  .itemcontens{
    background-color: rgba(0, 0, 0, 0.4);
    height:80px;
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    list-style: none;
    padding:10px 0 0 0;
    margin:0;
    li{
      float: left;
      width:50%;
      color:#fff;
      font-size: 12px;
      font-weight:normal;
      text-align: left;
      text-indent: 15px;
      line-height:22px;
    }
    .up{
      width:100%;
    }
  }

</style>