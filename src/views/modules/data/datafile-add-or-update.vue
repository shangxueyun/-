<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="资料标签编码" prop="dataLabelId">
      <el-input v-model="dataForm.dataLabelId" placeholder="资料标签编码"></el-input>
    </el-form-item>
    <el-form-item label="文件名称" prop="fileName">
      <el-input v-model="dataForm.fileName" placeholder="文件名称"></el-input>
    </el-form-item>
    <el-form-item label="文件路径" prop="url">
      <el-input v-model="dataForm.url" placeholder="文件路径"></el-input>
    </el-form-item>
    <el-form-item label="文件格式" prop="fileFormat">
      <el-input v-model="dataForm.fileFormat" placeholder="文件格式"></el-input>
    </el-form-item>
    <el-form-item label="文件大小" prop="fileSize">
      <el-input v-model="dataForm.fileSize" placeholder="文件大小"></el-input>
    </el-form-item>
    <el-form-item label="" prop="createUser">
      <el-input v-model="dataForm.createUser" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="cresteTime">
      <el-input v-model="dataForm.cresteTime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="updateUser">
      <el-input v-model="dataForm.updateUser" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder=""></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          dataLabelId: '',
          fileName: '',
          url: '',
          fileFormat: '',
          fileSize: '',
          createUser: '',
          cresteTime: '',
          updateUser: '',
          updateTime: ''
        },
        dataRule: {
          dataLabelId: [
            { required: true, message: '资料标签编码不能为空', trigger: 'blur' }
          ],
          fileName: [
            { required: true, message: '文件名称不能为空', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '文件路径不能为空', trigger: 'blur' }
          ],
          fileFormat: [
            { required: true, message: '文件格式不能为空', trigger: 'blur' }
          ],
          fileSize: [
            { required: true, message: '文件大小不能为空', trigger: 'blur' }
          ],
          createUser: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          cresteTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          updateUser: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`bim/datafile/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.dataLabelId = data.datafile.dataLabelId
                this.dataForm.fileName = data.datafile.fileName
                this.dataForm.url = data.datafile.url
                this.dataForm.fileFormat = data.datafile.fileFormat
                this.dataForm.fileSize = data.datafile.fileSize
                this.dataForm.createUser = data.datafile.createUser
                this.dataForm.cresteTime = data.datafile.cresteTime
                this.dataForm.updateUser = data.datafile.updateUser
                this.dataForm.updateTime = data.datafile.updateTime
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/bim/datafile/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'dataLabelId': this.dataForm.dataLabelId,
                'fileName': this.dataForm.fileName,
                'url': this.dataForm.url,
                'fileFormat': this.dataForm.fileFormat,
                'fileSize': this.dataForm.fileSize,
                'createUser': this.dataForm.createUser,
                'cresteTime': this.dataForm.cresteTime,
                'updateUser': this.dataForm.updateUser,
                'updateTime': this.dataForm.updateTime
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
