<template>
<div>
  <el-dialog
    title="修改"
    :show-header="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
    <el-form-item label="流水段名称" prop="type">
      <el-input v-model="dataForm.watername" placeholder="流水段名称"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
  export default {
    data () {
      return {
        modehides:false,
        options:[],
        value: '',
        visible: false,
        dataForm: {
          id: 0,
          watername: ''
        },
        dataRule: {
          watername: [
            { required: true, message: '请输入流水段名称', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id,modelName) {
        
        this.dataForm.id = id
        this.dataForm.modelId = id
        this.dataForm.watername = modelName
        this.visible = true
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/bim/pipelineView/update`),
              method: 'post',
              data: this.$http.adornData({
                'name': this.dataForm.watername,
                'id': this.dataForm.id
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
      },



    }
  }
</script>
