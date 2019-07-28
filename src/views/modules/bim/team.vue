<template>
  <el-dialog
     :title="!dataForm.id ? '班组管理' : '班组管理'"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    width="70%"
    :visible.sync="visible">

  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="请输入班组名称查询" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('bim:team:save')" type="primary" @click="addOrUpdateHandles()">新增</el-button>
        <el-button v-if="isAuth('bim:team:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="50"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="班组名称">
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
     
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandles(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
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
    <add-orr-apdate v-if="addOrApdateVisible" ref="addOrrUpdate" @refreshDataList="getDataList"></add-orr-apdate>
  </div>
 </el-dialog>
</template>

<script>
  import AddOrrApdate from './team-add-or-update'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrApdateVisible: false,
        ids:''
      }
    },
    components: {
      AddOrrApdate
    },
    // activated() {
    //   alert(2)
    //   this.getDataList()
      
    // },
    methods: {
      initdata (id) {
        this.ids = id
        sessionStorage.setItem("ids",this.ids)
        this.dataForm.id = id || 0
        this.visible = true
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        if(this.dataForm.key == ""){
            this.dataForm.key = null
        }
        this.$http({
          url: this.$http.adornUrl('/bim/team/list'),
          method: 'post',
          data: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,
            'param':{
              'name':this.dataForm.key,
              'ranksId':this.ids
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandles (id) {
        
        this.addOrApdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrrUpdate.inits(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/team/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
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
    }
  }
</script>
