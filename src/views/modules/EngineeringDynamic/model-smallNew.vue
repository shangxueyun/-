<template>
  <div class="model-small">
    <div class="centent" :dataBle="ble_">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="noiseBox">
            <header style="text-align: center;font-weight: bold">扬尘噪音检测</header>
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
                <!--                      <p>PM1.0</p>-->
                <!--                      <span>{{dustNoiseList.pm10}}</span>-->
              </li>
              <li>
                <div class="itemImg">
                  <img src="~@/assets/img/home/zy.png" alt="">
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
                  <img src="~@/assets/img/home/wind.png" alt="">
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
                  <img src="~@/assets/img/home/windPotion.png" alt="">
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
                  <img src="~@/assets/img/home/tem.png" alt="">
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
                  <img src="~@/assets/img/home/wd.png" alt="">
                </div>
                <div class="itemCon">
                  <p>温度</p>
                  <span>{{dustNoiseList.humidity}}</span>
                </div>
                <!--                      <p>湿度</p>-->
                <!--                      <span>{{dustNoiseList.humidity}}</span>-->
              </li>
            </ul>
          </div>
          <RdWeather ref="RdWeather"></RdWeather>
        </el-col>
        <el-col :span="16">
          <projectTime ref="projectTime"></projectTime>
          <el-carousel indicator-position="outside" :autoplay="false" height="459px">
            <el-carousel-item v-for="item,i in index" :key="item">
              <div class="carouselBox" v-for="items in indexData(i)">
<!--                {{items}}-->
                <img :src="items.img" alt="">
                <p>
                  <span>单体:</span>
                  <span>{{items.monomerName}}</span>
                </p>
                <p>
                  <span>楼层:</span>
                  <span>{{items.floorName}}</span>
                </p>
                <p>
                  <span>流水段:</span>
                  <span>{{items.flowSectionName}}</span>
                </p>
                <p>
                  <span>劳动力总数:</span>
                  <span>{{items.totalNumber}}</span>
                </p>
                <p>
                  <span>上传人:</span>
                  <span>{{items.createUser}}</span>
                </p>
                <p>
                  <span>上传日期:</span>
                  <span>{{items.createTime}}</span>
                </p>

              </div>

            </el-carousel-item>
          </el-carousel>
