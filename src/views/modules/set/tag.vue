<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input @change="inputchange" style="width:300px;" v-model="dataForm.key" placeholder="请输入标签名称、属性、类型、RFID号" clearable></el-input>
            <!-- <el-select v-model="dataForm.key" width=100% clearable placeholder="请选择类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList('1')">查询</el-button>
        
        <!-- <el-button v-if="isAuth('data:sysdict:save')" type="primary" @click="addOrUpdateHandle('0')">新增</el-button> -->
       
        <el-button v-if="isAuth('sys:role:delete')" type="warning" @click="addOrUpdateHandle()" :disabled="dataListSelections.length <= 0">修改</el-button>
        <!-- <el-button v-if="isAuth('sys:role:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">删除</el-button> -->
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
        prop="labelName"
        header-align="center"
        align="center"
        label="标签名称">
      </el-table-column>
      <el-table-column
        prop="attributeName"
        header-align="center"
        align="center"
        label="属性">
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="类别">
      </el-table-column>
      <el-table-column
        prop="colour"
        header-align="center"
        align="center"
        width='100'
        label="标签颜色">
            <template slot-scope="scope">
                  <div class="colour" :style="{'background': ''+scope.row.colour+''}"></div>
            </template>
      </el-table-column>
      <el-table-column
        prop="rfId"
        header-align="center"
        align="center"
        width="200"
        label="绑定RFID">
      </el-table-column>
      <el-table-column
        prop="location"
        header-align="center"
        align="center"
        label="绑定位置">
      </el-table-column>
      <el-table-column 
        :show-overflow-tooltip="true"
        prop="person"
        header-align="center"
        align="center"
        label="绑定负责人">
            <template slot-scope="scope">
                  {{personInCharges(scope.row)}}
            </template>
      </el-table-column>
      <el-table-column
        prop="safetyPatrolFormName"
        header-align="center"
        align="center"
        width="180"
        label="绑定表单">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="200"
        label="操作时间">
      </el-table-column>
      <el-table-column
        prop="createUser"
        header-align="center"
        align="center"
        width='100'
        label="操作人">
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
  </div>
</template>

<script>
  import AddOrUpdate from './tag-add-or-update'
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
      inputchange(val){
          if(val == ''){
              this.getDataList()
          }
      },
      getDataList (num) {
        if(num == 1){
            this.pageIndex = 1
        }
        this.dataListSelections = []
        $(".el-table__row").css({"background-color":"","color":""}); 
        this.dataListLoading = true

        this.$http({
          url: this.$http.adornUrl('/bim/laber/list'),
          method: 'post',
          data: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,
            'param':{
              'labelName': this.dataForm.key
            }
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.result.list
            this.totalPage = data.result.totalCount
              for (var i = 0; i < this.dataList.length; i++) { 
                if(this.dataList[i].attribute  == 1){
                  this.dataList[i].attribute = "工种"
                }
                if(this.dataList[i].attribute  == 2){
                  this.dataList[i].attribute = "专业"
                }
                if(this.dataList[i].attribute  == 4){
                  this.dataList[i].attribute = "标签属性"
                }
            }
            
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      personInCharges(arrs){
        var arr = arrs.laberUserList
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            str += arr[i].personInCharge+ ",";
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
      addOrUpdateHandle () {
        
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(this.dataListSelections)
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
            url: this.$http.adornUrl('/bim/laber/delete'),
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
  display: none;
  color: #fff;
  font-size: 10px;
}
.switchStyle .el-switch__label *{
  font-size: 10px;
}
.is-checked .el-switch__label {
  position: absolute;
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
.colour{
   display:block;
   height:22px;
   
}
</style>

