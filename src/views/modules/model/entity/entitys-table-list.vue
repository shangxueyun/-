<template>
  <div class="mod-config tablesbox">
    <el-table
      :data="dataList"
          fit
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
        width="120">
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
      <el-table-column
      <el-table-column
        header-align="center"
        align="center"
        width="299"
        label="">
        <template slot-scope="scope">
          <Div class="words">
          <el-button type="text" size="small" @click="waterupdateclick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delandWater(scope.row.id)">删除</el-button>
          <el-button type="text" size="small" @click="delmodel(scope.row.id)">删除模型</el-button>
           <span v-if="scope.row.analysisFlag == '0'">
                 <el-button type="text" disabled size="small" @click="modelupload(scope.row.id)">导入模型</el-button>
           </span>
            <span  v-else-if="scope.row.analysisFlag == '1'">
                <el-button type="text" disabled size="small" @click="modelupload(scope.row.id)">导入模型</el-button>
            </span>
            <span  v-else>
                <el-button type="text"  size="small" @click="modelupload(scope.row.id)">导入模型</el-button>
            </span>
          </Div>
        </template>
      </el-table-column>
    </el-table>

    <water-update v-if="waterUpdateVisible" ref="waterUpdate" @refreshDataList="getDataList"></water-update>
    <model-upload v-if="modelUploadVisible" ref="modelUpload" @refreshDataList="getDataList"></model-upload>
  </div>
</template>

<script>

  import WaterUpdate from './water-update'
  import ModelUpload from './model-upload'
  export default {
    props: ['levelData'],
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList:[],
        waterUpdateVisible:false,
        modelUploadVisible:false
      }
    },
    watch:{
      levelData:{
        handler(a,b){
          console.log(a)
          this.dataList=a;
        },
        deep:true
      }
    },
    components: {
      WaterUpdate,
      ModelUpload
    },
    mounted(){
      this.dataList=this.levelData;

    },
    methods: {
       addTdClass({row, column}) {
            alert(1)
      },
      modelupload(id){
        this.modelUploadVisible = true
        this.$nextTick(() => {
          this.$refs.modelUpload.init(id)
        })

      },
      waterupdateclick(row){
        this.waterUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.waterUpdate.init(row.id,row.flowSectionName,row.modelName)
        })
      },
      delandWater(id){
        this.$confirm('删除该流水段后，该流水段下的模型都会删除。', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$http({
            url: this.$http.adornUrl('/bim/model/delete'),
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
                          this.$emit('updateRefresh')
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
      delmodel(id){
            this.$confirm('该模型删除后将无法恢复，是否删除？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 this.$http({
                    url: this.$http.adornUrl('/bim/model/deleteModel'),
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
                                  this.$emit('updateRefresh')
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
      getDataList(){
        this.$emit('updateRefresh')
      },
     
    },
    updated() {
        // $(".tablesbox tr").each(function() {
        //       $(this).click(function(){
        //            $("tr").css("background-color",""); 
        //             $(this).css("background-color","#ff0f0f");
        //       })
        // });	
    }
  }
</script>
<style >
table{
  border:0;
}
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
</style>

