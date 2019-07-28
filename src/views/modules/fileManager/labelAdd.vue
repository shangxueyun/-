<template>
  <el-dialog title="新建文件夹" :visible.sync="dialogFormVisible" 
  
    :modal-append-to-body="true"
    :append-to-body="true"
  width="30%">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="文件夹名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'labelAdd',
    data () {
      return {
        dialogFormVisible: false,
        viewLabel: 0,
        form: {
          name: ''
        },
        rules: {
          name: [{required: true, message: '请输入文件夹名字', trigger: 'blur'}]
        }
      }
    },
    mounted () {
      this.viewLabel = sessionStorage.getItem('viewLabel')
    },
    methods: {
      init () {
        this.dialogFormVisible = true

      },
      cancel () {
        this.dialogFormVisible = false
        this.$refs['form'].resetFields()
  },
      dataFormSubmit () {
        let view = this.$store.state.folder.viewFolder
        console.log(view)
        this.$refs['form'].validate((valid) => {
          if (valid) {
            // 若访问的文件夹，的ID为0
            if (view.parentId === '0') {
              view.id = '0'
            }
            // 当前正在访问的文件夹ID  拿这ID为父级创建文件夹
            this.$http({
              url: this.$http.adornUrl('/bim/datalabel/save'),
              method: 'post',
              data: this.$http.adornParams({'parentId': view.id, 'name': this.form.name})
            }).then(({data}) => {
              if (data && data.code === 0) {
                sessionStorage.setItem('nameid',view.id)
                this.dialogFormVisible = false
                this.$emit('refresh')
                this.$emit('contentRefresh')
                this.$refs['form'].resetFields()
              } else {
                this.$message.error('创建文件夹出现错误！')
                this.$refs['form'].resetFields()
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
