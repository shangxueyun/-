<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input style="width:320px;" v-model="dataForm.key" placeholder="请输入专业分组、单体分组、流水段名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('bim:modelMajor:save')" type="primary" @click="addOrUpdateHandle()">新增专业分组</el-button>
      </el-form-item>
      <!-- 单体分组操作 -->
      <el-form-item v-show="monomerbtn"> 
        <el-button v-if="isAuth('sys:role:delete')" type="primary" @click="addMonomerHandle">新建单体分组</el-button>
        <el-button v-if="isAuth('sys:role:delete')" type="danger" @click="delmodelMajorHandle">删除</el-button>
      </el-form-item>
      <!-- 流水段操作 -->
      <el-form-item v-show="waterbtn"> 
        <el-button v-if="isAuth('sys:role:delete')" type="primary" @click="addWater">新建流水段</el-button>
        <el-button v-if="isAuth('sys:role:delete')" type="warning" @click="addMonomerHandlebj">编辑</el-button>
        <el-button v-if="isAuth('sys:role:delete')" type="danger" @click="delwater">删除</el-button>
      </el-form-item>
      <!-- 模型操作 -->
      <el-form-item v-show="modelbtn"> 
        <el-button v-if="isAuth('sys:role:delete')" type="primary" @click="modelupload">导入模型</el-button>
        <el-button v-if="isAuth('sys:role:delete')" type="warning" @click="waterupdateclick">编辑</el-button>
        <el-button v-if="isAuth('sys:role:delete')" type="danger" @click="delmodel">删除模型</el-button>
        <el-button v-if="isAuth('sys:role:delete')" type="danger" @click="delandWater">删除</el-button>
      </el-form-item>


        
    </el-form> 
    <div class="tablesbox">
        <el-table
          :data="dataList"
          border
          default-expand-all
          fit
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
      :data="scope.row.modelMonomerList"
      :default-expand-all="true"
      :show-header="false"
      fit
          ref="monomerTable"
          @row-click="handleRowClickMonomer"
      style="width: 100%;">
      <el-table-column
        prop="name2"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name1"
        header-align="center"
        align="center"
        type="expand"
        width="280">
        <template slot-scope="scope">

   <el-table
      :data="scope.row.modelList"
          fit
          ref="modelTable"
          @row-click="handleRowClickModel"
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
        prop="name1"
        header-align="center"
        align="center"
        width="280">
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="flowSectionName"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="modelName"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
            width="100"
        align="center">

        <template slot-scope="scope">
                      <span v-if="scope.row.analysisFlag == '0'">初始化</span>
                      <span  v-else-if="scope.row.analysisFlag == '1'">成功</span>
                      <span  v-else-if="scope.row.analysisFlag == '2'">失败</span>
                      <span  v-else-if="scope.row.analysisFlag == null"></span>
                      <span  v-else-if="scope.row.analysisFlag == ''"></span>

        </template>
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
        prop="name"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
            width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop=""
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
            label="专业分组">
            <template slot-scope="scope">
              <span>{{scope.row.majorName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="types"
            header-align="center"
            align="center"
            label="单体分组">
          </el-table-column>
          <el-table-column
            prop="remark"
            header-align="center"
            align="center"
            label="流水段名称">
          </el-table-column>
          <el-table-column
            prop="remark"
            header-align="center"
            align="center"
            label="模型名称">
          </el-table-column>
          <el-table-column
            prop="remark"
            header-align="center"
            align="center"
            width="100"
            label="抽取状态">
          </el-table-column>
          <el-table-column
            prop="remark"
            header-align="center"
            align="center"
            label="更新时间">
          </el-table-column>
        </el-table>

    </div>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <!-- 弹窗, 新增流水段 -->
    <add-or-water v-if="addOrWaterVisible" ref="addOrWater" @refreshDataList="getDataList"></add-or-water>
    <add-monomer v-if="addMonomerVisible" ref="addMonomer" @refreshDataList="getDataList"></add-monomer>

    <water-update v-if="waterUpdateVisible" ref="waterUpdate" @refreshDataList="getDataList"></water-update>

    <model-upload v-if="modelUploadVisible" ref="modelUpload" @refreshDataList="getDataList"></model-upload>
  </div>
</template>

<script>
  import AddOrUpdate from './entity/major-add-or-update'
  import AddOrWater from './entity/water-add-or-update'
  
  import TableList from './entity/entitymodel-table-list'
  import AddMonomer from './entity/monomer-add'

  import WaterUpdate from './entity/water-update'
  import ModelUpload from './entity/model-upload'
  
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        tabdata:[],
        sanlist:[],
        modelList:[],
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        addMonomerVisible:false,
        addOrWaterVisible:false,
        waterUpdateVisible:false,
        modelUploadVisible:false,
        activeIndex:false,
        isShow:false,
        dataListSelections:[],
        monomerbtn:false,
        waterbtn:false,
        modelbtn:false,
      }
    },
    components: {
      AddOrUpdate ,
      TableList ,
      AddMonomer,
      AddOrWater,
      WaterUpdate,
      ModelUpload
    },
    activated () {
      this.getDataList()
    },

    beforeRouteLeave(to, from, next) {
        this.dataListSelections = []
          this.monomerbtn = false
          this.waterbtn = false
          this.modelbtn = false
        next();
    },
    methods: {
      clicks(index){
        // console.log(index)
        // // this.activeIndex = true;
        // // this.activeIndex = this.activeIndex == index ? -1 :index;
        //  this.isShow=index


      },
      // 获取数据列表
      getDataList () {
        this.dataListSelections = []
        $(".el-table__row").css({"background-color":"","color":""}); 
        this.monomerbtn = false
        this.waterbtn = false
        this.modelbtn = false
        var seft = this
        this.dataListLoading = true
        // this.dataListLoading = false
        this.$http({
          url: this.$http.adornUrl('/bim/model/listEntityModel'),
          method: 'post',
          data: this.$http.adornParams({
            'modelName': this.dataForm.key,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            var modelListarr = data.result
            modelListarr.forEach((item) =>{
                if(item.modelMonomerList == null){
                    // alert(1)
                    item.modelMonomerList = []
                }
            })
            this.dataList = modelListarr
          } else {
            
          }
          this.dataListLoading = false
        })
      },
      
      handleRowClick(row, column, event) {
          this.monomerbtn = true
          this.waterbtn = false
          this.modelbtn = false


          this.dataListSelections = row
          console.log("row1",row.modelList)

          // this.$refs.multipleTable.toggleRowSelection(row);
      },

      handleRowClickMonomer(row, column, event){
          this.monomerbtn = false
          this.waterbtn = true
          this.modelbtn = false

          this.dataListSelections = row

      },
      handleRowClickModel(row, column, event){
          this.monomerbtn = false
          this.waterbtn = false
          this.modelbtn = true
          this.dataListSelections = row
      },

      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 新建单体分组
      addMonomerHandle(id){
        this.addMonomerVisible = true
        this.$nextTick(() => {
          this.$refs.addMonomer.init('',this.dataListSelections.id)
        })
      },
      // 新建流水段
      addWater(){
        console.log("this.dataListSelections",this.dataListSelections)
        var rows = this.dataListSelections
        this.addOrWaterVisible = true
        this.$nextTick(() => {
          this.$refs.addOrWater.init(rows.id,rows.modelMajorId,rows.name)
        })
      },
      // 编辑流水段
      addMonomerHandlebj(){
        var rows = this.dataListSelections
        this.addMonomerVisible = true
        this.$nextTick(() => {
          this.$refs.addMonomer.init(rows.id,rows.name)
        })
      },
      // 编辑模型 流水段
      waterupdateclick(){
        var rows = this.dataListSelections
        this.waterUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.waterUpdate.init(rows.id,rows.flowSectionName,rows.modelName)
        })
      },
      // addWater(id , modelMajorId ,name){
      //   this.addOrWaterVisible = true
      //   this.$nextTick(() => {
      //     this.$refs.addOrWater.init(id,modelMajorId ,name)
      //   })

      // },
      waterupdate(id){
        this.waterUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.waterUpdate.init(id)
        })
      },

      // 导入模型
      modelupload(){
        var rows = this.dataListSelections
        this.modelUploadVisible = true
        this.$nextTick(() => {
          this.$refs.modelUpload.init(rows.id)
        })

      },
      // 删除单体分组
      delwater(){
        var rows = this.dataListSelections
        this.$confirm('删除该单体分组后，该分组下的流水段和模型都会删除。', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$http({
            url: this.$http.adornUrl('/bim/modelMonomer/delete'),
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
      // 删除流水段
      delandWater(){
        var rows = this.dataListSelections
        this.$confirm('删除该流水段后，该流水段下的模型都会删除。', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$http({
            url: this.$http.adornUrl('/bim/model/delete'),
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

        // 删除模型
      delmodel(){
        var rows = this.dataListSelections
            this.$confirm('该模型删除后将无法恢复，是否删除？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 this.$http({
                    url: this.$http.adornUrl('/bim/model/deleteModel'),
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
       // 删除专业分组
      delmodelMajorHandle(){

        var rows = this.dataListSelections
        this.$confirm('删除该专业分组后，该分组下的下级分组和模型都会删除。', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/modelMajor/delete'),
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
          }).catch(() => {
          }); 
        })
      },
      delMonomerHandle(id){
        this.$confirm(`确定对[id=${id}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/modelMonomer/delete'),
            method: 'post',
            data: this.$http.adornData({
                "id":id
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
          }).catch(() => {
          }); 
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/sysdict/delete'),
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
.el-table--border td{
  /* border-right:0;
  border-left:1px solid #ebeef5; */
}
table table  td{
  /* border-right:1px solid red;
  margin:0 0 0 0; */
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
.el-table__body tr.current-row>td{
  background-color: #fdf3ea;
  color: #f19944;
}
</style>
