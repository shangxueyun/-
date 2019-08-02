<template>
<div class="model-small">
    <div class="centent" :dataBle="ble_">
        <div class="row_F">
            <el-row :gutter="10">
                <el-col class="cg cg-12" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                    <rd-weather></rd-weather>
                </el-col>
                <el-col class="cg cg-6" :xs="12" :sm="12" :md="12" :lg="12" :xl="6">
                    <div class="three">
                        <h2>待处理</h2>
                        <div class="wire"></div>
                        <div class="table_div">
                            <table>
                            <tr><th style="width:12%">序号</th><th>事件</th><th style="width:30%">时间</th></tr>
                            </table>
                        </div>
                        <div class="table_div1">
                            <table>
                            <tr v-for="(items,index) in pending" :key="index"><td style="width:10%">{{items.id}}</td><td style="width:60%">{{items.evevt}}</td><td style="width:30%">{{items.time}}</td></tr>
                            </table>
                        </div>
                    </div>
                </el-col>
                <el-col class="cg cg-6" :xs="12" :sm="12" :md="12" :lg="12" :xl="6">
                    <div class="three">
                        <h2>报警</h2>
                        <div class="wire"></div>
                        <div class="table_div">
                            <table>
                            <tr><th style="width:12%">序号</th><th>事件</th><th style="width:30%">时间</th></tr>
                            </table>
                        </div>
                        <div class="table_div1">
                            <table>
                            <tr v-for="(items,index) in alert" :key="index"><td style="width:10%">{{items.id}}</td><td style="width:60%">{{items.evevt}}</td><td style="width:30%">{{items.time}}</td></tr>
                            </table>
                        </div>
                    </div>
                </el-col>
            </el-row>        
        </div>
      <!--  -->
        <div class="row_F schedule">
            <el-row :gutter="10">
                <el-col class="cg cg-18" :xs="24" :sm="24" :md="24" :lg="24" :xl="18">
                    <div class="left">
                        <div class="schedule_child1">
                            <h3>本周统计任务</h3>
                            <div id="echars-pre" ref="Statistical"></div>
                            <div class="bottom">任务完成率：86.37%</div>
                        </div>
                        <div class="schedule_child">
                            <div class="project_flex">
                                <div class="project_m" v-for="(items,index) in project_model" :key="index" v-if="index<3">
                                    <p class="top_p"><i class="el-project"></i><span class="font_H">{{items.name}}</span><span class="time" :style="`color:${items.color}`">{{items.status}}</span></p>
                                    <p style="line-height: 0.5rem;padding-bottom: 4px;">{{items.info}}</p>
                                    <p class="font_H" style="line-height: 0;padding: 0 10px;">{{items.time}}</p>
                                    <el-progress :percentage="items.d"></el-progress>
                                </div>                                
                            </div>
                            <div class="project_flex">
                                <div class="project_m" v-for="(items,index) in project_model" :key="index" v-if="index>2">
                                    <p class="top_p"><i class="el-project"></i><span class="font_H">{{items.name}}</span><span class="time" :style="`color:${items.color}`">{{items.status}}</span></p>
                                    <p style="line-height: 0.5rem;padding-bottom: 4px;">{{items.info}}</p>
                                    <p class="font_H" style="line-height: 0;padding: 0 10px;">{{items.time}}</p>
                                    <el-progress :percentage="items.d"></el-progress>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="cg cg-6-5" :xs="24" :sm="24" :md="24" :lg="24" :xl="6">
                    <div class="right">
                        <h2>形象进度照片</h2>
                        <div class="wire"></div>
                        <div class="swiper_div swiper_display">
                            <swiper :options="swiperOption1()" style="height:100%">
                                <swiper-slide v-for="(items,index) in imgList" :key="index">
                                    <div class="bar_div">
                                        <img :src="items.src" :alt="items.info">
                                        <div class="img_font">{{items.info}}<span class="time">{{items.time}}</span></div>
                                    </div>
                                </swiper-slide>
                                <div class="swiper-pagination" slot="pagination"></div>
                            </swiper>
                        </div>
                        <div class="swiper_div swiper_display1">
                            <swiper :options="swiperOption" style="height:100%">
                                <swiper-slide v-for="(items,index) in imgList" :key="index">
                                    <div class="bar_div">
                                        <img :src="items.src" :alt="items.info">
                                        <div class="img_font">{{items.info}}<span class="time">{{items.time}}</span></div>
                                    </div>
                                </swiper-slide>
                                <div class="swiper-pagination" slot="pagination"></div>
                            </swiper>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
      <!--  -->
      <div class="row_F statistics">
        <el-row :gutter="10">
            <el-col class="cg cg-24" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <div class="h2_top">
                    <div class="centent_top">
                        <h2>总体劳动力</h2>
                        <div class="wire"></div>
                        <div class="echar" ref="line_echar">
                            
                        </div>
                    </div>
                    <div class="centent_bottom">
                        <el-row :gutter="10">
                            <el-col class="number" :span="11" style="width: 48.5%;">
                                <div class="grid-content bg-purple-dark">
                                    <h2>当天人数</h2>
                                    <div class="wire"></div>
                                    <div class="people">
                                        <h3>人数</h3>
                                        <h3 class="color"> <span style="color:#008CD6;font-weight: 600;">139</span>人</h3>
                                    </div>
                                </div>
                            </el-col>
                            <el-col class="number month" :push="1" :span="11" style="width: 49%;left: 5px;">
                                <div class="grid-content bg-purple-dark">
                                    <h2>当月人数</h2>
                                    <div class="wire"></div>
                                    <div class="people">
                                        <h3>人数</h3>
                                        <h3 class="color"> <span style="color:#008CD6;font-weight: 600;">246</span>人</h3>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col class="cg cg-12-12" :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                <div class="centent_right">
                    <div class="equipment_materials">
                        <div class="grid-content bg-purple-dark">
                            <h2>材料统计</h2>
                            <div class="wire"></div>
                            <div class="table_div">
                                <table>
                                <tr><th style="width:10%">序号</th><th style="width:44%">材料名称</th><th style="width:24%">工程量</th><th style="width:15%">单位</th></tr>
                                </table>
                            </div>
                            <div class="table_div1">
                                <table>
                                <tr  v-for="(items,index) in Material" :key="index"><td style="width:10%">{{items.id}}</td><td style="width:44%">{{items.name}}</td><td style="width:24%">{{items.evevt}}</td><td style="width:15%">{{items.time}}</td></tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col class="cg cg-12-12" :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                <div class="centent_right">
                    <div class="equipment_materials">
                        <div class="grid-content bg-purple-dark">
                            <h2>设备统计</h2>
                            <div class="wire"></div>
                            <div class="table_div">
                                <table>
                                <tr><th style="width:10%">序号</th><th>设备类型</th><th style="width:30%">数量（台）</th></tr>
                                </table>
                            </div>
                            <div class="table_div1">
                                <table>
                                    <tr  v-for="(items,index) in deviceStatistics" :key="index"><td style="width:10%">{{items.id}}</td><td style="width:60%">{{items.evevt}}</td><td style="width:30%">{{items.time}}</td></tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
      </div>
      <!--  -->
      <div class="row_F issueModel">
        <el-row :gutter="10">
            <el-col class="cg cg-24" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <div class="issue">
                    <h2>质量问题</h2>
                    <div class="wire"></div>
                    <div class="echar" ref="issueEchar"></div>
                    <div class="ionc">
                        <div class="img_div">
                            <p>重大隐患</p>
                            <p class="h1">0</p>
                        </div>
                        <div class="img_div two" style="margin-top:1rem;">
                            <p>累计未关闭</p>
                            <p class="h1">50</p>
                        </div>
                        <div class="img_div three" style="margin-top:1rem;">
                            <p>超期未关闭</p>
                            <p class="h1">23</p>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col class="cg cg-24" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <div class="issue">
                    <h2>安全问题</h2>
                    <div class="wire"></div>
                    <div class="echar" ref="issueEchar1"></div>
                    <div class="ionc">
                        <div class="img_div">
                            <p>重大隐患</p>
                            <p class="h1">0</p>
                        </div>
                        <div class="img_div two" style="margin-top:1rem;">
                            <p>累计未关闭</p>
                            <p class="h1">50</p>
                        </div>
                        <div class="img_div three" style="margin-top:1rem;">
                            <p>超期未关闭</p>
                            <p class="h1">23</p>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
      </div>
    </div>  
