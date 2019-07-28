<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label='看板名' prop="name">
        <el-input v-model="dataForm.name" placeholder="看板名"></el-input>
      </el-form-item>
      <el-form-item label="颜色" prop="colour">
        <el-input v-model="dataForm.colour" placeholder="颜色"></el-input>
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
        index: 1,
        visible: false,
        title: '添加面板',
        dataForm: {
          id: 0,
          name: '',
          colour: '',
          createUser: '',
          createTime: '',
          updateUser: '',
          updateTime: ''
        },
        dataRule: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ],
          colour: [
            {required: true, message: '颜色1、无不能为空', trigger: 'blur'}
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
              url: this.$http.adornUrl(`/bim/datalabel/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                console.log(data)
                this.dataForm.name = data.result.name
                this.dataForm.colour = data.result.colour
              }
            })
          }
        })
      },
      dataFormSubmit () {
        let data = JSON.stringify(this.dataForm)
        console.log(data)
        this.$http({
          url: this.$http.adornUrl(`/bim/datalabel/${!this.dataForm.id ? 'save' : 'update'}`),
          method: 'post',
          data: this.$http.adornData(this.dataForm, true)
        }).then(() => {
          this.visible = false
          this.$emit('changeDom')
        })
      }
    }
  }
</script>

<style scoped>

</style>
