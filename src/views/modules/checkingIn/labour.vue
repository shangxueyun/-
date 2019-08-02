<template>
  <div>
 
 <el-row :gutter="20">
      <el-col :span="14">
              <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="implementation onsite">
                            <h2><i class="el-icon-thirdchushizupin "></i>场内实时人数</h2>
                            <p>{{venueRealNums}}</p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="implementation entry">
                            <h2><i class="el-icon-thirdchushizupin "></i>进场总人数</h2>
                            <p>{{entryNums}}</p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="implementation appearance">
                            <h2><i class="el-icon-thirdchushizupin "></i>出场总人数</h2>
                            <p>{{appearanceNums}}</p>
                        </div>
                    </el-col>
              </el-row>
              <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="teamDistribution">
                             <h2>班组分布</h2>
                             <div id="teampie" class="echartsbox"></div>
                      </div>  
                    </el-col>
                    <el-col :span="12">
                      <div class="teamDistribution">
                             <h2>工种分布</h2>
                             <div id="workpie" class="echartsbox"></div>
                      </div>  
                    </el-col>
              </el-row>

      </el-col>
      <el-col :span="10">
          <div class="teamDistribution">
               <h2>异常考勤</h2>
               <div class="labourtablebox">

                    <ul class="tableDataRecord tableDataRecords">
                        <li class="a">姓名</li>
                        <li class="b">班组</li>
                        <li class="c">异常情况</li>
                        <li class="d">本月在场时长(h)</li>
                        <li class="e">处理结果</li>
                    </ul>
                  <div class="marquee_box">
                      <ul class="marquee_list marquee_lists" :class="{marquee_top:animate}">
                          <li v-for="(item, index) in tableDataAbnormal">
                              <span class="a">{{item.userName}}</span>
                              <span class="b">{{item.classNo}}</span>
                              <span class="c">{{item.abnormalSituation}}</span>
                              <span class="d">{{item.attendanceTime}}</span>
                              <span class="e" >{{item.processingResults}}</span>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>  
          <div class="teamDistribution teamlabourt">
               <h2>考勤记录</h2>
               <div class="labourtablebox" >
                 <!-- tableDataRecord -->

                    <ul class="tableDataRecord">
                        <li class="a">姓名</li>
                        <li class="b">班组</li>
                        <li class="c">进入时间</li>
                        <li class="d">离开时间</li>
                        <li class="e">在场时长(h)</li>
                        <li class="f">日期</li>
                    </ul>
                  <div class="marquee_box marquee_boxs">
                      <ul class="marquee_list" :class="{marquee_top:animate}">
                          <li v-for="(item, index) in tableDataRecord">
                              <span class="a">{{item.userName}}</span>
                              <span class="b">{{item.classNo}}</span>
                              <span class="c">{{item.beginTime}}</span>
                              <span class="d">{{item.endTime}}</span>
                              <span class="e" v-html="item.onLineTime"></span>
                              <span class="f">{{item.createTime}}</span>
                          </li>
                      </ul>
                  </div>
               </div>
          </div>  
      </el-col>
</el-row>

 <el-row :gutter="20">
      <el-col :span="10">
          <div class="teamDistribution" style="margin-top:20px;">
                  <h2>区域分布</h2>
                  <div style="height:402px;" id="regionmap">

                  </div>
          </div>  
      </el-col>
      <el-col :span="14">
          <div class="teamDistribution" style="margin-top:20px;">
                  <h2>劳动走势图</h2>
                  <div class="labor">{{month}}月份劳动力
                      <el-date-picker 
                      class="editortimes"
                      @change="editortimeschange"
                        v-model="times"
                        type="month"
                        value-format="yyyy-MM"
                        placeholder="选择日期">
                      </el-date-picker>
                  </div>
                  <div id="laborTrendChart" class="laborTrendChart">
                    
                  </div>
          </div>  
      </el-col>

 </el-row>


  </div>
</template>