</div>


</template>
<script>
  import { getUUID } from '@/utils';
  import RdWeather from './rd-weather';
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { setTimeout } from 'timers';
  export default {
    components: {
      RdWeather,
      swiper,
      swiperSlide,
    },
    data () {
      return {
        pending: [
          {id:1,evevt:"A区大门有积水",time:"2019.06.30"},
          {id:2,evevt:"物料堆放不规范",time:"2019.06.30"},
          {id:3,evevt:"C区有垃圾",time:"2019.06.30"},
          {id:4,evevt:"C区大门口车辆道闸被撞坏",time:"2019.06.30"},
          {id:5,evevt:"1号楼第一层脚手架有松动",time:"2019.06.30"},
          {id:6,evevt:"A区大门有积水",time:"2019.06.30"},
          {id:7,evevt:"物料堆放不规范",time:"2019.06.30"},
          {id:8,evevt:"C区有垃圾",time:"2019.06.30"},
          {id:9,evevt:"C区大门口车辆道闸被撞坏",time:"2019.06.30"},
          {id:10,evevt:"1号楼第一层脚手架有松动",time:"2019.06.30"},
        ],
        alert: [
          {id:1,evevt:"A区大门有积水",time:"2019.06.30"},
          {id:2,evevt:"物料堆放不规范",time:"2019.06.30"},
          {id:3,evevt:"C区有垃圾",time:"2019.06.30"},
          {id:4,evevt:"C区大门口车辆道闸被撞坏",time:"2019.06.30"},
          {id:5,evevt:"1号楼第一层脚手架有松动",time:"2019.06.30"},
          {id:6,evevt:"A区大门有积水",time:"2019.06.30"},
          {id:7,evevt:"物料堆放不规范",time:"2019.06.30"},
          {id:8,evevt:"C区有垃圾",time:"2019.06.30"},
          {id:9,evevt:"C区大门口车辆道闸被撞坏",time:"2019.06.30"},
          {id:10,evevt:"1号楼第一层脚手架有松动",time:"2019.06.30"},
        ],
        deviceStatistics: [
          {id:1,evevt:"塔吊",time:"2"},
          {id:2,evevt:"施工电梯",time:"4"},
          {id:3,evevt:"门禁闸机",time:"5"},
          {id:4,evevt:"监控摄像头球机",time:"10"},
          {id:5,evevt:"监控摄像头枪机",time:"10"},
          {id:6,evevt:"环境检测仪",time:"2"},
          {id:7,evevt:"地磅",time:"3"},
          {id:8,evevt:"车辆砸到",time:"3"},
          {id:9,evevt:"门禁",time:"3"},
          {id:10,evevt:"塔吊",time:"2"},
          {id:11,evevt:"施工电梯",time:"4"},
          {id:12,evevt:"门禁闸机",time:"5"},
          {id:13,evevt:"监控摄像头球机",time:"10"},
          {id:14,evevt:"监控摄像头枪机",time:"10"},
          {id:15,evevt:"环境检测仪",time:"2"},
          {id:16,evevt:"地磅",time:"3"},
          {id:17,evevt:"车辆砸到",time:"3"},
          {id:18,evevt:"门禁",time:"3"},
        ],
        Material : [
          {id:1,name:"沙子",evevt:"20",time:"吨"},
          {id:2,name:"混泥土",evevt:"50",time:"台"},
          {id:3,name:"2#钢筋",evevt:"2000",time:"个"},
          {id:4,name:"5#钢筋",evevt:"3000",time:"个"},
          {id:5,name:"5#空心砖",evevt:"10000",time:"个"},
          {id:6,name:"磨具板",evevt:"6000",time:"块"},
          {id:7,name:"普通钢筋",evevt:"10000",time:"个"},
          {id:8,name:"冷轧带肋钢筋",evevt:"500",time:"捆"},
          {id:9,name:"冷轧扭钢筋",evevt:"1000",time:"捆"},
          {id:10,name:"沙子",evevt:"20",time:"吨"},
          {id:11,name:"混泥土",evevt:"50",time:"台"},
          {id:12,name:"2#钢筋",evevt:"2000",time:"个"},
          {id:13,name:"5#钢筋",evevt:"3000",time:"个"},
          {id:14,name:"5#空心砖",evevt:"10000",time:"个"},
          {id:15,name:"磨具板",evevt:"6000",time:"块"},
          {id:16,name:"普通钢筋",evevt:"10000",time:"个"},
          {id:17,name:"冷轧带肋钢筋",evevt:"500",time:"捆"},
          {id:18,name:"冷轧扭钢筋",evevt:"1000",time:"捆"},
          {id:19,name:"土壤类别 三类土",evevt:"1488",time:"m²"},
          {id:20,name:"土壤类别 三类土",evevt:"1488",time:"m²"},
        ],
        project_model:[
            {name:"工程名001",status:"正常",color:"#0C92D8",info:"土建-第二层-阶段-模板支设",time:'06-04  06:42',d:10},
            {name:"工程名001",status:"延迟",color:"red",info:"土建-第二层-阶段-模板支设",time:'06-04  06:42',d:40},
            {name:"工程名001",status:"延迟",color:"red",info:"土建-第二层-阶段-模板支设",time:'06-04  06:42',d:58},
            {name:"工程名001",status:"正常",color:"#0C92D8",info:"土建-第二层-阶段-模板支设",time:'06-04  06:42',d:100},
            {name:"工程名001",status:"正常",color:"#0C92D8",info:"土建-第二层-阶段-模板支设",time:'06-04  06:42',d:70},
            {name:"工程名001",status:"延迟",color:"red",info:"土建-第二层-阶段-模板支设",time:'06-04  06:42',d:80},
        ],
        //swiper 配置参数
        swiperOption: {
          slidesPerView: 4,
          spaceBetween: 30,
          loop: true,
          autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        //http://f.hiphotos.baidu.com/image/pic/item/8d5494eef01f3a29f863534d9725bc315d607c8e.jpg
        imgList:[
            {src:require('@/assets/img/bar_1.png'),info:"配套用房",time:"2019-06-04"},
            {src:require('@/assets/img/bar_2.png'),info:"配套用房",time:"2019-06-04"},
            {src:require('@/assets/img/bar_3.png'),info:"配套用房",time:"2019-06-04"},
            {src:require('@/assets/img/bar_4.png'),info:"配套用房",time:"2019-06-04"},
            {src:require('@/assets/img/bar_1.png'),info:"配套用房",time:"2019-06-04"},
            {src:require('@/assets/img/bar_2.png'),info:"配套用房",time:"2019-06-04"},
            {src:require('@/assets/img/bar_3.png'),info:"配套用房",time:"2019-06-04"},
            {src:require('@/assets/img/bar_4.png'),info:"配套用房",time:"2019-06-04"},
            {src:require('@/assets/img/bar_1.png'),info:"配套用房",time:"2019-06-04"},
            {src:require('@/assets/img/bar_2.png'),info:"配套用房",time:"2019-06-04"},
        ],
        //图表数据
        chart_pie:{
            tooltip: {},
            legend: {},
            grid: {
                left: '10%',
            },
            series: [
                {
                    name:'本周统计任务',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data:[
                        {value:335, name:'延迟开始'},
                        {value:310, name:'未开始'},
                        {value:234, name:'正常完成'},
                        {value:135, name:' 延迟完成'},
                    ]
                }
            ]
        },
        chart_line:{
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
                
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(88,160,253,1)'
                                }, {
                                    offset: 0.5, color: 'rgba(88,160,253,0.7)'
                                }, {
                                    offset: 1, color: 'rgba(88,160,253,0)'
                                }]
                            }
                        }
                    },
            }]
        },
        chart_pie2:{
            tooltip: {},
            legend: {},
            grid:{
                    x:10,
                    y:10,
                    x2:10,
                    y2:10,
            },
            series: [
                    {
                        name:'质量问题',
                        type:'pie',
                        radius : [30, 60],
                        center : ['40%', '50%'],
                        roseType : 'area',
                        data:[
                            {value:10, name:'混泥土工程'},
                            {value:5, name:'钢筋工程'},
                            {value:15, name:'地基与基础'},
                            {value:25, name:'模板工程'},
                        ]
                    }
            ]
        },
        chart_pie3:{
            tooltip: {},
            legend: {},
            grid:{
                    x:10,
                    y:10,
                    x2:10,
                    y2:10,
            },
            series: [
                    {
                        name:'安全问题',
                        type:'pie',
                        radius : [30, 60],
                        center : ['40%', '50%'],
                        roseType : 'area',
                        data:[
                            {value:10, name:'模板作业'},
                            {value:5, name:'高处就业'},
                            {value:15, name:'脚手架'},
                        ]
                    }
            ]
        },
        setout:null
      }
    },
    created () {

    },
    computed:{
      ble_(){
          return this.$store.state.common.sidebarFold
      },
    },
    mounted () {
      //改变颜色
      let Document = document.getElementsByClassName("model-small")[0];
      Document.parentElement.parentElement.style.boxShadow = "none";
    //   document.getElementById('pane-EngineeringDynamic-model-small')
    //   .children[0].children[0].style.padding = '0px';

      //图标1
        this.setOption();
    },
    methods: {
      swiperOption1:function(){
          let NewObject = JSON.parse(JSON.stringify(this.swiperOption));
          for(let i in NewObject)
          {
              if(i == 'slidesPerView')
              NewObject[i] = 1;
          }
          return NewObject;
      },
      setOption:function(){
        let chart = echarts.init(this.$refs['Statistical']);
        chart.setOption(this.chart_pie,true);

        let chart1 = echarts.init(this.$refs['line_echar']);
        chart1.setOption(this.chart_line,true);

        let chart2 = echarts.init(this.$refs['issueEchar']);
        chart2.setOption(this.chart_pie2,true);

        let chart3 = echarts.init(this.$refs['issueEchar1']);
        chart3.setOption(this.chart_pie3,true);



        // let chart = this.$echarts.init(this.$refs['Statistical']);
        // chart.setOption(this.chart_pie,true);

        // let chart1 = this.$echarts.init(this.$refs['line_echar']);
        // chart1.setOption(this.chart_line,true);

        // let chart2 = this.$echarts.init(this.$refs['issueEchar']);
        // chart2.setOption(this.chart_pie2,true);

        // let chart3 = this.$echarts.init(this.$refs['issueEchar1']);
        // chart3.setOption(this.chart_pie3,true);

        window.onresize = function(){
            chart.resize();
            chart1.resize();
            chart2.resize();
            chart3.resize();
        }
      },
    },
    watch:{
        ble_(val){
            this.setOption;
            this.setout = setTimeout(()=>{
                //js调用window.onresize事件
                var myEvent = new Event('resize');
                window.dispatchEvent(myEvent);
            },300);
        },
    },
  }
