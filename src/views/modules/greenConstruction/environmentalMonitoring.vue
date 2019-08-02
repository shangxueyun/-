<template>
  <div class="environmentalMonitoring" :data="flgE" v-loading="environmentalMonitoringloading">
        <el-header height="50px">
            环境监测
        </el-header>
        <el-main style="width: 100%;padding: 14px 4px 0px 4px;" id="mainCont">
            <div class="content_left">
                <div class="weather">
                    <el-header height="60px">
                        天气情况<span style="float: right;font-size: 16px;color: #3DA7FA;font-weight: 400;"><i class="el-icon-thirdweizhi"></i>{{DayWeather.city}}</span>
                    </el-header>
                    <table border="0" cellspacing="0" cellpadding="0" style="width:100%">
                        <tr v-if="DayWeather.Day.length>0">
                            <td style="width: 54%;">
                                <!-- <i v-if="PingYin(DayWeather.time.weather).toLowerCase().l"></i> -->
                                <i :class="DayWeather.time.ioic" style="font-size: 56px;"></i>
                                <ul>
                                    <li><span>{{DayWeather.time.temperature}}&deg;</span><span>{{DayWeather.time.weather}}</span></li>
                                    <li><i style="margin-right: 10px;color:#2CFFFF" class="el-icon-thirdfeng"></i>{{DayWeather.time.windpower}}级</li>
                                </ul>
                            </td>
                            <td>明天<br><i :class="DayWeather.Day[1].ioic"></i><br>{{DayWeather.Day[1].dayweather}}</td>
                            <td>后天<br><i :class="DayWeather.Day[2].ioic"></i><br>{{DayWeather.Day[2].dayweather}}</td>
                        </tr>
                    </table>
                </div>
                <div class="temperature">
                    <el-header height="50px">
                    现场环境
                    </el-header>
                    <div style="padding: 0px 6px;margin-top: 4%;">
                        <div style="background:#199ED8;margin-right: 10px;" class="temperature_model">
                            <ul>
                                <li>温度</li>
                                <li>{{infoObj.temperature}}&deg;C</li>
                            </ul>
                            <i class="el-icon-thirdtemperature"></i>
                        </div>
                        <div style="background:#199ED8" class="temperature_model">
                            <ul>
                                <li>湿度</li>
                                <li>{{infoObj.humidity}}hpa</li>
                            </ul>
                            <i class="el-icon-thirdshidu"></i>
                        </div>
                        <div style="background:#1AB2D2;margin-right: 10px;" class="temperature_model">
                            <ul>
                                <li>PM &nbsp;2.5</li>
                                <li>{{infoObj.pm}}</li>
                            </ul>
                            <i class="el-icon-thirdapp_icons--"></i>
                        </div>
                        <div style="background:#EC5574" class="temperature_model">
                            <ul>
                                <li>PM &nbsp;10</li>
                                <li>{{infoObj.pm10}}</li>
                            </ul>
                            <i class="el-icon-thirdapp_icons--1"></i>
                        </div>
                        <div style="background:#1DD8D9;margin-right: 10px;" class="temperature_model">
                            <ul>
                                <li>噪音</li>
                                <li>{{infoObj.noise}}分贝</li>
                            </ul>
                            <i class="el-icon-thirdzaoyin"></i>
                        </div>
                        <div style="background:#F1956F" class="temperature_model">
                            <ul>
                                <li v-if="DayWeather.time.winddirection">{{DayWeather.time.winddirection}}风</li>
                                <li v-else>未知</li>
                                <li>{{infoObj.windSpeed}}级</li>
                            </ul>
                            <i class="el-icon-thirdfeng"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content_right">
                <div class="Day">
                    <el-header height="46px">
                        今日环境监测
                    </el-header>
                    <div v-show="!moreBouncedBle" class="line_chart" ref="line_chart"></div>
                </div>
                <div class="history">
                    <el-header height="46px">
                        历史环境查看
                        <span style="float: right;cursor: pointer;" @click="moreBouncedBle = true">更多</span>
                    </el-header>
                    <div class="tableDataList">
                        <el-table
                        :data="tableData"
                        header-row-class-name="table_line"
                        cell-class-name="table_line"
                        @cell-click="info"
                        style="width: 100%">
                        <el-table-column
                            prop="operationTime"
                            label="时间"
                            header-align="left"
                            align="left">
                        </el-table-column>
                        <el-table-column
                            prop="pm"
                            label="PM 2.5(ug/㎡)"
                            header-align="left"
                            align="left">
                        </el-table-column>
                        <el-table-column
                            prop="pm10"
                            header-align="left"
                            align="left"
                            label="PM 10(ug/㎡)">
                        </el-table-column>
                        <el-table-column
                            prop="noise"
                            header-align="left"
                            align="left"
                            label="噪音(分贝)">
                        </el-table-column>
                        </el-table>
                        <!-- <el-pagination
                            @size-change="sizeChangeHandle"
                            @current-change="currentChangeHandle"
                            :current-page="pageIndex"
                            :page-sizes="[5, 10, 15]"
                            :page-size="pageSize"
                            :total="totalPage"
                            layout="total, sizes, prev, pager, next, jumper">
                        </el-pagination> -->
                    </div>
                </div>
            </div>
        </el-main>

        <!-- 更多弹框 -->
        <div style="    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 11111111;
    left: 0;"
        v-if="moreBouncedBle"
        >
            <more-bounced :nameObj="nameObj" @moreBounced="moreBounced"></more-bounced>
        </div>
  </div>
