<template>
    <div class="overGuard" :data="flgE" v-loading="overGuardloading">
        <el-header height="40px">
            <div class="left">
                <h3>悬挑钢平台</h3>
                <p>设备编号：{{titleName}}</p>
            </div>
            <div class="right">
                <p style="    text-align: right;
    padding-right: 32px;">数据获取时间：&nbsp;&nbsp;&nbsp;&nbsp;<span>{{dateDay}}</span></p>
            </div>
        </el-header>
        <el-main style="padding:4px;width: 100%;display: flex;overflow: hidden;" id="mainCont">
            <div class="h3_left">
                <el-header height="40px">
                    设备状态
                </el-header>
                <div class="status_div">
                    <p>当前荷载</p>      
                    <p v-if="present == '' || present == undefined"></p>                
                    <p v-else>
                        <span v-if="present-50>0" style="color:#FF0000">{{present}} T</span>
                        <span v-else>{{present}} T</span>
                    </p>                
                </div>
                <div class="status_div">
                    <p>额定重量</p>
                    <p>50 T</p>                    
                </div>
            </div>
            <div class="echarst_right" >
                <div class="model_top">
                    <el-header height="40px">
                        今日平台荷载
                    </el-header>
                    <div class="echars_div" ref="line_echars"></div>
                </div>
                <div class="model_bottom">
                    <el-header height="40px">
                        历史荷载
                        <div style="width: 332px;height: 100%;float: right;">
                            <el-date-picker
                            v-model="HistoricalLoadV"
                            @change="HistoricalLoad"
                            type="daterange"
                            range-separator="-"
                            value-format='yyyy-MM-dd'
                            start-placeholder="开始时间"
                            end-placeholder="结束时间">
                            </el-date-picker>
                        </div>
                    </el-header>
                    <div class="datalist_div">
                        <el-table
                        :data="tableData"
                        header-row-class-name="table_line"
                        cell-class-name="table_line"
                        style="width: 100%">
                        <el-table-column
                            prop="operationTime"
                            label="时间"
                            header-align="left"
                            align="left">
                        </el-table-column>
                        <el-table-column
                            prop="eqmLoad"
                            label="荷载(t)"
                            header-align="left"
                            align="left">
                        </el-table-column>
                        <el-table-column
                            prop="isWeight"
                            header-align="left"
                            align="left"
                            label="是否超重">
                        </el-table-column>
                        </el-table>
                        <div v-if="tableData.length>0" style="height: 32px;padding-top: 6px;">
                            <el-pagination
                                @size-change="sizeChangeHandle"
                                @current-change="currentChangeHandle"
                                :current-page="pageIndex"
                                :page-sizes="[5, 10, 15]"
                                :page-size="pageSize"
                                :total="totalPage"
                                layout="total, sizes, prev, pager, next, jumper">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </div>
</template>

