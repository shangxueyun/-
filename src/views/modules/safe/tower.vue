<template>
  <div class="tower" v-if="towerTRUE" style="background: #0C4C5B;padding: 10px;" v-loading="towerloading">
        <el-header height="40px">
          <div class="towertitle">
              <span class="el-dropdown-link" style="float: left;font-size: 16px;">
                {{no+"#塔机"}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <ul class="towlsul">
                  <li>设备编号：<i>{{equipmentCode}}</i> <span>{{equipmentstatus}}</span></li>
                  <li>最近操作：&nbsp;{{dateDay}}  {{present.driverName}}  <a href="javascript:void(0);" @click="moreBouncedBle = true">更多考勤</a> </li>
              </ul>
              <div class="towout" style="    text-align: right;
    padding-right: 32px;">
                  数据获取时间：&nbsp;&nbsp;&nbsp;&nbsp;<span>{{dateDay}}</span>
              </div>
          </div>
        </el-header>
        <el-main style="padding:14px 6px 6px 6px;width: 100%;">
          <div class="top_content">
            <div style="width: 99%;height: 450px;padding-right: 6px;">
              <div class="left">
                <div class="info_left">
                  <img v-if="present.headPortrait" :src="'data:image/png;base64,'+present.headPortrait" alt="">
                  <img v-else src="~@/assets/img/portrait.png" alt="">
                  <ul>
                    <li>操作员: <span>{{present.driverName}}</span></li>
                    <li>性别: <span>{{present.sex}}</span></li>
                    <li>籍贯: <span>{{present.nativePlace}}</span></li>
                    <li>联系方式: <span>{{present.mobile}}</span></li>
                    <li>身份证号: <span>{{present.idCardNo}}</span></li>
                  </ul>
                </div>
                <div class="info_right">
                  <ul>
                    <li>
                      <p>No.1 重量</p>
                      <p>{{realTimeObj.weight}}<span style="font-size:18px">t</span></p>
                      <el-progress class="progress" color="#24DEA0" :percentage="realTimeObj.weightPercentage"></el-progress>
                    </li>
                    <li>
                      <p>No.2 力矩</p>
                      <p>{{realTimeObj.moment}}<span style="font-size:18px">N-m</span></p>
                      <el-progress class="progress" color="#24DEA0" :percentage="realTimeObj.momentPercentage"></el-progress>
                    </li>
                    <li>
                      <p>No.3 幅度</p>
                      <p>{{realTimeObj.towerRange}}<span style="font-size:18px">m</span></p>
                      <el-progress class="progress" color="#24DEA0" :percentage="realTimeObj.towerRangePercentage"></el-progress>
                    </li>
                    <li>
                      <p>No.4 高度</p>
                      <p>{{realTimeObj.height}}<span style="font-size:18px">m</span></p>
                      <el-progress class="progress" color="#24DEA0" :percentage="realTimeObj.heightPercentage"></el-progress>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="center">
                <div class="left">

                </div>
                <div class="right">
                  <div class="img"></div>
                  <div style="width: 84%;margin: 0 auto;height: 1px;background: #00E4FF;"></div>
                  <p>回转{{realTimeObj.endRotation - realTimeObj.beginRotation}}&deg;</p>
                  <ul>
                    <li>风级 0.95 <i></i></li>
                    <li>倾角<span>X 0度</span><span>Y 0度</span></li>
                  </ul>
                </div>
              </div>              
            </div>
            <div>
              <!--  -->
              <div class="bottom_content">
                <p>实时统计</p>
                <div class="chart_div">
                  <!-- <ul>
                    <li>吊重</li>
                    <li>力矩</li>
                  </ul> -->
                  <div class="echarts_" ref="line_chart"></div>
                </div>
              </div>
            </div>

          </div>
          <div class="right_model" :style="{height:offsetHeight}">
              <div class="right_model_top">
                <p>设备状态</p>
                <div class="status_left">
                  <ul>
                    <li style="border-right: 1px solid #eee;border-bottom: 1px solid #eee;">{{EquipmentStatusObj.DayAlert}}
                      <br>
                      今日报警
                    </li>
                    <li style="border-bottom: 1px solid #eee;">{{EquipmentStatusObj.AbnormalPower}}
                      <br>
                      非正常断电
                    </li>
                    <li style="    border-right: 1px solid #eee;">{{EquipmentStatusObj.DayIllegal}}
                      <br>
                      今日违章
                    </li>
                    <li>{{EquipmentStatusObj.DayMalfunction}}
                      <br>
                      今日故障
                    </li>
                  </ul>
                </div>
              </div>
              <div class="right_model_top" style="height: 532px;margin: 0;">
                <p>人员考勤 <span style="text-align: center"><a href="javascript:void(0);" style="float: right;" @click="moreBouncedBle = true">更多</a> </span></p>
                <ul class="head">
                  <li>照片</li>
                  <li>姓名</li>
                  <li>时间</li>
                </ul>
                <!-- daata -->
                <div class="dataList_div">
                  <table  border="0" cellspacing="0" cellpadding="0" style="width:100%">
                    <tr style="border-bottom: 1px solid;" v-for="(item,key) in driverList" :key="key" @click="driverListInfo(item)">
                      <td><img style="height: 66px;margin-left: 8px;" :src="'data:image/png;base64,'+item.headPortrait" alt=""></td>
                      <td>{{item.driverName}}</td>
                      <td>{{item.createTime}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
        </el-main>
        
        <span @click="tower" class="clone">X</span>

        <!-- 更多弹框 -->
        <div style="    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 11111111;
    left: 0;"
        v-if="moreBouncedBle"
        >
            <more-bounced :nameObj="nameObjinfo" @moreBounced="moreBounced"></more-bounced>
        </div>
  </div>
</template>

<script>
import moreBounced from "../safe/models/moreBounced2"
import { dateFormat } from '@/utils'
  export default {
    components: {
        moreBounced
    },
    data () {
      return {
          dateDay:'',
          offsetHeight:'',
          indexB:0,
          towerTRUE:true,
          no:this.nameObj.no,
          equipmentCode:this.nameObj.name,
          equipmentstatus:this.nameObj.status,
          towerloading:false,
          present:{
            driverName:'',
            sex:'',
            nativePlace:'',
            mobile:'',
            idCardNo:'',
            idCardNo:'',
            headPortrait:''
          },
          driverList:[],
          EquipmentStatusObj:{
            DayAlert:0,
            AbnormalPower:0,
            DayIllegal:0,
            DayMalfunction:0,
          },
          realTimeObj:{
            weight:'',
            ratedWeight:'',
            moment:'',
            ratedMoment:'',
            towerRange:'',
            height:'',
            towerCraneHeight:'',
            beginRotation:'',
            towerCraneHeight:'',
            weightPercentage:0,
            momentPercentage:0,
            towerRangePercentage:0,
            heightPercentage:0,
            endRotation:'',
            beginRotation:'',
          },
          nameObjinfo:{
              name:'人员考勤',
              adornUrl:"/equipment/towerCraneDriversLog/listPage",
              height:true,
              times:false,
              pageSize:5,
              pageList:[5],
              Obj:{
                'equipmentCode':this.nameObj.name
              },
              param:{
                  prop:{
                      param1:'headPortrait',
                      param2:'driverName',
                      param3:'createTime',
                  },
                  name:{
                      value1:'照片',
                      value2:'姓名',
                      value3:'时间',
                  }
              },
          },
          moreBouncedBle:false,
          chart_line:{
            grid: {
                top:'20%',
                left: '6%',
                right: '8%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#666'
                    }
                }
            },
            legend: {
                x: 'center',
                textStyle: {
                color: '#666'
                },
                data:['吊重',"力矩"]
            },
            xAxis: {
                type : 'category',
                boundaryGap : false,
                axisLine: {onZero: false},
                data: [],
                axisLabel: {
                    show: true,
                    textStyle: {
                    color: '#666',  //更改坐标轴文字颜色
                        fontSize : 14      //更改坐标轴文字大小
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine:{
                        lineStyle:{
                            color:'#666' //更改坐标轴颜色
                        }
                },
            },
                dataZoom: [
                {
                    show: false,
                    realtime: true,
                },
                {
                    type: 'inside',
                    realtime: true,
                }
            ],
            yAxis : [{
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                    color: '#666',  //更改坐标轴文字颜色
                    fontSize : 14      //更改坐标轴文字大小
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine:{
                        lineStyle:{
                            color:'#666' //更改坐标轴颜色
                        }
                },
                splitLine: {     //网格线
                    show: false
                }
            },],
            series: [
                {
                    name:'吊重',
                    type:'line',
                    animation: false,
                    itemStyle : {
                        normal : {
                        color : '#16FFE6',
                        borderColor : '#16FFE6 ',
                        borderWidth : 2
                        }
                    },
                    data: [0.5,0.8,1.0,3,2.5,0.68,0.78,0.79],
                },
                {
                    name:'力矩',
                    type:'line',
                    animation: false,
                    itemStyle : {
                        normal : {
                        color : '#24DEA0',
                        borderColor : '#24DEA0 ',
                        borderWidth : 2
                        }
                    },
                    data: [0.50,3,6.5,4,9,6,7,1],
                },
            ]
        }
      }
    },
    props: {
      nameObj: {
        type: Object,
        required: true
      },
    },
    created() {
        // var date = new Date().toISOString().replace(/T/g," ");
        // this.dateDay = date.substring(0,date.lastIndexOf("."))
        this.offsetHeight = (this.$store.state.common.documentClientHeight - 206) + "px";
        this.DriverList();
        //body
        document.getElementsByClassName("el-card__body")[0].parentElement.style.overflow = "auto";
    },
    computed: {

    },
    mounted() {
      this.setOption();
    },
    methods: {
        //关闭自己回调函数
        tower(){
          this.towerTRUE = false;
          document.getElementsByClassName("el-card__body")[0].parentElement.style.overflow = "hidden";
          document.getElementsByClassName("el-card__body")[0].style.width = "100%";
          this.$emit('tower');
        },
        moreBounced(){
            this.moreBouncedBle = false;
        },
        setOption(){
            let chart = echarts.init(this.$refs['line_chart']);
            chart.setOption(this.chart_line,true);
        },
        DriverList(){
          this.towerloading = true;
          this.$http({
            url: this.$http.partyUrl('/equipment/towerCraneDriversLog/listPage'),
            method: 'post',
            data: this.$http.adornData({
                'pageNo': 1,
                'pageSize': 5,
                'param':{
                  'equipmentCode':this.nameObj.name
                }
            })
          }).then(({data}) => {
            this.EquipmentStatus(this.nameObj.name);
              this.towerloading = false;
              if (data && data.code === 0) {
                if(data.result.list.length>0)
                this.present = data.result.list[this.indexB]
                this.driverList = data.result.list;
              } else {
              this.driverList = []
              }
          })
        },
        driverListInfo(obj){
          this.present = [];
          this.present = JSON.parse(JSON.stringify(obj));
        },
        EquipmentStatus(id){
          this.towerloading = true;
          this.$http({
            url: this.$http.partyUrl('/equipment/towerCraneException/todayExceptionGroup/'+id),
            method: 'post',
            data: this.$http.adornData({})
          }).then(({data}) => {
            this.historicalData(id);
              this.towerloading = false;
              if (data && data.code === 0&&data.result.length != 0) {
                let arr = data.result;
                let vm = this;
                arr.forEach((v,i)=>{
                  if(v.type == "1")
                  vm.EquipmentStatusObj.AbnormalPower = vm.EquipmentStatusObj.AbnormalPower+v.count;
                  else if(v.type == "2")
                  vm.EquipmentStatusObj.DayAlert = vm.EquipmentStatusObj.DayAlert+v.count;
                  else if(v.type == "3")
                  vm.EquipmentStatusObj.DayIllegal = vm.EquipmentStatusObj.DayIllegal+v.count;
                  else if(v.type == "4")
                  vm.EquipmentStatusObj.DayMalfunction = vm.EquipmentStatusObj.DayMalfunction+v.count;
                });
              }
          })
        },
        historicalData(id){
          this.towerloading = true;
          this.$http({
            url: this.$http.partyUrl('/equipment/towerCraneLog/list/'+id),
            method: 'post',
            data: this.$http.adornData({})
          }).then(({data}) => {
            this.realTime(id);
              this.towerloading = false;
              if (data && data.code === 0&&data.result.length != 0) {
                //图表展示
                    let dataarr = data.result;
                    dataarr.forEach(()=>{});
                    //Line_option.xAxis.data[]//时间 createTime
                    //Line_option.series[0].data[]//PM 2.5 pm
                    //Line_option.series[1].data[]//PM 10 pm10
                    let arrT = [],arrZ = [],arrL = [];
                    arrZ = this.ArrforEach(dataarr,'weight');
                    arrL = this.ArrforEach(dataarr,'moment');
                    dataarr.forEach((v,i)=>{
                        for(let n in v)
                        {
                            if(n == "operationTime")
                            {
                                var str = v[n];
                                arrT.push(str.substring(0,str.lastIndexOf(".")));
                            }
                        }
                    });
                    this.chart_line.xAxis.data = arrT;
                    //数据获取时间
                    this.dateDay = arrT[arrZ.length-1];
                    this.chart_line.series[0].data = arrZ;
                    this.chart_line.series[1].data = arrL;
                    this.setOption();
              }
          })
        },
        realTime(id){
          this.towerloading = true;
          this.$http({
            url: this.$http.partyUrl('/equipment/towerCrane/infoByEquipmentCode/'+id),
            method: 'post',
            data: this.$http.adornData({})
          }).then(({data}) => {
              this.towerloading = false;
              if (data && data.code === 0) {
                if(data.result)
                {
                  let vm = this;
                  vm.realTimeObj = data.result;
                  if(Number((Number(((vm.realTimeObj.weight*1000)/(vm.realTimeObj.ratedWeight*1000)).toFixed(2))*100).toFixed(0))-100>0)
                  vm.realTimeObj.weightPercentage = 100
                  else
                  vm.realTimeObj.weightPercentage =  Number((Number(((vm.realTimeObj.weight*1000)/(vm.realTimeObj.ratedWeight*1000)).toFixed(2))*100).toFixed(0));
                  if(Number((Number(((vm.realTimeObj.moment*1000)/(vm.realTimeObj.ratedMoment*1000)).toFixed(2))*100).toFixed(0))- 100>0)
                  vm.realTimeObj.momentPercentage = 100
                  else
                  vm.realTimeObj.momentPercentage = Number((Number(((vm.realTimeObj.moment*1000)/(vm.realTimeObj.ratedMoment*1000)).toFixed(2))*100).toFixed(0));
                  //幅度
                  if(Number((Number(((vm.realTimeObj.towerRange*1000)/(vm.realTimeObj.armLength*1000)).toFixed(2))*100).toFixed(0)) - 100 >0)
                  vm.realTimeObj.towerRangePercentage = 100
                  else
                  vm.realTimeObj.towerRangePercentage = Number((Number(((vm.realTimeObj.towerRange*1000)/(vm.realTimeObj.armLength*1000)).toFixed(2))*100).toFixed(0));
                  if(Number((Number(((vm.realTimeObj.height*1000)/(vm.realTimeObj.towerCraneHeight*1000)).toFixed(2))*100).toFixed(0)) - 100 >0)
                  vm.realTimeObj.heightPercentage = 100
                  else
                  vm.realTimeObj.heightPercentage = Number((Number(((vm.realTimeObj.height*1000)/(vm.realTimeObj.towerCraneHeight*1000)).toFixed(2))*100).toFixed(0));
                }
              }
          })
        },
        ArrforEach(arr,str){
            let arrS = [];
            arr.forEach((v,i)=>{
                for(let n in v)
                {
                    if(n == str)
                    arrS.push(v[n]);
                }
            });

            return arrS;
        },
    },
  }
</script>

<style lang="scss" scoped>
.tower{
  width: 1604px;
  background: #fff !important;
  padding: 10px;
  position: relative;
  header{
    width: 100%;
    padding: 0 20px;
    line-height: 40px;
    background: #fff;
    -webkit-box-shadow: 4px 4px 6px -3px #000;
    color: #666;
    box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, .5);
    font-weight: 400;
    font-size: 18px;
    border-radius: 4px;
    .towertitle{
      height:30px;
      padding:0 10px;
      .menusdropdown{
        color: #4CD4A2;
        cursor: pointer;
        float: left;
        font-size: 18px;
        font-weight: 700;
      }
      .towlsul{
        float: left;
        list-style: none;
        padding:0;
        margin:0;
        li{
          display: inline-table;
          margin-left: 16px;
          width: auto;
          font-size: 15px;
          color: #4CD4A2;
          i{
            font-style: normal;
            margin-left: 10px;
          }
          span{
            margin: 0 0 0 20px;
          }
        }
        li:last-child{
          margin-left: 20px;
          color: #666;
          a{
            padding-left: 10px;
          }
        }
      }
      .towout{
        float: right;
        line-height: 40px;
        font-size: 16px;
        color: #666;
        font-weight: 400;
        margin-right: 18px;
      }
    } 
  }
  main{
    position: relative;
    display: flex;
    .top_content{
        width: 1262px;
        float: left;
        .left{
          width: 410px;
          height: 450px;
          float: left;
          background: #fff;
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, .5);
          border-radius: 4px;
          .info_left{
            width: 60%;
            float: left;
            height: 100%;
            img{
              height: 176px;
              margin: 10px 0px 0px 20%;
            }
            ul{
              margin: 0;
              padding: 10px 6px;
              li{
                list-style: none;
                line-height: 48px;
                color: #666;
                font-size: 16px;
                font-weight: 400;
                span{
                  font-size: 16px;
                  font-weight: 100;
                }
              }
            }
          }
          .info_right{
            float: right;
            width: 40%;
            height: 100%;
            ul{
              margin: 0;
              padding: 0;
              margin-top: 10px;
              li{
                list-style: none;
                line-height: 104px;
                width: 97%;
                background: #fff;
                padding: 6px;
                margin-bottom: 8px;
                box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, .5);
                p:first-child{
                line-height: 30px;
                margin: 0;
                font-size: 16px;
                color: #24DEA0;
                }
                p:nth-child(2){
                line-height: 38px;
                margin: 0;
                text-align: right;
                font-size: 30px;
                padding-right: 6px;
                color: #666;
                letter-spacing: -1px;
                }
                .progress{
                  width: 100%;
                }
              }
            }
          }
        }
        .center{
          width: 814px;
          height: 450px;
          float: right;
          background: #fff;
          border-radius: 4px;
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, .5);
          .left{
            width: 60%;
            background: url(~@/assets/img/tower_img.png) no-repeat;
            background-size: 100% 100%;
            float: left;
          }
          .right{
            width: 40%;
            height: 100%;
            float: right;
            background: #fff;
            -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
            box-shadow: 0px 0px 3px -1px rgba(0, 0, 0, 0.5);
            border-radius: 0px 4px 4px 0px;
            .img{
              width: 89%;
              height: 282px;
              margin: 18px;
              background: url(~@/assets/img/zhuan.png) no-repeat;
              background-size: 100% 100%;
            }
            p{
              list-style: none;
              line-height: 44px;
              margin: 0;
              text-align: center;
              color: #666666;
              font-size: 22px;
              margin-top: 12px;
              letter-spacing: 2px;
            }
            ul{
              margin: 0;
              padding: 0;
              width: 68%;
              height: 20px;
              margin: 0 auto;
              li{
                list-style: none;
                float: left;
                line-height: 68px;
                font-size: 21px;
                color: #666;
                letter-spacing: 1px;
                position: relative;
                padding-right: 18px;
                padding-left: 10px;
                span{
                  color: #666;
                  display: block;
                  line-height: 20px;
                  position: absolute;
                  top: 12px;
                  left: 58px;
                  width: 60px;
                  font-size: 14px;
                }
                span:last-child{
                  top: 34px;
                  left: 58px;
                }
              }
              li:first-child{
                i{
                  position: absolute;
                  top: 23px;
                  right: 0;
                  display: block;
                  width: 2px;
                  height: 24px;
                  background: #ccc;
                }
              }
            }
          }
        }
        .bottom_content{
          width: 98.5%;
          margin-top: 14px;
          height: 268px;
          background: #fff;
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, .5);
          border-radius: 4px;
          .chart_div{
            height: 86%;
            ul{
            margin: 0;
            padding: 0;
            width: 120px;
            height: 194px;
            float: left;
            margin-top: 6px;
            li{
              list-style: none;
              line-height: 48px;
              text-align: center;
              color: #22F9E1;
              font-size: 18px;
              background: #0E5763;
            }
            }
            .echarts_{
                width: 100%;
                float: right;
                height: 230px;
            }
          }
        }
    }
  .right_model{
    width: 302px;
    height: 100%;
    float: right;
    background: #fff;
    .right_model_top{
          clear: both;
          height: 180px;
          margin-bottom: 20px;
          box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, .5);
          border-radius: 4px;
        .status_left{
            width: 100%;
            margin-top: 10px;
            float: left;
          ul{
              margin: 0;
              padding: 0;
              border-right: 1px solid rgba(238, 238, 238, .5);
              padding: 0px 16px;
            li{
            list-style: none;
            text-align: center;
            color: #666;
            font-size: 14px;
            line-height: 28px;
            float: left;
            width: 50%;
            }
          }
        }
        .status_right{
            width: 49%;
            margin-top: 10px;
            float: left;
          ul{
              margin: 0;
              padding: 0;
              padding: 0px 16px;
            li{
              list-style: none;
              text-align: center;
              color: #f2f2f2;
              font-size: 14px;
              line-height: 28px;
            }
          }
        }
      .head{
          margin: 0;
          padding: 0;
          width: 100%;
          height: 34px;
          margin-top: 10px;
          padding: 0px 6px;
          border-bottom: 1px solid #ccc;
        li{
          list-style: none;
          width: 33%;
          float: left;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          color: #666;
        }
      }
      .dataList_div{
          width: 100%;
          height: 452px;
          clear: both;
          padding-top: 8px;
          overflow: hidden;
          tr{
            height: 88px;
            border-bottom: 1px solid #ccc !important;
          }
          tr:nth-child(5){
            border-bottom: none !important;
          }
          td{
            color: #666;
            text-align: center;
            width: 120px;
            max-width: 111px;WORD-WRAP: break-word;
          }
          ul{
          margin: 0;
          padding: 0;
          width: 100%;
          padding: 0px 6px;
            li{
              list-style: none;
              width: 33%;
              float: left;
              text-align: center;
              font-size: 16px;
              color: #f2f2f2;
              border-bottom: 1px solid #333;
              position: relative;
            }
          }
      }
    }
  }
  }
}
.right_model .right_model_top>p,.bottom_content>p{
  list-style: none;
  margin: 0;
  line-height: 34px;
  background: #fff;
  padding: 0px 8px;
  color: #666;
  border-radius: 4px 4px 0px 0px;
  border-bottom: 1px solid #ccc;
}
.tower .clone{
    position: absolute;
    top: 18px;
    right: 18px;
    display: block;
    width: 22px;
    color: #fff;
    height: 22px;
    background: #ccc;
    text-align: center;
    border-radius: 12px;
    cursor: pointer;
}
</style>
<style>
.tower .el-progress-bar>div {
  height: 14px !important;
    width: 110px;
}
.tower .el-progress__text {
    color: #666;
    margin-left: 18px;
}
</style>


