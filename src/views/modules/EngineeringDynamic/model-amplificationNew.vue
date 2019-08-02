<template>
  <div class="hello-world">
    <swiper id="swiperBox" v-bind:options="swiperOption" ref="mySwiper">
      <swiper-slide id="swiperBoxItem" class="swiper-slide swiper-slide-step1" style="width:1920px; position: relative; top:0px; ">

          <topHeader ></topHeader>
          <el-row :gutter="30" style="margin:-15px 0 0 0">
            <el-col :span="6" >
              <proContent ref="topHeader"></proContent>
              <div class="noiseBox">
                  <header>扬尘噪音检测</header>
                  <ul class="itemTop">
                    <li>
                      <div class="itemImg">
                        <img src="../../../assets/img/home/PM2.5@2x.png" alt="">
                      </div>
                      <div class="itemCon">
                        <p>PM2.5</p>
                        <span>{{dustNoiseList.pm}}</span>
                      </div>

                    </li>
                    <li>
                      <div class="itemImg">
                        <img src="../../../assets/img/home/PM10@2x.png" alt="">
                      </div>
                      <div class="itemCon">
                        <p>PM1.0</p>
                        <span>{{dustNoiseList.pm10}}</span>
                      </div>
<!--                      <p>PM1.0</p>-->
<!--                      <span>{{dustNoiseList.pm10}}</span>-->
                    </li>
                    <li>
                      <div class="itemImg">
                        <img src="../../../assets/img/home/zy.png" alt="">
                      </div>
                      <div class="itemCon">
                        <p>噪音</p>
                        <span>{{dustNoiseList.noise}}</span>
                      </div>
<!--                      <p>噪音</p>-->
<!--                      <span>{{dustNoiseList.noise}}</span>-->
                    </li>

                    <li>
                      <div class="itemImg">
                        <img src="../../../assets/img/home/wind.png" alt="">
                      </div>
                      <div class="itemCon">
                        <p>风速</p>
                        <span>{{dustNoiseList.windSpeed}}</span>
                      </div>
<!--                      <p>风速</p>-->
<!--                      <span>{{dustNoiseList.windSpeed}}</span>-->
                    </li>
                    <li>
                      <div class="itemImg">
                        <img src="../../../assets/img/home/windPotion.png" alt="">
                      </div>
                      <div class="itemCon">
                        <p>风向</p>
                        <span>{{positions}}</span>
                      </div>
<!--                      <p>风向</p>-->
<!--                      <span>{{positions}}</span>-->
                    </li>
                    <li>
                      <div class="itemImg">
                        <img src="../../../assets/img/home/tem.png" alt="">
                      </div>
                      <div class="itemCon">
                        <p>温度</p>
                        <span>{{dustNoiseList.temperature}}</span>
                      </div>
<!--                      <p>温度</p>-->
<!--                      <span>{{dustNoiseList.temperature}}</span>-->
                    </li>
                    <li>
                      <div class="itemImg">
                        <img src="../../../assets/img/home/wd.png" alt="">
                      </div>
                      <div class="itemCon">
                        <p>温度</p>
                        <span>{{dustNoiseList.humidity}}</span>
                      </div>
<!--                      <p>湿度</p>-->
<!--                      <span>{{dustNoiseList.humidity}}</span>-->
                    </li>
                  </ul>
                <RdWeather ref="RdWeather"></RdWeather>
              </div>
            </el-col>
            <el-col :span="12" style="box-sizing: border-box;padding:10px;">
              <projectTime ref="projectTime"></projectTime>
              <div >
                <img src="../../../assets/img/home/bim.png" alt="" style="height: 340px">
              </div>
              <fenxiBox>  </fenxiBox>
<!--              <div class="fx">-->
<!--                <header>产值分析图</header>-->
<!--                <div ref="containerShadow" style="width: 100%;height: 280px;"></div>-->
<!--              </div>-->

            </el-col>
            <el-col :span="6">
              <listProblem :url="'/bim/index/listProblem'" :type="1"></listProblem>
              <workerMessage></workerMessage>
