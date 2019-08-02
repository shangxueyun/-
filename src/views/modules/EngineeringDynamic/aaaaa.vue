<template>
  <div class="hello-world chang_fontSize" id="">
    <!-- class="swiper-slide swiper-slide-step1"  -->
    <!-- swiper-slide swiper-slide-step2 -->
    <!-- id="swiperBoxItem" -->
    <!-- id="swiperBox2" -->
      <el-carousel  direction="vertical" :interval="3000" :autoplay="false" arrow="always" class="carouselpost ">
            <el-carousel-item  id="">
                      <topHeader></topHeader>
                      <el-row :gutter="30" style="margin:-15px 0 0 0">
                        <el-col :span="6" >
                          <proContent ref="topHeader"></proContent>
                          <div class="noiseBox">
                              <header style="text-algin:center">扬尘噪音检测</header>
                              <ul class="itemTop">
                                <li>
                                  <div class="itemImg">
                                    <img src="~@/assets/img/home/PM2.5@2x.png" alt="">
                                  </div>
                                  <div class="itemCon">
                                    <p>PM2.5</p>
                                    <span>{{dustNoiseList.pm}}</span>
                                  </div>

                                </li>
                                <li>
                                  <div class="itemImg">
                                    <img src="~@/assets/img/home/PM10@2x.png" alt="">
                                  </div>
                                  <div class="itemCon">
                                    <p>PM1.0</p>
                                    <span>{{dustNoiseList.pm10}}</span>
                                  </div>
                                </li>
                                <li>
                                  <div class="itemImg">
                                    <img src="~@/assets/img/home/zy.png" alt="">
                                  </div>
                                  <div class="itemCon">
                                    <p>噪音</p>
                                    <span>{{dustNoiseList.noise}}</span>
                                  </div>
                                </li>

                                <li>
                                  <div class="itemImg">
                                    <img src="~@/assets/img/home/wind.png" alt="">
                                  </div>
                                  <div class="itemCon">
                                    <p>风速</p>
                                    <span>{{dustNoiseList.windSpeed}}</span>
                                  </div>
                                </li>
                                <li>
                                  <div class="itemImg">
                                    <img src="~@/assets/img/home/windPotion.png" alt="">
                                  </div>
                                  <div class="itemCon">
                                    <p>风向</p>
                                    <span>{{positions}}</span>
                                  </div>
                                </li>
                                <li>
                                  <div class="itemImg">
                                    <img src="~@/assets/img/home/tem.png" alt="">
                                  </div>
                                  <div class="itemCon">
                                    <p>温度</p>
                                    <span>{{dustNoiseList.temperature}}</span>
                                  </div>
                                </li>
                                <li>
                                  <div class="itemImg">
                                    <img src="~@/assets/img/home/wd.png" alt="">
                                  </div>
                                  <div class="itemCon">
                                    <p>温度</p>
                                    <span>{{dustNoiseList.humidity}}</span>
                                  </div>
                                </li>
                              </ul>
                            <RdWeather ref="RdWeather"></RdWeather>
                          </div>
                        </el-col>
                        <el-col :span="12" style="box-sizing: border-box;padding:10px;">
                          <projectTime ref="projectTime"></projectTime>
                          <div style="text-align:center;height:20rem;">
                            <img src="~@/assets/img/home/bim.png" alt="" style="height: 20rem;">
                          </div>
                          <fenxiBox>  </fenxiBox>


                        </el-col>
                        <el-col :span="6">
                          <listProblem :url="'/bim/index/listProblem'" :type="1"></listProblem>
                          <workerMessage></workerMessage>

                        </el-col>
                      </el-row>
            </el-carousel-item>
            <el-carousel-item  id="" >
                  <topHeader></topHeader>
                  <step2Container></step2Container>
            </el-carousel-item>
      </el-carousel>
     
  </div>
</template>

