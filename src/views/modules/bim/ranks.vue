<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input style="width:300px;" v-model="dataForm.key" placeholder="请输入队伍名称或班组查询" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList('1')">查询</el-button>
        <el-button v-if="isAuth('bim:ranks:save')" type="primary" @click="addOrUpdateHandle()">新增队伍</el-button>

      </el-form-item>
      
      <el-form-item v-show="ranksShow">
        <el-button v-if="isAuth('bim:ranks:delete')" type="primary" @click="addOrUpdateHandleTeam()" :disabled="dataListSelections.length <= 0">新增班组</el-button>
        <el-button v-if="isAuth('bim:ranks:delete')" type="warning" @click="addOrUpdateHandlerank()" :disabled="dataListSelections.length <= 0">修改</el-button>
        <el-button v-if="isAuth('bim:ranks:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
      </el-form-item>
      <el-form-item v-show="teamShow">
        <el-button v-if="isAuth('bim:ranks:delete')" type="warning" @click="addOrUpdateHandleTeamupdate()" :disabled="dataListSelections.length <= 0">修改</el-button>
        <el-button v-if="isAuth('bim:ranks:delete')" type="danger" @click="deleteHandleteam()" :disabled="dataListSelections.length <= 0">删除</el-button>
      </el-form-item>


    </el-form>
    <el-table
      :data="dataList"
      border
      default-expand-all
       @row-click="handleRowClickRanks"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

      <el-table-column
        header-align="center"
        align="center"
        width="50"
        type="expand">
 <template slot-scope="scope">
      <el-table
          fit
       @row-click="handleRowClickTeams"
        :data="scope.row.teamList"
        :default-expand-all="true"
        :show-header="false"
        style="width: 100%;">
              <el-table-column
                prop="name2"
                header-align="center"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                prop=""
                width="300"
                header-align="center"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                header-align="center"
                align="center">
              </el-table-column>
              <el-table-column
                prop="contact"
                header-align="center"
                align="center">
              </el-table-column>
              <el-table-column
                prop="contactInformation"
                header-align="center"
                align="center">
              </el-table-column>
              <el-table-column
                prop="createTime"
                header-align="center"
                align="center">
              </el-table-column>
      </el-table>
 </template>
           

      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="队伍名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center"
        label="班组名称">
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center"
        label="代班联系人">
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
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
    <add-or-update v-if="addOrUpdateVisible"  ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <add-team ref="addTeam" v-if="addTeamVisible" ></add-team>

    
    <add-orr-apdate v-if="addOrApdateVisible" ref="addOrrUpdate" @refreshDataList="getDataList"></add-orr-apdate>

  </div>
</template>

<script>
  import AddOrUpdate from './ranks-add-or-update'
  import AddOrrApdate from './team-add-or-update'
  import AddTeam from './team'
  import { mapActions,mapMutations  } from 'vuex'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        list:[],
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        addOrApdateVisible: false,
        addTeamVisible: false,
        ranksShow:false,
        teamShow:false
      }
    },
    components: {
      AddOrUpdate,
      AddTeam,
      AddOrrApdate
    },
    deactivated() {
       sessionStorage.removeItem("ids"); 
    },
    beforeRouteLeave(to, from, next) {
        this.dataListSelections = []
        $(".el-table__row").css({"background-color":"","color":""}); 
        next();
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList (num) {
        if(num == 1){
            this.pageIndex = 1
        }
        this.dataListLoading = true
        this.dataListSelections = []
        if(this.dataForm.key == ""){
            this.dataForm.key = null
        }
        this.$http({
          url: this.$http.adornUrl('/bim/ranks/list'),
          method: 'post',
          data: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,
            'param':{
              'name': this.dataForm.key
            }
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            var rankslist = data.result.list
            for (var i = 0; i < rankslist.length; i++) {
              
              var teamlist = rankslist[i].teamList
              if(rankslist[i].teamList == null){
                rankslist[i].teamList = []
              }
            }
            this.dataList = rankslist
            this.ranksShow = false
            this.teamShow = false


            this.totalPage = data.result.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      handleRowClickRanks(row, column, event){
          this.ranksShow = true
          this.teamShow = false
          this.dataListSelections = row
      },
      handleRowClickTeams(row, column, event){
          this.ranksShow = false
          this.teamShow = true
          this.dataListSelections = row
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
      // 新增班组
      addOrUpdateHandleTeam () {
        var rows = this.dataListSelections
        this.addOrApdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrrUpdate.inits('',rows.id,rows.name,rows.contact,'')
        })
      },
      // 修改班组
      addOrUpdateHandleTeamupdate () {
        var rows = this.dataListSelections
        console.log(rows)
        this.addOrApdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrrUpdate.inits(rows.id,rows.name,rows.contact,rows.contactInformation,rows.ranksId)
        })
      },
      
      // 修改队伍
      addOrUpdateHandlerank () {
        var rows = this.dataListSelections
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(rows.id)
        })
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle () {
        var rows = this.dataListSelections
        
        this.$confirm(`该内容删除后将无法恢复，是否[${rows.id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/ranks/delete'),
            method: 'post',
            data: this.$http.adornData([rows.id], false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                  this.dataListSelections=[]
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      // 删除班组
      deleteHandleteam () {
        var rows = this.dataListSelections
        
        this.$confirm(`该内容删除后将无法恢复，是否[${rows.id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/team/delete'),
            method: 'post',
            data: this.$http.adornData([rows.id], false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                  this.dataListSelections=[]
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      
      teamlink (id) {
        // alert(id)
        this.addTeamVisible = true
        this.$nextTick(() => {
          this.$refs.addTeam.initdata(id)
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
.el-table__expanded-cell[class*=cell]{
  padding:0
}
</style>

