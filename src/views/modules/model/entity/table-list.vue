<template>
  <div class="mod-config">
    <el-table
      :data="dataList"
      border
      @expand-change="expandChange"
      default-expand-all
      @row-click="rowClick"
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
        type="expand"
        width="120">
        <template slot-scope="scope">
                <table-lists :isShow="isShow" :childData=scope.row.budgetDtoList @getRowData="getRowDataFun" @getTabData="getTabDataFun" @changeTabData="getDataList"></table-lists>
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
<!--      <el-table-column-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        width="150"-->
<!--        label="">-->
<!--&lt;!&ndash;        <template slot-scope="scope">&ndash;&gt;-->
<!--&lt;!&ndash;          <upload @getFile="getFileFun" :listId="scope.row" v-if="!isShow"></upload>&ndash;&gt;-->
<!--&lt;!&ndash;        &ndash;&gt;-->
<!--&lt;!&ndash;          <template v-if="!isShow">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-button type="text" size="small" @click="editOrUpdateHandle(scope.row)">修改</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->

<!--&lt;!&ndash;        </template>&ndash;&gt;-->
<!--      </el-table-column>-->
    </el-table>
    <add-or-update  ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <importExcel ref="importExcel"  @changedom="changeTabData"></importExcel>
  </div>
</template>

<script>

  import TableLists from './table-lists'
  import AddOrUpdate from './model-add-or-update'
  import importExcel from "../models/importExcel"
  import upload from "../models/upload"
  export default {
    props:['parentData','isShow'],
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList:[]
      }
    },
    watch:{
      parentData:{
        handler(a,b){
          console.log(a)
          this.dataList=a;
        },
        deep:true
      }
    },
    components: {
      TableLists,
      AddOrUpdate,
      importExcel,
      upload
    },
    mounted(){
      this.dataList=this.parentData;
    },
    activated () {
      
    },
    methods: {
      rowClick(row){
        console.log(this.$parent)
        this.$emit('changeCurrent',row)
      },
      getRowDataFun(row){//获取点击数据
         this.$emit('getRowData',row)
      },
      changeTabData(){
        // alert('更新')
        this.$emit('changeTabDataChild')
      },
      getTabDataFun(data){//获取详情回调
        this.$emit('getTabDataChild',data)
      },
      getFileFun(result){
         console.log(result);
        this.$refs.importExcel.dialogVisible=true;
        this.$refs.importExcel.init('',result);
      },
      // importExcel(id){//导入计划清单
      //     this.$refs.importExcel.dialogVisible=true;
      // },
      editOrUpdateHandle(row){//修改
        console.log(row)
        this.$refs.addOrUpdate.visible=true;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(row.name,row.id)
        })
      },
      deleteHandle(id){//删除
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http({
              url:this.$http.adornUrl(`/bim/budgetmonomer/delete`),
              method:'post',
              data:[id]
            }).then((data)=>{
              if(data.data.code==0){
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('changeDom')
                  }
                })
              }else{
                this.$message({
                  message: '删除失败',
                  type: 'error',
                  duration: 1500,

                })
              }
            })
        }).catch(() => {

        });
      },
      getDataList(){
        this.$emit('changeDom')
      },
      expandChange(){

      }
    }
  }
</script>
<style>
.el-table__expanded-cell[class*=cell]{
  padding:0
}
</style>

