<template>
  <el-dialog
    :title="!dataForms.type ? '新增流水段' : '修改流水段'"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    :visible.sync="visible">
        <el-form :model="dataForms" :rules="dataRules" ref="dataForms" @keyup.enter.native="dataFormsSubmit()" label-width="80px">
            <el-form-item label="流水段" prop="name">
              <el-input v-model="dataForms.name" placeholder="流水段"></el-input>
            
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="dataFormsSubmit()">确定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        options:[],
        value: '',
        visible: false,
        dataForms: {
          id: 0,
          modelMajorId: '',
          name: ''
        },
        dataRules: {
          name: [
            { required: true, message: '请输入流水段名称', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id,modelMajorId) {
        console.log(id)
        console.log(modelMajorId)
        this.dataForms.id = id
        this.dataForms.name = name
        this.dataForms.modelMajorId = modelMajorId
        this.visible = true
       
      },
      // 表单提交
      dataFormsSubmit () {
        this.$refs['dataForms'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/bim/model/save`),
              method: 'post',
              data: this.$http.adornData({
                'flowSectionName': this.dataForms.name,
                'modelMajorId': this.dataForms.modelMajorId,
                'modelMonomerId': this.dataForms.id
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
