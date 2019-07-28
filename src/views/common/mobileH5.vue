<template>
  <div class="mobileH5" v-loading="mobileH5loading">
    <el-container>
        <el-header height="60px">海门市拓鸿实业厂房新建项目</el-header>
        <el-main>
            <div class="milestone" v-if="milestoneData.length!=0">
                <p>
                    <span style="float:left">
                        总工期<span style="font-size: 1.2rem;">{{DateTimeDayF(milestoneData[0].milestoneData,milestoneData[milestoneData.length-1].milestoneDate)}}</span>
                        日历天
                    </span>
                    <span v-if="milestoneDataObj.flg == undefined" style="float:right">已安全生产<span style="font-size: 1.2rem;">{{0}}</span> 日历天</span>
                    <span v-else style="float:right">已安全生产<span style="font-size: 1.2rem;">{{DateTimeDayF(milestoneData[0].milestoneData,milestoneDataObj.flg)}}</span> 日历天</span>
                </p>
                <div v-if="milestoneData.length != 0" class="step">
                    <ul>
                        <li v-if="milestoneData[0]">{{milestoneData[0].milestoneName}}</li>
                        <li v-if="milestoneData[1]">{{milestoneData[1].milestoneName}}</li>
                        <li v-if="milestoneData[2]">{{milestoneData[2].milestoneName}}</li>
                        <li v-if="milestoneData[3]">{{milestoneData[3].milestoneName}}</li>
                    </ul>
                    <div>
                        <i v-if="milestoneData[0]" :style="'background: '+ milestoneData[0].IsColor"></i>
                        <i v-if="milestoneData[1]" :style="'background: '+ milestoneData[1].IsColor"></i>
                        <i v-if="milestoneData[2]" :style="'background: '+ milestoneData[2].IsColor"></i>
                        <i v-if="milestoneData[3]" :style="'background: '+ milestoneData[3].IsColor"></i>
                    </div>
                    <ul>
                        <li v-if="milestoneData[0]">{{milestoneData[0].milestoneDate}}</li>
                        <li v-if="milestoneData[1]">{{milestoneData[1].milestoneDate}}</li>
                        <li v-if="milestoneData[2]">{{milestoneData[2].milestoneDate}}</li>
                        <li v-if="milestoneData[3]">{{milestoneData[3].milestoneDate}}</li>
                    </ul>
                </div>
                <div v-else class="step">
                    <ul>
                        <li>开工</li>
                        <li>里程碑</li>
                        <li>里程碑内容</li>
                        <li>竣工</li>
                    </ul>
                    <div>
                        <i style="background: #0078D7;"></i>
                        <i style="background: #85AFD2;"></i>
                        <i></i>
                    </div>
                    <ul>
                        <li>2019.04.01</li>
                        <li>2019.11.11</li>
                        <li>2020.02.02</li>
                        <li>2022.02.02</li>
                    </ul>
                </div>
            </div>
            <div class="image_bar">
                <div class="header">
                    工程管理&nbsp;&nbsp;&nbsp;&nbsp;策划先行
                </div>
                <el-carousel :initial-index="carouselIndex" type="card" :autoplay="false" height="200px">
                    <el-carousel-item v-for="(item,key) in images" :key="key">
                        <a href="javascript:void(0)">
                        <img :src="item.src" alt="">                            
                        </a>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="cake_chart">
                <div class="header">
                    <ul>
                        <li style="text-align: left;">进场人员 &nbsp;<span style="color:#4081D9">171</span></li>
                        <li>出场人员 &nbsp;<span style="color:#4081D9">171</span></li>
                        <li style="text-align: right;">在场人员 &nbsp;<span style="color:#4081D9">171</span></li>
                    </ul>
                </div>
                <div class="B_echarts" ref="B_echarts">
                    <div class="legend">
                        <ul>
                            <li v-for="(item,key) in Daycake_chartList" :key="key">{{item.classNo}}<i :style="'background:'+item.color"></i></li>
                        </ul>
                    </div>
                    <div class="B_chart" id="B_chart"></div>
                </div>
                <div class="Z_echarts" id="Z_echarts"></div>
            </div>
            <div class="dustNoise">
                <div class="header">
                    扬尘噪音监测
                </div>
                <div>
                    <ul class="ul1">
                        <li>PM 2.5<br><span>{{dustNoiseDatalis.pm}}</span></li>
                        <li>PM 10<br><span>{{dustNoiseDatalis.pm10}}</span></li>
                        <li>噪音<br><span>{{dustNoiseDatalis.noise}}</span></li>
                    </ul>
                    <ul class="ul2">
                        <li>风速<br><span>{{dustNoiseDatalis.windSpeed}}</span></li>
                        <li>风向<br><span>{{dustNoiseDatalis.winddirection}}风</span></li>
                        <li>温度<br><span>{{dustNoiseDatalis.temperature}}</span></li>
                        <li>湿度<br><span>{{dustNoiseDatalis.humidity}}</span></li>
                    </ul>
                </div>
                <div style="clear: both;"></div>
            </div>
            <div class="echats_chart">
                <div class="Z_L_echarts" id="Z_L_echarts"></div>
            </div>
            <div class="managementModule">
                <div class="titleNav">
                    <ul>
                        <li  v-for="item in lilist" :key="item.value"  :class="{active : active == item.value}" @click="selected(item.value)">{{item.lable}}</li>
                    </ul>
                </div>
                <br style="clear: both;">
                <div class="quality">
                    <ul>
                        <li>问题总量&nbsp;&nbsp;&nbsp;<span style="color:#4081D9">{{total}}</span></li>
                        <li>超期未整改&nbsp;&nbsp;&nbsp;<span style="color:#4081D9">{{toBeRectifiedTotal}}</span></li>
                        <li>整改待查复&nbsp;&nbsp;&nbsp;<span style="color:#4081D9">{{toBeReviewedTotal}}</span></li>
                        <li>已整改复查&nbsp;&nbsp;&nbsp;<span style="color:#4081D9">{{completeTotal}}</span></li>
                    </ul>
                    <br style="clear: both;">

                    <div class="B_chart" id="B_charts_1" style="height:15rem;"></div>
                    <div class="B_chart" id="B_charts_2" style="height:15rem;"></div>
                </div>
                <div class="safety"></div>
            </div>
            <div class="outputValueAnalysis" id="outputValueAnalysis">

            </div>
            <div class="towerSwitch">
                <select class="com-opt">
                    <option value ="volvo">Volvo</option>
                    <option value ="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
                <ul>
                    <li>今日报警<br><span style="color:#4081D9">0</span></li>
                    <li>今日违规<br><span style="color:#4081D9">0</span></li>
                    <li>非正常断电<br><span style="color:#4081D9">0</span></li>
                    <li>今日故障<br><span style="color:#4081D9">0</span></li>
                </ul>
                <br style="clear: both;">
                <img style="width: 100%;" src="~@/assets/img/towerS.png" alt="">
                <div class="info">
                    <div class="item">
                        <span>No.1 重量</span>
                        <br>
                        <div>
                            <el-progress :percentage="50"></el-progress>
                        </div>
                    </div>
                    <div class="item">
                        <span>No.2 力矩</span>
                        <br>
                        <div>
                            <el-progress :percentage="50"></el-progress>
                        </div>
                    </div>
                    <div class="item">
                        <span>No.3 幅度</span>
                        <br>
                        <div>
                            <el-progress :percentage="50"></el-progress>
                        </div>
                    </div>
                    <div class="item">
                        <span>No.4 高度</span>
                        <br>
                        <div>
                            <el-progress :percentage="50"></el-progress>
                        </div>
                    </div>
                </div>
                <br style="clear: both;">
            </div>
            <div class="visualSchedule">
                <div class="header">
                    扬尘噪音监测
                </div>
                <div class="clrg_">
                    <img src="~@/assets/img/user.png" alt="">
                    <ul>
                        <li>描述：121313131</li>
                        <li>描述：121313131</li>
                        <li>描述：121313131</li>
                        <li>描述：121313131</li>
                        <li>描述：121313131</li>
                        <li>描述：121313131</li>
                    </ul>
                </div>


                <br style="clear: both;">
            </div>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import { clearInterval, clearTimeout } from 'timers';