<!--          <workerMessage></workerMessage>-->
        </el-col>

      </el-row>
      <el-row :gutter="30">
         <el-col :span="14">
           <fenxiBox></fenxiBox>
           <div ref="fenxiBox" style="width: 100%;height: 300px"></div>
         </el-col>

        <el-col :span="10">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="width: 100%">
            <el-tab-pane label="质量管理" name="first" style="width: 100%">
              <weightBox v-if="activeName=='first'"></weightBox>
            </el-tab-pane>
            <el-tab-pane label="安全管理" name="second" style="width: 100%">
              <safeBox v-if="activeName=='second'"></safeBox>

            </el-tab-pane>
            <el-tab-pane label="安全管理" name="three" style="width: 100%">
              <workerMessage v-if="activeName=='three'"></workerMessage>
            </el-tab-pane>

          </el-tabs>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="10">
          <div class="weightBox">
            <header>设备状态
              <el-dropdown @command="onChange">
                <span class="el-dropdown-link">
                  已选设备: <span>{{equipment}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in equipmentList" :key="item.id" :command="item.equipmentCode">{{item.equipmentCode}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </header>
            <ul class="list">
              <template v-if="!todayExceptionGroup.length">
                <li >
                  <p>今日报警</p>
                  <span>0</span>
                </li>
                <li>
                  <p>今日违章</p>
                  <span>0</span>
                </li>
                <li>
                  <p>非正常断点</p>
                  <span>0</span>
                </li>
                <li>
                  <p>今日故障</p>
                  <span>0</span>
                </li>
              </template>
              <template v-if="todayExceptionGroup.length">
                <li v-for="item in todayExceptionGroupTest">
                  <p>{{item.name}}</p>
                  <span>{{item.count}}</span>
                </li>
              </template>
            </ul>
				    <img src="~@/assets/img/towerspng.png">
            <ul class="list">
              <li>
                <p>NO.1重量</p>
                <span>{{equipmentDetail.weight}}</span>
              </li>
              <li>
                <p>NO.2力矩</p>
                <span>{{equipmentDetail.moment}}</span>
              </li>
              <li>
                <p>NO.3幅度</p>
                <span>{{equipmentDetail.towerRange}}</span>
              </li>
              <li>
                <p>NO.4高度</p>
                <span>{{equipmentDetail.height}}</span>
              </li>
            </ul>
<!--            <el-select v-model="equipment" placeholder="请选择塔机" @change="onChange">-->
<!--              <el-option-->
<!--                v-for="item in equipmentList"-->
<!--                :key="item.equipmentCode"-->
<!--                :label="item.equipmentCode"-->
<!--                :value="item.equipmentCode">-->
<!--              </el-option>-->
<!--            </el-select>-->
          </div>
        </el-col>

        <el-col :span="14">
          <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import workerMessage from './models/workerMessage'
  import projectTime from './models/projectTime'
  import fenxiBox from "./models/fenxiBox"
  import weightBox from "./models/weightBox"
  import safeBox from "./models/safeBox"
  import {pie, pieTopWeightPie, teamoption, safepieToptPie, safepieToptTeamPie, fenxioption} from './models/options'
  import RdWeather from './models/weather'
  export default {
    // name: 'model-smallNew',
    components: {
      workerMessage,
      projectTime,
      fenxiBox,
      weightBox,
      safeBox,
      RdWeather
    },
    data (){
      return {
        ProgressData: [],
        index:0,
        activeName: 'first',
        equipment:"",
        todayExceptionGroup: [], // 设备异常
        equipmentList:{},
        fenxiOptionData:{},
        equipmentDetail:{},//设备详情
        dustNoiseList:{},
        positions:{},
        todayExceptionGroupTest: [{
          type: '1',
          count: 0
        }, {
          type: '2',
          count: 0
        }, {
          type: '3',
          count: 0
        }, {
          type: '4',
          count: 0
        }]
      }
    },
    mounted () {
      this.getWeath().then((data) => {
        this.$refs.RdWeather.init(data)
      })
      this.$refs.projectTime.getLcbData()
      this.listImageProgress()
      this.getequipmentList()
      this.getProblemCount()
    },
    methods: {
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
            // this.fenxiOptionData=data.data.result;
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
      // 质量安全
      handleClick(tab, event) {
        console.log(this.activeName);
        if(this.activeName=='first'){

        }
      },
      // 设备
      getDetail(val){
        this.$http({
          url: this.$http.adornUrl(`/equipment/index/infoByEquipmentCode/${val}`),
          method: 'post'
          // data: this.$http.adornData({
          //
          // })
        }).then((data) => {
          if(data.data.code==0){
            this.equipmentDetail=data.data.result;
           // this.equipment=this.equipmentDetail[0]&&this.equipmentDetail[0].equipmentCode
          }
        })
      },
      getequipmentList (){
        this.$http({
          url: this.$http.adornUrl('/equipment/index/equipmentList/1'),
          method: 'post'
          // data: this.$http.adornData({
          //
          // })
        }).then((data) => {
          if(data.data.code==0){
            this.equipmentList=data.data.result||{};
            this.equipment=this.equipmentList[0]&&this.equipmentList[0].equipmentCode
            this.getUnusual(this.equipment)
            this.getDetail(this.equipment);
          }
        })
      },
      onChange (val){
        console.log(val)
        this.equipment=val;
        this.getUnusual(val)
        this.getDetail(val);
      },
      getUnusual (val){ // 异常
        this.$http({
          url: this.$http.adornUrl(`/equipment/index/todayExceptionGroup/${val}`),
          method: 'post'
          // data: this.$http.adornData({
          //
          // })
        }).then((data) => {
          if(data.data.code==0){
            this.todayExceptionGroup=data.data.result
            if( this.todayExceptionGroup.length){
              this.todayExceptionGroupTest.forEach((a,i)=>{
                this.todayExceptionGroup.forEach((m,n)=>{
                  if(a.type==m.type){
                    a.count=m.count
                  }
                })
              })
            }

            this.todayExceptionGroupTest.forEach((a, i) => {
              if(a.type==1){
                a.name='违章  '
              }else if(a.type==2){
                a.name='报警 '
              }else if(a.type==3){
                a.name='非正常断电 '
              }else if(a.type==4){
                a.name='故障 '
              }
            })
            console.log(this.todayExceptionGroupTest)
          }
        })
      },
      getEchart (id, data){
        // let chart = this.$echarts.init(this.$refs[id], 'macarons')
        let chart = echarts.init(this.$refs[id], 'macarons')
        chart.setOption(data, true)
      },
      listImageProgress (){
        this.$http({
          url: this.$http.adornUrl('/bim/index/listImageProgress'),
          method: 'post',
          data: this.$http.adornData({

          })
        }).then((data) => {
          if(data.data.code==0){
            this.ProgressData=data.data.result;
            this.index=Math.ceil(this.ProgressData.length/4);//总页数


            console.log(this.index)
          }
        })
      },
       indexData(index){

        let pages=4,
          start=pages*index,
          end=pages*index+4;
        return this.ProgressData.slice(start,end)
      }
    }
  }
</script>
<style>
  .model-small .el-carousel__item:nth-child(2n+1){
      background: transparent !important;
  }
  .model-small .el-dropdown{
     position: absolute;
    right: 0;
    color: #AAF5FE;
  }
  .model-small .el-tabs__item{
    color: #AAF5FE;
  }
  .model-small .el-tabs__item.is-active{
    color: #3E8EF7;
  }
</style>
<style lang="scss" scoped>
  .model-small{
    background: #F1F4F5 url("~@/assets/img/home/bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 0;
    overflow: hidden;
    border-radius: 0px;
  .nav-header-top{
    width: 100%;
  }
  }
  .weightBox{
    width: 100%;
    box-sizing: border-box;
    padding:10px;
    .list{
      width: 100%;
      list-style: none;
      padding:0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      li{
        width:20% ;
        height: 50px;
        border:1px solid #3b4249;
        text-align: center;
        margin-bottom: 20px;
        color: #fff;
        span{
          color:#DD4A68;
        }
        p{
          margin:0;
        }
      }
    }
    header{
      position: relative;
      font-size:18px;
      margin-bottom: 30px;
      color:#AAF5FE;
      text-align: center;
    }
  }
  .centent{
    padding: .2rem;
    background: transparent;
    .el-carousel__item{
      box-sizing: border-box;
      padding:10px;
      display: flex;
      justify-content:space-between;
      .carouselBox{
        width: 20%;
        color: #AAF5FE;
        text-align: center;
        img{
          width: 100%;
          height: 180px;
        }
        p{
          text-align: left;
          margin:10px 0;
          span{
            margin-right: 10px;
          }
        }
      }
    }

    .el-carousel__item h3 {
      color: #fff;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      /*background-color: #fff;*/
    }

    .el-carousel__item:nth-child(2n+1) {
      /*background-color: #fff;*/
    }
    .noiseBox{
      width: 100%;
      height:500px;
      box-sizing: border-box;
      padding-top: 0.5em;
      background: url("~@/assets/img/home/jiance.png") no-repeat;
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
</style>
