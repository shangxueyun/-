<template>
  <div class="mobileH5">
    <el-container>
        <el-main>
            
		<div class="banner-wrap">
			<div class="banner">
				<img src="~@/assets/img/h5bg.png">
			</div>
		</div>
        
        <div class="mainbox">
            <div class="milestone" v-if="milestoneData.length!=0">
                <p style="height:2rem;overflow:hidden;">
                    <span style="float:left">
                        总工期<span style="font-size: 1.2rem;">{{allDays}}</span>
                        日历天
                    </span>
                    <!-- <span v-if="milestoneDataObj.flg == undefined" style="float:right">已安全生产<span style="font-size: 1.2rem;">{{0}}</span> 日历天</span> -->
                    <span style="float:right">已安全生产<span style="font-size: 1.2rem;">{{nowSafeDays}}</span>日历天</span>
                </p>

            <div class="startendDat" >
                开工日期：{{startDatenew}}
                竣工日期：{{endDatenew}}
            </div>
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
                        <li style="text-align: left;">进场人员 &nbsp;<span style="color:#4081D9">{{entryNums}}</span></li>
                        <li>出场人员 &nbsp;<span style="color:#4081D9">{{appearanceNums}}</span></li>
                        <li style="text-align: right;">在场人员 &nbsp;<span style="color:#4081D9">{{venueRealNums}}</span></li>
                    </ul>
                </div>
                <div class="B_echarts" ref="B_echarts">
                    <!-- <div class="legend" style="display:none;">
                        <ul>
                            <li v-for="(item,key) in Daycake_chartList" :key="key">{{item.classNo}}<i :style="'background:'+item.color"></i></li>
                        </ul>
                    </div> -->
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

                 <el-select style="width:100%;" v-model="tajivalue" placeholder="请选择"  @change="tajivaluechange">
                    <el-option
                    v-for="items in tajioptionslist"
                    :key="items.equipmentCode"
                    :label="items.equipmentCode"
                    :value="items.equipmentCode">
                    </el-option>
                </el-select>
                
                <ul>
                    <li  v-for="items in todayExceptionGroup">
                        <span v-if="items.type == 1">
                                今日违章<br><span style="color:#4081D9">{{items.count}}</span>
                        </span>
                        <span v-if="items.type == 2">
                                今日报警<br><span style="color:#4081D9">{{items.count}}</span>
                        </span>
                        <span v-if="items.type == 3">
                                非正常断电<br><span style="color:#4081D9">{{items.count}}</span>
                        </span>
                        <span v-if="items.type == 4">
                                今日故障<br><span style="color:#4081D9">{{items.count}}</span>
                        </span>
                    </li>
                </ul>
                <br style="clear: both;">
                <img style="width: 100%;" src="~@/assets/img/towerS.png" alt="">
                <div class="info">
                    <div class="item">
                        <span>No.1 重量</span>
                        <br>
                        <div>
                            <el-progress :text-inside="true" :stroke-width="20" :percentage="weight"></el-progress>

                        </div>
                    </div>
                    <div class="item">
                        <span>No.2 力矩</span>
                        <br>
                        <div>
                            <el-progress :text-inside="true" :stroke-width="20" :percentage="moment"></el-progress>
                        </div>
                    </div>
                    <div class="item">
                        <span>No.3 幅度</span>
                        <br>
                        <div>
                            <el-progress :text-inside="true" :stroke-width="20" :percentage="towerRange"></el-progress>
                        </div>
                    </div>
                    <div class="item">
                        <span>No.4 高度</span>
                        <br>
                        <div>
                            <el-progress :text-inside="true" :stroke-width="20" :percentage="height"></el-progress>
                        </div>
                    </div>
                </div>
                <br style="clear: both;">
            </div>

            <div class="visualSchedule">
                    <el-carousel :interval="4000"  class="carouselbox">
                        <el-carousel-item v-for="item in listImageProgressdata" :key="item.id">
                            <div class="listimgs">
                            <img :src="item.img">
                            </div>
                            <ul>
                                <li>单体：{{item.monomerName}}</li>
                                <li>楼层：{{item.floorName}}</li>
                                <li>流水段：{{item.flowSectionName}}</li>
                                <li>劳动力总数：{{item.totalNumber}}</li>
                                <li>上传人：{{item.createUser}}</li>
                                <li>上传日期：{{item.createTime}}</li>
                            </ul>
                        </el-carousel-item>
                    </el-carousel>
            </div>
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
        entryNums:'',
        appearanceNums:'',
        venueRealNums:'',
        startDatenew:'',
        endDatenew:'',
        allDays:'',
        nowSafeDays:'',
        weight:0,
        moment:0,
        towerRange:0,
        height:0,
        tajivalue:'',
        todayExceptionGroup:[],
        tajioptionslist:[],
        listImageProgressdata:[],
        total:'',
        sevenData: {},
        proBlemList: [],
        optionsData: [], //
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
            legend: {
                orient: 'vertical',
                x: 'left',
                data:[]
            },
            series: [
                        {
                            name: '工种分布',
                            type: 'pie',
                            selectedMode: true,
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
                            data: []
                        },
                        {
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
                            data: []
                        }  
            ]
        },
        
        //柱状图颜色
        colorList:[
        '#ccc','#eee','#666','#777','#111',
        '#ccc','#eee',
        ],
        //
        Z_option:{
                tooltip : {
                    trigger: 'axis',
                    formatter: (params) => {
                        let info = params;
                        var newArr = [];
                        for (var i = 0; i < info.length; i++) { 
                            if(info[i].value !== 0){
                                newArr.push(info[i]);
                            }
                        }
                        var num=0;
                        for(var i in newArr){
                            console.log(i+": "+newArr[i].value)
                             num += newArr[i].value
                        
                        }
                        for (var j = 0; j < newArr.length; j++) { 
                                return `
                                <div>
                                    <div>总班组：${newArr.length}个</div>
                                    <div>总人数：${num}</div>
                                </div>
                                `
                        }

                    }
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
      }
    },
    created() {
        this.milestoneDataList();
        this.QualityAssurance('1')// 质量管理
        this.getWorkerOption() // 产值分析图
        this.listImageProgress() //形象进度
        this.taji() // 塔机
        this.getSchedule()  //里程碑
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

      getSchedule(){
        this.$http({
          url: this.$http.adornUrl('/bim/index/getSchedule'),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
              if(data.result !== null){
              this.startDatenew = data.result.startDate
              this.endDatenew = data.result.endDate

              }
          }
        })
      },
        taji(){
            this.$http({
                url: this.$http.partyUrl('/equipment/index/equipmentList/1'),
                method: 'post',
                data: this.$http.adornData({})
            }).then((data) => {
                if(data.data.code == 0){
                    this.tajioptionslist = data.data.result
                    this.tajivalue = data.data.result[0].equipmentCode
                    this.todayExceptionGroups(this.tajivalue)
                    this.infoByEquipmentCode(this.tajivalue)

                }
            })
        },
        tajivaluechange(value){
                    this.todayExceptionGroups(value)
                    this.infoByEquipmentCode(value)
        },
        todayExceptionGroups(value){
            this.$http({
                url: this.$http.partyUrl('/equipment/index/todayExceptionGroup/'+value),
                method: 'post',
                data: this.$http.adornData({})
            }).then((data) => {
                if(data.data.code == 0){
                    if(data.data.result == '' || data.data.result == null){
                        this.todayExceptionGroup = [
                                {
                                    "count": 0,
                                    "type": "1"
                                },
                                {
                                    "count": 0,
                                    "type": "2"
                                },
                                {
                                    "count": 0,
                                    "type": "3"
                                },
                                {
                                    "count": 0,
                                    "type": "4"
                                }
                        ]

                    }else{

                   this.todayExceptionGroup = data.data.result
                    }
                }
            })
        },
        infoByEquipmentCode(value){
            this.$http({
                url: this.$http.partyUrl('/equipment/index/infoByEquipmentCode/'+value),
                method: 'post',
                data: this.$http.adornData({})
            }).then((data) => {
                if(data.data.code == 0){
                    if(data.data.result == null){
                        this.weight = 0
                        this.moment = 0
                        this.towerRange = 0 
                        this.height = 0
                        
                    }else{
                        this.weight = data.data.result.weight
                        this.moment = data.data.result.moment 
                        this.towerRange = data.data.result.towerRange 
                        this.height = data.data.result.height 
                    }

                }
            })
        },
        listImageProgress(){
                this.$http({
                        url: this.$http.adornUrl('/bim/index/listImageProgress'),
                    method: 'post',
                    data: this.$http.adornData({})
                    }).then((data) => {
                        if(data.data.code==0){
                            this.listImageProgressdata = data.data.result
                            // console.log(this.listImageProgressdata)
                        }
                })

        },
        getWorkerOption(){

                this.$http({
                url: this.$http.adornUrl('/bim/index/analysisChart'),
                method: 'post',
                data: this.$http.adornData({
                    'dateTime': '2019'
                })
                }).then((data) => {
                if(data.data.code==0){
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
                    subcontractingOutputValueArr=this.publicFun(subcontractingOutputValueArr, arr, 'subcontractingOutputValue')
                    constructionOutputValueArr=this.publicFun(constructionOutputValueArr, arr, 'constructionOutputValue')
                    installationOutputValueArr=this.publicFun(installationOutputValueArr, arr, 'installationOutputValue')
                    
                    this.outputValueAnalysis(subcontractingOutputValueArr,constructionOutputValueArr,installationOutputValueArr)
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
      outputValueAnalysis(subcontractingOutputValueArr,constructionOutputValueArr,installationOutputValueArr){

        let myChart = echarts.init(document.getElementById('outputValueAnalysis'))
        myChart.setOption({
              title: {
                        // text: '某地区蒸发量和降水量',
                        // subtext: '纯属虚构'
                    },

                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {

                        data: ['分包产值', '土建产值', '安装产值'],
                        top: '10px',
                        textStyle: {// 图例文字的样式
                        color: '#00EAFF',
                        fontSize: 16
                        }
                    },
                    toolbox: {
                        show: false

                    },
                    calculable: true,
                    xAxis: [
                        {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisLine: {
                            lineStyle: {
                            color: '#00EAFF'
                            }
                        }

                        }
                    ],
                    yAxis: [
                        {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                            color: '#00EAFF'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: ['#00EAFF'],
                            width: 1,
                            type: 'solid'
                            }
                        }
                        }
                    ],
                    series: [
                        {
                        name: '分包产值',
                        type: 'bar',
                        data: subcontractingOutputValueArr
                        },
                        {
                        name: '土建产值',
                        type: 'bar',
                        data:constructionOutputValueArr

                        },
                        {
                        name: '安装产值',
                        type: 'bar',
                        data: installationOutputValueArr

                        }
                    ]
        })

      },
        selected(value){
            this.active = value;
            // console.log(value)
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
            //   console.log("data1",data)
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
        let myChart = echarts.init(document.getElementById('B_charts_1'))
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
        let myChart = echarts.init(document.getElementById('B_charts_2'))
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
        let chart = echarts.init(document.getElementById("B_chart"));
        chart.setOption(this.B_option,true);

        let chart1 = echarts.init(document.getElementById("Z_echarts"));
        chart1.setOption(this.Z_option,true);


        let chart4 = echarts.init(document.getElementById("B_charts_2"));
        chart4.setOption(this.B_charts_2_option,true);
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
            this.startDatenew = data.result[0].startDate
            this.endDatenew = data.result[0].endDate
            this.allDays=this.changeDays(this.getDays(data.result[0].startDate, data.result[0].endDate))
            // console.log(this.allDays)
            this.nowSafeDays=this.changeDays(this.getDays(data.result[0].startDate, this.getNowFormatDate()))
            // console.log(this.nowSafeDays)
          }else
          this.$message.error(data.msg);
        });    
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
          day=day
        }else if(day<=99){
          day=day
        }else if(day<=999){
          day=day
        }else{

        }
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
          if (data && data.code === 0) {
              this.appearanceNums = data.result.appearanceNums
              this.entryNums = data.result.entryNums
              this.venueRealNums = data.result.venueRealNums
            //cake_chartDataListObj
            this.B_option.series[1].name = "班组分布";
            let arr = [];
            data.result.teamDist.forEach((v,i)=>{
                // let color = `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
                // let obj = {name:v.classNo,value:v.nums,itemStyle: {color: color}};
                let obj = {name:v.classNo,value:v.nums};
                // data.result.teamDist[i].color = color;
                arr.push(obj)
            });
            this.B_option.series[1].data = arr;
            // console.log("班组",arr)
            this.Daycake_chartList = [];
            this.Daycake_chartList = data.result.teamDist;
          }else{
            this.$message.error(data.msg);
          }

        this.sevenDays();
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
            let chart = echarts.init(document.getElementById("B_chart"));
            chart.setOption(this.B_option,true);

            let chart1 = echarts.init(document.getElementById("Z_echarts"));
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
            // console.log("arr1",arr1)
            // this.Z_L_option.xAxis[0].data = arrT;

            let myChart = echarts.init(document.getElementById('Z_L_echarts'))

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
<style>
.carouselbox  .el-carousel__indicator{
        display:none;
    }