<!--               <div class="workerMessage">-->
<!--                   <header>人员动态管理</header>-->
<!--                 <ul class="workerItem">-->
<!--                   <li class="active"><p>进场人次</p><span>{{teamNumData.entryNums}}</span></li>-->
<!--                   <li><p>出场人次</p><span>{{teamNumData.appearanceNums}}</span></li>-->
<!--                   <li><p>在场人次</p><span>{{teamNumData.venueRealNums}}</span></li>-->
<!--                 </ul>-->
<!--                 <div class="workerPlaceBox">-->
<!--                   <p class="header">班组在场人数</p>-->
<!--                   <div ref="workerPlace" style="width: 100%;height:190px"></div>-->
<!--                 </div>-->
<!--                 <div class="senvenDataBox">-->
<!--                   <p class="header">七天劳动力统计</p>-->
<!--                 <div ref="senvenData" style="width: 100%;height: 230px"></div>-->
<!--                 </div>-->
<!--               </div>-->
            </el-col>
          </el-row>

      </swiper-slide>
      <swiper-slide id="swiperBox2" class="swiper-slide swiper-slide-step2" style="width:1920px; position: relative; top:0px; ">
        <topHeader></topHeader>
        <step2Container></step2Container>
      </swiper-slide>
<!--      <swiper-slide class="swiper-slide swiper-slide-step3" >-->
<!--        <topHeader></topHeader>-->
<!--        <step3Container></step3Container>-->
<!--      </swiper-slide>-->
      <!-- Optional controls -->
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"  slot="pagination"></div>
<!--      &lt;!&ndash; 如果需要导航按钮 &ndash;&gt;-->
<!--      <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--      <div class="swiper-button-next" slot="button-next"></div>-->
      <!-- 如果需要滚动条 -->