</template>

<script>
import moreBounced from "../safe/models/moreBounced2"
import codefans_net_CC2PY from '@/assets/js/PinYin.js'
  export default {
    components: {
        moreBounced
    },
    data () {
      return {
        environmentalMonitoringloading:true,
        moreBouncedBle:false,
        PingYin:codefans_net_CC2PY,
        DayWeather:{
            city:'',
            Day:[],
            time:{
                temperature:'',
                weather:'',
                windpower:'',
                winddirection:'',
                ioic:''
            },
        },
        tableData:[],
        weatherIoic:[
            "el-icon-thirdxiaoyu",
            "el-icon-thirdxue",
            "el-icon-thirdqing",
            "el-icon-thirdleizhenyu",
            "el-icon-thirdyin",
            "el-icon-thirdbingbao",
            "el-icon-thirdyujiaxue",
            "el-icon-thirddaxue",
            "el-icon-thirddayu",
            "el-icon-thirdxiaoxue",
            "el-icon-thirdzhongxue",
            "el-icon-thirdduoyun",
            "el-icon-thirdfeng",],
        nameObj:{
            name:'历史环境查看',
            adornUrl:"/equipment/dustNoise/pageList",
            times:false,
            pageSize:10,
            pageList:[10],
            param:{
                prop:{
                      param1:'operationTime',
                      param2:'pm',
                      param3:'pm10',
                      param4:'noise',
                  },
                name:{
                    value1:'时间',
                    value2:'PM 2.5(ug/㎡)',
                    value3:'PM 10(ug/㎡)',
                    value4:'噪音(分贝)',
                }
            },
        },
        pageIndex: 1,
        pageSize: 6,
        totalPage: 0,
        infoObj:{
            temperature:'',
            humidity:'',
            windSpeed:'',
            noise:'',
            pm:'',
            pm10:'',
        },
        Line_option:{
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                x: 'center',
                textStyle: {
                color: '#333'
                },
                data:['PM 2.5',"PM 10","噪音"]
            },
            xAxis: {
                type : 'category',
                boundaryGap : false,
                axisLine: {onZero: false},
                data: [],
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
            },],
            series: [
                {
                    name:'PM 2.5',
                    type:'line',
                    animation: false,
                    itemStyle : {
                        normal : {
                        color : '#f2f2f2',
                        borderColor : '#f2f2f2 ',
                        borderWidth : 2
                        }
                    },
                    data: [0.5,0.8,1.0,3,2.5,0.68,0.78,0.79],
                },
                {
                    name:'PM 10',
                    type:'line',
                    animation: false,
                    itemStyle : {
                        normal : {
                        color : '#99FF00',
                        borderColor : '#99FF00 ',
                        borderWidth : 2
                        }
                    },
                    data: [0.50,3,6.5,4,9,6,7,1],
                },
                {
                    name:'噪音',
                    type:'line',
                    animation: false,
                    itemStyle : {
                        normal : {
                        color : '#00FFFF',
                        borderColor : '#00FFFF ',
                        borderWidth : 2
                        }
                    },
                    data: [20,40,60,50,80,100,50,70],
                },
            ]
        }
      }
    },
    created() {
        this.timeIimes();
    },
    watch:{
        flgE(val){
            let chart = echarts.init(this.$refs['line_chart']);
            chart.setOption(this.Line_option,true);
            chart.resize();
        },
    },
    computed: {
        flgE: {
        get () { return this.$store.state.common.documentClientWidth }
      },
    },
    mounted() {
        this.setOption();
    },
    methods: {
        timeIimes(){
            let vm = this;
            this.environmentalMonitoringloading = true;
            this.$http({
              url: this.$http.partyUrl('/equipment/dustNoise/getWeatherBase'),
              method: 'get',
              data: this.$http.adornData({})
            }).then(({data}) => {
                this.WeatherGetList();
                this.environmentalMonitoringloading = false;
                if (data && data.code === 0 && data.result.lives.length != 0) {
                    this.DayWeather.time = data.result.lives[0];
                    let vm = this;
                    this.weatherIoic.forEach((v,i)=>{
                        if(v.lastIndexOf(vm.PingYin(vm.DayWeather.time.weather).toLowerCase())>=0)
                        vm.DayWeather.time.ioic = v;
                    });
                } else {
                this.dataList = [];
                this.totalPage = 0
                }
            })
        },
        WeatherGetList(){
            this.environmentalMonitoringloading = true;
            this.$http({
              url: this.$http.partyUrl('/equipment/dustNoise/getWeatherAll'),
              method: 'get',
              data: this.$http.adornData({})
            }).then(({data}) => {
                this.TableListGet();
                this.environmentalMonitoringloading = false;
                if (data && data.code === 0 && data.result.forecasts.length != 0) {
                    //数据当前只有一条处理
                    if(data.result.forecasts.length>0 || data.result.forecasts[0].casts>0)
                    {
                        this.DayWeather.city = data.result.forecasts[0].city;
                        this.DayWeather.Day = data.result.forecasts[0].casts.slice(0);
                        let vm = this;
                        this.weatherIoic.forEach((v,i)=>{
                            if(v.lastIndexOf(vm.PingYin(vm.DayWeather.Day[1].dayweather).toLowerCase())>=0)
                            vm.DayWeather.Day[1].ioic = v;
                        });
                        this.weatherIoic.forEach((v,i)=>{
                            if(v.lastIndexOf(vm.PingYin(vm.DayWeather.Day[2].dayweather).toLowerCase())>=0)
                            vm.DayWeather.Day[2].ioic = v;
                        });
                    }
                } else {
                this.dataList = [];
                this.totalPage = 0
                }
            })
        },
        TableListGet(){
            this.environmentalMonitoringloading = true;
            this.$http({
              url: this.$http.partyUrl('/equipment/dustNoise/pageList'),
              method: 'post',
              data: this.$http.adornData({
                'pageNo': this.pageIndex,
                'pageSize': this.pageSize,
            })
            }).then(({data}) => {
                this.EchartDataGet();
                this.environmentalMonitoringloading = false;
                if (data && data.code === 0) {
                    if(data.result.list.length>0)
                    {
                        data.result.list.forEach((v,i)=>{
                            if(v.operationTime.lastIndexOf(".")>=0)
                            {
                                v.operationTime = v.operationTime.substring(0,v.operationTime.lastIndexOf("."))
                            }
                        });
                        this.tableData = [];
                        this.infoObj = this.emobj(data.result.list[0]);
                        this.tableData = data.result.list;
                        this.totalPage = data.result.totalCount;
                        this.pageIndex = data.result.currPage;
                    }
                } else {
                this.dataList = [];
                this.totalPage = 0
                }
            })
        },
        EchartDataGet(){
            this.environmentalMonitoringloading = true;
            this.$http({
              url: this.$http.partyUrl('/equipment/dustNoise/list'),
              method: 'post',
              data: this.$http.adornData({isToday:1})
            }).then(({data}) => {
                this.environmentalMonitoringloading = false;
                if (data && data.code === 0) {
                    let dataarr = data.result;
                    dataarr.forEach(()=>{});
                    //Line_option.xAxis.data[]//时间 createTime
                    //Line_option.series[0].data[]//PM 2.5 pm
                    //Line_option.series[1].data[]//PM 10 pm10
                    //Line_option.series[2].data[]//噪音noise
                    let arrT = [],arrPM1 = [],arrPM2 = [],arrZ = [];
                    arrPM1 = this.ArrforEach(dataarr,'pm');
                    arrPM2 = this.ArrforEach(dataarr,'pm10');
                    arrZ = this.ArrforEach(dataarr,'noise');
                    dataarr.forEach((v,i)=>{
                        for(let n in v)
                        {
                            if(n == "createTime")
                            {
                                var str = v[n];
                                arrT.push(str.substring(str.lastIndexOf(" ")+1));
                            }
                        }
                    });
                    this.Line_option.xAxis.data = arrT;
                    this.Line_option.series[0].data = arrPM1;
                    this.Line_option.series[1].data = arrPM2;
                    this.Line_option.series[2].data = arrZ;
                    this.setOption();
                }
            })
        },
        setOption(){
            let chart = echarts.init(this.$refs['line_chart']);
            chart.setOption(this.Line_option,true);
        },
        // 每页数
        sizeChangeHandle (val) {
            this.pageSize = val
            this.pageIndex = 1
            this.TableListGet()
        },
        // 当前页
        currentChangeHandle (val) {
            this.pageIndex = val
            this.TableListGet()
        },
        info(row, column, cell, event){
            this.infoObj = {};
            this.infoObj = this.emobj(row);
        },
        moreBounced(){
            this.moreBouncedBle = false;
        },
        emobj(obj){
            for(let i in obj)
            {
                if(i == "humidity" || i == "temperature" || i == "windSpeed")
                obj[i] = Number(obj[i]);
            }
            return obj;
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
.environmentalMonitoring{
    width: 100%;
    background: #0C4C5B;
    padding: 10px;
    position: relative;
    header{
        width: 100%;
        padding: 0 20px;
        line-height: 50px;
        background: #fff;
        -webkit-box-shadow: 4px 4px 6px -3px #000;
        color: #666;
        box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, .5);
        font-weight: 400;
        font-size: 18px;
        border-radius: 4px;
    }
    main{
        display: flex;
        .content_left{
            min-width: 364px;
            max-width: 368px;
            padding-bottom: 6px;
            .weather{
                width: 100%;
                height: 228px;
                background: #fff;
                margin-bottom: 20px;
                box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, .5);
                border-radius:4px;
                position: relative;
                header{
                    width: 100%;
                    padding: 0 20px;
                    line-height: 50px;
                    background: #fff;
                    color: #666;
                    font-weight: 400;
                    font-size: 18px;
                    position: absolute;
                    top: 0;
                    -webkit-box-shadow: none;
                    box-shadow: none;
                    border-radius: 4px 4px 0px 0px;
                    z-index: 1;
                }
                table{
                    width: 100%;
                    height: 168px;
                    background: rgba(12, 145, 249, 0.8);
                    position: absolute;
                    top: 60px;
                    border-radius: 0px 0px 4px 4px;
                    tr{
                        list-style: none;
                        td{
                            list-style: none;
                            padding: 0px 10px;
                            height: 162px;
                            border-right: 1px solid #fff;
                            text-align: center;
                            font-size: 16px;
                            color: #fff;
                        }
                        td:first-child{
                            font-size: 14px;
                            text-align: left;
                            .el-icon-thirdtianqi{
                                font-size: 56px;
                                float: left;
                                color: #fff;
                            }
                            ul{
                                margin: 0;
                                padding: 0;
                                float: right;
                                width: 56%;
                                li{
                                    list-style: none;
                                    line-height: 44px;
                                    color: #fff;
                                    span{
                                        text-align: left;
                                        display: inline-table;
                                        width: 52px;
                                    }
                                    span:first-child{
                                        text-align: left;
                                        width: 34px;
                                        font-size: 28px;
                                    }
                                }
                            }
                        }
                        td:last-child{
                            border-right: none;
                        }
                    }
                }
            }
            .temperature{
                width: 100%;
                float: left;
                color: #fff;
                min-height: 508px;
                background: #fff;
                box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, .5);
                border-radius: 4px;
                header{
                    box-shadow: none;
                    border-bottom: 1px solid #ccc;
                    border-radius: 4px 4px 0px 0px;
                    font-weight: 400;

                }
                .temperature_model{
                    width: 48.58%;
                    float: left;
                    height: 104px;
                    padding: 28px 22px;
                    margin-bottom: 10px;
                    ul{
                         margin: 0;
                        padding: 0;
                        width: 64%;
                        float: left;
                        li{
                            list-style: none;
                            font-size: 18px;
                        }
                    }
                    i{
                        font-size: 34px;
                        padding: 10px 0px;
                        width: 32%;
                        text-align: right;
                    }
                }
            }
        }
        .content_right{
            min-width: 590px;
            width: 76%;
            margin-left: 20px;
            .Day{
                width: 100%;
                height: 368px;
                margin-bottom: 20px;
                background: #fff;
                border-radius: 4px;
                box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, .5);
                header{
                    width: 100%;
                    padding: 0 20px;
                    line-height: 50px;
                    background: #fff;
                    font-weight: 400;
                    font-size: 18px;
                    border-radius: 4px 4px 0px 0px;
                    box-shadow: none;
                    border-bottom: 1px solid #ccc;
                }
                .line_chart{
                    width: 99%;
                    height: 304px;
                    padding: 0px 8px;
                    margin-top: 10px;
                }
            }
            .history{
                width: 100%;
                height: 368px;
                background: #fff;
                border-radius: 4px;
                box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, .5);
                header{
                    width: 100%;
                    padding: 0 20px;
                    line-height: 50px;
                    background: #fff;
                    font-weight: 400;
                    font-size: 18px;
                    border-radius: 4px 4px 0px 0px;
                    box-shadow: none;
                    border-bottom: 1px solid #ccc;
                }
                .tableDataList{
                    width: 100%;
                    height: 304px;
                    padding: 0px 8px;
                    margin-top: 10px;
                }
            }
        }
    }
}
.environmentalMonitoring{
    background: #fff;
}
.environmentalMonitoring header{
    width: 100%;
    padding: 0 20px;
    line-height: 50px;
    background: #fff;
    -webkit-box-shadow: 4px 4px 6px -3px #000;
    color: #666;
    box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, .5);
    font-weight: 700;
    font-size: 18px;
    border-radius: 4px;
}
.environmentalMonitoring main .content_left .weather{
    background: transparent;
    -webkit-box-shadow: 4px 4px 6px -3px #000;
    color: #666;
    box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, .5);
    border-radius: 4px;
}


