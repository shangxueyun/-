<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <!-- <el-input v-model="dataForm.key" placeholder="请输入类型" clearable></el-input> -->
            <el-select v-model="dataForm.key" width=100% clearable placeholder="请选择区域类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList('1')" v-if="isAuth('bim:problemTrackingSetting:listPg')" >查询</el-button>
        
        <el-button v-if="isAuth('bim:problemTrackingSetting:save')" type="primary" @click="addOrUpdateHandle('0')">新增区域</el-button>
        <!-- <el-button v-if="isAuth('data:sysdict:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
        <el-button v-if="isAuth('bim:problemTrackingSetting:update')" type="warning" @click="editUpdateHandle()" :disabled="dataListSelections.length <= 0">修改</el-button>
        <el-button v-if="isAuth('bim:problemTrackingSetting:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      ref="multipleTable"
      @row-click="handleRowClick"
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        type="index"
        header-align="center"
        width="50"
        align="center"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="regionalType"
        width="110"
        header-align="center"
        align="center"
        label="区域类型">
            <template slot-scope="scope">
                  <span v-if="scope.row.regionalType == 1">
                    单体模型
                  </span>
                  <span v-if="scope.row.regionalType == 2">
                    场布模型
                  </span>
            </template>
      </el-table-column>
      <el-table-column
        prop="monomerName"
        header-align="center"
        align="center"
        label="区域">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="problemTrackingSettingUserList"
        header-align="center"
        align="center"
        label="负责人员">
            <template slot-scope="scope">
                  {{personInCharges(scope.row)}}
            </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="problemTrackingSettingTeamList"
        header-align="center"
        align="center"
        label="负责班组">
            <template slot-scope="scope">
                  {{problemTracking(scope.row)}}
            </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="操作时间">
      </el-table-column>
      <el-table-column
        prop="createUser"
        header-align="center"
        align="center"
        width="110"
        label="操作人员">
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <edit v-if="editUpdateVisible" ref="editUpdate" @refreshDataList="getDataList"></edit>
  </div>
</template>

<script>
  import AddOrUpdate from './problemSet-add-or-update'
  import edit from './problemSet-edit'
  
  export default {
    data () {
      return {
        options: [{
          value: '1',
          label: '单体模型'
        },{
          value: '2',
          label: '场布模型'
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
        editUpdateVisible:false
      }
    },
    components: {
      AddOrUpdate,
      edit
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
          url: this.$http.adornUrl('/bim/problemTrackingSetting/listPg'),
          method: 'post',
          data: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,
            'param': {
              'regionalType':this.dataForm.key
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
      
      personInCharges(arrs){
        var arr = arrs.problemTrackingSettingUserList
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            str += arr[i].userName+ ",";
        }
        if (str.length > 0) {
            str = str.substr(0, str.length - 1);
        }
        return str;
      },
      problemTracking(arrs){
        var arr = arrs.problemTrackingSettingTeamList
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            str += arr[i].teamName+ ",";
        }
        if (str.length > 0) {
            str = str.substr(0, str.length - 1);
        }
        return str;
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
      editUpdateHandle(){
        
        var rows = this.dataListSelections
        this.editUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.editUpdate.init(rows)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = this.dataListSelections
        this.$confirm(`确定进行[${ids.id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/problemTrackingSetting/delete'),
            method: 'post',
            data: this.$http.adornData({
              'id':ids.id
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