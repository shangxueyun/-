<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="文件编码" prop="dataFileId">
      <el-input v-model="dataForm.dataFileId" placeholder="文件编码"></el-input>
    </el-form-item>
    <el-form-item label="操作" prop="operation">
      <el-input v-model="dataForm.operation" placeholder="操作"></el-input>
    </el-form-item>
    <el-form-item label="" prop="createUser">
      <el-input v-model="dataForm.createUser" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="cresteTime">
      <el-input v-model="dataForm.cresteTime" placeholder=""></el-input>
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
          dataFileId: '',
          operation: '',
          createUser: '',
          cresteTime: ''
        },
        dataRule: {
          dataFileId: [
            { required: true, message: '文件编码不能为空', trigger: 'blur' }
          ],
          operation: [
            { required: true, message: '操作不能为空', trigger: 'blur' }
          ],
          createUser: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          cresteTime: [
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
              url: this.$http.adornUrl(`/data/datafilelog/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.dataFileId = data.datafilelog.dataFileId
                this.dataForm.operation = data.datafilelog.operation
                this.dataForm.createUser = data.datafilelog.createUser
                this.dataForm.cresteTime = data.datafilelog.cresteTime
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
              url: this.$http.adornUrl(`/data/datafilelog/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'dataFileId': this.dataForm.dataFileId,
                'operation': this.dataForm.operation,
                'createUser': this.dataForm.createUser,
                'cresteTime': this.dataForm.cresteTime
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
