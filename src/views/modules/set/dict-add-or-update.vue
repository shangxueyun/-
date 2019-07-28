<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-select v-model="dataForm.type"  disabled width=100% clearable placeholder="请选择类型" v-show="yesid">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      
      <el-select v-model="dataForm.type"   width=100% clearable placeholder="请选择类型" v-show="noid">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态" prop="status" v-show="statushide">
        <el-switch class="switchStyle"  active-color="#dcdfe6" inactive-color="#409eff" v-model="dataForm.status" 
        :active-value="0" :inactive-value="1"   active-text="禁用" inactive-text="启用" @change="handleSwitch">
        </el-switch> <span style="color:#e6a23c;font-size:12px;">（状态默认为启用）</span>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
        yesid:false,
        noid:false,
        statushide:true,
        options: [{
          value: '1',
          label: '工种'
        },{
          value: '2',
          label: '专业'
        },{
          value: '4',
          label: '标签属性'
        }],
        value: '',
        visible: false,
        dataForm: {
          id: 0,
          name: '',
          type: '',
          remark: '',
          status:'1'
        },
        dataRule: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: false, message: '备注不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true}
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        if(this.dataForm.id == 0){
            this.yesid = false
            this.noid = true
            this.statushide = true
        }else{
            this.yesid = true
            this.noid = false
            this.statushide = false
        }
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
                this.dataForm.status = data.result.status
              }
            })
          }
        })
      },
      handleSwitch(val){
          console.log(val)
          this.dataForm.status = val
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
              if(this.dataForm.type == "工种"){
                  this.dataForm.type = 1
              }
              if(this.dataForm.type == "专业"){
                  this.dataForm.type = 2
              }
              if(this.dataForm.type == "标签属性"){
                  this.dataForm.type = 4
              }
            this.$http({
              url: this.$http.adornUrl(`/sys/sysdict/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'type': this.dataForm.type,
                'remark': this.dataForm.remark,
                'status': this.dataForm.status
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
