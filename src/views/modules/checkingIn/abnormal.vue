<template>
  <div class="mod-role">
    <!-- <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.roleName" placeholder="请输入角色名称查询" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList('1')">查询</el-button>
        <el-button v-if="isAuth('sys:role:save')" type="primary" @click="addOrUpdateHandle('0')">新增</el-button>
        <el-button v-if="isAuth('sys:role:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        <el-button v-if="isAuth('sys:role:delete')" type="warning" @click="addOrUpdateHandle()" :disabled="dataListSelections.length <= 0">修改</el-button>
        <el-button v-if="isAuth('sys:role:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
      </el-form-item>
    </el-form> -->
    <el-table
      :data="dataList"
      border
      ref="multipleTable"
      highlight-current-row
      @row-click="handleRowClick"
      v-loading="dataListLoading"
      style="width: 100%;">
      <!-- <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column> -->
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="80"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="userName"
        width="120"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="classNo"
        header-align="center"
        align="center"
        label="班组">
      </el-table-column>
      <el-table-column
        prop="abnormalSituation"
        header-align="center"
        align="center"
        label="异常情况">
      </el-table-column>
      <el-table-column
        prop="attendanceTime"
        header-align="center"
        align="center"
        width="130"
        label="本月在场时长(h)">
      </el-table-column>
      <el-table-column
        prop="processingResults"
        header-align="center"
        align="center"
        width="130"
        label="处理结果">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="180"
        label="异常时间">
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination> -->
    <!-- 弹窗, 新增 / 修改 -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
          roleName: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    activated () {
      this.getDataList()
    },
    beforeRouteLeave(to, from, next) {
        this.dataListSelections = []
        next();
    },
    methods: {
      // 获取数据列表
      getDataList (num) {
        if(num == 1){
            this.pageIndex = 1
        }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/bim/userInfo/abnormalAttendance'),
          method: 'post',
          data: this.$http.adornParams({
                'pageNo': this.pageIndex,
                'pageSize': this.pageSize,
                'param':{
                }

          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataListSelections = []
            this.dataList = data.result
            this.totalPage = data.result.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },

      handleRowClick(row, column, event) {
          console.log(row)
          this.dataListSelections = row
          this.$refs.multipleTable.toggleRowSelection(row);
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (num) {
        var id ='';
        if(num == 0){
            id = 0
        }else{
            id = this.dataListSelections
        }
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          // console.log("id1111",id)
          this.$refs.addOrUpdate.init(id.roleId)
        })
      },
      // 删除
      deleteHandle () {
        // var ids = id ? [id] : this.dataListSelections.map(item => {
        //   return item.roleId
        // })

        var ids = this.dataListSelections
        this.$confirm(`确定[${ids.roleId ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/role/delete'),
            method: 'post',
            data: this.$http.adornData([ids.roleId], false)
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

<style lang="scss">
.el-table__body tr.current-row>td{
  background-color: #fdf3ea;
  color: #f19944;
}
</style>

