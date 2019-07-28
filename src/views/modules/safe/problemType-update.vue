<template>
  <el-dialog
    title="修改"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    width="30%"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
  
      <el-form-item label="分组名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="分组名称"></el-input>
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
        typelist: [{
          value: '1',
          label: '质量问题'
        },{
          value: '2',
          label: '安全问题'
        }],
        visible: false,
        dataForm: {
          id: 0,
          name:'',
          types: '',
        },
        dataRule: {
          name: [
            { required: true, message: '分组名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
    },
    methods: {
      init (name,id) {
        this.dataForm.id = id || 0
        this.dataForm.name = name
        this.visible = true
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].resetFields()
        // })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
              this.$http({
                url: this.$http.adornUrl(`/bim/problemType/update`),
                method: 'post',
                data:this.$http.adornData({
                  "name":this.dataForm.name,
                  "id":this.dataForm.id
                })
              }).then((data)=>{
                  console.log(data)
                  if (data && data.data.code == 0) {
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
                    this.$message.error(data.data.msg)
                  }
              })
           
          }
        })
      }
    }
  }
</script>
<style>
.switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
  font-size: 10px;
}
.is-checked .el-switch__label {
  position: absolute;
  display: none;
  color:#5d5d5d;
  /* color: #fff; */
}

.switchStyle .el-switch__label--left {
  z-index: 9;
  left: 6px;
}
.switchStyle .el-switch__label--right {
  z-index: 9;
  left: -14px;
}
.switchStyle .el-switch__label.is-active {
  display: block;
}
.switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 60px !important;
  line-height: 22px;
  text-align: center;
}
</style>
