<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="账号" prop="userName">
        <el-input v-model="dataForm.userName" placeholder="登录帐号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="number">
        <el-input v-model="dataForm.number" :disabled="disableds" placeholder="身份证号"></el-input>
      </el-form-item>
      <!-- <el-form-item label="职务" prop="job">
            <el-select v-model="dataForm.job" placeholder="请选择">
                  <el-option  
                    v-for="item in joblist"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
            </el-select>
      </el-form-item> -->
      <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isEmail, isMobile } from '@/utils/validate'
  // import { isMobile } from '@/utils/validate'
  export default {
    data () {
      var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.password !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      }
      var validateuserName = (rule, value, callback) => {
        var regu = /^[a-zA-Z\u4e00-\u9fa5]+$/;
        if (value === '') {
          callback(new Error('账号不能为空'))
        }else if(value.length > 10){
          callback(new Error('不能超过10个字符'))
        }else if(!regu.test(value)){
          callback(new Error('格式错误，只能10个字符，支持英文、汉字，不支持标点符号'))
        } else {
          callback()
        }
      }
      var validatenumber = (rule, value, callback) => {
        var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (value === '') {
          callback(new Error('身份证号不能为空'))
        }else if(!reg.test(value)){
          callback(new Error('身份证输入不合法'))
        } else {
          callback()
        }

      }
      var validatenames = (rule, value, callback) => {
        var regu = /^[a-zA-Z\u4e00-\u9fa5]+$/;
        if (value === '') {
          callback(new Error('真实姓名不能为空'))
        }else if(value.length > 10){
          callback(new Error('不能超过10个字符'))
        }else if(!regu.test(value)){
          callback(new Error('格式错误，只能10个字符，支持英文、汉字，不支持标点符号'))
        } else {
          callback()
        }
      }
      // var validateEmail = (rule, value, callback) => {
      //   if (!isEmail(value)) {
      //     callback(new Error('邮箱格式错误'))
      //   } else {
      //     callback()
      //   }
      // }
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        disableds:false,
        roleList: [],
        joblist: [],
        value: '',
        dataForm: {
          id: 0,
          userName: '',
          password: '',
          comfirmPassword: '',
          salt: '',
          email: '',
          mobile: '',
          roleIdList: [],
          name: '',
          number: '',
          job: '',
          status: 1
        },
        dataRule: {
          userName: [
            { required: true, trigger: 'blur',validator: validateuserName }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          comfirmPassword: [
            { validator: validateComfirmPassword, trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ],
          name: [
            { required: true, trigger: 'blur',validator: validatenames }
          ],
          // email: [
          //   { required: false, trigger: 'blur',validator:validateEmail}
          // ],
          number: [
            { required: true,  trigger: 'blur' ,validator: validatenumber}
          ]
        }
      }
    },
    activated () {
      this.codelist()
    },
    methods: {
      codelist(){
      },
      init (id) {

        this.$http({
          url: this.$http.adornUrl('/sys/sysdict/listSysdict'),
          method: 'post',
          data: this.$http.adornParams({
            "type":1
          })
        }).then(({data}) => {
          this.joblist = data.result
        })

        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/sys/role/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.roleList = data && data.code === 0 ? data.result : []
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/user/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.disableds = true
                // console.log("data.result.dutiesCode",data.result.dutiesCode)
                // console.log("this.joblist",this.joblist)
                this.dataForm.userName = data.result.userName
                this.dataForm.salt = data.result.salt
                this.dataForm.email = data.result.email
                this.dataForm.mobile = data.result.mobile
                this.dataForm.roleIdList = data.result.roleIdList
                this.dataForm.status = data.result.status
                this.dataForm.number = data.result.idCardNo
                this.dataForm.name = data.result.realName
                // this.dataForm.job = data.result.dutiesCode
            
                // for(var i = 0 ;i< this.joblist.length; i++){
                //     console.log(this.joblist[i].code)
                //     if(this.joblist[i].code == data.result.dutiesCode ){
                //       this.dataForm.job = this.joblist[i].name
                //     }
                // }
              }
            })
          }else{

                this.disableds = false
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.id || undefined,
                'userName': this.dataForm.userName,
                'password': this.dataForm.password,
                'salt': this.dataForm.salt,
                'email': this.dataForm.email,
                'mobile': this.dataForm.mobile,
                'status': this.dataForm.status,
                'roleIdList': this.dataForm.roleIdList,
                'idCardNo': this.dataForm.number,
                // 'dutiesCode': this.dataForm.job,
                'realName': this.dataForm.name
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