import { ObjectClear,DateTimeDay } from '@/utils'
  export default {
    components: {
    },
    data () {
      return {
        total:'',
        toBeRectifiedTotal:'',
        toBeReviewedTotal:'',
        completeTotal:'',
        activeName:'',
        active:'1',
        lilist:[
            {
                'value':'1',
                'lable':'质量管理'
            },
            {
                'value':'2',
                'lable':'安全管理'
            }
        ],
        mobileH5loading:false,
        carouselIndex:0,
        thisset:null,
        setIntervaL:null,
        DateTimeDayF:DateTimeDay,
        images:[
              {src:require("@/assets/img/table/cover.png")},
              {src:require("@/assets/img/table/compilation_illustration.jpg")},
              {src:require("@/assets/img/table/project_planning1.jpg")},
              {src:require("@/assets/img/table/project_planning7.jpg")},
          ],
        milestoneData:[],
        milestoneDataObj:{
            total:'',
            already:'',
            flg:''
        },
        //当天班
        Daycake_chartList:[],
        //
        sevenDaysDataList:[],
        province:[],
        cake_chartDataListObj:{},
        //饼图颜色itemStyle: {color: '#9966ff'},
        B_option:{
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [{
                name: '工种分布',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '50%'],
                label: {
                normal: {
                    position: 'inner',
                    show : false
                }
                },
                labelLine: {
                normal: {
                show: false
                }
                },
                data: [{
                    value: 335,
                    name: '直达',
                    itemStyle: {color: '#9966ff'},
                }, {
                    value: 679,
                    name: '营销广告'
                }, {
                    value: 1548,
                    name: '搜索引擎'
                }]
            }, {
                name: '区域分布',
                type: 'pie',
                radius: ['65%', '90%'],
                label: {
                normal: {
                    position: 'inner',
                    show : false
                }
                },
                labelLine: {
                normal: {
                show: false
                }
                },
                data: [{
                    value: 335,
                    name: '直达'
                }, {
                    value: 310,
                    name: '邮件营销'
                }, {
                    value: 234,
                    name: '联盟广告'
                }, {
                    value: 135,
                    name: '视频广告'
                }, {
                    value: 1048,
                    name: '百度'
                }, {
                    value: 251,
                    name: '谷歌'
                }, {
                    value: 147,
                    name: '必应'
                }, {
                    value: 102,
                    name: '其他'
                }]
            }]
        },
        
        // itemStyle:{
        //     normal:{
        //         color:function(params) {
        //                 // build a color map as your need.
        //                 var colorList = [
        //                   '#ccc','#eee','#666','#777','#111',
        //                   '#ccc','#eee','#666','#777','#111',
        //                   '#ccc','#eee','#666','#777','#111',
        //                   '#ccc','#eee','#666','#777','#111',
        //                 ];
        //                 return colorList[params.dataIndex]
        //             },
        //     }
        // },
        //柱状图颜色
        colorList:[
        '#ccc','#eee','#666','#777','#111',
        '#ccc','#eee',
        ],
        //
        Z_option:{
                tooltip : {
                    trigger: 'axis',
                },
                grid: {
                    top:"5%",
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis:  {
                    type: 'value',
                                    axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize : 12      //更改坐标轴文字大小
                    }
                },
                axisTick: {
                    show: false
                },
                                splitLine: {     //网格线
                    show: false
                }
                },
                yAxis: {
                    type: 'category',
                    data: ['周一','周二','周三','周四','周五','周六','周日'],
                    splitLine: {     //网格线
                        show: false
                    }
                },
                series: [
                    {
                        name: '班组1',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        itemStyle:{
                            normal:{
                                label: {
									show: false, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'rgba(0, 0, 0, 0.0)',
										fontSize: 16
									}
								},
                                color:function(params) {
                                        // build a color map as your need.
                                        var colorList = [
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        ];
                                        return colorList[params.dataIndex]
                                    },
                            },
                        },
                        data: [320, 302, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '班组1',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        itemStyle:{
                            normal:{
                                label: {
									show: false, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'rgba(0, 0, 0, 0.0)',
										fontSize: 16
									}
								},
                                color:function(params) {
                                        // build a color map as your need.
                                        var colorList = [
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        ];
                                        return colorList[params.dataIndex]
                                    },
                            },
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '班组1',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        itemStyle:{
                            normal:{
                                label: {
									show: false, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'rgba(0, 0, 0, 0.0)',
										fontSize: 16
									}
								},
                                color:function(params) {
                                        // build a color map as your need.
                                        var colorList = [
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        ];
                                        return colorList[params.dataIndex]
                                    },
                            },
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '班组1',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        itemStyle:{
                            normal:{
                                label: {
									show: false, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'rgba(0, 0, 0, 0.0)',
										fontSize: 16
									}
								},
                                color:function(params) {
                                        // build a color map as your need.
                                        var colorList = [
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        ];
                                        return colorList[params.dataIndex]
                                    },
                            },
                        },
                        data: [150, 212, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '班组1',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        itemStyle:{
                            normal:{
                                label: {
									show: false, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'rgba(0, 0, 0, 0.0)',
										fontSize: 16
									}
								},
                                color:function(params) {
                                        // build a color map as your need.
                                        var colorList = [
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        '#ccc','#eee','#666','#777','#111',
                                        ];
                                        return colorList[params.dataIndex]
                                    },
                            },
                        },
                        data: [820, 832, 901, 934, 1290, 1330, 1320]
                    }
                ]
        },
        dustNoiseDatalis:{
            "pm": 11,
            "pm10": 0,
            "tsp": 0,
            "noise": "噪音",
            "temperature": "温度",
            "humidity": "湿度",
            "windSpeed": "风速",
            "winddirection": "",
        },
        //
     
        //
        B_charts_2_option:{
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            grid: {top: '0%'},
            series: [{
                name: '安全问题',
                type: 'pie',
                radius: ['45%', '65%'],
                center: ['50%', '50%'],
                label: {
                normal: {
                    position: 'inner',
                    show : false
                }
                },
                labelLine: {
                normal: {
                show: false
                }
                },
                data: [{
                    value: 335,
                    name: '直达'
                }, {
                    value: 310,
                    name: '邮件营销'
                }, {
                    value: 234,
                    name: '联盟广告'
                }, {
                    value: 135,
                    name: '视频广告'
                }, {
                    value: 1048,
                    name: '百度'
                }, {
                    value: 251,
                    name: '谷歌'
                }, {
                    value: 147,
                    name: '必应'
                }, {
                    value: 102,
                    name: '其他'
                }]
            }]
        },
        outputValueAnalysis_option:{
                title: {
                    text: '产值分析图',
                    top:"10%",
                    left:'center' 
                },
                tooltip : {
                    trigger: 'axis',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['1月', '2月', '3月', '4月', '5月', '6月','1月', '2月', '3月', '4月', '5月', '6月'],
                        axisTick: {
                            alignWithLabel: true
                        },
                        splitLine: {     //网格线
                            show: true,
                            lineStyle:{
                                color: ['#FBFBFB'],
                                width: 1,
                                type: 'solid'
                            }
                        }
                    }
                ],
                yAxis : [
                        {
                            type: 'value',
                            max: 500,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                color: '#333',  //更改坐标轴文字颜色
                                fontSize : 14      //更改坐标轴文字大小
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine:{
                                    lineStyle:{
                                        color:'#333' //更改坐标轴颜色
                                    }
                            },
                            splitLine: {     //网格线
                                show: true,
                                lineStyle:{
                                    color: ['#FBFBFB'],
                                    width: 1,
                                    type: 'solid'
                                }
                            }
                        },
                ],
                series : [
                    {
                        name:'demo1',
                        type:'bar',
                        itemStyle : {
                            normal : {
                            color : '#63B0BA',
                            borderColor : '#63B0BA ',
                            borderWidth : 2
                            }
                        },
                        data:[10, 52, 200, 334, 390, 330, 220,35,10, 52, 200, 334, 390, 330,]
                    },
                ]
        },
      }
    },
    created() {
        this.milestoneDataList();
        this.QualityAssurance('1')// 质量管理
    },
    computed: {

    },
    mounted() {
        let vm = this;
        this.thisset = window.setInterval(()=>{
            if(vm.carouselIndex==5)
            vm.carouselIndex = 0;
            else
            vm.carouselIndex++
        },3000);

        this.setOption();
    },
    methods: {
        selected(value){
            this.active = value;
            console.log(value)
            this.QualityAssurance(value)
        },
    
      QualityAssurance(num){
          var url ;
          if(num == 1){
              url = this.$http.adornUrl('/bim/index/getQualityProblemCount')
          }else{
               url = this.$http.adornUrl('/bim/index/getSafetyProblemCount')
          }
        
        this.$http({
          url: url,
          method: 'post',
          data: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
              console.log("data1",data)
              this.total = data.result.total
              this.toBeRectifiedTotal = data.result.toBeRectifiedTotal
              this.toBeReviewedTotal = data.result.toBeReviewedTotal
              this.completeTotal = data.result.completeTotal
              this.quality(data.result.problemTypeList)
              this.teamList(data.result.teamList)

          }
        })

      },  
      quality(arr){
        var piearrs = arr 
        piearrs.forEach((item) =>{
            item.value = item.number
            item.name = item.name
        })
        let myChart = this.$echarts.init(document.getElementById('B_charts_1'))
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            grid: {top: '0%'},
            series: [{
                name: '质量管理',
                type: 'pie',
                radius: ['45%', '65%'],
                center: ['50%', '50%'],
                label: {
                normal: {
                    position: 'inner',
                    show : false
                }
                },
                labelLine: {
                normal: {
                show: false
                }
                },
                data: piearrs
            }]
        })
      },
      teamList(arr){
        var piearrs = arr 
        piearrs.forEach((item) =>{
            item.value = item.number
            item.name = item.name
        })
        let myChart = this.$echarts.init(document.getElementById('B_charts_2'))
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            grid: {top: '0%'},
            series: [{
                name: '班组',
                type: 'pie',
                radius: ['45%', '65%'],
                center: ['50%', '50%'],
                label: {
                normal: {
                    position: 'inner',
                    show : false
                }
                },
                labelLine: {
                normal: {
                show: false
                }
                },
                data: piearrs
            }]
        })
      },
      handleClick(){

      },
      inited (viewer) {
        this.$viewer = viewer
      },
      alert(){
          alert(1)
      },
      show () {
        this.$viewer.show()
      },
      func(e){
        var moveEndX = e.changedTouches[0].pageX 
        var moveEndY = e.changedTouches[0].pageY 
        //左滑
        if(moveEndX> moveEndY){
            if(this.carouselIndex==5)
            this.carouselIndex = 0;
            else
            this.carouselIndex++
        }
        //右滑
        if(moveEndY>moveEndX){
            if(this.carouselIndex == 0)
            this.carouselIndex = 5;
            else
            this.carouselIndex--
        }
      },
      setOption(){
        //图表
        let chart = this.$echarts.init(document.getElementById("B_chart"));
        chart.setOption(this.B_option,true);

        let chart1 = this.$echarts.init(document.getElementById("Z_echarts"));
        chart1.setOption(this.Z_option,true);

        // let chart2 = this.$echarts.init(document.getElementById("Z_L_echarts"));
        // chart2.setOption(this.Z_L_option,true);

        // let chart3 = this.$echarts.init(document.getElementById("B_charts_1"));
        // chart3.setOption(this.B_charts_1_option,true);outputValueAnalysis

        let chart4 = this.$echarts.init(document.getElementById("B_charts_2"));
        chart4.setOption(this.B_charts_2_option,true);
        
        let chart5 = this.$echarts.init(document.getElementById("outputValueAnalysis"));
        chart5.setOption(this.outputValueAnalysis_option,true);
      },
      //里程碑
      milestoneDataList(){
        this.mobileH5loading = true;
        this.$http({
          url: this.$http.partyUrl('/bim/index/milestoneList'),
          method: 'GET',
          data: this.$http.adornData({})
        }).then(({data}) => {
            this.cake_chartDataList();
            this.mobileH5loading = false;
          if (data && data.code === 0) {
            let vm = this;
            let dataarr = this.arrFore(data.result.reverse());
            this.milestoneData = [];
            this.milestoneData = dataarr;
            this.milestoneDataObj.flg = this.arrClear(dataarr)
          }else
          this.$message.error(data.msg);
        });    
      },
      arrClear(arr){
          for(let i = 0; i<arr.length;i++)
          {
              if(arr[i].milestoneDate == "transparent")
              return arr[i].milestoneDate
          }
      },
      arrFore(arr){
          let date = new Date().getTime();
          for(let i = 0; i<arr.length;i++)
          {
                if(date - new Date(arr[i].milestoneDate).getTime()>0)
                arr[i].IsColor = "#0078D7"
                else
                arr[i].IsColor = "transparent"
          }
          return arr
      },
      cake_chartDataList(){
        this.mobileH5loading = true;
        this.$http({
          url: this.$http.partyUrl('/bim/index/realTimeData'),
          method: 'POST',
          data: this.$http.adornData({})
        }).then(({data}) => {
        this.mobileH5loading = false;
        this.sevenDays();
          if (data && data.code === 0) {
            //cake_chartDataListObj
            this.B_option.series[1].name = "班组分布";
            let arr = [];
            data.result.teamDist.forEach((v,i)=>{
                let color = `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
                let obj = {name:v.classNo,value:v.nums,itemStyle: {color: color}};
                data.result.teamDist[i].color = color;
                arr.push(obj)
            });
            this.B_option.series[1].data = arr;
            this.Daycake_chartList = [];
            this.Daycake_chartList = data.result.teamDist;
          }else
          this.$message.error(data.msg);
        }); 
      },
      sevenDays(){
        this.mobileH5loading = true;
        this.$http({
          url: this.$http.partyUrl('/bim/index/watchKanbanAttendance'),
          method: 'POST',
          data: this.$http.adornData({})
        }).then(({data}) => {
            this.dustNoiseF();
            this.mobileH5loading = false;
          if (data && data.code === 0) {
            //cake_chartDataListObj
            this.province = data.result.province;
            this.B_option.series[0].name = "城市";
            let arr = [];
            data.result.province.forEach((v,i)=>{
                let obj = {name:v.province,value:v.nums};
                arr.push(obj)
            });
            this.B_option.series[0].data = arr;
            this.sevenDaysDataList = [];
            this.sevenDaysDataList = data.result.sevenClassData;
            let objarr = [];
            let nameArr = [];
            data.result.groupByClassNo.forEach((v,i)=>{
                nameArr.push(
                    {
                        name: v.classNo,
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        itemStyle:{
                            normal:{
                                label: {
									show: false, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: 'rgba(0, 0, 0, 0.0)',
										fontSize: 16
									}
								},
                            },
                        },
                        data: []
                    }
                )
            });
            for(let i = 0;i<nameArr.length;i++)
            {
                for(let o in data.result.sevenClassData)
                {
                    let arr1 = data.result.sevenClassData[o];
                    for(let a = 0; a<arr1.length;a++)
                    {
                        if(arr1[a].classNo == nameArr[i].name)
                        nameArr[i].data.push(arr1[a].sums);
                    }
                }
            }
            for(let y in data.result.sevenClassData)
            {
                objarr.push(y);
            }
            this.Z_option.yAxis.data = objarr;
            this.Z_option.series = nameArr;
            let chart = this.$echarts.init(document.getElementById("B_chart"));
            chart.setOption(this.B_option,true);

            let chart1 = this.$echarts.init(document.getElementById("Z_echarts"));
            chart1.setOption(this.Z_option,true);
          }else
          this.$message.error(data.msg);
        }); 
      },
     dustNoiseF(){
        this.mobileH5loading = true;
        this.$http({
          url: this.$http.partyUrl('/equipment/index/dustNoiseList'),
          method: 'POST',
          data: this.$http.adornData({isToday:1})
        }).then(({data}) => {
        this.mobileH5loading = false;
          if (data && data.code === 0) {
            //cake_chartDataListObj
                this.dustNoiseDatalis = data.result[0];
                this.mobileH5loading = true;
                this.$http({
                url: this.$http.partyUrl('/equipment/index/getWeatherBase'),
                    method: 'GET',
                    data: this.$http.adornData({})
                }).then(({data}) => {
                this.Z_L_option_echart();
                this.mobileH5loading = false;
                if (data && data.code === 0) {
                    //cake_chartDataListObj
                    this.dustNoiseDatalis.winddirection = data.result.lives[0].winddirection;
                }else
                this.$message.error(data.msg);
                }); 
          }else
          this.$message.error(data.msg);
        }); 
      },
     Z_L_option_echart(){
        this.mobileH5loading = true;
        this.$http({
          url: this.$http.partyUrl('/bim/index/getProblemCount'),
          method: 'POST',
          data: this.$http.adornData({})
        }).then(({data}) => {
        this.mobileH5loading = false;
          if (data && data.code === 0) {
            //cake_chartDataListObj
            let arrT = [],arr1 = [],arr2 = [] ,arr3 = [];
            data.result.result.forEach((v,i)=>{
                arrT.push(v.name);
                arr1.push(v.safetyProblemTotal);
                arr2.push(v.qualityProblemTotal);
                arr3.push(v.safetyProblemTotal+v.qualityProblemTotal);
            });
            console.log("arr1",arr1)
            // this.Z_L_option.xAxis[0].data = arrT;

            let myChart = this.$echarts.init(document.getElementById('Z_L_echarts'))

            myChart.setOption({
                 title: {
                    // text: '质量安全数据统计图',
                    left:'center' 
                },
                tooltip : {
                    trigger: 'axis',
                },
                legend: {
                    data: ['安全问题数量', '质量问题数量','安全质量统计数量'],
                    align: 'left'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : arrT,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                        {
                            type: 'value',
                            max: 500,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                color: '#333',  //更改坐标轴文字颜色
                                fontSize : 14      //更改坐标轴文字大小
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine:{
                                    lineStyle:{
                                        color:'#333' //更改坐标轴颜色
                                    }
                            },
                            splitLine: {     //网格线
                                show: false
                            }
                        },
                ],
                series : [
                    {
                        name:'安全问题数量',
                        type:'bar',
                        itemStyle : {
                            normal : {
                            color : '#5793F3',
                            borderColor : '#5793F3 ',
                            borderWidth : 2
                            }
                        },
                        data:arr1
                    },
                    {
                        name:'质量问题数量',
                        type:'bar',
                        itemStyle : {
                            normal : {
                            color : '#D24A62',
                            borderColor : '#D24A62 ',
                            borderWidth : 2
                            }
                        },
                        data:arr2
                    },
                    {
                        name:'安全质量统计数量',
                        type:'line',
                        itemStyle : {
                            normal : {
                            color : '#7A749A',
                            borderColor : '#7A749A ',
                            borderWidth : 2
                            }
                        },
                        data: arr3,
                    },
                ]
                
            })




            // this.Z_L_option.xAxis.data = arrT;
            // this.Z_L_option.xAxis.data = arrT;

          }else
          this.$message.error(data.msg);
        }); 
      },
      randomColor(){
          return `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
      },
    },
  }
</script>

<style lang="scss" scoped>


.mobileH5{
    width: 100%;
    position: fixed;
    height: 100%;
    overflow: auto;
    top: 0;
    left: 0;
    z-index: 111111;
    background: #fff;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    header{
        width: 100%;
        line-height: 64px;
        text-align: center;
        font-size: 1rem;
        font-weight: 400;
        background: #008CD7;
        color: #f2f2f2;
        position: fixed;
        top: 0;
        z-index: 1111111111111111111;
    }
    main{
        padding: 0px 1.2rem 0px 1.2rem;
        margin-top: 60px;
        .milestone{
            width: 100%;
            height: 5.5rem;
            margin-bottom: 2rem;
            p{
                font-size: .9rem;
                color: #333;
            }
            .step{
                padding: 10px 0px;
                clear: both;
                ul{
                    margin: 0;
                    padding: 0;
                    li{
                    list-style: none;
                    float: left;
                    width: 25%;
                    text-align: center;
                    color: #8A9098;
                    font-size: .9rem;
                    padding: 4px 0px;
                    }
                }
                div{
                    font-size: .9rem;
                    width: 100%;
                    clear: left;
                    height: 10px;
                    background: #CCCCCC;
                    margin: 0;
                    margin-bottom: 2px;
                    i{
                    width: 25%;
                    display: block;
                    height: 100%;
                    float: left;
                    }
                }
            }
        }
        .image_bar{
            width: 100%;
            clear: both;
            height: 17.5rem;
            padding: 10px 1.5rem;
            border: 2px solid #E1E1E1;
            .header{
                height: 2rem;
                text-align: center;
                color: #323234;
                line-height: 2rem;
            }
            img{
                width: 100%;
                height: 100%;
                border: 1px solid #eee;
            }
        }
        .cake_chart{
            width: 100%;
            padding: 10px;
            border: 2px solid #E1E1E1;
            margin-top: 1rem;
            .header{
                width: 100%;
                height: 3rem;
                padding: 10px;
                line-height: 3rem;
                ul{
                    margin: 0;
                    padding: 0;
                    li{
                        list-style: none;
                        float: left;
                        width: 33.3%;
                        line-height: 2rem;
                        text-align: center;
                        color: #333;
                    }
                }
            }
            .B_echarts{
                width: 100%;
                padding: 1rem 10px;
                height: 15rem;
                .legend{
                    width: 25%;
                    height: 100%;
                    overflow: auto;
                    float: left;
                    ul{
                        margin: 0;
                        padding: 0;
                        li{
                            list-style: none;
                            font-size: 14px;
                            padding-left: 14px;
                            position: relative;
                            color: #666;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            i{
                                display: inline-block;
                                width: 10px;
                                height: 16px;
                                margin: 2px 0px;
                                background: #ccc;
                                position: absolute;
                                left: 0;
                            }
                        }
                    }
                }
                .B_chart{
                    height: 100%;
                    float: right;
                    width: 74%;
                }
            }
            .Z_echarts{
                width: 100%;
                height: 16rem;
            }
        }
        .dustNoise{
            width: 100%;
            padding: 10px;
            border: 2px solid #E1E1E1;
            margin-top: 1rem;
            div{
                padding: 0px 1rem;
            }
            .header{
                height: 2.4rem;
                text-align: center;
                color: #323234;
                line-height: 2rem;
            }
            .ul1{
                margin: 0;
                padding: 0;
                li{
                    list-style: none;
                    float: left;
                    width: 33.3%;
                    text-align: center;
                    height: 3rem;
                    span{
                        color: #2689DC;
                    }
                }
            }
            .ul2{
                margin: 0;
                padding: 0;
                li{
                    list-style: none;
                    height: 3rem;
                    float: left;
                    width: 25%;
                    text-align: center;
                    span{
                        color: #2689DC;
                    }
                }
            }
        }
        .echats_chart{
            width: 100%;
            padding: 10px;
            border: 2px solid #E1E1E1;
            border-bottom: none;
            margin-top: 1rem;
            .Z_L_echarts{
                width: 100%;
                height: 15rem;
            }
        }
        .managementModule{
            width: 100%;
            border: 2px solid #E1E1E1;
            border-top: none;
            padding-top: 2rem;
            .titleNav{
                width: 100%;
                ul{
                    margin: 0;
                    padding: 0;
                    li{
                        list-style: none;
                        float: left;
                        width: 50%;
                        line-height: 2.4rem;
                        border: 2px solid #E1E1E1;
                        text-align: center;
                        border-left: none;
                        // color: #000;
                        // background: #D9D9D9;
                    }
                    // li:last-child{
                    //     border-right: none;
                    //     background: transparent;
                    // }
                }
            }
            .quality{
                width: 100%;
                ul{
                    margin: 0;
                    padding: 0;
                    padding: 1rem 2rem;
                    li{
                        list-style: none;
                        float: left;
                        height: 3rem;
                        line-height: 3rem;
                        width: 50%;
                        text-align: center;
                        font-size: .8rem;
                        color: #333;
                    }
                }
                .B_charts_1{
                    width: 100%;
                    padding: 1rem 1.2rem;
                    height: 15rem;
                    .legend{
                        width: 32%;
                        height: 100%;
                        overflow: auto;
                        float: left;
                        padding-left: 1rem;
                        ul{
                            margin: 0;
                            padding: 0;
                            li{
                                list-style: none;
                                font-size: 14px;
                                padding-left: 14px;
                                position: relative;
                                color: #666;
                                float: none;
                                height: auto;
                                line-height: inherit;
                                width: 100%;
                                text-align: left;
                                i{
                                    display: inline-block;
                                    width: 10px;
                                    height: 16px;
                                    margin: 2px 0px;
                                    background: #ccc;
                                    position: absolute;
                                    left: 0;
                                }
                            }
                        }
                    }
                    .B_chart{
                        height: 100%;
                        float: right;
                        width: 67%;
                    }
                }
                .B_charts_2 {
                    width: 100%;
                    padding: 1rem 1.2rem;
                    height: 15rem;
                    .legend{
                        width: 32%;
                        height: 100%;
                        overflow: auto;
                        float: left;
                        padding-left: 1rem;
                        ul{
                            margin: 0;
                            padding: 0;
                            li{
                                list-style: none;
                                font-size: 14px;
                                padding-left: 14px;
                                position: relative;
                                color: #666;
                                float: none;
                                height: auto;
                                line-height: inherit;
                                width: 100%;
                                text-align: left;
                                i{
                                    display: inline-block;
                                    width: 10px;
                                    height: 16px;
                                    margin: 2px 0px;
                                    background: #ccc;
                                    position: absolute;
                                    left: 0;
                                }
                            }
                        }
                    }
                    .B_chart{
                        height: 100%;
                        float: right;
                        width: 67%;
                    }
                }
            }
        }
        .outputValueAnalysis{
            width: 100%;
            padding: 1rem 0px;
            height: 14rem;
        }
        .towerSwitch {
            width: 100%;
            padding: 10px;
            border: 2px solid #E1E1E1;
            margin-top: 1rem;
            .com-opt {
                cursor: pointer;
                padding: 0px 35%;
                color: #333;
                width: 100%;
                text-align: center;
                font-size: 1rem;
                line-height: 3rem;
                border: none;
                outline: none;
                border: 2px solid #E1E1E1;
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
            }
            ul{
                margin: 0;
                padding: 1rem;
                li{
                    list-style: none;
                    float: left;
                    width: 25%;
                    height: 3rem;
                    text-align: center;
                }
            }
            .info{
                width: 100%;
                .item{
                    width: 23%;
                    float: left;
                    height: 3rem;
                    padding: 0px 2px;
                    margin: 0px 2px;
                    border: 1px solid #E1E1E1;
                }
                .item>div{
                    width: 100%;
                    height: 1rem;
                }
            }
        }
        .visualSchedule{
            width: 100%;
            padding: 10px;
            border: 2px solid #E1E1E1;
            margin-top: 1rem;
            .header{
                height: 2.4rem;
                text-align: center;
                color: #323234;
                font-size: 1.2rem;
                line-height: 2rem;
                font-weight: 400;
            }
            .clrg_{
                width: 48%;
                margin-right: .5rem;
                float: left;
                img{
                    width: 100%;
                    height: 9rem;
                    margin: 10px 0px;
                }
                ul{
                    margin: 0;
                    padding: 0;
                    li{
                        list-style: none;
                        font-size: 0.8rem;
                        color: #333;
                    }
                }
            }
        }
    }
}

.active {
   background: #199adb;
//    border: 1px solid #199adb;
   color: #fff;
 }

</style>
<style>
.mobileH5 .el-carousel__item h3 {
color: #475669;
font-size: 14px;
opacity: 0.75;
line-height: 200px;
margin: 0;
}

.mobileH5 .el-carousel__item:nth-child(2n) {
background-color: #99a9bf;
}

.mobileH5 .el-carousel__item:nth-child(2n+1) {
background-color: #d3dce6;
}
.mobileH5 .el-carousel__indicators--outside {
    height: 1.2rem;
    line-height: 1.2rem;
}
.mobileH5 .el-carousel {
    overflow: hidden;
}
.mobileH5 .el-progress__text{
    font-size: 12px !important;
}
.mobileH5 .el-progress-bar {
    padding-right: 38px;
    margin-right: -43px;
}
</style>