</script>

<style lang="scss" scoped>
.model-small{
  background: #F1F4F5;
  padding: 0;
  overflow: hidden;
  border-radius: 0px;
  .nav-header-top{
    width: 100%;
  }
}
// header
.nav-header{
    height: 2rem;
    width: 100%;
    position: absolute;
    top: 0;
    background: #008CD6;
    left: 0px;
}
.nav-header-top .right{
    width: 90px;
    height: 100%;
    float: right;
    line-height: 2rem;
    color: #ffffff;
    font-size: 10px;
    position: relative;
    cursor: pointer;
}
.nav-header-top .right::before{
    content: "";
    position: absolute;
    top: 8px;
    left: -21px;
    width: 16px;
    height: 16px;
    background: url(~@/assets/img/magnify.png) no-repeat;
    background-size: 100%;
}
.centent{
  padding: .2rem;
  background: transparent;
  .row_F{
      width: 100%;
      padding: 0;
      margin: 0;
    .cg{
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;      
    }
    .cg-6{
        margin-top: -2px;  
    }
    .cg-12{
        margin-top: -2px;  
    }
    .cg-18{
        margin-top: 2px;
    }
    .cg-6-5{
        margin-top: 2px;
    }
  }
  .cord-1{
      width: 100%;
      min-height: 9rem;
      margin-top: 1rem;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: space-between;
      .rd-1{
        width: 49%;
      }
      .rd-2{
        width: 24%;
        background: transparent;
        border-radius: .3rem;
        height: 16.6rem;
      }
  }
}


