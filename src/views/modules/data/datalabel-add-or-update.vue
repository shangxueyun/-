<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="群组" prop="name">
        <el-input v-model="dataForm.name" placeholder="群组"></el-input>
      </el-form-item>
      <el-form-item label="看板" prop="colour">
        <el-input v-model="dataForm.colour" placeholder="看板"></el-input>
      </el-form-item>
      <el-form-item label="颜色" prop="createUser">
        <el-input v-model="dataForm.createUser" placeholder="颜色"></el-input>
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
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          colour: [
            { required: true, message: '颜色1、无不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/data/datalabel/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.datalabel.name
                this.dataForm.colour = data.datalabel.colour
                this.dataForm.createUser = data.datalabel.createUser
                this.dataForm.createTime = data.datalabel.createTime
                this.dataForm.updateUser = data.datalabel.updateUser
                this.dataForm.updateTime = data.datalabel.updateTime
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$parent.items.push(this.$parent.Addzujian)
        this.visible = false
        // this.$refs['dataForm'].validate((valid) => {
        //   if (valid) {
        //     this.$http({
        //       url: this.$http.adornUrl(`/data/datalabel/${!this.dataForm.id ? 'save' : 'update'}`),
        //       method: 'post',
        //       data: this.$http.adornData({
        //         'id': this.dataForm.id || undefined,
        //         'name': this.dataForm.name,
        //         'colour': this.dataForm.colour,
        //         'createUser': this.dataForm.createUser,
        //         'createTime': this.dataForm.createTime,
        //         'updateUser': this.dataForm.updateUser,
        //         'updateTime': this.dataForm.updateTime
        //       })
        //     }).then(({data}) => {
        //       if (data && data.code === 0) {
        //         this.$message({
        //           message: '操作成功',
        //           type: 'success',
        //           duration: 1500,
        //           onClose: () => {
        //             this.visible = false
        //             this.$emit('refreshDataList')
        //           }
        //         })
        //       } else {
        //         this.$message.error(data.msg)
        //       }
        //     })
        //   }
        // })
      }
    }
  }
</script>
