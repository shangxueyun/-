<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="actionUrl"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :file-list="fileList"
    :headers="header"
    :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </el-upload>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'DataUpload',
    props: ['labelId'],
    data () {
      return {
        visable: false,
        fileList: [],
        actionUrl: '',
        header: {'token': ''}
      }
    },
    methods: {
      submitUpload () {
        this.$refs.upload.submit()
      },
      handleSuccess (response, file, fileList) {
        console.log(response)
        if (response.code === 0) {
          this.$message('上传成功')
          this.$emit('changeDom')
        }
      },
      handleRemove (file, fileList) {
      },
      handlePreview (file) {
      }
    },
    created () {
      this.actionUrl = this.$http.adornUrl('/upload/file?id=' + this.labelId)
      this.header.token = Vue.cookie.get('token')
    }
  }
</script>

<style scoped>

</style>