.el-carousel__item h3 {
color: #475669;
font-size: 18px;
opacity: 0.75;
line-height: 300px;
margin: 0;
}

.el-carousel__item:nth-child(2n) {
background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
background-color: #d3dce6;
}
.margin-top{
    margin-top:1rem; 
}
// header
.nav-header{
    height: 2rem;
    width: 100%;
    position: absolute;
    top: 0;
    background: #008CD6;
    left: 0px;
}
.nav-header-top .right{
    width: 90px;
    height: 100%;
    float: right;
    line-height: 2rem;
    color: #ffffff;
    font-size: 10px;
    position: relative;
}
.nav-header-top .right::before{
    content: "";
    position: absolute;
    top: 8px;
    left: -21px;
    width: 16px;
    height: 16px;
    background: url(~@/assets/img/magnify.png) no-repeat;
    background-size: 100%;
}

.three{
    position: relative;
    padding: 0 10px;
    background: #fff;
    border-radius: .3rem;
    height: 16.6rem;
    width: 100%;
    color: #666;
    h2{
        font-size: 1rem;
        line-height: .8rem;
    }
    .wire{
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background: #eee;
    }
    .table_div{
      width: 100%;
      height: 2.5rem;
      line-height: 2.5rem;
      table{
        width: 100%;
        text-align: left;
        th{
        font-size: .9rem;
        text-align: center;
        font-weight: bold;
        }
      }
    }
    .table_div1{
      width: 100%;
      height: 11rem;
      overflow-y: scroll;
      table{
        width: 100%;
        text-align: left;
        td{
        font-size: .9rem;
        padding-left: 10px;
        overflow: hidden;
        text-align: center;
        line-height: 22px;
        }
      }
    }
    .table_div1::-webkit-scrollbar{
        width: 2px !important;
    }
}
.schedule{

  .left{
    width: 100%;
    height: 19.5rem;
    background: #fff;
    padding: 10px;
    border-radius: .3rem;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    .schedule_child{
      width: 70%;
      height: 100%;
        .project_flex{
            height: 50%;
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: space-between;
        }
      .project_m{
        width: 32%;
        float: left;
        height: 91%;
        margin: 6px;
        border: 1px solid #EEEEEE;
        border-radius: .5rem;
        p{
            padding: 0 10px;
        }
        div{
                     padding: 0 10px;   
        }
        .top_p{
        display: block;
        width: 100%;
        height: 3rem;
        margin: 0;
        line-height: 2rem;
        padding: 10px;
        background: #F2F3F3;
        }
        .font_H{
        font-size: .8rem;
        padding: 0 2px;
        color: #666666;
        }
        i{
        font-size: 1.2rem;
        color:#0C92D8;
        }
        .font_p{
        line-height: 3rem;
        }
        .time{
        display: block;
        float: right;
        color: #008CD6;
        line-height: 2rem;
        }
      }
    }
    .schedule_child1{
      width: 26%;
      height: 100%;
      #echars-pre{
        width: 100%;
        height: 82%; 
      }
      h3{
        line-height: 0px;
      }
      .bottom{
        width: 100%;
        height: 4%;
        font-size: 14px;
        text-align: center;
        color: #808080;
      }
    }
  }
  .right{
    width: 100%;
    height: 19.5rem;
    background: #fff;
    padding: 10px;
    border-radius: .3rem;
    position: relative;
    h2{
        font-size: 1rem;
        line-height: .8rem;
        color: #666;
    }
    .wire{
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background: #eee;
    }
    .swiper_div{
        width: 97%;
        margin: 0 auto;
        height: 81%;
        margin-top: 1.3rem;
    }
    .bar_div{
        width: 100%;
        height: 90%;
        img{
            width: 100%;
            height: 100%;
        }
        .img_font{
            position: absolute;
            line-height: 2.3rem;
            width: 100%;
            background: rgba(0, 0, 0, 0.2);
            bottom: 26px;
            padding: 0 10px;
            color: #fff;
        }
        .time{
        float: right;
            color: #fff;
        }
    }
  }
}