<script>
import { dateFormat } from '@/utils'
  export default {
    components: {
    },
    data () {
      return {
          overGuardloading:false,
          offsetWidth:0,
          dateDay:'',
          titleName:this.nameObj.name,
          tableData:[],
          present:'',
          chart_line:{
            grid: {
                left: '6%',
                right: '4%',
                bottom: '4%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#505765'
                    }
                }
            },
            legend: {
                x: 'center',
                textStyle: {
                color: '#333'
                },
                data:['荷载']
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
                name:'(t)',
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
                    name:'荷载',
                    type:'line',
                    animation: false,
                    areaStyle: {
                    },
                    itemStyle : {
                        normal : {
                        color : 'rgb(0,136,212)',
                        borderColor : 'rgb(0,136,212)',
                        borderWidth : 2
                        }
                    },
                    data: [20,40,60,50,80,100,50,70],
                },
            ]
        },
            HistoricalLoadV:'',
            pageIndex: 1,
            pageSize: 5,
            totalPage: 0,

      }
    },
    props: {
      nameObj: {
        type: Object,
        required: true
      },
    },
    created() {
        var date = new Date().toISOString().replace(/T/g," ");
        this.dateDay = date.substring(0,date.lastIndexOf("."))
        this.getList();
        this.EchartsGet(this.nameObj.name);
    },
    watch:{
        flgE(val){
            let chart = echarts.init(this.$refs['line_echars']);
            chart.setOption(this.chart_line,true);
            chart.resize();
        },
    },
    computed: {
        flgE: {
        get () { return this.$store.state.common.documentClientWidth }
      },
    },
    mounted() {

        this.offsetWidth = (document.getElementById("mainCont").offsetWidth - 364) + "px";
        this.setOption();
        this.$refs['line_echars'].children[0].style.width = "100%";
    },
    methods: {
        //关闭自己回调函数
        overGuard(){
            this.$emit('overGuard');
        },
        getList(){
            if(this.HistoricalLoadV != "")
            var obj = {startTime:this.HistoricalLoadV[0],endTime:this.HistoricalLoadV[1],equipmentCode:this.nameObj.name}
            else
            var obj = {equipmentCode:this.nameObj.name};
            this.overGuardloading = true;
            this.$http({
              url: this.$http.partyUrl('/equipment/cantileverSteel/pageList'),
              method: 'post',
              data:this.$http.adornData({
              'pageNo': this.pageIndex,
              'pageSize': this.pageSize,
              'param':obj
              })
            }).then(({data}) => {
                this.overGuardloading = false;
                if (data && data.code === 0) {
                this.tableData = data.result.list;
                this.totalPage = data.result.totalCount;
                this.pageIndex = data.result.currPage;
                } else {
                this.dataList = [];
                this.totalPage = 0
                }
            })
        },
        EchartsGet(id){
            this.overGuardloading = true;
            this.$http({
              url: this.$http.partyUrl('/equipment/cantileverSteel/list'),
              method: 'post',
              data: this.$http.adornData({
                isToday:1,
                equipmentCode:id,
            })
            }).then(({data}) => {
                this.overGuardloading = false;
                if (data && data.code === 0) {
                    let dataarr = data.result;
                    //Line_option.xAxis.data[]//时间 createTime
                    //Line_option.series[0].data[]//PM 2.5 pm
                    if(dataarr.length>0)
                    {
                        this.present = Number(dataarr[0].eqmLoad);
                        let arrT = [],arrH = [];
                        arrH = this.ArrforEach(dataarr,'eqmLoad');
                        dataarr.forEach((v,i)=>{
                            for(let n in v)
                            {
                                if(n == "operationTime")
                                {
                                    var str = v[n];
                                    arrT.push(v[n]);
                                }
                            }
                        });
                        this.chart_line.xAxis.data = arrT;
                        this.chart_line.series[0].data = arrH;
                        this.setOption();
                    }
                } else {
                this.dataList = []
                }
            })
        },
        // 每页数
        sizeChangeHandle (val) {
            this.pageSize = val
            this.pageIndex = 1
            this.getList()
        },
        // 当前页
        currentChangeHandle (val) {
            this.pageIndex = val
            this.getList()
        },
        random(){
            return {top:(498 - (Math.floor(Math.random()*392)))+"px",left:(1058 - (Math.floor(Math.random()*664)))+"px"}
        },
        enter(e){
            e.target.children[1].style.display = "block"
        },
        leave(e){
           e.target.children[1].style.display = "none"
        },
        setOption(){
            let chart = echarts.init(this.$refs['line_echars']);
            chart.setOption(this.chart_line,true);
        },
        HistoricalLoad(val){
            if(!val)
            {
                this.pageIndex = 1;
                this.HistoricalLoadV = "";
                this.getList();
            }
            else{
                this.pageIndex = 1;
                this.getList();
            }
        },
        ArrforEach(arr,str){
            let arrS = [];
            arr.forEach((v,i)=>{
            for(let n in v)
            {
                if(n == str)
                arrS.push(Number(v[n]));
            }
            });

            return arrS;
        },
    },
  }
</script>