<!--      <div class="swiper-scrollbar"   slot="scrollbar"></div>-->

    </swiper>

  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import topHeader from './models/header'
  import proContent from './models/proContent'
  import RdWeather from './models/weather'
  import projectTime from './models/projectTime'
  import {option, workerPlace, senvenData} from './models/options'
  import step2Container from './models/step2Container'
  import step3Container from './models/step3Container'
  import listProblem from './models/listProblem'
  import workerMessage from "./models/workerMessage"
  import fenxiBox from "./models/fenxiBox"
  // import '@/utils/macarons.js'
  import $ from 'jquery'
  export default {
    name: 'amplificationNew',
    data () {
      return {
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
        swiperOption: {

          notNextTick: true, // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          direction: 'vertical', // 水平方向移动
          grabCursor: false, // 鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
          setWrapperSize: true, // Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
          autoHeight: true, // 自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
          slidesPerView: 1, // 设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
          mousewheel: true, // 开启鼠标滚轮控制Swiper切换。可设置鼠标选项，默认值false
          mousewheelControl: true, // 同上
          height: window.innerHeight, // 高度设置，占满设备高度
          resistanceRatio: 0, // 抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。本业务需要
          observeParents: true, // 将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新
          loop: false,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          // debugger: true,

          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          on: {
            // 监听滑动切换事件，返回swiper对象
            slideChange: () => {

             /// console.log('index '+this.index)
              let swiper = this.$refs.mySwiper.swiper
              // console.log(swiper) // 滑动打印当前索引
              // if(swiper.activeIndex === this.list.length - 1){ // 到最后一个加载更多数据
              // let newList = []
               // let listLength = this.list.length
               //  for(let i = 0; i < 10; i++){
               //    newList.push(listLength + i)
               //  }
              // this.list = this.list.concat(newList)
              // }
            }
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            // type: 'fraction',
            // type : 'progressbar',
            // type : 'custom',
            // progressbarOpposite: true, // 使进度条分页器与Swiper的direction参数相反
            // bulletElement: 'li', // 设定分页器指示器（小点）的HTML标签。
            // dynamicBullets: true,  // 动态分页器，当你的slide很多时，开启后，分页器小点的数量会部分隐藏。
            // dynamicMainBullets: 2, // 动态分页器的主指示点的数量
            // hideOnClick: true, // 默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
            clickable: true // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。

          }
        },
        positions: '', // 风向
        transformScale: '',
        width: ''
      }
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
      this.swiperOption
      this.autoSetScale('#swiperBoxItem') // 进页面先执行一次页面高度和宽度计算然后赋值
      this.autoSetScale('#swiperBox2') // 进页面先执行一次页面高度和宽度计算然后赋值
      this.$refs.topHeader.loading=true
      this.getProDetail().then((data) => {
        console.log(data)
        this.$refs.topHeader.init(data, '工程概况')
      }).catch((err) => {
        this.$refs.topHeader.loading=false
      })
      this.getWeath().then((data) => {
        this.$refs.RdWeather.init(data)
      })
      this.$refs.projectTime.getLcbData()
      // this.getListProblem().then((data) => {
      //   this.proBlemList=data;
      // })

      // this.getWorkerOption()
      // this.getWorker()
      // this.getDustNoise()

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
        console.log(h1)
        var left
        var top
        var rate=null

        rateWidth=w / w1
        rateHeight=h / h1

        rate=(rateWidth>=rateHeight)?rateHeight:rateWidth
        console.log(rate)
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
      // analysisChart (year){ // 产值
      //   this.$http({
      //     url: this.$http.adornUrl('/bim/index/analysisChart'),
      //     method: 'post',
      //     data: this.$http.adornData({
      //       'dateTime': year
      //     })
      //   }).then((data) => {
      //     if(data.data.code==0){
      //       this.analysisChartOption=option
      //       let result=data.data.result,
      //         arr=[],
      //         subcontractingOutputValueArr=[],
      //         constructionOutputValueArr=[],
      //         installationOutputValueArr=[]
      //       for(var item in result.production){
      //         let obj={}
      //         obj.index=Number(item.split('-')[1])
      //         obj.subcontractingOutputValue=result.production[item].subcontractingOutputValue
      //         obj.constructionOutputValue=result.production[item].constructionOutputValue
      //         obj.installationOutputValue=result.production[item].installationOutputValue
      //         arr.push(obj)
      //       }
      //
      //       for(let i=1; i<13; i++){
      //         subcontractingOutputValueArr.push(0)
      //         constructionOutputValueArr.push(0)
      //         installationOutputValueArr.push(0)
      //       }
      //       console.log(arr)
      //       subcontractingOutputValueArr=this.publicFun(subcontractingOutputValueArr, arr, 'subcontractingOutputValue')
      //       constructionOutputValueArr=this.publicFun(constructionOutputValueArr, arr, 'constructionOutputValue')
      //       installationOutputValueArr=this.publicFun(installationOutputValueArr, arr, 'installationOutputValue')
      //       this.analysisChartOption.series[0].data=subcontractingOutputValueArr
      //       this.analysisChartOption.series[1].data=constructionOutputValueArr
      //       this.analysisChartOption.series[2].data=installationOutputValueArr
      //       this.getEchart('containerShadow', option)
      //     }
      //   })
      // },
      // publicFun (data, arr, str){
      //   data.forEach((a, i) => {
      //     arr.forEach((m, n) => {
      //       if(i+1==m.index){
      //         data[i]=m[str]
      //       }
      //     })
      //   })
      //   console.log(data)
      //   return data
      // },
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
      // getWorkerOption (){
      //   this.$http({
      //     url: this.$http.adornUrl('/bim/index/watchKanbanAttendance'),
      //     method: 'post'
      //   }).then((data) => {
      //     if(data.data.code==0){
      //       this.workerPlaceOptions=workerPlace
      //       this.sevenData=senvenData
      //       let province=data.data.result.province
      //       let teamArr=[]
      //       let obj=[]
      //       let sevenClassData=data.data.result.sevenClassData[this.getNowTime()],
      //         placeList=[],
      //         teamList=[],
      //         dateArr=new Array()
      //       data.data.result.groupByClassNo.forEach((a, i) => {
      //         teamArr.push(a.classNo)
      //       })
      //       for(var item in data.data.result.sevenClassData){
      //         dateArr.push(item)
      //         data.data.result.sevenClassData[item].forEach((a, i) => {
      //           obj.push(a)
      //         })
      //       }
      //       // console.log(obj)
      //
      //       province.forEach((a, i) => {
      //         let obj={}
      //         obj.value=a.nums
      //         obj.name=a.province
      //         placeList.push(obj)
      //         this.optionsData.push(a.province)
      //       })
      //       sevenClassData.forEach((a, i) => {
      //         let obj={}
      //         obj.value=a.sums
      //         obj.name=a.classNo
      //         teamList.push(obj)
      //         this.optionsData.push(a.classNo)
      //       })
      //       // console.log(placeList, teamList)
      //       this.sevenData.yAxis.data=dateArr
      //       this.workerPlaceOptions.legend.data=this.optionsData
      //       this.workerPlaceOptions.series[0].data=placeList
      //       this.workerPlaceOptions.series[1].data=teamList
      //       this.sevenData.legend.data=teamArr
      //       this.sevenData.series= this.getSeventData(data.data.result.groupByClassNo, obj, dateArr)
      //       // console.log(teamList)
      //       this.getEchart('workerPlace', this.workerPlaceOptions)
      //       this.getEchart('senvenData', this.sevenData)
      //     }
      //   })
      // },
      // getSeventData (groupByClassNo, arr, dateArr){
      //   var objArr=[]
      //   // dateArr.prototype.indexVf=function (arr){
      //   //
      //   // }
      //
      //   groupByClassNo.forEach((a, i) => {
      //     var obj={
      //       name: a.classNo,
      //       type: 'bar',
      //       stack: '人数',
      //       label: {
      //         normal: {
      //           show: false,
      //           position: 'insideRight'
      //         }
      //       },
      //       data: new Array(7).fill(0)
      //     }
      //     objArr.push(obj)
      //   })
      //
      //   objArr.forEach((a, i) => {
      //     arr.forEach((m, n) => {
      //       if(a.name==m.classNo){
      //         a.data[this.indexVf(dateArr, m.photoDate)]=m.sums
      //       }
      //     })
      //   })
      //   return objArr
      // },
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
        let chart = this.$echarts.init(this.$refs[id], 'macarons')
        chart.setOption(data, true)
      }
    },
    components: {
      swiper,
      swiperSlide,
      topHeader,
      proContent,
      RdWeather,
      projectTime,
      step2Container,
      step3Container,
      listProblem,
      workerMessage,
      fenxiBox
    }
  }
