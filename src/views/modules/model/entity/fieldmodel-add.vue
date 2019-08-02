<template>
  <el-dialog
    :title="'修改场地模型'"
    :modal-append-to-body="true"
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="模型名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="模型名称"></el-input>
    </el-form-item>
    <!-- <el-form-item label="所属层级" prop="type">
      <el-select v-model="dataForm.type" width=100% clearable placeholder="请选择所属层级">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item> -->
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
        isEdit:false,
        value: '',
        visible: false,
        dataForm: {
          id: 0,
          ids:'',
          name: '',
          type: '',
          remark: ''
        },
        dataRule: {
          name: [
            { required: true, message: '请输入模型名称', trigger: 'blur' }
          ],
          // type: [
          //   { required: true, message: '请选择所属层级', trigger: 'blur' }
          // ]
        }
      }
    },
    methods: {
      init (id,name) {
        this.dataForm.id = id || 0;
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (id) {
            this.dataForm.name =name;
            this.isEdit=true;
          }else{
            this.isEdit=false;
          }
        })

      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if(!this.isEdit){
              this.$http({
                url: this.$http.adornUrl(`/bim/modelMonomer/save`),
                method: 'post',
                data: this.$http.adornData({
                  'name': this.dataForm.name,
                  'modelMajorId':this.dataForm.id,
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
            }else{
              this.$http({
                url: this.$http.adornUrl(`/bim/model/updateSiteModel`),
                method: 'post',
                data: this.$http.adornData({
                  'modelName': this.dataForm.name,
                  'id':this.dataForm.id,
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
          }
        })
      }
    }
  }
</script>
