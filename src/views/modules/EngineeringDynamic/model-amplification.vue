<template>
<div class="model-amplification" v-if="amplificationBle">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="site-navbar__brand-lg" href="javascript:;"><img src="~@/assets/img/logo.png" width="150px"></a>
        <a class="site-navbar__brand-mini" href="javascript:;"><img src="~@/assets/img/smllogo.png" width="50px"></a>
      </h1>
    </div>
    <div class="nav-header-top fixedS">
      <div class="nav-header">
        <div class="right"><a href="javascript:;" @click="exit">退出看板</a></div>
      </div>
    </div>
    <div class="centent content1">
      <div class="cord-1">
        <div class="rd-1 Me_weather_w">
          <!--  -->
          <rd-weather></rd-weather>
        </div>
        <div class="rd-2 three">
            <h2>BIM 模型</h2>
            <div class="wire"></div>
            <div class="img">
                <img style="width:100%;height:100%" src="~@/assets/img/bim-model.png" alt="模型">
            </div>
        </div>
        <div class="rd-2 three">
            <h2>安全质量问题最少榜</h2>
            <div class="wire"></div>
            <div class="list">
                <ul>
                    <li>项目罗员工水泥工</li>
                    <li>项目罗员工水泥工</li>
                    <li>项目罗员工水泥工</li>
                </ul>
            </div>
        </div>
      </div>
      
      <!--  -->

      <div class="cord-1 schedule">
        <div class="right">
            <h2>本周统计任务</h2>
            <div class="wire"></div>
            <div id="echars-pre" ref="Statistical"></div>
            <div class="bottom">任务完成率：86.37%</div>
        </div>
        <div class="left">
        <!-- swiper -->
            <h2>形象进度照片</h2>
            <div class="wire"></div>
            <div class="swiper_div">
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
      </div>

      <div class="cord-1 progressModel">
          <div class="centent">
              <div class="flex">
                <div class="project_m" v-for="(items,index) in project_model" :key="index" v-if="index>0&&index<6">
                  <p class="top_p"><i class="el-project"></i><span class="font_H">{{items.name}}</span><span class="time" :style="`color:${items.color}`">{{items.status}}</span></p>
                  <p style="line-height: 0.5rem;padding-bottom: 4px;">{{items.info}}</p>
                  <p class="font_H" style="line-height: 0;padding: 0 10px;">{{items.time}}</p>
                  <el-progress :percentage="items.d"></el-progress>
                </div>
              </div>
              <div class="flex">
                <div class="project_m" v-for="(items,index) in project_model" :key="index" v-if="index>5&&index<11">
                  <p class="top_p"><i class="el-project"></i><span class="font_H">{{items.name}}</span><span class="time" :style="`color:${items.color}`">{{items.status}}</span></p>
                  <p style="line-height: 0.5rem;padding-bottom: 4px;">{{items.info}}</p>
                  <p class="font_H" style="line-height: 0;padding: 0 10px;">{{items.time}}</p>
                  <el-progress :percentage="items.d"></el-progress>
                </div>
              </div>
          </div>
      </div>

      <div class="cord-1 issueModel">
          <div class="issue">
            <h2>质量问题</h2>
            <div class="wire"></div>
            <div class="centent">
                <div class="echar_div">
                    <div ref="issueEchart"></div>
                </div>
                <div class="ionc_div">
                    <div class="img_div">
                        <p>重大隐患</p>
                        <p class="h1">0</p>
                    </div>
                    <div class="img_div two">
                        <p>累计未关闭</p>
                        <p class="h1">50</p>
                    </div>
                    <div class="img_div three">
                        <p>超期未关闭</p>
                        <p class="h1">23</p>
                    </div>
                </div>
                <div class="issueFont">
                    <p>问题主要多发区域</p>
                    <ul class="ul1">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                    <ul class="ul2">
                        <li>A区车辆闸道 5次</li>
                        <li>堆料区 10次</li>
                        <li>C区大门 15次</li>
                    </ul>
                </div>
            </div>
          </div>
          <div class="issue">
            <h2>安全问题</h2>
            <div class="wire"></div>
            <div class="centent">
                <div class="echar_div">
                    <div ref="issueEchart1"></div>
                </div>
                <div class="ionc_div">
                    <div class="img_div">
                        <p>重大隐患</p>
                        <p class="h1">0</p>
                    </div>
                    <div class="img_div two">
                        <p>累计未关闭</p>
                        <p class="h1">50</p>
                    </div>
                    <div class="img_div three">
                        <p>超期未关闭</p>
                        <p class="h1">23</p>
                    </div>
                </div>
                <div class="issueFont">
                    <p>问题主要多发区域</p>
                    <ul class="ul1">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                    <ul class="ul2">
                        <li>A区车辆闸道 5次</li>
                        <li>堆料区 10次</li>
                        <li>C区大门 15次</li>
                    </ul>
                </div>
            </div>
          </div>
          <div class="Ranking">
              <div class="model" style="margin-bottom:8px;">
                <h2>分包质量排行</h2>
                <div class="wire"></div>
                <div class="list">
                    <ul>
                        <li>项目罗员工水泥工</li>
                        <li>项目罗员工水泥工</li>
                        <li>项目罗员工水泥工</li>
                    </ul>
                </div>
              </div>
              <div class="model">
                <h2>分包质量排行</h2>
                <div class="wire"></div>
                <div class="list">
                    <ul>
                        <li>项目罗员工水泥工</li>
                        <li>项目罗员工水泥工</li>
                        <li>项目罗员工水泥工</li>
                    </ul>
                </div>
              </div>
          </div>
      </div>
      <!--  -->
      <div class="cord-1 margin-top statistics">
          <div class="h2_top">
                <div class="centent_top">
                    <h2>总体劳动力</h2>
                    <div class="wire"></div>
                    <div class="echar" ref="line_echar">
                        
                    </div>
                </div>
                <div class="centent_bottom">
                        <div class="cord-1 ">
                            <div class="number">
                                <div class="grid-content bg-purple-dark">
                                    <h2>当天人数</h2>
                                    <div class="wire"></div>
                                    <div class="people">
                                        <h3>人数</h3>
                                        <h3 class="color"> <span style="color:#008CD6;font-weight: 600;">139</span>人</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="number month">
                                <div class="grid-content bg-purple-dark">
                                    <h2>当月人数</h2>
                                    <div class="wire"></div>
                                    <div class="people">
                                        <h3>人数</h3>
                                        <h3 class="color"> <span style="color:#008CD6;font-weight: 600;">246</span>人</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
          </div>
          <div class="equipment_materials">
            <div class="grid-content bg-purple-dark">
                <h2>材料统计</h2>
                <div class="wire"></div>
                <div class="table_div">
                    <table>
                    <tr><th style="width:18%">序号</th><th style="width:48%">材料名称</th><th style="width:20%">工程量</th><th style="width:10%">单位</th></tr>
                    </table>
                </div>
                <div class="table_div1">
                    <table>
                    <tr v-for="(items,index) in Material" :key="index"><td style="width:18%">{{items.id}}</td><td style="width:48%">{{items.name}}</td><td style="width:20%">{{items.evevt}}</td><td style="width:10%">{{items.time}}</td></tr>
                    </table>
                </div>
            </div>
           </div>
          <div class="equipment_materials">
            <div class="grid-content bg-purple-dark">
                <h2>设备统计</h2>
                <div class="wire"></div>
                <div class="table_div">
                    <table>
                    <tr><th style="width:18%">序号</th><th>设备类型</th><th style="width:30%">数量（台）</th></tr>
                    </table>
                </div>
                <div class="table_div1">
                    <table>
                        <tr v-for="(items,index) in deviceStatistics" :key="index"><td style="width:18%">{{items.id}}</td><td style="width:60%">{{items.evevt}}</td><td style="width:30%">{{items.time}}</td></tr>
                    </table>
                </div>
            </div>
          </div>
      </div>
        <!--  -->
    </div>
