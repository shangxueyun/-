<template>
  <div class="mod-config">
    <el-table
      :data="dataList"
      :default-expand-all="true"
      :show-header="false"
      fit
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
        width="120">
        <template slot-scope="scope">
               <table-lists :levelData="scope.row.modelList" @updateRefresh="getDataList" ></table-lists>
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
      <el-table-column
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="300"
        label="">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addWater(scope.row)">新建流水段</el-button>
          <el-button type="text" size="small" @click="addMonomerHandle(scope.row.id,scope.row.name)">修改</el-button>
          <el-button type="text" size="small" @click="delwater(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <add-or-water v-if="addOrWaterVisible" ref="addOrWater" @refreshDataList="getDataList"></add-or-water>
    <add-monomer v-if="addMonomerVisible" ref="addMonomer" @refreshDataList="getDataList"></add-monomer>
  </div>
</template>

<script>

  import TableLists from './entitys-table-list'
  import AddOrWater from './water-add-or-update'
  import AddMonomer from './monomer-add'
  export default {
    props: ['twolevelData'],
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList:[],
        addOrWaterVisible:false,
        addMonomerVisible:false
      }
    },
    components: {
      TableLists ,
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
      delwater(id){
        this.$confirm('删除该单体分组后，该分组下的流水段和模型都会删除。', {
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