</style>


<style lang="scss" scoped>

.banner-wrap{width:100%;height:auto;}
	.banner{padding-top: 50%;width: 100%;height: auto; overflow: hidden; position: relative;}
	.banner img{position:absolute;left:0;top:0;width:100%; height:100%; }
.carouselbox{
    .carouselbox{
        height:20rem;
    }
    .listimgs{
        height:10rem;
        position: relative;
        overflow: hidden;
        img{
            // height:10rem;
            // width:100%;
            position: absolute;
            width: 100%;
            top: 50%;
            left: 0;
            transform: translateY(-50%) scale(1);
            border:none;
            border-radius: 6px;display:table-cell
        }
    }
    ul{
        margin-top:0.3rem;
    }
}

.mobileH5{
    overflow-y: auto;
    width: 100%;
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    // z-index: 111111;
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
    .el-main{
        padding:0;
    }
    
    main{
        .mainbox{
             padding: 0px 1.2rem 0px 1.2rem;
        }
        // padding: 0px 1.2rem 0px 1.2rem;
        // margin-top: 60px;
        .milestone{
           
            padding:20px;
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
                    // font-size: .9rem;
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
                    // float: right;
                    // width: 74%;
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
            height: 20rem;
            border: 2px solid #E1E1E1;
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
/* .mobileH5 .el-progress__text{
    font-size: 12px !important;
} */
.mobileH5 .el-progress-bar__outer {
    background:#747474;
} 
</style>