</div>

</template>
<script>
  import { getUUID } from '@/utils'
import RdWeather from './rd-weather'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    components: {
      RdWeather,
      swiper,
      swiperSlide
    },
    data () {
      return {
        deviceStatistics: [
          {id: 1, evevt: '塔吊', time: '2'},
          {id: 2, evevt: '施工电梯', time: '4'},
          {id: 3, evevt: '门禁闸机', time: '5'},
          {id: 4, evevt: '监控摄像头球机', time: '10'},
          {id: 5, evevt: '监控摄像头枪机', time: '10'},
          {id: 6, evevt: '环境检测仪', time: '2'},
          {id: 7, evevt: '地磅', time: '3'},
          {id: 8, evevt: '车辆砸到', time: '3'},
          {id: 9, evevt: '门禁', time: '3'},
          {id: 10, evevt: '塔吊', time: '2'},
          {id: 11, evevt: '施工电梯', time: '4'},
          {id: 12, evevt: '门禁闸机', time: '5'},
          {id: 13, evevt: '监控摄像头球机', time: '10'},
          {id: 14, evevt: '监控摄像头枪机', time: '10'},
          {id: 15, evevt: '环境检测仪', time: '2'},
          {id: 16, evevt: '地磅', time: '3'},
          {id: 17, evevt: '车辆砸到', time: '3'},
          {id: 18, evevt: '门禁', time: '3'}
        ],
        Material: [
          {id: 1, name: '沙子', evevt: '20', time: '吨'},
          {id: 2, name: '混泥土', evevt: '50', time: '台'},
          {id: 3, name: '2#钢筋', evevt: '2000', time: '个'},
          {id: 4, name: '5#钢筋', evevt: '3000', time: '个'},
          {id: 5, name: '5#空心砖', evevt: '10000', time: '个'},
          {id: 6, name: '磨具板', evevt: '6000', time: '块'},
          {id: 7, name: '普通钢筋', evevt: '10000', time: '个'},
          {id: 8, name: '冷轧带肋钢筋', evevt: '500', time: '捆'},
          {id: 9, name: '冷轧扭钢筋', evevt: '1000', time: '捆'},
          {id: 10, name: '沙子', evevt: '20', time: '吨'},
          {id: 11, name: '混泥土', evevt: '50', time: '台'},
          {id: 12, name: '2#钢筋', evevt: '2000', time: '个'},
          {id: 13, name: '5#钢筋', evevt: '3000', time: '个'},
          {id: 14, name: '5#空心砖', evevt: '10000', time: '个'},
          {id: 15, name: '磨具板', evevt: '6000', time: '块'},
          {id: 16, name: '普通钢筋', evevt: '10000', time: '个'},
          {id: 17, name: '冷轧带肋钢筋', evevt: '500', time: '捆'},
          {id: 18, name: '冷轧扭钢筋', evevt: '1000', time: '捆'},
          {id: 19, name: '土壤类别 三类土', evevt: '1488', time: 'm²'},
          {id: 20, name: '土壤类别 三类土', evevt: '1488', time: 'm²'}
        ],
        project_model: [
            {name: '工程名001', status: '正常', color: '#0C92D8', info: '土建-第二层-阶段-模板支设', time: '06-04  06:42', d: 10},
            {name: '工程名001', status: '延迟', color: 'red', info: '土建-第二层-阶段-模板支设', time: '06-04  06:42', d: 40},
            {name: '工程名001', status: '延迟', color: 'red', info: '土建-第二层-阶段-模板支设', time: '06-04  06:42', d: 58},
            {name: '工程名001', status: '正常', color: '#0C92D8', info: '土建-第二层-阶段-模板支设', time: '06-04  06:42', d: 100},
            {name: '工程名001', status: '正常', color: '#0C92D8', info: '土建-第二层-阶段-模板支设', time: '06-04  06:42', d: 70},
            {name: '工程名001', status: '延迟', color: 'red', info: '土建-第二层-阶段-模板支设', time: '06-04  06:42', d: 65},
            {name: '工程名001', status: '正常', color: '#0C92D8', info: '土建-第二层-阶段-模板支设', time: '06-04  06:42', d: 45},
            {name: '工程名001', status: '延迟', color: 'red', info: '土建-第二层-阶段-模板支设', time: '06-04  06:42', d: 65},
            {name: '工程名001', status: '正常', color: '#0C92D8', info: '土建-第二层-阶段-模板支设', time: '06-04  06:42', d: 33},
            {name: '工程名001', status: '延迟', color: 'red', info: '土建-第二层-阶段-模板支设', time: '06-04  06:42', d: 72},
            {name: '工程名001', status: '正常', color: '#0C92D8', info: '土建-第二层-阶段-模板支设', time: '06-04  06:42', d: 98},
            {name: '工程名001', status: '延迟', color: 'red', info: '土建-第二层-阶段-模板支设', time: '06-04  06:42', d: 68}
        ],
        // http://f.hiphotos.baidu.com/image/pic/item/8d5494eef01f3a29f863534d9725bc315d607c8e.jpg
        imgList: [
            {src: require('@/assets/img/bar_1.png'), info: '配套用房', time: '2019-06-04'},
            {src: require('@/assets/img/bar_2.png'), info: '配套用房', time: '2019-06-04'},
            {src: require('@/assets/img/bar_3.png'), info: '配套用房', time: '2019-06-04'},
            {src: require('@/assets/img/bar_4.png'), info: '配套用房', time: '2019-06-04'},
            {src: require('@/assets/img/bar_5.png'), info: '配套用房', time: '2019-06-04'},
            {src: require('@/assets/img/bar_1.png'), info: '配套用房', time: '2019-06-04'},
            {src: require('@/assets/img/bar_2.png'), info: '配套用房', time: '2019-06-04'},
            {src: require('@/assets/img/bar_3.png'), info: '配套用房', time: '2019-06-04'},
            {src: require('@/assets/img/bar_4.png'), info: '配套用房', time: '2019-06-04'},
            {src: require('@/assets/img/bar_5.png'), info: '配套用房', time: '2019-06-04'}
        ],
        amplificationBle: true,
        // swiper 配置参数
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
        chart_pie: {
          tooltip: {},
          legend: {},
          grid: {
            left: '10%'
          },
          series: [
            {
              name: '本周统计任务',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: [
                        {value: 335, name: '延迟开始'},
                        {value: 310, name: '未开始'},
                        {value: 234, name: '正常完成'},
                        {value: 135, name: ' 延迟完成'}
              ]
            }
          ]
        },
        chart_line: {
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
            }
          }]
        },
        chart_pieS: {
          tooltip: {},
          legend: {},
          grid: {
            x: 10,
            y: 10,
            x2: 10,
            y2: 10
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: [20, 80],
              center: ['50%', '50%'],
              roseType: 'area',
              data: []
            }
          ]
        }
      }
    },
    created () {

    },
    computed: {

    },
    mounted () {
      // 改变颜色
      // 图标1
      this.setOption()
  },
    methods: {
      setOption: function (){
        // let chart = this.$echarts.init(this.$refs['Statistical'])
        // chart.setOption(this.chart_pie, true)

        // let chart1 = this.$echarts.init(this.$refs['line_echar'])
        // chart1.setOption(this.chart_line, true)
        let chart = echarts.init(this.$refs['Statistical'])
        chart.setOption(this.chart_pie, true)

        let chart1 = echarts.init(this.$refs['line_echar'])
        chart1.setOption(this.chart_line, true)

        let chart2 = echarts.init(this.$refs['issueEchart']), obj = JSON.parse(JSON.stringify(this.chart_pieS))
        // let chart2 = this.$echarts.init(this.$refs['issueEchart']), obj = JSON.parse(JSON.stringify(this.chart_pieS))
        obj.series[0].name = '质量问题'
        obj.series[0].data.push(
                {value: 10, name: '混泥土工程'},
                {value: 5, name: '钢筋工程'},
                {value: 15, name: '地基与基础'},
                {value: 25, name: '模板工程'}
            )
        chart2.setOption(obj, true)

        // let chart3 = this.$echarts.init(this.$refs['issueEchart1']), obj1 = JSON.parse(JSON.stringify(this.chart_pieS))
        let chart3 = echarts.init(this.$refs['issueEchart1']), obj1 = JSON.parse(JSON.stringify(this.chart_pieS))
        obj1.series[0].name = '安全问题'
        obj1.series[0].data.push(
                {value: 20, name: '模板作业'},
                {value: 10, name: '高处就业'},
                {value: 13, name: '脚手架'}
            )
        chart3.setOption(obj1, true)

        window.onresize = function (){
          chart.resize()
          chart1.resize()
          chart2.resize()
          chart3.resize()
        }
      },
      exit (){
        this.amplificationBle = false
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
.model-amplification{
  background: #F1F4F5;
  border-radius: .3rem;
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
}
.cnetent{
  padding: 10px;
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
        background: #fff;
        border-radius: .3rem;
        height: 16.6rem;
      }
  }
}