<script>


  export default {
    components: {
    },
    data () {
      return {
        animate:false,
        times:'',
        month:'',
        venueRealNums:'',
        entryNums:'',
        appearanceNums:'',
        teamDist:'',
        workDist:'',
        laborTrendChartlist:'',
        tableDataAbnormal:[],
        tableDataRecord:[],
        pageIndex: 1,
        pageSize: 5,
        totalPage: 0,
      }
    },
    activated () {
      this.getDataList()
      this.laborTrend()
    },
    created(){
            setInterval(this.showMarquee, 2000)

    },
    methods: {
       showMarquee: function () {
            this.animate = true;
            setTimeout(()=>{
                this.tableDataRecord.push(this.tableDataRecord[0]);
                this.tableDataAbnormal.push(this.tableDataAbnormal[0]);
                this.tableDataRecord.shift();
                this.tableDataAbnormal.shift();
                this.animate = false;
            },500)
      },
      editortimeschange(val){
          console.log("val",val)
          // new Date(ddd)
          this.laborTrend(val)
          this.times = val
          var monthdata = new Date(val)
          var year = monthdata.getFullYear();
          var month = monthdata.getMonth() + 1;
          this.month = month
          
      },
      laborTrend(val){
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;  
        var day = time.getDate()
        if (month < 10) {
           month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        var labdatas = time.getFullYear() + '-' + month + '-' + day
        // console.log("this.times",labdatas)

        var dateTime;
        if(this.times == ""){
            this.month = month
            dateTime = labdatas
        }else{
            this.month = month
            dateTime = this.times+'-01'
        }
        console.log("dateTime",dateTime)

        this.$http({
          url: this.$http.adornUrl('/bim/userInfo/laborTrendChart'),
          method: 'post',
          data: this.$http.adornParams({
            'dateTime': dateTime
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
              this.laborTrendChartlist = data.result.trendChart
              this.laborTrendChart(this.laborTrendChartlist)

          }
        })
      },
      getDataList(){
        this.$http({
          url: this.$http.adornUrl('/bim/userInfo/realTimeData'),
          method: 'post',
          data: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
              this.venueRealNums = data.result.venueRealNums
              this.entryNums = data.result.entryNums
              this.appearanceNums = data.result.appearanceNums
              this.teamDist = data.result.teamDist
              this.teampie(this.teamDist)
          }
        })
        this.$http({
          url: this.$http.adornUrl('/bim/userInfo/workerRegionDist'),
          method: 'post',
          data: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
              this.workDist = data.result.workTypes
              this.initEchartMap(data.result.regionDist)
              this.workpie(this.workDist)

          }
        })
        this.$http({
          url: this.$http.adornUrl('/bim/userInfo/abnormalAttendance'),
          method: 'post',
          data: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
              this.tableDataAbnormal = data.result
          }
        })
        this.$http({
          url: this.$http.adornUrl('/bim/userInfo/workHoursStatistics'),
          method: 'post',
          data: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': 500,
            'dateTime': ''
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
              this.tableDataRecord = data.result.list

          }
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      teampie(arr){
        var  color =['#4dc1f0','#2d6da6','#398cc4','#9989fc','#ff9d5c',]
        var piearrs = arr 
        piearrs.forEach((item) =>{
            item.value = item.nums
            item.name = item.classNo
        })
        // console.log(piearrs)
        let myChart = echarts.init(document.getElementById('teampie'))
        // 绘制图表
        myChart.setOption({
            tooltip: {
                // trigger: 'item',
                formatter: "{b}: {c}人 ({d}%)"
            },
            legend: {
                  type: 'scroll',
                  orient: 'vertical',
                  formatter: function (name) {
                    if (!name) return ''
                    if (name.length > 10) {
                      return name.slice(0, 10) + '...'
                    }else{
                      return name
                    }
                  },
                  padding:[0,0,0,20],
                  x: 'left',
                  textStyle: {// 图例文字的样式
                    color: '#000',
                    fontSize: 14
                  },    
                  data: piearrs

            },
            series: [
                {
                    type:'pie',      
                    center: ["70%", "50%"],
                    radius: ['60%', '30%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            // formatter: '{d}%',
                            formatter: function (obj) {

console.log(obj.percent)

                                return obj.percent
                            },
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:piearrs
                }
            ],
            color:color
        });
      },
      workpie(arr){
        var  color =['#4dc1f0','#9989fc','#ff9d5c','#2d6da6','#398cc4',]
        var piearrs = arr 
        piearrs.forEach((item) =>{
            item.value = item.nums
            item.name = item.workKindName
        })
        let myChart = echarts.init(document.getElementById('workpie'))
        // 绘制图表
        myChart.setOption({
            tooltip: {
                // trigger: 'item',
                formatter: "{b}: {c}人 ({d}%)"
            },
            series: [
                {
                    type:'pie',      
                    center: ["50%", "50%"],
                    radius: ['80%', '30%'],
                    avoidLabelOverlap: false,
                    padding:[0,10,0,0],
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            formatter: '{d}%',
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:piearrs
                }
            ],
            color:color
        });
      },
      laborTrendChart(arr){
        var  color =['#4dc1f0','#9989fc','#ff9d5c','#2d6da6','#398cc4',]
        var piearrs = arr 
        var max = Math.max.apply(null, arr);
        let myChart = echarts.init(document.getElementById('laborTrendChart'))

        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        if (month < 10) {
            month = '0' + month
        }
        var datslist;
        if(this.times == ""){
            datslist = year +'-'+month
        }else{
            datslist = this.times
        }
     
        // 绘制图表
        myChart.setOption({
            tooltip: {
                // trigger: 'item',
                formatter: datslist+'-'+"{b}: {c}人"
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: new Array(piearrs.length).fill("").map((item,index)=>index+1)
            },
            yAxis: {       //
                min: 0,
                max: max,
                splitNumber:7,
                // interval: 20, //间隔
                type: 'value'
            },
            series: [
                {
                    type:'line',      
                    data:piearrs
                }
            ],
            color:color
        });
      },
      initEchartMap(arr){

        var  color =['#4dc1f0','#9989fc','#ff9d5c','#2d6da6','#398cc4',]
        var piearrs = arr 

        var piearrs = arr 
        var citys =[]
        var nums =[]
        piearrs.forEach((item) =>{
            citys.push(item.province)
            nums.push(item.nums)
        })
        console.log(citys)
        console.log(nums)
        
     
        let myChart = echarts.init(document.getElementById('regionmap'))
        // 绘制图表
        myChart.setOption({
            title: {
                text: '',
            },
            tooltip: {
                trigger: 'axis',
                formatter: "{b}: {c}人",
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2011年', '2012年']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: citys
            },
            series: [
                {
                    type: 'bar',
                    data: nums
                }
            ],
            color:color
        });
       
      }
       
    }
  }
</script>

<style>
.labourtable th, .labourtable thead tr,.labourtable td, .labourtable th.is-leaf{
  border:0;
}
.editortimes.el-input, .editortimes.el-input__inner{
  width:35px;
}

.editortimes .el-input__inner{
  /* display:none; */
  width:35px;
  padding:0;
  text-indent: -9999px;
  cursor: pointer;
  border:0;

}
.editortimes .el-input__suffix{
  display: none;
}
.editortimes .el-input__icon {
  font-size:26px;
  cursor: pointer;
}
</style>


<style lang="scss" scoped>
.implementation{
  // height:67px;
  background: #fff;
  border-radius: 5px;
  // box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding:15px 20px 0 20px;
  h2{
    border-bottom:1px solid #fff;
    font-size:14px;
    font-weight:normal;
    color:#fff;
    line-height:30px;
    height:30px;
    overflow: hidden;
    i{
      font-size:20px;
      float:left;
      margin:5px 6px 0 3px;
    }
  }
  p{
    text-align: center;
    font-size:26px;
    padding:10px 0;
    font-weight:bold;
    color:#fff;
  }
}
.onsite{
  background: #ff9d5c;
    background: url(~@/assets/img/onsite_bg.png) no-repeat;
    background-size:100% 100%;
}
.entry{
  background: #a676ff;
    background: url(~@/assets/img/entry_bg.png) no-repeat;
    background-size:100% 100%;
}
.appearance{
  background: #ff758b;
    background: url(~@/assets/img/appearance_bg.png) no-repeat;
    background-size:100% 100%;
}
.echartsbox{
  height:300px;
}
.teamDistribution{
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  h2{
    border-bottom:1px solid #ebeef5;
    color:#303133;
    height:50px;
    line-height: 50px;
    font-size: 16px;
    text-indent: 20px;
  }
}
.labourtablebox{
  // height:200px;
  overflow: auto;
}
.teamlabourt{
  margin:20px 0 0 0;
}
.tableDataRecord{
  list-style: none;
  padding:0;
  margin:0;
  height:40px;
  overflow: hidden;
  li{
    float:left;
    background:#f8f8f8;
    padding:0;
    margin:0;
    height:40px;
    width: 100%;
    overflow: hidden;
    line-height: 40px;
    text-align: center;
    font-weight:bold;
    color:#7a7a7a;
  }
    .a{
      width:15%;
    }
    .b{
      width:20%;
    }
    .c{
      width:15%;
    }
    .d{
      width:15%;
    }
    .e{
      width:15%;
    }
    .f{
      width:20%;
    }
}
.tableDataRecords{
    .a{
      width:20%;
    }
    .b{
      width:25%;
    }
    .c{
      width:20%;
    }
    .d{
      width:15%;
    }
    .e{
      width:20%;
    }

}

.marquee_box {
	display: block;
	position: relative;
	width: 100%;
	height: 140px;
	overflow: hidden;
}
.marquee_boxs{
	height: 139px;
}
.marquee_list {
	display: block;
	position: absolute;
	top: 0;
  left: 0;
  padding:0;
  width:100%;
  margin:0;
}
.marquee_top {
	transition: all 0.5s;
	margin-top: -43px
}

.marquee_list {
    li {
      height: 43px;
      line-height: 43px;
      font-size: 14px;
      width:100%;
      // padding-left: 20px;
      overflow: hidden;
      span{
        float: left;
        border:1px solid #fff;
        text-align: center;
      }
      .a{
        width:15%;
      }
      .b{
        width:20%;
      }
      .c{
        width:15%;
      }
      .d{
        width:15%;
      }
      .e{
        width:15%;
      }
      .f{
        width:20%;
      }
    }

}
.marquee_lists{
  li{
    .a{
      width:20%;
    }
    .b{
      width:25%;
    }
    .c{
      width:20%;
    }
    .d{
      width:15%;
    }
    .e{
      width:20%;
    }

  }
}

.laborTrendChart{
  height:350px;
}
.labor{
  // border:1px solid red;
  z-index: 99999;
  position: relative;
  text-align: center;
  padding:15px 0 0 0;
}

</style>