.statistics{
    width: 100%;
    .h2_top{
        height: 100%;
        .centent_top{
            width: 100%;
            height: 24rem;
            position: relative;
            background: #fff;
            padding-top: .5rem;
            border-radius: .5rem;
            margin-bottom: 1rem;
            h2{
                font-size: 1rem;
                line-height: 1rem;
                color: #666;
                padding: 0 10px;
            }
            .wire{
            position: absolute;
            left: 0;
            width: 100%;
            height: 1px;
            background: #eee;
            }
            .echar{
                width: 100%;
                height: 21rem;
            }
        }
        .centent_bottom{
            height: 14rem;
            .number{
            height: 12rem;
            position: relative;
            background: #fff;
            border-radius: .5rem;
            margin-right: 1rem;
                .people{
                    text-align: center;
                    padding-left: 4rem;
                    height: 8rem;
                    padding-top: .2rem;
                    margin-top: 1.5rem;
                    position: relative;

                    h3{
                        font-size: 1.6rem;
                        line-height: 1rem;
                    }
                    .color{
                        font-size: 1.8rem;
                        font-weight: 400;
                    }
                
                }
                .people::before{
                    content: "1";
                    position: absolute;
                    top: 22%;
                    left: 22%;
                    font-size: 1.8rem;
                    color: #fff;
                    width: 4rem;
                    height: 3.6rem;
                    background: url(~@/assets/img/date.png) no-repeat;
                    background-size: 100% 100%;
                    font-weight: bolder;
                    text-align: center;
                    line-height: 4.6rem;
                }
            }
            .month{
                margin: 0;
                .people::before{
                    content: "30";
                }
            }
            h2{
                font-size: 1rem;
                line-height: 1rem;
                color: #666;
                padding: 0 10px;
            }
            .wire{
            position: absolute;
            left: 0;
            width: 100%;
            height: 1px;
            background: #eee;
            }
        }
    }
}