</style>
<style>
.environmentalMonitoring .el-table__header th,.environmentalMonitoring .el-table__header tr {
    color: #333;
    background: #fff;
    font-weight: 400;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
}
.environmentalMonitoring .el-table__body td,.environmentalMonitoring  .el-table__body th{
    padding: 6px 0px;
    color: #333;
    background: #fff;
    font-weight: 400;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
}

/* 设置表头的高度 */

.environmentalMonitoring .el-table__header td,.environmentalMonitoring  .el-table__header th{
padding:6px 0px;
}

/* 设置分页器的高度 */

.environmentalMonitoring .site-wrapper .el-pagination {
margin-top: 5px;
text-align: right;
}

.environmentalMonitoring .el-pager li.active {
color: #080909;
cursor: default;
background-color: #17B3A3;
border-radius: 2px;
}
.environmentalMonitoring .el-table__empty-block{
    background: #fff;
    border-top: 1px solid #666;
}
.environmentalMonitoring .el-table::before {
    height: 0px;
}
.environmentalMonitoring .el-range-editor--medium.el-input__inner {
    background: transparent;
}
.environmentalMonitoring .el-range-editor--medium .el-range-input {
    background: transparent;
    color: #fff;
}
.environmentalMonitoring .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff !important;
}
.environmentalMonitoring .el-pagination__sizes>div{
    display: none;
}
.environmentalMonitoring .el-pagination__sizes{
    min-width: 0 !important;
}
.environmentalMonitoring .el-table{
    background-color: transparent;
}
</style>

