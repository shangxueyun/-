<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <!-- <el-input v-model="dataForm.key" placeholder="请输入类型" clearable></el-input> -->
            <el-select v-model="dataForm.key" width=100% clearable placeholder="请选择类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList('1')">查询</el-button>
        
        <el-button v-if="isAuth('data:sysdict:save')" type="primary" @click="addOrUpdateHandle('0')">新增</el-button>
        <!-- <el-button v-if="isAuth('data:sysdict:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
        <el-button v-if="isAuth('sys:role:delete')" type="warning" @click="addOrUpdateHandle()" :disabled="dataListSelections.length <= 0">修改</el-button>
        <el-button v-if="isAuth('sys:role:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      ref="multipleTable"
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
        width="50"
        align="center"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
                  <el-switch class="switchStyle" :disabled="disableds" active-color="#dcdfe6" inactive-color="#409eff" v-model="scope.row.status" 
                  :active-value="0" :inactive-value="1"  active-text="禁用"  inactive-text="启用" @change=handleSwitch(scope.row)>
                  </el-switch>
       </template>

      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
      <!-- <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
  </div>
</template>

<script>
  import AddOrUpdate from './dict-add-or-update'
  export default {
    data () {
      return {
        options: [{
          value: '1',
          label: '工种'
        },{
          value: '2',
          label: '专业'
        },{
          value: '4',
          label: '标签属性'
        }],
        dataForm: {
          type: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        status:'',
        disableds:false,
      }
    },
    components: {
      AddOrUpdate
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
        this.dataListSelections = []
        $(".el-table__row").css({"background-color":"","color":""}); 
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/sysdict/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'type': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
      
            this.dataList = data.result.list
            this.totalPage = data.result.totalCount
            
            for (var i = 0; i < this.dataList.length; i++) { 
                if(this.dataList[i].type  == 1){
                  this.dataList[i].type = "工种"
                }
                if(this.dataList[i].type  == 2){
                  this.dataList[i].type = "专业"
                }
                if(this.dataList[i].type  == 4){
                  this.dataList[i].type = "标签属性"
                }
            }
            
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      handleSwitch(row){
        console.log(row.status)
          this.disableds = true
          if(row.status == 1){
            var message = "启用成功"
          }else{
            var message = "禁用成功"
          }
          if(row.type == "工种"){
              var type = 1
          }
          if(row.type == "专业"){
              var type = 2
          }
          if(row.type == "标签属性"){
              var type = 4
          }
          this.$http({
            url: this.$http.adornUrl(`/sys/sysdict/update`),
            method: 'post',
            data: this.$http.adornData({
              'id': row.id,
              'name': row.name,
              'type': type,
              'remark': row.remark,
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
      handleRowClick(row, column, event) {
          // console.log(row)
          this.dataListSelections = row
          this.$refs.multipleTable.toggleRowSelection(row);
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
          this.$refs.addOrUpdate.init(id.id)
        })
      },
      // 删除
      deleteHandle (id) {
        // var ids = id ? [id] : this.dataListSelections.map(item => {
        //   return item.id
        // })

        var ids = this.dataListSelections
        this.$confirm(`确定进行[${ids.id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/sysdict/delete'),
            method: 'post',
            data: this.$http.adornData([ids.id], false)
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


<style lang="scss">
.el-table__body tr.current-row>td{
  background-color: #fdf3ea;
  color: #f19944;
}

</style>