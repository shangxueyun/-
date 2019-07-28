<template>
  <div class="mod-config">
    <div class="mileposttitle">基础数据</div>
    <el-form class="milform" :model="dataForm" :inline="true"   :rules="dataRule" ref="dataForm">
          <el-form-item label="总工期" label-width="100px">
            <el-input disabled style="width:220px;" v-model="dataForm.period" placeholder="总工期" clearable>
                  <template slot="append">日历天</template>
            </el-input>
          </el-form-item>
          <el-form-item label="已安全生产" label-width="100px">
            <el-input disabled style="width:220px;" v-model="dataForm.total" placeholder="已安全生产" clearable>
                  <template slot="append">日历天</template>
            </el-input>
          </el-form-item><br/>
          <el-form-item label="开工日期" label-width="100px" prop="starttime">
                <el-date-picker
                  @change="startDatechange"
                  v-model="dataForm.starttime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :picker-options="startTime"
                  placeholder="选择日期">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="竣工日期" label-width="100px" prop="endtime">
                <el-date-picker
                  @change="endDatechange"
                  v-model="dataForm.endtime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  :picker-options="endTime"
                  placeholder="选择日期">
                </el-date-picker>
          </el-form-item><br/>
          <el-form-item label=" " label-width="100px">
            <el-button type="primary" @click="dataFormSubmit">保存</el-button>
          </el-form-item>
    </el-form>
    
    <div class="mileposttitle">里程碑节点</div>
      <el-button type="primary" @click="addmilepostable()">添加里程碑</el-button>
      <el-button type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle">删除里程碑</el-button>
      
  <el-table class="milepostable"
      :data="dataList"
      @row-click="handleRowClick"
      border
      ref="multipleTable"
      highlight-current-row
      v-loading="dataListLoading"
      style="width: 50%;">
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="80"
        label="序号">
      </el-table-column>
     <el-table-column
        :show-overflow-tooltip="true"
        prop="milestoneName"
        header-align="center"
        align="center"
        label="里程碑">
      </el-table-column>
     <el-table-column
        prop="milestoneDate"
        width="150"
        header-align="center"
        align="center"
        label="日期">
      </el-table-column>
    </el-table>
    <milepostadd  v-if="milepostaddVisible" ref="mileposts" @refreshDataList="getDataList"></milepostadd>
  </div>
</template>