.model-amplification .fixedS{
  width: 88%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 11111;
  .nav-header{
      height: 40px;
  }
  .right{
      line-height: 40px;
      font-size: 14px;
      a{
          color: #fff;
      }
  }
  .right::before{
      top: 12px;
        background: url(~@/assets/img/magnify2.png) no-repeat;
        background-size: 100%;
  }
}

.content1{
    padding: 10px;
    height: 100%;
    position: fixed;
    left: 0;
    z-index: 1111;
    background: #F2F2F2;
    top: 42px;
    width: 100%;
    overflow: scroll;
}
.content1::-webkit-scrollbar{
    width: 2px !important;
}

.ionc{
    position: fixed;
    top: 4rem;
    height: 2rem;
    width: 2rem;
    right: .5rem;
    // background:url(../images/bg02.png) rgba(0, 0, 0, 0.51)  left top no-repeat; 
    background: url(~@/assets/img/small.png) no-repeat;
    z-index: 1111;
    background-position: center;
    border-radius: .5rem;
}
.ionc_top{
  top: 1rem;
}
.top{
  top: 0px;
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
.centent{
  padding: 10px;
  .cord-1{
      width: 100%;
      min-height: 9rem;
      margin-top: 8px;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: space-between;
      .rd-1{
        width: 49%;
      }
      .rd-2{
        width: 24.5%;
        background: #fff;
        border-radius: .3rem;
        height: 16.6rem;
      }
  }
}


.three{
    position: relative;
    padding: 0 10px;
    width: 25% !important;
    color: #666;
    h2{
        font-size: 1rem;
        line-height: .8rem;
    }
    .wire{
      position: absolute;
      top: 42px;
      left: 0;
      width: 100%;
      height: 1px;
      background: #eee;
    }
    .img{
        width: 70%;
        margin: 0 auto;
        height: 12rem;
        margin-top: 2rem;
    }
    .list{
        width: 79%;
        margin: 0 auto;
        margin-top: 2rem;
        ul{
            padding: 0;
        }
        li{
            text-align: center;
            list-style: none;
            line-height: 3rem;
            background: #eee;
            border-radius: 1rem;
            margin-bottom: .5rem;
            padding: 0 10px;
            font-size: 1rem;
            padding-top: .5rem;
            color: #f2f2f2;
        }
        li:first-child{
            background: url(~@/assets/img/P-one.png) no-repeat;
            background-position: center center;
            background-position-x: 0px;
        }
        li:nth-child(2){
            background: url(~@/assets/img/P-two.png) no-repeat;
            background-position: center center;
            background-position-x: 0px;
        }
        li:last-child{
            background: url(~@/assets/img/P-three.png) no-repeat;
            background-position: center center;
            background-position-x: 0px;
        }
    }
}


.schedule{

  .left{
    width: 75.4%;
    height: 22rem;
    background: #fff;
    border-radius: .3rem;
    position: relative;
    h2{
        font-size: 1rem;
        line-height: 1rem;
        color: #666;
        padding: 0 10px;
    }
    .wire{
        position: absolute;
        top: 42px;
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
            bottom: 28px;
            padding: 0 10px;
            color: #fff;
        }
        .time{
        float: right;
            color: #fff;
        }
    }
  }
    .right{
        width: 24.2%;
        height: 22rem;
        background: #fff;
        border-radius: .5rem;
        position: relative;
        #echars-pre{
            width: 100%;
            height: 76%;
        }
        h2{
        line-height: 0px;
        }
        .bottom{
        width: 100%;
        height: 4%;
        font-size: 14px;
        text-align: center;
        color: #808080;
        }
        h2{
            font-size: 1rem;
            line-height: 1rem;
            color: #666;
            padding: 0 10px;
        }
        .wire{
        position: absolute;
        top: 42px;
        left: 0;
        width: 100%;
        height: 1px;
        background: #eee;
        }
    }
}

