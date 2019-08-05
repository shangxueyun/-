<template>
  <div>
        <el-form :inline="true"  :model="dataForm"  ref="dataForm" @keyup.enter.native="getDataList()">
          
          <el-form-item prop="labelName">
              <el-input v-model="dataForm.labelName" placeholder="请输入打卡标签" clearable></el-input>
          </el-form-item>
      
            <el-form-item prop="userName">
                  <el-select v-model="dataForm.userName" width=100% clearable placeholder="请选择安保人员">
                    <el-option
                      v-for="item in options"
                      :key="item.userId"
                      :label="item.userName"
                      :value="item.userId">
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item  prop="times">
                  <el-date-picker
                    v-model="dataForm.times"
                    type="datetimerange"
                    range-separator="-"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="上传开始日期"
                    end-placeholder="上传结束日期">
                  </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button @click="getDataList('1')">查询</el-button>
              <el-button  type="primary"  @click="dataFormclear">清空筛选</el-button>
            </el-form-item>
        </el-form>
    <el-table
      :data="dataList"
      border
      ref="multipleTable"
      highlight-current-row
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
        prop="labelName"
        header-align="center"
        align="center"
        label="打卡标签">
      </el-table-column>
     </el-table-column>
     <!-- <el-table-column
        prop="longitude"
        header-align="center"
        align="center"
        label="标签位置">
            <template slot-scope="scope">
                <el-button @click="clickMap(scope.row)" size="mini" type="text">查看位置</el-button>
            </template>
      </el-table-column> -->
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="220"
        label="上传时间">
      </el-table-column> <el-table-column
        prop="createUser"
        header-align="center"
        align="center"
        width="220"
        label="上传人员">
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

    <patrol-map  v-if="patrolMapVisible" ref="patrolMap"></patrol-map>

  </div>
</template>

<script>
  import PatrolMap from './patrol-map'
  export default {
      data () {
          return {
              options:[],
              dataForm: {
                userName: '',
                times:'',
                labelName:''
              },
              dataListLoading: false,
              patrolMapVisible:false,
              pageIndex: 1,
              pageSize: 10,
              totalPage: 0,
              dataList:[]
          }
      },
      components: {
        PatrolMap
      },
      activated () {
        this.getDataList()
        this.list()
      },
      methods: {
          clickMap(row){
              this.patrolMapVisible = true
              this.$nextTick(() => {          
                this.$refs.patrolMap.init(row.longitude,row.latitude)
              })
          },
          list(){
            this.$http({
              url: this.$http.adornUrl('/sys/user/listUser'),
              method: 'post',
              data: this.$http.adornParams({})
            }).then(({data}) => {
              if (data && data.code === 0) {
                  this.options = data.result
              } 
            })
          },
          getDataList(num){
            if(num == 1){
                this.pageIndex = 1
            }
            if(this.dataForm.times == null){
                this.dataForm.times = ''
            }
            this.dataListLoading = true
            this.$http({
              url: this.$http.adornUrl('/bim/securitypatrol/listPg'),
              method: 'post',
              data: this.$http.adornParams({
                'pageNo': this.pageIndex,
                'pageSize': this.pageSize,
                'param':{
                  'endTime':(this.dataForm.times[1]),
                  'startTime':(this.dataForm.times[0]),
                  'userId':this.dataForm.userName,
                  'labelName':this.dataForm.labelName
                }
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                
                this.dataList = data.result.list
                this.totalPage = data.result.totalCount
              } else {
                this.dataList = []
                this.totalPage = 0
              }
              this.dataListLoading = false
            })
          },
          dataFormclear(){
            // alert(2)
              this.$refs.dataForm.resetFields()
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
</style>