<script>
  // import 'swiper/dist/css/swiper.css'
  // import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import topHeader from './modelsnew/header'
  import proContent from './modelsnew/proContent'
  import RdWeather from './modelsnew/weather'
  import projectTime from './modelsnew/projectTime'
  import {option, workerPlace, senvenData} from './modelsnew/options'
  import step2Container from './modelsnew/step2Container'
  import step3Container from './modelsnew/step3Container'
  import listProblem from './modelsnew/listProblem'
  import workerMessage from "./modelsnew/workerMessage"
  import fenxiBox from "./modelsnew/fenxiBox"
  // import '@/utils/macarons.js'
  import $ from 'jquery'
  export default {
    // name: 'amplificationNew',
    data () {
      return {      
        isRouterShow: true,
        indexreal :'',
        list: [], // 轮换列表
        index:0,
        dustNoiseList: {}, // 环境检测数据
        proResult: {},
        analysisChartOption: {},
        workerPlaceOptions: {}, // 在场班组和地区数据
        sevenData: {},
        proBlemList: [],
        optionsData: [], //
        teamNumData: {}, // 人员管理实时人数
      
        positions: '', // 风向
        transformScale: '',
        width: ''
      }
    },
    components: {
      // swiper,
      // swiperSlide,
      topHeader,
      proContent,
      RdWeather,
      projectTime,
      step2Container,
      step3Container,
      listProblem,
      workerMessage,
      fenxiBox
    },
    created (){
      // 从后台获取数据
      this.list = [0, 1, 2]
    },
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted (){

        var r = document.body.offsetWidth / window.screen.availWidth; 

        $(document.body).css("-webkit-transform","scale(" + r + ")"); 

      //   document.body.style.zoom = "normal"; //避免zoom尺寸叠加
      //   let scale = document.body.clientWidth / 1920;
      //   // alert(scale)
      //   document.body.style.zoom = scale;
      // //防抖，避免resize占用过多资源
      // (function() {
      //       var throttle = function(type, name, obj) {
      //         obj = obj || window;
      //         var running = false;
      //         var func = function() {
      //           if (running) {
      //             return;
      //           }
      //           running = true;
      //           requestAnimationFrame(function() {
      //             obj.dispatchEvent(new CustomEvent(name));
      //             running = false;
      //           });
      //         };
      //         obj.addEventListener(type, func);
      //       };
      //       throttle("resize", "optimizedResize");
      //     })();

      //     window.addEventListener("optimizedResize", function() {
      //       document.body.style.zoom = "normal";
      //       let scale = document.body.clientWidth / 1920;
      //       document.body.style.zoom = scale;
      // });
        // var w = $(window).height();
        // var w1 = $('#swiperBoxItem').width()
        // $('body').css('zoom', (w1/w)/2);
        // $(window).resize(function () {
        //   var w = $(window).height();
        //   $('body').css('zoom', (w1/w)/2); 
        // })
          this.$nextTick(() => {
                // this.autoSetScale('#swiperBoxItem') // 进页面先执行一次页面高度和宽度计算然后赋值
                // this.autoSetScale('#swiperBox2') // 进页面先执行一次页面高度和宽度计算然后赋值
                this.$refs.topHeader.loading=true
                this.getProDetail().then((data) => {
                  // console.log(data)
                  this.$refs.topHeader.init(data, '工程概况')
                }).catch((err) => {
                  this.$refs.topHeader.loading=false
                })
                this.getWeath().then((data) => {
                  this.$refs.RdWeather.init(data)
                })
                this.$refs.projectTime.getLcbData()
                this.getDustNoise()
          })
      // this.swiper.slideTo(3, 1000, false); //手动跳到指定gg页
    },
    methods: {
      autoSetScale (dom) {
        let that=this
        var rateWidth=1.0
        var rateHeight=1.0
        this.scale(rateWidth, rateHeight,dom)
        $(window).resize(function () {
          that.scale(rateWidth, rateHeight,dom)
        })

      },
      scale (rateWidth, rateHeight,dom){
        var w = $(window).width()
        var w1 = $('#swiperBoxItem').width()
        var h=$(window).height()
        var h1=$('#swiperBoxItem').height()
        // console.log(h1)
        var left
        var top
        var rate=null

        rateWidth=w / w1
        rateHeight=h / h1

        rate=(rateWidth>=rateHeight)?rateHeight:rateWidth
        // console.log(rate)
        var actWidth = w1 * rate
            // 居中
        left = -(w1 - actWidth)/2 + (w-actWidth)*0.5

            // 顶部对齐
        var actHeihgt =h1*rate
        top= -(h1 - actHeihgt)/2

        $(dom).css({
          'transform': 'scale(' + rate + ')',
          'left': left + 'px',
          'top': top + 'px',

        })
      },
      getListProblem (){
        return new Promise((resolve, reject) => {
          this.$http({
            url: this.$http.adornUrl('/bim/index/listProblem'),
            method: 'post',
            data: this.$http.adornData({

            })
          }).then((data) => {
            if(data.data.code==0){
              resolve(data.data.result)
            }
          }).catch((err) => {
            reject(err)
          })
        })
      },
      getWeath (){ // 获取天气预报数据
        return new Promise((resolve, reject) => {
          this.$http({
            url: this.$http.partyUrl('/equipment/index/getWeatherAll'),
            method: 'get'

          }).then((data) => {
            if(data.data.code==0){
              let result=data.data.result
              this.positions=result.forecasts[0].casts[0].daywind
              resolve(result)
              // this.weatherResult=data.data.result;
              // this.weatherResultItem=data.data.result.forecasts[0];
              //
              // this.Weatherlist= this.weatherResult.forecasts[0].casts;
              // console.log(  this.Weatherlist)
            }
          })
        })
      },
      getDustNoise (){ // 环境检测
        this.$http({
          url: this.$http.partyUrl('/equipment/index/dustNoiseList'),
          method: 'post',
          data: this.$http.adornData({
            'isToday': 0
          })
        }).then((data) => {
          if(data.data.code==0){
            this.dustNoiseList=data.data.result[0]
          }
        })
      },
      
      indexVf (arr, str){ // 获取下标
        for(var i=0; i<arr.length; i++){
          if(arr[i]==str){
            return i
          }
        }
      },
      getSevenTeam (data){
        let arr=[]
        let dateArr=[]
        data.forEach((a, i) => {
          let obj={}
         // obj.
        })
      },
      getNowTime (){
        var date=new Date(),
          year=date.getFullYear(),
          mouth=date.getMonth()+1,
          day=date.getDate()
        return year+'-'+this.add0(mouth)+'-'+this.add0(day)
      },
      add0 (str){
        if(Number(str)<=9){
          return '0'+str
        }else{
          return str
        }
      },
      // getWorker (){ // 获取在场人数
      //   this.$http({
      //     url: this.$http.adornUrl('/bim/index/realTimeData'),
      //     method: 'get'
      //
      //   }).then((data) => {
      //     if(data.data.code==0){
      //       this.teamNumData=data.data.result
      //     }
      //   })
      // },
      getProDetail (){
        return new Promise((resolve, reject) => {
          this.$http({
            url: this.$http.adornUrl('/bim/index/findProject'),
            method: 'post',
            data: this.$http.adornData({
              'id': 1
            })
          }).then((data) => {
            if(data.data.code==0){
              resolve(data.data.result)
            }
          }).catch((err) => {
            reject(err)
          })
        })
      },
      getEchart (id, data){
        let chart = echarts.init(this.$refs[id], 'macarons')
        chart.setOption(data, true)
        // let chart = this.$echarts.init(this.$refs[id], 'macarons')
        // chart.setOption(data, true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swiper-slide.swiper-slide-step1{
    position: absolute;
    height:100%;
    width:100%;
    background: url("~@/assets/img/home/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .swiper-slide.swiper-slide-step2{
    background: url("~@/assets/img/home/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .swiper-slide.swiper-slide-step3{
    background: url("~@/assets/img/home/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .swiper-slide{
    height: 100%;
    font-size: 16px;
    text-align: center;

  }
 
  .noiseBox{
    width: 100%;
    // height:532px;
    // box-sizing: border-box;
    padding-top: 0.5em;
    background: url("~@/assets/img/home/jiance.png") no-repeat;
    background-size: 100% 100%;
    header{
      font-size:18px;
      /*margin-bottom: 1em;*/
      color: #AAF5FE;
      text-align: center;

    }
    ul{
      list-style: none;
      display: flex;
      justify-content:space-between;
      flex-wrap: wrap;
      /*box-sizing: border-box;*/
      /*padding:0 2em;*/
      li{
        width: 25%;
        font-size: 15px;
        color:#FFFFFF;
        font-weight:400;
        display: flex;
        justify-content:space-between;

          margin:2em 1.9em 0 0;

        p{
          margin:0;
          font-weight:bold;
        }
        span{
          font-size: 20px;
          color:#00E5FF;
          font-weight:bold;
        }
      }
    }

  }
  .fx{
    width: 100%;
    background: url("~@/assets/img/home/fx.png") no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: 8px;
    header{
      color: #A9DDEE;
      font-weight: bold;
      font-size: 18px;
      text-align: center;
    }
  }
  /*.swiper-slide:nth-child(2n){*/
  /*  background: skyblue;*/
  /*}*/
  /*.swiper-slide:nth-child(2n-1){*/
  /*  background: seashell;*/
  /*}*/
  .hello-world{
    position: fixed;
    top:0;
    left:0;
  }


</style>
<style>
  .carouselpost{
    top:0;
    left:0;
    position: fixed;
    width:100%;
    height:100%;
    overflow: hidden;
    background: url("~@/assets/img/home/bg.png") no-repeat;
    background-size: 100% 100%;
  }
.carouselpost .el-carousel__container{
    position: absolute; top:0px; 
    width:100%;
    height:100%; 

}
.carouselpost .el-carousel__item{
  height:100%;
  border:1px solid red;
  position: absolute;
  width:100%;
    background: url("~@/assets/img/home/bg.png") no-repeat;
    background-size: 100% 100%;
}
.carouselpost .el-carousel__indicators{
  /* width:100%;
  position: fixed; */
  /* border:1px solid red; */
  /* right:0; */
  /* right:0; */

}
</style>

