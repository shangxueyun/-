<template>
  <el-dialog
    title="详情"
    :visible.sync="dialogVisible"
    :modal-append-to-body="true"
    :append-to-body="true"
    width="80%">
    <modelTableList :datas="data" ref="modelTableList" v-loading="loading"></modelTableList>
    <span slot="footer" class="dialog-footer">
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
  </el-dialog>

</template>

<script>
  import modelTableList from "../models/modelTableList.vue"
  import {getExcelDetailData} from "@/utils/index"
    export default {
        name: "excelDetail",
      components:{
        modelTableList
      },
      data(){
          return {
            loading:false,
            dialogVisible:false,
            data:{
              budgetSheet:{

              }
            },
          }
      },
      methods:{
        init(id){
          this.loading=true;
          this.dialogVisible=true;
          getExcelDetailData(id,this).then((data)=>{
            this.data=data;
            this.loading=false;
            this.$refs.modelTableList.init(this.data,0)
            // console.log(this.data)
          })
        },
     
      },
      mounted(){

      },
    }
</script>

<style scoped>

</style>