</script>

<style lang="scss" scoped>
  .swiper-slide.swiper-slide-step1{
    // background: url("../../../assets/img/home/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .swiper-slide.swiper-slide-step2{
    // background: url("../../../assets/img/home/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .swiper-slide.swiper-slide-step3{
    // background: url("../../../assets/img/home/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .swiper-slide{
    height: 100%;
    font-size: 16px;
    text-align: center;

      /*box-sizing: border-box;*/
      /*padding:10px;*/

  }
  /*.workerMessage{*/
  /*  width: 100%;*/
  /*  box-sizing: border-box;*/
  /*  padding:10px;*/
  /*  background: url("../../../assets/img/home/worker.png") no-repeat;*/
  /*  background-size: 100% 100%;*/
  /*  .header{*/
  /*    text-align: left;*/
  /*    color: #00E5FF;*/
  /*    font-weight: bold;*/
  /*    position: relative;*/
  /*  box-sizing: border-box;*/
  /*    padding-left: 10px;*/
  /*  }*/
  /*  .header:before{*/
  /*    content: "";*/
  /*    width: 4px;*/
  /*    height:16px ;*/
  /*    position: absolute;*/
  /*    background: #00E5FF;*/
  /*    top:3px;*/
  /*    left:0;*/
  /*  }*/
  /*  header{*/
  /*    font-size:18px;*/
  /*    !*margin-bottom: 30px;*!*/
  /*    font-weight: bold;*/
  /*    color: #AAF5FE;*/
  /*  }*/
  /*.workerItem{*/
  /*  width: 100%;*/
  /*  list-style: none;*/
  /*  padding:0;*/
  /*  display: flex;*/
  /*  justify-content: space-between;*/
  /*  li{*/
  /*    background: url("../../../assets/img/home/workerItem.png") no-repeat;*/
  /*    background-size: 100% 100%;*/
  /*    width: 30%;*/
  /*    height: 79px;*/
  /*    text-align: right;*/
  /*    border:1px solid transparent;*/
  /*    cursor: pointer;*/
  /*    color: #fff;*/
  /*    box-sizing: border-box;*/
  /*    padding-right: 10px;*/
  /*    font-size: 13px;*/
  /*    p{*/
  /*      margin-top:25px;*/
  /*      margin-bottom: 2px;*/
  /*      font-size: 13px;*/
  /*    }*/
  /*    span{*/
  /*      color:#00E5FF;*/
  /*      font-size: 0.9em;*/
  /*      font-weight: bold;*/
  /*    }*/
  /*  }*/
  /*  li.active{*/
  /*    border:1px solid #3f3f3f;*/
  /*  }*/
  /* }*/
  /*}*/
  .noiseBox{
    width: 100%;
    height:500px;
    box-sizing: border-box;
    padding-top: 0.5em;
    background: url("../../../assets/img/home/jiance.png") no-repeat;
    background-size: 100% 100%;
    header{
      font-size:18px;
      /*margin-bottom: 1em;*/
      color: #AAF5FE;

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
    background: url("../../../assets/img/home/fx.png") no-repeat;
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
    position: absolute;
    top:0;
    left:0;
    width:100%;height:100%;
    background: url("../../../assets/img/home/bg.png") no-repeat;
    background-size: 100% 100%;
    position: fixed;
    top:0;
  }
  #swiperBox{
  }
</style>
