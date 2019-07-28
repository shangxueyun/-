<template>
  <el-upload
    multiple
    :auto-upload="true"
    :show-file-list="false"
    :http-request="uploadFile"
    :headers="header"
    :action="actionUrl"
    :on-success="handleSuccess">
    <el-button type="primary" icon="el-icon-upload">点击上传</el-button>
  </el-upload>
</template>

<script>
  import Vue from 'vue'

  import global from "@/utils/publicUrl";
  export default {
    data () {
      return {
        globalurls:global.uploadImgUrl,
        actionUrl: '',
        header: {'token': ''},
        label: {}
      }
    },
    methods: {
      handleSuccess (response, file, fileList) {
        console.log(response)
        console.log(file)
        console.log(fileList)
        if (response.code === 0) {
          this.$message('上传成功')
        }
      },
      handleRemove (file, fileList) {
      },
      uploadFile (file) {
        var uploadSize = file.file.size
        if (uploadSize < 1024) {
            uploadSize =  uploadSize + 'B';
        } else if (uploadSize < (1024*1024)) {
            var temp = uploadSize / 1024;
            temp = temp.toFixed(2) + 'KB';
            // return temp + 'KB';
        } else if (uploadSize < (1024*1024*1024)) {
            var temp = uploadSize / (1024*1024);
            temp = temp.toFixed(2) + 'MB';
            // return temp + 'MB';
        } else {
            var temp = uploadSize / (1024*1024*1024);
            temp = temp.toFixed(2) + 'GB';
            // return temp + 'GB';
        }
        console.log("temp",uploadSize)
        
        var size = uploadSize / 1024;
        if( size > 100000){
           this.$message.error("附件不能大于100M,请重新选择！")
        }
        this.label = this.$store.state.folder.viewFolder
        // this.actionUrl = this.$http.adornUrl('/file/upload?id=' + this.label.id)
        this.actionUrl = this.globalurls+('file/upload?id=' + this.label.id)
        this.$http.post(this.actionUrl, null, {
          transformRequest: [() => {

            let formData = new FormData()
            formData.append('file', file.file)
            return formData
          }
          ]
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$http({
              url: this.$http.adornUrl('/bim/datafile/save'),
              method: 'post',
              data: this.$http.adornData({
                'dataLabelId': this.label.id,
                'fileName': file.file.name,
                'url': data.result.url,
                'fileSize': temp
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                // this.$message.success('上传成功')
                    sessionStorage.setItem('nameid',this.label.id)
                    this.$emit('refresh')
                    this.$message.success('上传成功')
                    this.$emit('changeTrees')
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    created () {
      this.actionUrl = this.$http.adornUrl('/bim/upload/file')
      this.header.token = Vue.cookie.get('token')
    }
  }
</script>

<style scoped>
  .upload {
    width: 5vw;
    height: 30vh;
  }
</style>