.equipment_materials{
    position: relative;
    padding: 0 10px;
    color: #666;
    background: #fff;
    border-radius: .3rem;
    padding-top: 12px;
    height: 37rem;
    margin-top: 7px;
    h2{
        font-size: 1rem;
        line-height: .8rem;
    }
    .wire{
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background: #eee;
    }
    .table_div{
      width: 100%;
      height: 2.5rem;
      line-height: 2.5rem;
      table{
        width: 100%;
        th{
        font-size: .9rem;
        font-weight: bold;
        text-align: center;
        }
      }
    }
    .table_div1{
      width: 100%;
      height: 30rem;
      overflow-y: scroll;
      table{
        width: 100%;
        text-align: left;
        td{
        font-size: .9rem;
        padding-left: 0px;
        line-height: 22px;
        text-align: center;
        overflow: hidden;
        }
      }
    }
    .table_div1::-webkit-scrollbar{
        width: 2px !important;
    }
}


.centent .issueModel{
    height: 15rem;
    margin: 0;
    .issue{
        width: 48%;
        position: relative;
        background: #fff;
        padding: 10px;
        border-radius: .5rem;
        h2{
            font-size: 1rem;
            line-height: .8rem;
        }
        .wire{
        position: absolute;
        left: 0;
        width: 100%;
        height: 1px;
        background: #eee;
        }
        .echar{
            width: 50%;
            height: 83%;
            float: left;
        }
        .ionc{
            width: 50%;
            height: 83%;
            float: right;
            position: relative;
            .img_div{
                width: 40%;
                height: 5rem;
                position: relative;
                margin-top: 1.5rem;
                p{
                    font-size: 1rem;
                    line-height: .9rem;
                }
                .h1{
                    font-size: 1.2rem;
                    color: #FF880B;
                }
            }
            .img_div::before{
                content: "";
                width: 4rem;
                height: 4rem;
                position: absolute;
                top: -6px;
                background: url(~@/assets/img/alert.png) no-repeat;
                background-size: 100% 100%;
                left: -5rem;
                line-height: 2rem;
            }
            .two{
                height: 3rem;
            }
            .two{
                .h1{
                  color: #2192EB;
                }
            }
            .two::before{
                background: url(~@/assets/img/not-close.png) no-repeat;
                background-size: 100% 100%;
            }
            .three{
                position: absolute;
                right: 0;
                top: -.5rem;
                p{
                line-height: .8rem;
                }
            }
            .three::before{
                top: 12px;
                background: url(~@/assets/img/overtime.png) no-repeat;
                background-size: 100% 100%;
            }
            .three{
                .h1{
                  color: #F4496A;
                }
            }
        }
    }
}

