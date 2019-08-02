<template>
  <el-dialog  class="managetable"
    :title="userNames+'个人考勤'"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    :visible.sync="visible">
     <el-date-picker
      v-model="dates"
      @change="dateschange"
      format="yyyy-MM"
      value-format="yyyy-MM"
      type="month"
      placeholder="请选择日期">
    </el-date-picker>
    <br/>
          <el-table 
                :data="tableDatas"
                border
                style="width: 100%">
                <el-table-column
                  type="index"
                  header-align="center"
                  align="center"
                  width="80"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="beginTime"
                  align="center"
                  label="进入时间">
                </el-table-column>
                <el-table-column
                  prop="endTime"
                  align="center"
                  label="离开时间">
                </el-table-column>
                <el-table-column
                  prop="onLineTime"
                  align="center"
                  label="时长（H）">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  align="center"
                  label="日期">
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
  </el-dialog>

</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        tableDatas:[],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        ids:'',
        times:'',
        userNames:'',
        dates:''
      
      }
    },
    activated () {
    },
    methods: {
      init (id,time,userName) {
        this.dates = time
        this.ids = id 
        this.times = time 
        this.userNames = userName 
        this.visible = true
        this.$http({
          url: this.$http.adornUrl('/bim/userattendancerecord/getAttendanceSts'),
          method: 'post',
          data: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,
            'userId': this.ids,
            'dateTime':this.times
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
                data.result.list.forEach((item) =>{
                    let date = new Date(item.createTime.replace(/-/g, "/"));
                    let beginTime = new Date(item.beginTime.replace(/-/g, "/"));
                    let endTime = new Date(item.endTime.replace(/-/g, "/"));
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
                    let getHours = beginTime.getHours()
                    if (getHours >= 0 && getHours <= 9) {
                      getHours = "0" + getHours;
                    }
                    let getMinutes = beginTime.getMinutes()
                    if (getMinutes >= 0 && getMinutes <= 9) {
                      getMinutes = "0" + getMinutes;
                    }
                    let getSeconds = beginTime.getSeconds()
                    if (getSeconds >= 0 && getSeconds <= 9) {
                      getSeconds = "0" + getSeconds;
                    }
                    let getHoursendTime = endTime.getHours()
                    if (getHoursendTime >= 0 && getHoursendTime <= 9) {
                      getHoursendTime = "0" + getHoursendTime;
                    }
                    let getMinutesendTime = endTime.getMinutes()
                    if (getMinutesendTime >= 0 && getMinutesendTime <= 9) {
                      getMinutesendTime = "0" + getMinutesendTime;
                    }
                    let getSecondsendTime = endTime.getSeconds()
                    if (getSecondsendTime >= 0 && getSecondsendTime <= 9) {
                      getSecondsendTime = "0" + getSecondsendTime;
                    }

                    item.createTime = year + seperator1 + month+ seperator1 + strDate
                    item.beginTime = getHours + ':' + getMinutes+ ':' + getSeconds
                    item.endTime = getHoursendTime + ':' + getMinutesendTime+ ':' + getSecondsendTime
                    
                })
              
                this.tableDatas = data.result.list
                this.totalPage = data.result.totalCount
              } else {
                this.dataList = []
                this.totalPage = 0
              }
              this.dataListLoading = false
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
            // this.times = year + '年' + month+ '月'
            // this.dataForm.date = year + '-' + months+ '-'+'01'
        this.times = year + '-' + months+ '-'+'01' 
        this.init(this.ids,this.times,this.userNames)
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.init(this.ids,this.times,this.userNames)
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.init(this.ids,this.times,this.userNames)
      },
    }
  }
</script>
<style>

.managetable .el-dialog__body{
  padding:10px 20px 20px 20px;
}

.managetable .el-table {
  margin:10px 0;
}
 .el-table__body tr.current-row>td{
    background-color: #fdf3ea;
    color: #f19944;
  }
</style>

