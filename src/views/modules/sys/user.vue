<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.userName" placeholder="请输入账号查询" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList('1')">查询</el-button>
        <el-button v-if="isAuth('sys:user:save')" type="primary" @click="addOrUpdateHandle('0')">新增</el-button>
        <el-button type="primary" @click="healthBynamicBle = true" >人员地图</el-button>
        <!-- <el-button v-if="isAuth('sys:user:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
        <el-button v-if="isAuth('sys:user:delete')" type="warning" @click="addOrUpdateHandle()" :disabled="dataListSelections.length <= 0">修改</el-button>
        <!-- <el-button v-if="isAuth('sys:user:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      ref="multipleTable"
      highlight-current-row
      v-loading="dataListLoading"
      @row-click="handleRowClick"
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
        header-align="center"
        align="center"
        width="180"
        label="账号">
      </el-table-column>
     </el-table-column>
     <el-table-column
        prop="status"
        header-align="center"
        align="center"
        width="80"
        label="性别">
        <template slot-scope="scope">
          <div v-if="scope.row.sex == 1">男</div>
          <div v-else>女</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="idCardNo"
        header-align="center"
        align="center"
        label="身份证">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        width="180"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="220"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="status"
        width="100"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
                  <el-switch class="switchStyle" :disabled="disableds" active-color="#dcdfe6" inactive-color="#409eff" v-model="scope.row.status" 
                  :active-value="0" :inactive-value="1"  active-text="禁用"  inactive-text="启用" @change=handleSwitch(scope.row)>
                  </el-switch>
       </template>
      </el-table-column>
      <!-- <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('sys:user:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.userId)">修改</el-button>
          <el-button v-if="isAuth('sys:user:delete')" type="text" size="small" @click="deleteHandle(scope.row.userId)">删除</el-button>
        </template>
      </el-table-column> -->
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <div v-if="healthBynamicBle" style="position: absolute;top: 0;left: 0;z-index: 11111;width: 100%;">
      <health-bynamic @healthBynamic="healthBynamic"></health-bynamic>
    </div>
  </div>
</template>

<script>
  import AddOrUpdate from './user-add-or-update'
  import healthBynamic from './healthBynamic'
  export default {
    data () {
      return {
        dataForm: {
          userName: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        healthBynamicBle:false,
        disableds:false
      }
    },
    components: {
      AddOrUpdate,
      healthBynamic
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
      getDataList (num) {
        if(num == 1){
            this.pageIndex = 1
        }
        this.dataListLoading = true
        this.dataListSelections = []
        this.$http({
          url: this.$http.adornUrl('/sys/user/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'userName': this.dataForm.userName
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
      
      handleSwitch(row){
        console.log(row.status)
          this.disableds = true
          if(row.status == 1){
            var message = "启用成功"
          }else{
            var message = "禁用成功"
          }
          this.$http({
            url: this.$http.adornUrl(`/sys/user/updateStatus`),
            method: 'post',
            data: this.$http.adornData({
              'userId': row.userId,
              'status': row.status
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.disableds = false
              this.$message({
                message: message,
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
      handleRowClick(row, column, event) {
          this.dataListSelections = row
          this.$refs.multipleTable.toggleRowSelection(row);
      },
      // 多选
      selectionChangeHandle (val) {
        console.log(val)
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
          this.$refs.addOrUpdate.init(id.userId)
        })
      },
      // 删除
      deleteHandle () {
        var ids = this.dataListSelections
        this.$confirm(`确定[${ids.userId ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/user/delete'),
            method: 'post',
            data: this.$http.adornData([ids.userId], false)
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
      },
      healthBynamic(){
        this.healthBynamicBle = false;
      }
    }
  }
</script>
<style lang="scss">
.el-table__body tr.current-row>td{
  background-color: #fdf3ea;
  color: #f19944;
}
.mod-user{
  position: relative;
}
</style>


<style>

.switchStyle .el-switch__label{
  position: absolute;
  left:0;
  top:0;
  display: none;
  color: #fff;
  height:20px;
  line-height: 20px;

}
.switchStyle .el-switch__label *{
  font-size: 10px;
}
.is-checked .el-switch__label {
  /* position: absolute; */
  display: none;
  color:#5d5d5d;
  /* color: #fff; */
}

.switchStyle .el-switch__label--left {
  z-index: 9;
  left: 6px;
}
.switchStyle .el-switch__label--right {
  z-index: 9;
  left: -14px;
}
.switchStyle .el-switch__label.is-active {
  display: block;
}
.switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 55px !important;
  line-height: 20px;
}
</style>