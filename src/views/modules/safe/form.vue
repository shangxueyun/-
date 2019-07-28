<template>
  <div>
        <el-form :inline="true"  :model="dataForm"  ref="dataForm" @keyup.enter.native="getDataList()">

            <el-form-item prop="name">
                   <el-input v-model="dataForm.name" placeholder="请输入表单名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="getDataList('1')">查询</el-button>

        <el-button v-if="isAuth('bim:safetyPatrolForm:save')" type="primary" @click="addorupdat()">新增</el-button>
        <el-button v-if="isAuth('bim:safetyPatrolForm:update')" type="warning" :disabled="dataListSelections.length <= 0" @click="addoredit">修改</el-button>
        <el-button v-if="isAuth('bim:safetyPatrolForm:delete')" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle">删除</el-button>
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
        prop="name"
        header-align="center"
        align="center"
        label="表单名称">
      </el-table-column>
     </el-table-column>
     <el-table-column
        prop="createUser"
        header-align="center"
        align="center"
        label="操作人员">
      </el-table-column>
     <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="操作时间">
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
    <form-add  v-if="formAddVisible" ref="formOrAdd" @refreshDataList="getDataList"></form-add>

  </div>
</template>

<script>
  import FormAdd from './form-add-update'
  export default {
      data () {
          return {
              dataForm: {
                name: ''
              },
              dataListLoading: false,
              formAddVisible:false,
              pageIndex: 1,
              pageSize: 10,
              totalPage: 0,
              dataList:[],
              dataListSelections: [],
          }
      },
      components: {
        FormAdd
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
          getDataList(num){
            if(num == 1){
                this.pageIndex = 1
            }
            this.dataListSelections = []
            $(".el-table__row").css({"background-color":"","color":""}); 
            this.dataListLoading = true
            this.$http({
              url: this.$http.adornUrl('/bim/safetyPatrolForm/list'),
              method: 'post',
              data: this.$http.adornParams({
                'pageNo': this.pageIndex,
                'pageSize': this.pageSize,
                'param':{
                  'name':this.dataForm.name
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
          addoredit(){
            var rows = this.dataListSelections
            this.formAddVisible = true
            this.$nextTick(() => {
              this.$refs.formOrAdd.init(rows.id,rows.name)
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


