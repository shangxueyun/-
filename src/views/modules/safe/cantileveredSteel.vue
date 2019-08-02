<template>
    <div class="cantileveredSteel" v-loading="cantileveredSteelloading" :style="{height:OfH}">
        <span  @click="cantileveredSteel">X</span>
        <el-header height="40px">
            <div class="left">
                <h3>临边防护</h3>
                <p style="color: #00CC66;">设备编号：{{titleName}}</p>
                <p>{{status}}</p>
            </div>
        </el-header>
        <el-main style="width: 90%;margin: 0 auto;">
            <div class="model_bottom">
                <el-header height="40px">
                    报警记录
                    <div style="width: 332px;height: 100%;float: right;">
                        <el-date-picker
                        v-model="cantileveredSteelV"
                        @change="cantileveredSteellLoad"
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
                        prop="position"
                        label="位置"
                        header-align="left"
                        align="left">
                    </el-table-column>
                    </el-table>
                    <div v-if="tableData.length>8" style="height: 32px;padding-top: 6px;">
                        <el-pagination
                            @size-change="sizeChangeHandle"
                            @current-change="currentChangeHandle"
                            :current-page="pageIndex"
                            :page-sizes="[10]"
                            :page-size="pageSize"
                            :total="totalPage"
                            layout="total, sizes, prev, pager, next, jumper">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </el-main>
    </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
          cantileveredSteelloading:false,
          tableData:[],
          titleName:this.nameObj.name,
          status:this.nameObj.status,
          OfH:(this.$store.state.common.documentClientHeight-80)+"px",
          cantileveredSteelV:'',
          pageIndex: 1,
          pageSize: 10,
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
        this.getList();
    },
    computed: {

    },
    mounted() {
    },
    methods: {
        cantileveredSteel(){
            this.$emit('cantileveredSteel');
        },
        getList(){
            if(this.cantileveredSteelV != "")
            var obj = {startTime:this.cantileveredSteelV[0],endTime:this.cantileveredSteelV[1],equipmentCode:this.nameObj.name}
            else
            var obj = {equipmentCode:this.nameObj.name};
            this.cantileveredSteelloading = true;
            this.$http({
              url: this.$http.partyUrl('/equipment/frontierProtection/pageList'),
              method: 'post',
              data: this.$http.adornData({
                'pageNo': this.pageIndex,
                'pageSize': this.pageSize,
                'param':obj
            })
            }).then(({data}) => {
                this.cantileveredSteelloading = false;
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
        cantileveredSteellLoad(val){
            if(!val)
            {
                this.pageIndex = 1;
                this.cantileveredSteelV = "";
                this.getList();
            }
            else{
                this.pageIndex = 1;
                this.getList();
            }
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
    },
  }
</script>

<style lang="scss" scoped>
.cantileveredSteel{
    width: 54%;
    min-width: 622px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    position: relative;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, .5);
    border-radius: 4px;
    span{
        display: block;
        width: 22px;
        height: 22px;
        position: absolute;
        right: 24px;
        top: 28px;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        line-height: 22px;
        z-index: 1111;
        background: #ccc;
        border-radius: 12px;
        color: #fff;
    }
    header{
        width: 100%;
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
            width: 414px;
            h3{
                width: 26%;
                line-height: 36px;
                float: left;
                font-weight: 400;
                font-style: normal;
                font-size: 16px;
                color: #666;
            }
            p{
                float: right;
                line-height: 38px;
                width: 37%;
                font-size: 14px;
                color: #666;
                margin: 0;
            }
        }
    }
    main{
        .model_bottom{
            width: 100%;
            height: 328px;
            header{
                line-height: 40px;
                color: #666;
                font-size: 14px;
                font-weight: 400;
            }
            .datalist_div{
                width: 100%;
                margin-top: 20px;
            }
        }
    }
    .Btn{
        margin: 24px;
    }
    .person{
        position: absolute;
        width: 54px;
        height: 62px;
        cursor: pointer;
        i{
            width: 90%;
            height: 90%;
            display: block;
            margin: 0 auto;
            background: url(~@/assets/img/person.png) no-repeat;
            background-size: 100%;
        }
        .health{
            width: 134px;
            height: 134px;
            font-size: 10px;
            color: #fff;
            margin-left: 44px;
            margin-top: -56px;
            display: none;
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
color: #fff;
cursor: default;
background-color: #008CD6;
border-radius: 2px;
}
// rgba(0, 153, 102, 0.6)
</style>
<style>
.cantileveredSteel .el-table__header th,.cantileveredSteel .el-table__header tr {
    color: #333;
    background: #fff;
    font-weight: 100;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
}
.cantileveredSteel .el-table__body td,.cantileveredSteel .el-table__body th{
    padding: 6px 0px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    color: #333;
    line-height: 40px;
}

/* 设置表头的高度 */

.cantileveredSteel .el-table__header td,.cantileveredSteel .el-table__header th{
padding:6px 0px;
}

/* 设置分页器的高度 */

.cantileveredSteel .site-wrapper .el-pagination {
margin-top: 5px;
text-align: right;
}

.cantileveredSteel .el-pager li.active {
color: #fff;
cursor: default;
background-color: #008CD6;
border-radius: 2px;
}
.cantileveredSteel .el-table__empty-block{
    background: #fff;
    border-top: none;
}
.cantileveredSteel .el-table::before {
    height: 0px;
}
.cantileveredSteel .el-range-editor--medium.el-input__inner {
    background: transparent;
}
.cantileveredSteel .el-range-editor--medium .el-range-input {
    background: transparent;
    color: #fff;
}
.cantileveredSteel .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff !important;
}
.cantileveredSteel .el-pagination__sizes>div{
    display: none;
}
.cantileveredSteel .el-pagination__sizes{
    min-width: 0 !important;
}
.cantileveredSteel .el-pagination__total {
    color: #666;
}
.cantileveredSteel .el-pagination__jump {
    color: #666;
}
.cantileveredSteel .el-table{
    background-color: transparent;
}
</style>