<style lang="scss" scoped>
.overGuard{
    padding: 10px;
    height: 100%;
    overflow: auto;
    background: #fff;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    header{
        width: 100%;
        margin-bottom: 14px;
        padding: 0 20px;
        line-height: 40px;
        background: #fff;
        color: #666;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, .5);
        font-weight: 400;
        font-size: 18px;
        border-radius: 4px;
        .left{
            float: left;
            width: 330px;
            h3{
                width: 32%;
                line-height: 36px;
                float: left;
                font-weight: 400;
                font-style: normal;
                font-size: 18px;
                color: #666;
            }
            p{
                float: right;
                line-height: 38px;
                width: 68%;
                font-size: 14px;
                color: #00CC66;
                margin: 0;
            }
        }
        .right{
            float: right;
            width: 318px;
            p{
                font-size: 16px;
                color: #666;
                margin: 0;
            }
        }
    }
    .h3_left{
        width: 340px;
        float: left;
        header{
            font-size: 16px;
            color: #666;
            font-weight: 400;
        }
        .status_div{
            width: 100%;
            margin-top: 20px;
            height: 330px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
            p:first-child{
                line-height: 40px;
                margin: 0;
                font-size: 15px;
                color: #666;
                font-weight: 400;
                padding: 0px 10px;
                border-bottom: 1px solid #ccc;
            }
            p:last-child{
                line-height: 248px;
                font-size: 74px;
                margin: 0;
                text-align: center;
                font-weight: 600;
                color: #00CC66;
            }
        }
    }
    .echarst_right{
        width: 77%;
        margin-left: 20px;
        .model_top{
            width: 100%;
            height: 390px;
            margin-bottom: 20px;
            header{
                line-height: 40px;
                color: #666;
                font-size: 16px;
                font-weight: 400;
            }
            .echars_div{
                width: 100%;
                height: 330px;
                margin-top: 20px;
                background: #fff !important;
                box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, .5);
                border-radius: 4px;
            }
        }
        .model_bottom{
            width: 100%;
            height: 328px;
            header{
                line-height: 40px;
                color: #666;
                font-size: 16px;
                font-weight: 400;
            }
            .datalist_div{
                width: 100%;
                height: 270px;
                padding: 4px;
                margin-top: 20px;
                background: #fff !important;
                box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, .5);
                border-radius: 4px;
            }
        }
    }
}
/* 设置table header的背景颜色 */

.el-table__header th, .el-table__header tr {
background-color: #17B3A3;
color: black;
}

/* 设置表主体的高度 */

.el-table__body td,.el-table__body th{
padding:1px;
}

/* 设置表头的高度 */

.el-table__header td,.el-table__header th{
padding:6px 0px;
}

/* 设置分页器的高度 */

.site-wrapper .el-pagination {
margin-top: 5px;
text-align: right;
}

.el-pager li.active {
color: #080909;
cursor: default;
background-color: #17B3A3;
border-radius: 2px;
}
// rgba(0, 153, 102, 0.6)
</style>
<style>
.overGuard .el-table__header th,.overGuard .el-table__header tr {
    color: #666;
    background: #fff;
    font-weight: 400;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
}
.overGuard .el-table__body td,.overGuard .el-table__body th{
    padding: 6px 0px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    color: #666;
    line-height: 40px;
}

/* 设置表头的高度 */

.overGuard .el-table__header td,.overGuard .el-table__header th{
padding:6px 0px;
}

/* 设置分页器的高度 */

.overGuard .site-wrapper .el-pagination {
margin-top: 5px;
text-align: right;
}

.overGuard .el-pager li.active {
color: #fff;
cursor: default;
background-color:#008CD6;
border-radius: 2px;
}
.overGuard .el-table__empty-block{
    background: #fff;
    border-top: none;
}
.overGuard .el-table::before {
    height: 0px;
}
.overGuard .el-range-editor--medium.el-input__inner {
    background: transparent;
}
.overGuard .el-range-editor--medium .el-range-input {
    background: transparent;
    color: #666;
}
.overGuard .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff !important;
}
.overGuard .el-pagination__sizes>div{
    display: none;
}
.overGuard .el-pagination__sizes{
    min-width: 0 !important;
}
.overGuard .el-pagination__total {
    color: #666;
}
.overGuard .el-pagination__jump {
    color: #666;
}
</style>