.statistics .h2_top .centent_top{
    margin-top: 8px;
}

.statistics .h2_top .centent_bottom {
    height: 12.5rem;
}
.centent .issueModel .issue {
    width: 100%;
    height: 15rem;
}
.statistics .h2_top .centent_top {
    margin-bottom: 10px;
}
.model-small .el-project{
    display: block;
    width: 1rem;
    height: 1rem;
    float: left;
    margin-top: 8px;
    background: url(~@/assets/img/project.png) no-repeat;
}
.equipment_materials{
    height: 36.7rem;
}
.statistics .h2_top .centent_bottom .number{
    margin-right: 0px;
    margin-left: 5px;
}
.statistics .h2_top {
    width: 100%;
    height: 100%;
}
.centent_right{
    width: 100%;
}
.swiper_display{
    display: block;
}
.swiper_display1{
    display: none;
}
.swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -2px;
}
.three h2{
    font-size: 1rem;
    padding: 10px 0;
    line-height: inherit;
    margin: 0;
}
.statistics .h2_top .centent_top{
    padding-top: 0;
}
.statistics .h2_top .centent_top h2{
    line-height: 44px;
}
.schedule .left .schedule_child1 h3{
    line-height: 22px;
}
.schedule .right h2{    
    padding: 6px 0px 18px;;
}
.equipment_materials h2 {
    padding: 5px 0px 16px;
}
.statistics .h2_top .centent_bottom h2{
    padding: 12px 0px 14px;
}
.centent .issueModel .issue h2{
    padding: 6px 0px 17px;
}
.statistics .h2_top .centent_bottom .number .people h3{
    font-size: 1.6rem;
    line-height: 2.5rem;
}
@media (max-width: 1850px) and (min-width: 1601px) {
    .model-amplification .fixedS{
        width: 87.5%;
    }
    .model-small .cord-1 .Me_weather_w{
        width: 50%;
    }
    .rd-1 .bottom .list .list_p{
        font-size: .4rem;
    }
    .model-small .issueModel .issue .centent .ionc_div{
        width: 83%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
    }
    .model-small .issueModel .issue .centent .ionc_div .img_div::before {
        width: 3.6rem;
        height: 3.6rem;
        left: -3.8rem;
    }
    .model-small .issueModel .issue .centent .ionc_div .img_div{
        width: 16%;
        margin-left: 3.5rem;
    }
    .model-small .issueModel .issue .centent .ionc_div .img_div p{
        text-overflow: clip;
        white-space: nowrap;
    }
}

