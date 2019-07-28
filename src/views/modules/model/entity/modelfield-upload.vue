<template>
<div>
  <el-dialog
    title="模型导入"
    :show-header="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="handleClose"
    :visible.sync="visible">
    
<el-upload
  class="upload-demo"
  :action="url"
  :headers="headers"
  accept=".rar"
  ref="upload"
  :before-upload="beforeUpload"
  :on-exceed="handleExceed"
  :on-success="handleSuccess"
  :on-remove="removeupload"
  :limit='1'
  >
  <el-button size="small" type="primary">模型上传</el-button>

  <div slot="tip" class="el-upload__tip">备注：<br/>1：为了节约模型上传时间，请将模型压缩为rar格式（用文件夹包含所有模型文件，文件夹必须用字母或数字，rar文件名与文件夹名称同名）<br/>
2：引擎支持模型格式包括：rvt、dgn、CATProduct、Nwd、ifc、obj、dae、3ds、fbx。</div>
</el-upload>
<div class="uploadlist" v-show="uploadlist">
      <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="模型名称">
              <template slot-scope="scope">
                  <el-input v-model="scope.row.name" @change="changename(scope)" placeholder="请输入内容"></el-input>
              </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="合并相同结构标高">
              <template slot-scope="scope">
                    <el-checkbox v-model="checked"></el-checkbox>
              </template>

      </el-table-column>
    </el-table>
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
</div>

  </el-dialog>
</div>
</template>

<script>

import global from "@/utils/publicUrl";
  export default {
   
    data () {
      var token =  this.$cookie.get('token')
      return {
        checked:'',
        id:'',
        upmodels:global.uploadModel,
        url:global.uploadModel+'bim/upload/uploadFile',
        options:[],
        value: '',
        visible: false,
        dataForm: {
          id: 0,
          watername: '',
          modelname: ''
        },
        dataRule: {
          watername: [
            { required: true, message: '请输入流水段名称', trigger: 'blur' }
          ],
          modelname: [
            { required: true, message: '请输入模型名称', trigger: 'blur' }
          ]
        },
        headers:{'token': token},
        tableData:[],
        uploadlist:false,
        modelName:'',
        newmodelname:'',
        modelUrl:''

      }
    },
    methods: {

      handleClose(done){
          this.$refs.upload.clearFiles()
          this.uploadlist = false
          this.tableData = []
          done();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },

      upchange(){

      },
      handleSuccess(res, file) {
          //  var a="aaa.rar";
          //  var reg = /([^\\/]+)\.([^\\/]+)/i;
          //   reg.test(a);
          //  console.log(RegExp.$1)
          if(res.code == 0){
              this.uploadlist = true
              var filename = file.name
              this.modelUrl =  filename
              var reg = /([^\\/]+)\.([^\\/]+)/i;
              reg.test(filename);
              var name = RegExp.$1
              this.modelName = name
              var arr = [
                 {
                    "name":name
                 }
              ]
              this.tableData = arr
          }else{
            
              this.$refs.upload.clearFiles()
              this.uploadlist = false
              this.tableData = []
             this.$message.error(res.msg)
          }
      },
      removeupload(res, file){
          this.uploadlist = false
      },
      beforeUpload(file) {
          let isname = file.name
          let reg = /([^\\/]+)\.([^\\/]+)/i;
              reg.test(isname);
          let filenames = RegExp.$1
          let regb = /^[0-9a-zA-Z]*$/g;
          if(regb.test(filenames)){
              //
          }else{
            this.$message.error('文件名必须用字母或数字！')
            return  false
          }
      },
      init (id,flowSectionName,modelName) {
        this.dataForm.id = id
        this.dataForm.watername = flowSectionName
        this.dataForm.modelname = modelName
        this.visible = true
      },
      changename(e){
          // console.log(e.row.name)
          this.newmodelname = e.row.name
      },
      // 表单提交
      dataFormSubmit () {
          var names = ''
          if(this.newmodelname == ''){
              names = this.modelName
          }else{
              names = this.newmodelname
          }
          var checked = ''
          if(this.checked == false){
            checked = 2
          }else{
            checked = 1
          }
           this.$http({
              url: this.upmodels+'bim/model/importSiteModel',
              method: 'post',
              data:this.$http.adornData({
                "id":this.dataForm.id,
                "modelName":names,
                "modelUrl":this.modelUrl
              })
            }).then((data)=>{
                if(data.data.code==0){
                    this.$message({
                        message: '导入成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                          this.visible = false
                          this.$refs.upload.clearFiles()
                          this.uploadlist = false
                          this.tableData = []
                          this.$emit('refreshDataList')
                        }
                    })
                }else{
                 
                }
            })
      }
      
           



    }
  }
</script>


<style lang="scss" scoped>

.uploadlist{
  table{
    margin:20px 0 10px 0;
  }
}

</style