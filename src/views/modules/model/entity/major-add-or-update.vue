<template>
  <el-dialog
    :title="!dataForm.id ? '新增专业分组' : '编辑专业分组'"
    :modal-append-to-body="true"
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="分组名称" prop="type">
      <!-- <el-input v-model="dataForm.type" placeholder="职务"></el-input> -->
      <el-select v-model="dataForm.type" width=100% clearable placeholder="请选择分组名称">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
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
        options:[],
        value: '',
        visible: false,
        dataForm: {
          id: 0,
          name: '',
          type: '',
          remark: ''
        },
        dataRule: {
          type: [
            { required: true, message: '请选择分组名称', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.$http({
          url: this.$http.adornUrl(`/sys/sysdict/listSysdict`),
          method: 'post',
          data: this.$http.adornParams({
            'type': '2'
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.options = data.result
          }
        })
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/sysdict/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.result.name
                this.dataForm.type = data.result.type
                this.dataForm.remark = data.result.remark
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
              url: this.$http.adornUrl(`/bim/modelMajor/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'majorCode': this.dataForm.type
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