@media (max-width: 1600px) and (min-width: 1500px) {
    .model-amplification .fixedS{
        width: 86.5%;
    }
    .centent .issueModel .issue .ionc {
        width: 45%;
    }
    .model-small .cord-1 .Me_weather_w{
        width: 50%;
    }
    .rd-1 .bottom .list .list_p{
        font-size: .4rem;
    }
    .model-small .issueModel .issue .centent .ionc_div{
        width: 83%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
    }
    .model-small .issueModel .issue .centent .ionc_div .img_div::before {
        width: 3.6rem;
        height: 3.6rem;
        left: -3.8rem;
    }
    .model-small .issueModel .issue .centent .ionc_div .img_div{
        width: 16%;
        margin-left: 3.5rem;
    }
    .model-small .issueModel .issue .centent .ionc_div .img_div p{
        text-overflow: clip;
        white-space: nowrap;
    }
}
@media (max-width: 1501px) and (min-width: 1300px) {
    .model-amplification .fixedS{
        width: 84.4%;
    }
    .model-small .cord-1 .Me_weather_w{
        width: 50%;
    }
    .rd-1 .bottom .list .list_p{
        font-size: .4rem;
    }
    .model-small .issueModel .issue .centent .ionc_div{
        width: 94%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
    }
    .model-small .issueModel .issue .centent .ionc_div .img_div::before {
        width: 3.3rem;
        height: 3.3rem;
        left: -3.8rem;
    }
    .model-small .issueModel .issue .centent .ionc_div .img_div{
        width: 20%;
        margin-left: 3.5rem;
    }
    .model-small .issueModel .issue .centent .ionc_div .img_div p{
        text-overflow: clip;
        white-space: nowrap;
    }
}

@media (max-width: 1300px) and  (min-width: 1000px) {
    .model-amplification .fixedS{
        width: 82.5%;
    }
    .model-small .cord-1 .Me_weather_w{
        width: 50%;
    }
    .rd-1 .bottom .list .list_p{
        font-size: .4rem;
    }
    .model-small .issueModel .issue .centent .ionc_div{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
    }
    .model-small .issueModel .issue .centent .ionc_div .img_div::before {
        width: 3.3rem;
        height: 3.3rem;
        left: -3.8rem;
    }
    .model-small .issueModel .issue .centent .ionc_div .img_div{
        width: 18%;
        margin-left: 3.5rem;
    }
    .model-small .issueModel .issue .centent .ionc_div .img_div p{
        text-overflow: clip;
        white-space: nowrap;
    }
}
@media (max-width: 1920px) and  (min-width: 1650px) {
    .centent .row_F .cg-12{
        width:50.7%;
    }
    .centent .row_F .cg-6{
        width:24.6%;
    }
    .centent .row_F .cg-6-5{
        width:24.8%;
    }
    .centent .row_F .cg-18{
        width:75.2%;
    }
}
@media (max-width: 1650px) and  (min-width: 1px) {
    .swiper_display{
        display: none;
    }
    .swiper_display1{
        display: block;
    }
    .el-col-push-1 {
        left: 7.16667%;
    }
    .statistics .h2_top .centent_bottom .number {
        margin-right: 10px;
        margin-left: 4px;
        width: 49.3% !important;
    }
    .statistics .h2_top .centent_bottom  .month{
        margin: 0;
        width: 49% !important;
        left: 1px !important;
    }
    .equipment_materials {
        position: relative;
        padding: 0 10px;
        color: #666;
        background: #fff;
        border-radius: .3rem;
        padding-top: 12px;
        height: 37rem;
    }
    .centent .issueModel .issue {
        margin-top: 10px;
    }
    .centent .issueModel {
        height: 32rem;
    }
    .centent .row_F .cg-18{
        margin-top: 8px;
    }
    .centent .row_F .cg-6-5 {
        margin-top: 8px;
    }
    .equipment_materials{
        margin-top: 2px;
    }
    .cg-24{
        width: 100% !important;
    }
    .statistics .h2_top{
        width: 100%;
    }
    .cg-12-12{
        width: 50% !important;
    }
    .centent_right{
        width: 100%;
    }
    .centent .row_F .cg-12 {
        margin-top: -2px;
        margin-bottom: 5px;
    }
}
</style>
