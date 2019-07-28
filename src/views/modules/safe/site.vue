<template>
  <div>
        <el-form :inline="true"  :model="dataForm"  ref="dataForm" @keyup.enter.native="getDataList()">

            <el-form-item prop="results" >
                  <el-select v-model="dataForm.results" style="width:150px;" clearable placeholder="请选择检查结果">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item prop="state" >
                  <el-select v-model="dataForm.state" style="width:150px;" clearable placeholder="请选择状态">
                    <el-option
                      v-for="item in statelist"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item  prop="creationtimes">
                  <el-date-picker style="width:390px;"
                    v-model="dataForm.creationtimes"
                    type="datetimerange"
                    range-separator="-"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="创建开始日期"
                    end-placeholder="创建结束日期">
                  </el-date-picker>
            </el-form-item>
            <el-form-item prop="updatetimes" >
                  <el-date-picker style="width:390px;"
                    v-model="dataForm.updatetimes"
                    type="datetimerange"
                    range-separator="-"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="变更开始日期"
                    end-placeholder="变更结束日期">
                  </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button @click="getDataList('1')">查询</el-button>
              <el-button  type="primary"  @click="dataFormclear">清空筛选</el-button>
              <!-- <el-button type="success" >导出</el-button> -->
            </el-form-item>
        </el-form>
    <el-table
      :data="dataList"
      @row-click="rowClick"	
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
        prop="safetyPatrolFormName"
        header-align="center"
        align="center"
        label="检查内容">
      </el-table-column>
      <el-table-column
        prop="examinationResults"
        header-align="center"
        align="center"
        label="检查结果">
            <template slot-scope="scope">
                  <span v-if="scope.row.examinationResults == 1">
                    合格
                  </span>
                  <span v-if="scope.row.examinationResults == 2">
                    不合格
                  </span>
                  <span v-if="scope.row.examinationResults == 3">
                    复查合格
                  </span>
            </template>
      </el-table-column>
     </el-table-column>
     <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
            <template slot-scope="scope">
                  <span v-if="scope.row.status == 1">
                    待整改
                  </span>
                  <span v-if="scope.row.status == 2">
                    待复查
                  </span>
                  <span v-if="scope.row.status == 3">
                    完成
                  </span>
            </template>
      </el-table-column>
     <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        width="200"
        label="变更时间">
      </el-table-column>
     <el-table-column
        prop="updateUser"
        header-align="center"
        align="center"
        label="变更人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="200"
        label="巡检时间">
      </el-table-column> <el-table-column
        prop="createUser"
        header-align="center"
        align="center"
        label="巡检人员">
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


    <site-details  v-if="siteDetailsVisible" ref="details" @refreshDataList="getDataList"></site-details>

  </div>
</template>

<script>
  import SiteDetails from './site-details'
  export default {
      data () {
          return {
              options:[
                {
                  "value":'1',
                  "label":'合格'
                },
                {
                  "value":'2',
                  "label":'不合格'
                },
                {
                  "value":'3',
                  "label":'复查合格'
                }
              ],
              statelist:[
                {
                  "value":'1',
                  "label":'待整改'
                },
                {
                  "value":'2',
                  "label":'待复查'
                },
                {
                  "value":'3',
                  "label":'完成'
                }
              ],
              dataForm: {
                results: '',
                state:'',
                creationtimes:'',
                updatetimes:''
              },
              dataListLoading: false,
              siteDetailsVisible:false,
              pageIndex: 1,
              pageSize: 10,
              totalPage: 0,
              dataList:[],
              dataListSelections: [],
          }
      },
      components: {
        SiteDetails
      },
      activated () {
        this.getDataList()
      },
      methods: {
          rowClick(row, column, event){
            console.log(row.id)
            this.dataListSelections = row
            this.siteDetailsVisible = true
            this.$nextTick(() => {
              this.$refs.details.init(row.id)
            })
          },
          getDataList(num){
            if(num == 1){
                this.pageIndex = 1
            }
            this.dataListLoading = true
            if(this.dataForm.creationtimes == null){
                this.dataForm.creationtimes =''
            }
            if(this.dataForm.updatetimes == null){
                this.dataForm.updatetimes =''
            }
            this.$http({
              url: this.$http.adornUrl('/bim/safetyPatrol/listPg'),
              method: 'post',
              data: this.$http.adornParams({
                'pageNo': this.pageIndex,
                'pageSize': this.pageSize,
                'param':{
                  'examinationResults': this.dataForm.results,
                  'status': this.dataForm.state,
                  'createBeginTime':(this.dataForm.creationtimes[0]),
                  'createEndTime':(this.dataForm.creationtimes[1]),
                  'updateBeginTime':(this.dataForm.updatetimes[0]),
                  'updateEndTime':(this.dataForm.updatetimes[1]),
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
.dateinputpic input{
    border:1px solid red;
 
}
</style>


