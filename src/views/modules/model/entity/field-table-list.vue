<template>
  <div class="mod-config">
    <el-table
      :data="dataList"
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
        width="120">
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
     
      <el-table-column
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        label="">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addMonomerHandle(scope.row.id,scope.row.modelName)">编辑</el-button>
          <el-button type="text" size="small" @click="delfield(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <add-or-water v-if="addOrWaterVisible" ref="addOrWater" @refreshDataList="getDataList"></add-or-water>
    <add-monomer v-if="addMonomerVisible" ref="addMonomer" @refreshDataList="getDataList"></add-monomer>
  </div>
</template>

<script>

  import AddOrWater from './water-add-or-update'
  import AddMonomer from './fieldmodel-add'
  export default {
    props: ['twolevelData'],
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList:[],
        addOrWaterVisible:false,
        addMonomerVisible:false,
      }
    },
    components: {
      AddOrWater ,
      AddMonomer
    },
    watch:{
      twolevelData:{
        handler(a,b){
          this.dataList=a;
        },
        deep:true
      }
    },
    mounted(){
       this.dataList=this.twolevelData;

    },
    methods: {
      addWater(row){
        this.addOrWaterVisible = true
        this.$nextTick(() => {
          this.$refs.addOrWater.init(row.id,row.modelMajorId,row.name)
        })
      },
      addMonomerHandle(id,name){
        this.addMonomerVisible = true
        this.$nextTick(() => {
          this.$refs.addMonomer.init(id,name)
        })
      },
      delfield(id){
        this.$confirm(`确定进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$http({
            url: this.$http.adornUrl('/bim/model/deleteSiteModel'),
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
</style>

