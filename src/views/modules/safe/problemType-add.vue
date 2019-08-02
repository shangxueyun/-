<template>
  <el-dialog
    title="添加新分组"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    width="30%"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
  
    <!-- <el-form-item label="问题类型" prop="types">
        <el-select v-model="dataForm.types"  width=100%  placeholder="请选择问题类型" style="width:100%;">
              <el-option
                v-for="item in typelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
        </el-select>
    </el-form-item> -->
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
        visible: false,
        httpUrl:'',
        dataForm: {
          id: 0,
          name:'',
        },
        dataRule: {
          name: [
            { required: true, message: '问题类型不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    mounted() {
    },
    methods: {
      init (id,url) {
        this.dataForm.id = id || 0
        this.visible = true
        this.httpUrl = url
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
              this.$http({
                url: this.$http.adornUrl(this.httpUrl),
                method: 'post',
                data:this.$http.adornData({
                  "name":this.dataForm.name,
                  "parentId":this.dataForm.id,
                })
              }).then((data)=>{
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
