<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="card">
      <el-input v-model="dataForm.card" placeholder="身份证号"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="dataForm.phone" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-select v-model="dataForm.role" width=100% clearable placeholder="请选择角色">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="dataForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="职务" prop="type">
      <el-select v-model="dataForm.type" width=100% clearable placeholder="请选择职务">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="dataForm.password" placeholder="密码"></el-input>
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
      var validatename = (rule, value, callback) => {
        var pat = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,10}$/ 
        if (!value) {
          callback(new Error('请输入人员姓名'))
        }else if(!pat.test(value)){
          return callback(new Error('人员姓名格式不对'))
        }
      }
      var validatecard = (rule, value, callback) => {
        var pat = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ 
        if (!value) {
          callback(new Error('请输入身份证号'))
        }else if(!pat.test(value)){
          return callback(new Error('身份证输入不合法'))
        }
      }
      var validatephone = (rule, value, callback) => {
        var pat = /^1[3-9]\d{9}$/
        if (!value) {
          callback(new Error('请输入手机号'))
        }else if(!pat.test(value)){
          return callback(new Error('请正确输入11位手机号'))
        }
      }
      return {
        options: [{
          value: '1',
          label: '项目经理'
        }, {
          value: '2',
          label: '技术经理'
        }],
        value: '',
        visible: false,
        dataForm: {
          id: 0,
          name: '',
          card: '',
          phone: '',
          type: '',
          remark: ''
        },
        dataRule: {
          name: [
            { required: true, validator: validatename }
          ],
          card: [
            { required: true, validator: validatecard }
          ],
          phone: [
            { required: true, validator: validatephone }
          ],
          type: [
            { required: true, message: '职务不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: false, message: '备注不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.postlistSysdict()
    },
    methods: {
      postlistSysdict () {
        this.$http({
          url: this.$http.adornUrl(`/sys/sysdict/listSysdict`),
          method: 'post',
          data: this.$http.adornParams({
            'type': '1'
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.name = data.result.name
            this.dataForm.type = data.result.type
            this.dataForm.remark = data.result.remark
          }
        })
      },
      init (id) {
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
              url: this.$http.adornUrl(`/sys/sysdict/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'type': this.dataForm.type,
                'remark': this.dataForm.remark
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
