<template>
  <div>
        <el-form :inline="true"  :model="dataForm"  ref="dataForm" @keyup.enter.native="getDataList()">

            <el-form-item prop="names">
                   <el-input v-model="dataForm.names" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>
            <el-form-item prop="date">    
                  <el-date-picker
                    v-model="dataForm.date"
                    @change="dateschange"
                    format="yyyy-MM"
                    value-format="yyyy-MM"
                    type="month"
                    placeholder="选择月份">
                  </el-date-picker>
            </el-form-item>
            <el-form-item>
                    <el-button @click="getDataList('1')">查询</el-button>
                    <el-button type="primary" @click="payrollclick">工资查看</el-button>
            </el-form-item>
        </el-form>
    <el-table
      :data="dataList"
      border
      ref="multipleTable"
      highlight-current-row
      @row-click="handleRowClick"
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="80"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="userName"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
     <el-table-column
        prop="duties"
        header-align="center"
        align="center"
        label="职务">
      </el-table-column>
     <el-table-column
        prop="attendanceDay"
        header-align="center"
        align="center"
        label="出勤日">
      </el-table-column>
     <el-table-column
        prop="lengthTime"
        header-align="center"
        align="center"
        label="累计时长（H）">
            <template slot-scope="scope">
                <el-button @click="clicklengthTime(scope.row.userId,scope.row.dateTimes,scope.row.userName)" size="mini" type="text">{{scope.row.lengthTime}}</el-button>
            </template>
      </el-table-column>
     <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="月份">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <manage  v-if="manageSeeVisible" ref="manageSee" ></manage>
    <payroll  v-if="payrollVisible" ref="payrolls"></payroll>
  </div>
</template>

<script>

  "use strict";

  import manage from './manage-see'
  import payroll from './payroll'
  export default {
      data () {
          return {
              dataForm: {
                names: '',
                date:''
              },
              dataListLoading: false,
              manageSeeVisible:false,
              payrollVisible:false,
              pageIndex: 1,
              pageSize: 10,
              totalPage: 0,
              dataList:[],
              dataListSelections: [],
          }
      },
      components: {
        manage,
        payroll
      },
      activated () {
        this.getDataList()
      },
      beforeRouteLeave(to, from, next) {
          this.dataListSelections = []
          $(".el-table__row").css({"background-color":"","color":""}); 
          next();
      },
      methods: {
        dateschange(val){
            var monthdatas = new Date(val)
            var year = monthdatas.getFullYear();
            var month = monthdatas.getMonth() + 1;
            var months = monthdatas.getMonth() + 1;
            if (months >= 1 && months <= 9) {
              months = "0" + months;
            }
            this.times = year + '年' + month+ '月'
            this.dataForm.date = year + '-' + months+ '-'+'01'
        },
          getDataList(num){
            if(num == 1){
                this.pageIndex = 1
            }
            this.dataListSelections = []
            $(".el-table__row").css({"background-color":"","color":""}); 
            this.dataListLoading = true
            this.$http({
              url: this.$http.adornUrl('/bim/userattendancerecord/list'),
              method: 'post',
              data: this.$http.adornParams({
                'pageNo': this.pageIndex,
                'pageSize': this.pageSize,
                'param':{
                  'userName':this.dataForm.names,
                  'dateTime':this.dataForm.date
                }
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                data.result.list.forEach((item) =>{
                    console.log(item.createTime)
                    let date = new Date(item.createTime.replace(/-/g, "/"));
                    let seperator1 = "-";
                    let years = date.getFullYear();
                    let months = date.getMonth() + 1;
                    let strDates = date.getDate();
                    if (months >= 1 && months <= 9) {
                      months = "0" + months;
                    }
                    if (strDates >= 0 && strDates <= 9) {
                      strDates = "0" + strDates;
                    }
                    let currentdate = years + seperator1 + months
                    item.createTime = years + seperator1 + months
                    item.dateTimes = years + seperator1 + months + seperator1 + strDates
                })
                this.dataList = data.result.list
                this.totalPage = data.result.totalCount
              } else {
                this.dataList = []
                this.totalPage = 0
              }
              this.dataListLoading = false
            })
          },
          payrollclick(){
              this.payrollVisible = true
              this.$nextTick(() => {
                this.$refs.payrolls.init()
              })
          },
          clicklengthTime(id,time,userName){
            var rows = this.dataListSelections
            this.manageSeeVisible = true
            this.$nextTick(() => {
              this.$refs.manageSee.init(id,time,userName)
            })

          },
          // 每页数
          sizeChangeHandle (val) {
            this.pageSize = val
            this.pageIndex = 1
            this.getDataList()
          },
          // 当前页
          currentChangeHandle (val) {
            this.pageIndex = val
            this.getDataList()
          },
          addorupdat(){
            this.formAddVisible = true
            this.$nextTick(() => {
              this.$refs.formOrAdd.init()
            })
          },
          handleRowClick(row, column, event) {
              this.dataListSelections = row
          },
          // 删除
          deleteHandle () {
            var ids = this.dataListSelections
            this.$confirm(`确定[${ids.id ? '删除' : '批量删除'}]操作?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http({
                url: this.$http.adornUrl('/bim/safetyPatrolForm/delete'),
                method: 'post',
                data: this.$http.adornData({
                  "id":ids.id
                })
              }).then(({data}) => {
                if (data && data.code === 0) {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.getDataList()
                    }
                  })
                } else {
                  this.$message.error(data.msg)
                }
              })
            }).catch(() => {})
          }
      }
  }
</script>



<style lang="scss" scoped>
  .towertitle{
    height:30px;
    border-bottom:1px solid #e1e1e1;
    padding:0 10px;
    .menusdropdown{
      color:#369fdd;
      cursor: pointer;
      float: left;
    }
    .towlsul{
      float: left;
      list-style: none;
      padding:0;
      margin:0;
      li{
        display: inline-block;
        border-right:1px solid #e1e1e1;
        padding:0 15px ;
        i{
          font-style: normal;
          color:#d76113;
        }
        span{
          color:#848484;
          margin: 0 0 0 10px;
        }
      }
    }
    .towout{
      float:right;
    }
  }
 
</style>
<style>
 .el-table__body tr.current-row>td{
    background-color: #fdf3ea;
    color: #f19944;
  }
.dateinputpic input{
    border:1px solid red;
 
}
</style>