.progressModel{
    width: 100%;
    .centent{
        width: 100%;
        height: 18.7rem;
        background: #fff;
        border-radius: .5rem;
        position: relative;
        .flex{
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: space-between;
        }
        h2{
            font-size: 1rem;
            line-height: 1rem;
            color: #666;
            padding: 0 10px;
        }
        .wire{
        position: absolute;
        top: 42px;
        left: 0;
        width: 100%;
        height: 1px;
        background: #eee;
        }
        .project_m{
            width: 19%;
            float: left;
            height: 8rem;
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
            padding: 0 6px;
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
}

.statistics{
    width: 100%;
    .h2_top{
        width: 49%;
        height: 100%;
        .centent_top{
            width: 100%;
            height: 24rem;
            position: relative;
            background: #fff;
            padding-top: 2px;
            border-radius: .5rem;
            margin-bottom: 8px;
            h2{
                font-size: 1rem;
                line-height: 14px;
                color: #666;
                padding: 0 10px;
            }
            .wire{
            position: absolute;
            top: 42px;
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
                width: 50%;
                position: relative;
                background: #fff;
                border-radius: .5rem;
                margin-right: 8px;
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
            top: 42px;
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
        width: 25%;
        color: #666;
        background: #fff;
        border-radius: .3rem;
        height: 36.5rem;
    h2{
        font-size: 1rem;
        line-height: 16px;
    }
    .wire{
      position: absolute;
      top: 42px;
      left: 0;
      width: 100%;
      height: 1px;
      background: #eee;
    }
    .table_div{
      width: 100%;
      height: 2.5rem;
      padding-top: 10px;
      table{
        width: 100%;
        text-align: center;
        th{
        font-size: .9rem;
        padding-left: 0px;
        text-align: center;
        }
      }
    }
    .table_div1{
      width: 100%;
      height: 31rem;
      overflow-y: scroll;
      table{
        width: 100%;
        text-align: left;
        td{
        font-size: .9rem;
        padding-left: 0px;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 26px;
        }
      }
    }
    .table_div1::-webkit-scrollbar{
        width: 2px !important;
    }
}


.centent .issueModel{
    height: 32rem;
    margin-bottom: 8px;
    .issue{
        width: 37%;
        position: relative;
        background: #fff;
        padding: 0px 10px 10px 10px;
        border-radius: .5rem;
        h2{
            font-size: 1rem;
            line-height: 16px;
        }
        .wire{
        position: absolute;
        top: 42px;
        left: 0;
        width: 100%;
        height: 1px;
        background: #eee;
        }
        .centent{   
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .echar_div{
                height: 14rem;
                width: 100%;
                div{
                    width: 58%;
                    height: 100%;
                    margin: 0 auto;
                }
            }
            .ionc_div{
                width: 94%;
                height: 5rem;
                margin: 0 auto;
                .img_div{
                    width: 18%;
                    position: relative;
                    margin-left: 5rem;
                    float: left;
                    p{
                        font-size: 1rem;
                        line-height: .9rem;
                    }
                    .h1{
                        font-size: 1.5rem;
                        color: #FF880B;
                        line-height: 0;
                    }
                }
                .img_div::before{
                    content: "";
                    width: 4rem;
                    height: 4rem;
                    position: absolute;
                    top: 10px;
                    background: url(~@/assets/img/alert.png) no-repeat;
                    background-size: 100% 100%;
                    left: -5rem;
                    line-height: 2rem;
                }
                .two::before{
                    background: url(~@/assets/img/not-close.png) no-repeat;
                    background-size: 100% 100%;
                }
                .two{
                    .h1{
                        color: #2192EB;
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
            .issueFont{
                width: 76%;
                p{
                    text-align: center;
                }
                li{
                    list-style: none;
                }
                .ul1{
                    float: left;
                    width: 24%;
                    margin: 0 auto;
                    padding-left: 4rem;
                    li{
                        background: #008CD6;
                        width: 18px;
                        height: 18px;
                        margin-bottom: 12px;
                        border-radius: .3rem;
                        line-height: 18px;
                        text-align: center;
                        color: #f2f2f2;
                    }
                }
                .ul2{
                    float: left;
                    width: 72%;
                    margin: 0 auto;
                    li{
                        margin-bottom: 4px;
                        color: #666666;
                        line-height: 24px;
                    }
                }
            }
        }
    }
    .Ranking{
        width: 25%;
        height: 32rem;
        .model{
            width: 100%;
            background: #fff;
            height: 49%;
            border-radius: .5rem;
            position: relative;
            padding: 5px 10px 10px 2px;
            h2{
                font-size: 1rem;
                line-height: 10px;
                color: #666;
                padding: 0 10px;
            }
            .wire{
            position: absolute;
            top: 42px;
            left: 0;
            width: 100%;
            height: 1px;
            background: #eee;
            }
            .list{
                width: 79%;
                margin: 0 auto;
                margin-top: 1.5rem;
                ul{
                    padding: 0;
                }
                li{
                    text-align: center;
                    list-style: none;
                    line-height: 3rem;
                    background: #eee;
                    border-radius: 1rem;
                    margin-bottom: .5rem;
                    padding: 0 10px;
                    font-size: 1rem;
                    padding-top: .5rem;
                    color: #f2f2f2;
                }
                li:first-child{
                    background: url(~@/assets/img/P-one.png) no-repeat;
                    background-position: center center;
                    background-position-x: 0px;
                }
                li:nth-child(2){
                    background: url(~@/assets/img/P-two.png) no-repeat;
                    background-position: center center;
                    background-position-x: 0px;
                }
                li:last-child{
                    background: url(~@/assets/img/P-three.png) no-repeat;
                    background-position: center center;
                    background-position-x: 0px;
                }
            }
        }
    }
}

.model-amplification .el-project{
    display: block;
    width: 1rem;
    height: 1rem;
    float: left;
    margin-top: 8px;
    background: url(~@/assets/img/project.png) no-repeat;
}
.swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -2px;
    left: 0;
    width: 100%;
}

@media (max-width: 1850px) and (min-width: 1601px) {
    .model-amplification .fixedS{
        width: 87.5%;
    }
    .centent .issueModel .issue .centent .ionc_div{
        width: 83%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
    }
    .centent .issueModel .issue .centent .ionc_div .img_div::before {
        width: 3.6rem;
        height: 3.6rem;
        left: -4rem;
    }
    .centent .issueModel .issue .centent .ionc_div .img_div{
        width: 16% !important;
        margin-left: 3.5rem;
        padding: 0;
    }
    .centent .issueModel .issue .centent .ionc_div .img_div p{
        text-overflow: clip;
        white-space: nowrap;
    }
}

@media (max-width: 1600px) and (min-width: 1500px) {
    .model-amplification .fixedS{
        width: 86.5%;
    }
    .centent .issueModel .issue .centent .ionc_div{
        width: 83%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
    }
    .centent .issueModel .issue .centent .ionc_div .img_div::before {
        width: 3.6rem;
        height: 3.6rem;
        left: -3.8rem;
    }
    .centent .issueModel .issue .centent .ionc_div .img_div{
        width: 16%;
        margin-left: 3.5rem;
    }
    .centent .issueModel .issue .centent .ionc_div .img_div p{
        text-overflow: clip;
        white-space: nowrap;
    }
}
@media (max-width: 1501px) and (min-width: 1300px) {
    .model-amplification .fixedS{
        width: 84.4%;
    }
    .centent .issueModel .issue .centent .ionc_div{
        width: 94%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
    }
    .centent .issueModel .issue .centent .ionc_div .img_div::before {
        width: 3.3rem;
        height: 3.3rem;
        left: -3.8rem;
    }
    .centent .issueModel .issue .centent .ionc_div .img_div{
        width: 20%;
        margin-left: 3.5rem;
    }
    .centent .issueModel .issue .centent .ionc_div .img_div p{
        text-overflow: clip;
        white-space: nowrap;
    }
}

@media (max-width: 1300px) and  (min-width: 1000px) {
    .model-amplification .fixedS{
        width: 82.5%;
    }
    .centent .cord-1 .Me_weather_w{
        width: 50%;
    }
    .rd-1 .bottom .list .list_p{
        font-size: .4rem;
    }
    .centent .issueModel .issue .centent .ionc_div{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
    }
    .centent .issueModel .issue .centent .ionc_div .img_div::before {
        width: 3.3rem;
        height: 3.3rem;
        left: -3.8rem;
    }
    .centent .issueModel .issue .centent .ionc_div .img_div{
        width: 18%;
        margin-left: 3.5rem;
    }
    .centent .issueModel .issue .centent .ionc_div .img_div p{
        text-overflow: clip;
        white-space: nowrap;
    }
}

</style>
