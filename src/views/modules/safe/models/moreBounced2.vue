<template>
    <div class="moreBounced" v-loading="moreBouncedloading" :style="{height:OfH}">
        <span  @click="moreBounced">X</span>
        <el-header height="40px">
            <div class="left">
                <h3>{{titleName}}</h3>
            </div>
        </el-header>
        <el-main style="width: 90%;margin: 0 auto;">
            <div class="model_bottom">
                <el-header height="40px">
                    更多记录
                    <div v-if="nameObj.times" style="width: 364px;height: 100%;float: right;">
                        <el-date-picker
                        v-model="moreBouncedV"
                        @change="moreBouncedLoad"
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
                        :prop="nameObj.param.prop.param1"
                        :label="nameObj.param.name.value1"
                        v-if="nameObj.param.prop.param1 == 'headPortrait'"
                        header-align="center"
                        align="center">
                        <template slot-scope="scope">
                            <img style="height: 114px;margin-left: 8px;" :src="'data:image/png;base64,'+scope.row.headPortrait" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column
                        :prop="nameObj.param.prop.param1"
                        :label="nameObj.param.name.value1"
                        v-else
                        header-align="center"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        :prop="nameObj.param.prop.param2"
                        :label="nameObj.param.name.value2"
                        header-align="center"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        :prop="nameObj.param.prop.param3"
                        header-align="center"
                        align="center"
                        :label="nameObj.param.name.value3">
                    </el-table-column>
                    <el-table-column
                        v-if="nameObj.param.prop.param4"
                        :prop="nameObj.param.prop.param4"
                        header-align="center"
                        align="center"
                        :label="nameObj.param.name.value4">
                    </el-table-column>
                    </el-table>
                    <div style="height: 32px;padding-top: 6px;">
                        <el-pagination
                            @size-change="sizeChangeHandle"
                            @current-change="currentChangeHandle"
                            :current-page="pageIndex"
                            :page-sizes="pageList"
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
          moreBouncedloading:false,
          tableData:[],
          titleName:this.nameObj.name,
          OfH:(this.$store.state.common.documentClientHeight-80)+"px",
          moreBouncedV:'',
          pageIndex: 1,
          pageSize: 14,
          totalPage: 0,
          pageList:[14, 28, 56]
      }
    },
    props: {
      nameObj: {
        type: Object,
        required: true
      },
    },
    //adornUrl接口 times 是否需要时间 pageS 是否需要页码 param:{prop:{param1:'',param2:'',param3:'',param4:'',},name:{value1:''}} 表参数
    created() {
        debugger
        if(this.nameObj.height)
        this.OfH = (this.$store.state.common.documentClientHeight-80)-45+"px"
        if(this.nameObj.pageSize)
        {
            this.pageSize = this.nameObj.pageSize;
            this.pageList = this.nameObj.pageList;
        }
        this.getList();
    },
    computed: {

    },
    mounted() {
    },
    methods: {
        moreBounced(){
            this.$emit('moreBounced');
        },
        getList(){
            if(this.moreBouncedV != "")
            var obj = {startTime:this.moreBouncedV[0],endTime:this.moreBouncedV[1]}
            if(this.nameObj.Obj)
            var obj = this.nameObj.Obj;
            this.moreBouncedloading = true;
            this.$http({
              url: this.$http.partyUrl(this.nameObj.adornUrl),
              method: 'post',
              data: this.$http.adornData({
                'pageNo': this.pageIndex,
                'pageSize': this.pageSize,
                'param':obj
            })
            }).then(({data}) => {
                this.moreBouncedloading = false;
                if (data && data.code === 0) {
                    if(data.result.list.length>0)
                    {
                        data.result.list.forEach((v,i)=>{
                            if(v.operationTime.lastIndexOf(".")>=0)
                            {
                                v.operationTime = v.operationTime.substring(0,v.operationTime.lastIndexOf("."))
                            }
                        });
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
        moreBouncedLoad(val){
            if(!val)
            {
                this.moreBouncedV = "";
                this.pageIndex = 1;
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
.moreBounced{
    width: 50%;
    min-width: 488px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    position: relative;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, .5);
    border-radius: 4px;
    span{
        display: block;
        width: 22px;
        height: 22px;
        position: absolute;
        right: 24px;
        color: #f2f2f2;
        top: 28px;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        line-height: 22px;
        z-index: 1111;
        background: #ccc;
        border-radius: 12px;
    }
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
        .left{
            float: left;
            width: 414px;
            h3{
                width: 52%;
                line-height: 36px;
                float: left;
                font-weight: 400;
                font-style: normal;
                font-size: 18px;
                color: #666;
            }
            p{
                float: right;
                line-height: 40px;
                width: 37%;
                font-size: 14px;
                color: #f2f2f2;
            }
        }
    }
    main{
        height: 100%;
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
color: #080909;
cursor: default;
background-color: #17B3A3;
border-radius: 2px;
}
// rgba(0, 153, 102, 0.6)
</style>
<style>
.moreBounced .el-table__header th,.moreBounced .el-table__header tr {
    color: #333;
    background: #fff;
    font-weight: 400;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
}
.moreBounced .el-table__body td,.moreBounced .el-table__body th{
    color: #333;
    background: #fff;
    font-weight: 400;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
        padding: 6px 0px;
}

/* 设置表头的高度 */

.moreBounced .el-table__header td,.moreBounced .el-table__header th{
padding:6px 0px;
}

/* 设置分页器的高度 */

.moreBounced .site-wrapper .el-pagination {
margin-top: 5px;
text-align: right;
}

.moreBounced .el-pager li.active {
color: #fff;
cursor: default;
background-color: #008CD6;
border-radius: 2px;
}
.moreBounced .el-table__empty-block{
    background: #fff;
    border-top: 1px solid #666;
}
.moreBounced .el-table::before {
    height: 0px;
}
.moreBounced .el-range-editor--medium.el-input__inner {
    background: transparent;
}
.moreBounced .el-range-editor--medium .el-range-input {
    background: transparent;
    color: #fff;
}
.moreBounced .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff !important;
}
.moreBounced .el-pagination__sizes>div{
    display: none;
}
.moreBounced .el-pagination__sizes{
    min-width: 0 !important;
}
.moreBounced .el-pagination__total {
    color: #666;
}
.cantileveredSteel .el-pagination__jump {
    color: #666;
}
</style>