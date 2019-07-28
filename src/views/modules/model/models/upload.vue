<template>
  <!--上传excel表格-->

  <el-upload
  class="upload-demo"
  :action="action"
  :headers="headers"
  :on-success="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :on-change="handleErr"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <el-button type="primary" style="margin-left: 5px">导入计划清单</el-button>
  </el-upload>
</template>
<script>
  export default {
    props:['listId'],
    data(){
      return {
        action:"",
        fileList:[],
        headers:{
          token:""
        },
      }
    },
    mounted(){
      this.action = this.$http.adornUrl(`/excel/analysis`)
      this.headers.token=this.$cookie.get('token')
    },
    methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(this.listId);
        if(file.code==0){
          let result=file.result;
          result.budgetMajorId=this.listId.budgetMajorId
          result.budgetMonomerId=this.listId.id;
          console.log(result)
          this.$emit('getFile',result);
        }
      },
      handleErr(file, fileList){
        console.log(file)
      if(file.response&&file.response.code!=0){
        this.$message.error(`${file.response.msg}`);
      }


      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    }
  }
</script>
<style >
   .upload-demo .el-upload-list{
     display:none;
   }
</style>