<script>

  import milepostadd from './milepost-add'

  export default {
    data () {
      return {
       
        dataListLoading: false,
        dataListSelections: [],
        dataList:[],
        milepostaddVisible:false,
        dataForm: {
          period: '',
          total:'',
          starttime:'',
          endtime:''
        },
        dataRule:{
          starttime: [
            { required: true, message: '开工时间不能为空', trigger: 'blur' }
          ],
          endtime: [
            { required: true, message: '竣工时间不能为空', trigger: 'blur' }
          ]
        },
        startTime: {
                disabledDate: time => {
                      if (this.dataForm.endtime) {
                            return time.getTime() > new Date(this.dataForm.endtime).getTime()
                      }
              }
        },
        endTime: {
                disabledDate: time => {
                      if (this.dataForm.starttime) {
                            return time.getTime() < new Date(this.dataForm.starttime).getTime() - 86400000
                      }
                  }
        },
          
      }
    },
    components: {
      milepostadd
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
      // 获取数据列表
      getDataList () {
        this.dataListSelections = []
        $(".el-table__row").css({"background-color":"","color":""}); 
        this.dataListLoading = true

        this.$http({
          url: this.$http.adornUrl('/bim/projectmilestone/list'),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.result
            console.log(data.result[0])
            this.dataForm.starttime = data.result[0].startDate
            this.dataForm.endtime = data.result[0].endDate
            
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
             this.dateDiff(this.dataForm.endtime,this.dataForm.starttime)
             this.startdateDiff(currentdate,this.dataForm.starttime)
          } else {
              this.$message.error(data.msg)

          }
          this.dataListLoading = false
        })
      },
      startDatechange(val){
          this.dataForm.starttime = val
          
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate;
        

          if(this.dataForm.starttime && this.dataForm.endtime == ''){
             this.dataForm.period = ''
          }
          if(this.dataForm.endtime && this.dataForm.starttime == null){
             this.dataForm.period = ''
             this.dataForm.total = ''
          }
          if(this.dataForm.starttime && this.dataForm.endtime == null){
             this.dataForm.period = ''
             this.dataForm.total = ''
          }
          if(this.dataForm.endtime && this.dataForm.starttime){
             this.dateDiff(this.dataForm.endtime,this.dataForm.starttime)
             this.startdateDiff(currentdate,this.dataForm.starttime)
          }

          


      },
      endDatechange(val){
          this.dataForm.endtime = val
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate;
          if(this.dataForm.starttime == null && this.dataForm.endtime){
           
              this.dataForm.period = ''
              this.dataForm.total = ''
          }
          if(this.dataForm.starttime == null && this.dataForm.endtime == null){
              this.dataForm.period = ''
              this.dataForm.total = ''
          }
          if(this.dataForm.starttime && this.dataForm.endtime == null){
              this.dataForm.period = ''
              this.dataForm.total = ''
          }
          if(this.dataForm.starttime && this.dataForm.endtime){
              this.dateDiff(this.dataForm.endtime,this.dataForm.starttime)
              this.startdateDiff(currentdate,this.dataForm.starttime)
          }

          // else if(this.dataForm.endtime == null ){
          //     this.dataForm.period = ''
          // }else{
          //   this.dateDiff(this.dataForm.endtime,this.dataForm.starttime)
          // }
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate;
        
          
          // this.startdateDiff(currentdate,this.dataForm.starttime)



      },
      startdateDiff(Date_end, Date_start){
        let  aDate,  oDate1,  oDate2,  iDays;
  
        Date_end = Date_end.split(" "); 
        aDate   =  Date_end[0].split("-"); 
        oDate1 = new Date(aDate[0] , aDate[1] ,aDate[2]);  
        Date_start = Date_start.split(" ");
        aDate   =  Date_start[0].split("-");
        oDate2 = new Date(aDate[0] , aDate[1] , aDate[2]);
        iDays   =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);  
        this.dataForm.total = iDays
        var stadate1 = new Date(Date_end);
        var stadate2 = new Date(this.dataForm.starttime);
        if(stadate1.getTime() < stadate2.getTime()){
            this.dataForm.total = '0'
        }
      },
      dateDiff(Date_end, Date_start){
        let  aDate,  oDate1,  oDate2,  iDays;
        Date_end = Date_end.split(" "); 
        aDate   =  Date_end[0].split("-"); 
        oDate1 = new Date(aDate[0] , aDate[1] ,aDate[2]);  
        Date_start = Date_start.split(" ");
        aDate   =  Date_start[0].split("-");
        oDate2 = new Date(aDate[0] , aDate[1] , aDate[2]);
        iDays   =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);  
        this.dataForm.period = iDays
      },

     
      handleRowClick(row, column, event) {
          this.dataListSelections = row
      },
      // 新增 / 修改
      addmilepostable () {
        this.milepostaddVisible = true
        this.$nextTick(() => {
          this.$refs.mileposts.init(this.dataForm.starttime,this.dataForm.endtime)
        })
      },

      
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/bim/projectmilestone/updateSchedule`),
              method: 'post',
              data: this.$http.adornData({
                'startDate': this.dataForm.starttime,
                'endDate': this.dataForm.endtime,
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
          }
        })
      },
      // 删除
      deleteHandle () {

        var ids = this.dataListSelections
        this.$confirm(`确定进行[${ids.id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/projectmilestone/delete/'+ids.id),
            method: 'post',
            data: this.$http.adornData({})
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
        })
      }
    },
    updated() {
        $(".el-table__body-wrapper .el-table__row ").each(function() {
              $(this).click(function(){
                    $(".el-table__row").css({"background-color":"","color":""}); 
                    $(this).css({"background-color":"#fdf3ea","color":"#f19944"}); 
              })
        }); 
    }
  }
</script>
<style>
.mileposttitle{
  font-size:14px;
  line-height: 40px;
  border-bottom:1px solid #dcdfe6;
  font-weight:bold;
  margin:0 0 15px 0;
}
.milform{
  margin:0 0 0 20px;
}
.milepostable{
  margin-top: 15px;
}
</style>

