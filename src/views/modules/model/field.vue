<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="请输入模型名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <!-- <el-button v-if="isAuth('data:sysdict:save')" type="primary" @click="addOrUpdateHandle()">新增专业分组</el-button> -->
      </el-form-item>

      <!-- 单体分组操作 -->
      <el-form-item v-show="monomerbtn"> 
        <el-button  type="primary" @click="modelupload">导入模型</el-button>
      </el-form-item>
      <!-- 流水段操作 -->
      <el-form-item v-show="waterbtn"> 
        <el-button type="warning" @click="addMonomerHandle">编辑</el-button>
        <el-button type="danger" @click="delfield">删除</el-button>
      </el-form-item>
    </el-form> 
        <el-table
          :data="dataList"
          border
          default-expand-all
          ref="multipleTable"
          @row-click="handleRowClick"
          v-loading="dataListLoading"
          style="width: 100%;">
          <el-table-column
            header-align="center"
            align="center"
            width="50"
            type="expand">
            <template slot-scope="scope">
   <el-table
      :data="scope.row.modelList"
          ref="monomerTable"
          @row-click="handleRowClickMonomer"
      :default-expand-all="true"
      :show-header="false"
      style="width: 100%;">
      <el-table-column
        prop=""
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center"
        width="280">
      </el-table-column>
      <el-table-column
        prop="modelName"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center">
      </el-table-column>
    </el-table>

            </template>
          </el-table-column>
          <el-table-column
            prop="majorName"
            header-align="center"
            align="center"
            width="280"
            label="分组名称">
            <template slot-scope="scope">
              <span>{{scope.row.majorName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            header-align="center"
            align="center"
            label="模型名称">
          </el-table-column>
          <el-table-column
            prop="remark"
            header-align="center"
            align="center"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="remark"
            header-align="center"
            align="center"
            label="更新时间">
          </el-table-column>
        </el-table>

    <model-upload v-if="modelUploadVisible" ref="modelUpload" @refreshDataList="getDataList"></model-upload>
    <add-monomer v-if="addMonomerVisible" ref="addMonomer" @refreshDataList="getDataList"></add-monomer>

  </div>
</template>

<script>
  import AddOrUpdate from './entity/major-add-or-update'
  import TableList from './entity/field-table-list'
  import ModelUpload from './entity/modelfield-upload'
  import AddMonomer from './entity/fieldmodel-add'
//   import WaterUpdate from './entity/water-update'
  
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        dataListLoading: false,
        modelUploadVisible:false,
        dataListSelections:[],
        addMonomerVisible:false,
        monomerbtn:false,
        waterbtn:false,
      }
    },
    components: {
      TableList ,
      ModelUpload,
      AddMonomer
    },
    activated () {
      this.getDataList()
    },
    beforeRouteLeave(to, from, next) {
        this.dataListSelections = []
        this.monomerbtn = false
        this.waterbtn = false
        next();
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListSelections = []
        $(".el-table__row").css({"background-color":"","color":""}); 
        var seft = this
        this.dataListLoading = true
        // this.dataListLoading = false
        this.$http({
          url: this.$http.adornUrl('/bim/model/listSiteModel'),
          method: 'post',
          data: this.$http.adornParams({
            'modelName': this.dataForm.key,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.result
          } else {
          }
          this.dataListLoading = false
        })
      },


      handleRowClick(row, column, event) {
          console.log(row)
          this.monomerbtn = true
          this.waterbtn = false
          this.dataListSelections = row

      },

      handleRowClickMonomer(row, column, event){
          console.log(row)
          this.monomerbtn = false
          this.waterbtn = true

          this.dataListSelections = row

      },

      modelupload(){
        var rows = this.dataListSelections
        this.modelUploadVisible = true
        this.$nextTick(() => {
          this.$refs.modelUpload.init(rows.id)

        })
      },
      addMonomerHandle(){
        var rows = this.dataListSelections
        this.addMonomerVisible = true
        this.$nextTick(() => {
          this.$refs.addMonomer.init(rows.id,rows.modelName)
        })
      },

      delfield(){
        var rows = this.dataListSelections
        this.$confirm(`确定进行[${rows.id ? '删除' : '批量删除'}]操作?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$http({
            url: this.$http.adornUrl('/bim/model/deleteSiteModel'),
            method: 'post',
            data: this.$http.adornData({
                "id":rows.id
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
            }).catch(error => {
                console.log(error);
            })
        })
      },
     
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

<style >
.el-table__expanded-cell[class*=cell]{
  padding:0
}

table .el-table--border{
  border:0;
  /* border-right:0; */
}
table .el-table--border td:last-child{
  border-right:1px solid red;; 
  border:0;
}
.tables{
    border:1px solid #ebeef5;
    width:100%;
    border-collapse: collapse;
    text-align: center;
    margin:0 0 20px 0;
}
.tables td{
    height:45px;
    border:1px solid #ebeef5;
    position: relative;
}
.tables thead th{
    color:#909399;
    border:1px solid #ebeef5;
    height:45px;
    font-weight:bold;
}

.iconimg{
    position: absolute;
    left:10px;
    color:#909399;
}
.isShow{
    display: none;
}
</style>
