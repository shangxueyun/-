<template>
  <el-dialog  class="managetablepay"
    :title="'海门市拓鸿实业厂房新建项目部'+times+'工资支付表'"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    width="70%"
    :visible.sync="visible">
    <div class="datepickersbox">
项目部名称：海门市拓鸿实业厂房新建项目部
<el-date-picker  class="datepickers"
      v-model="dates"
      @change="dateschange"
      format="yyyy-MM"
      value-format="yyyy-MM"
      type="month"
      placeholder="请选择日期">
    </el-date-picker>
    </div>
          <el-table 
                :data="tableData"
                border
                    show-summary
                    height="500"
                style="width: 100%">
                <el-table-column
                  type="index"
                  header-align="center"
                  align="center"
                  width="80"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="userName"
                  align="center"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="duties"
                  align="center"
                  label="岗位">
                </el-table-column>
                <el-table-column
                  prop="attendanceDay"
                  align="center"
                  label="出勤日（日）">
                </el-table-column>
                <el-table-column
                  prop="basePay"
                  align="center"
                  label="基本工资（元）">
                </el-table-column>
                <el-table-column
                  prop="overtimePay"
                  align="center"
                  label="加班、考核工资（元）">
                </el-table-column>
                <el-table-column
                  prop="paymentAmount"
                  align="center"
                  label="实付金额（元）">
                </el-table-column>
          </el-table>
  </el-dialog>

</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        tableData:[],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        ids:'',
        times:'',
        dates:'',
        datestime:''
      
      }
    },
    activated () {
    },
    methods: {
      init () {
          let date = new Date();
          let seperator1 = "-";
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          this.times = year + '年' + month+ '月'
          this.datestime = year + seperator1 + month+ seperator1 + strDate
      
        this.visible = true
        this.$http({
          url: this.$http.adornUrl('/bim/userattendancerecord/wagesCensus'),
          method: 'post',
          data: this.$http.adornParams({
            'dateTime':this.datestime
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
                this.tableData = data.result
          } else {

          }
        })
      },
      dateschange(val){
          let monthdata = new Date(val)
          let year = monthdata.getFullYear();
          let month = monthdata.getMonth() + 1;
          let months = monthdata.getMonth() + 1;
          if (months >= 1 && months <= 9) {
            months = "0" + months;
          }
          this.times = year + '年' + month+ '月'
          let sss = year + '-' + months+ '-'+'01'
          if(val == null){
              this.init()
          }else{
              this.$http({
                url: this.$http.adornUrl('/bim/userattendancerecord/wagesCensus'),
                method: 'post',
                data: this.$http.adornParams({
                  'dateTime':sss
                })
              }).then(({data}) => {
                if (data && data.code === 0) {
                      this.tableData = data.result
                } else {

                }
              })

          }
      }
    }
  }
</script>
<style>
.datepickers{
  float:right;
}
.datepickersbox{height:50px;line-height:50px;}
.managetablepay .el-dialog__body{
  padding:10px 20px 20px 20px;
}

.managetablepay .el-table {
  margin:10px 0;
}
 .el-table__body tr.current-row>td{
    background-color: #fdf3ea;
    color: #f19944;
  }
  .managetablepay .el-dialog__header{
    text-align: center;
  }
</style>

