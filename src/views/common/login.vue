<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <div class="logo_sml"><img src="~@/assets/img/logo_sml.png"></div>
          <p class="brand_content">
            用心营造美好未来 
            <span></span>
          </p>
        </div>
        <div class="login-main">
          <div class="flex">
            <h3 class="login-title">管理员登录</h3>
            <div class="login-titlebd">
              <span></span>
            </div>
            <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
              <el-form-item prop="userName">

                <!-- prefix-icon="el-icon-thirdyonghuming1" -->
                <el-input v-model="dataForm.userName" 
  placeholder="请输入您的用户名">
      <template slot="prepend">          
        <icon-svg name="admin" style="color:#fff;font-size:20px;"></icon-svg>
<!-- <i style="font-size:1.5rem;color:#fff" class="el-icon-thirdyonghuming1"></i> -->
</template>
  </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="dataForm.password" type="password"  placeholder="请输入您的密码">
      <template slot="prepend">
        <icon-svg name="jiesuo" style="color:#fff;font-size:20px;"></icon-svg>
      </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="captcha">
                <el-row :gutter="20">
                  <el-col :span="14">
                    <el-input v-model="dataForm.captcha" placeholder="请输入右侧验证码">
                    </el-input>
                  </el-col>
                  <el-col :span="10" class="login-captcha">
                    <img :src="captchaPath" @click="getCaptcha()" alt="">
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="remember" size="medium">记住密码</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
              </el-form-item>
            </el-form>            
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUUID } from '@/utils'
  export default {
    data () {
      return {
        dataForm: {
          userName: '',
          password: '',
          uuid: '',
          captcha: ''
        },
        dataRule: {
          userName: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        },
        captchaPath: '',
        remember: false
      }
    },
    created () {
      this.getCaptcha()
      sessionStorage.removeItem('refB')
      sessionStorage.removeItem('menNavData')
      let userName = this.$cookie.get('userName')
      let password = this.$cookie.get('password')
      if(userName) {
        this.dataForm.userName = userName
        this.dataForm.password = password
        this.remember = true
      }
    },
    methods: {
      // 提交表单
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if(this.remember) {
              this.$cookie.set('userName', this.dataForm.userName)
              this.$cookie.set('password', this.dataForm.password)
            }else{
              this.$cookie.delete('userName')
              this.$cookie.delete('password')
            }
            this.$http({
              url: this.$http.adornUrl('/sys/login'),
              method: 'post',
              data: this.$http.adornData({
                'userName': this.dataForm.userName,
                'password': this.dataForm.password,
                'uuid': this.dataForm.uuid,
                'captcha': this.dataForm.captcha
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$cookie.set('token', data.result.token)
                this.$router.replace({ name: 'project-board' })
              } else {
                this.getCaptcha()
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 获取验证码
      getCaptcha () {
        this.dataForm.uuid = getUUID()
        this.captchaPath = this.$http.adornUrl(`/bim/captcha?uuid=${this.dataForm.uuid}`)
      }
    }
  }
</script>

<style lang="scss">
  .logo_sml{
    img{
      width: 240px;
      height: 56px;
    }
  }
  .brand_content{
    position: absolute;
    bottom: 20px;
    line-height: 5rem;
    font-size: 2rem;
    text-shadow: 5px 2px 6px #000;
    span{
      width: 70px;
      height: 4px;
      background: #08AAFFFF;
      display: block;
      border-radius: 20px;
    }
  }

  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(240, 243, 244, .3);
    overflow: hidden;
    margin:50px;
    box-shadow:0px 3px 11px 1px rgba(0, 0, 0, 0.36);
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-image: url(~@/assets/img/login_bg.png);
      background-size: cover;
    }
    .site-content__wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0;
      margin: 0;
      // overflow: hidden;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: transparent;
    }
    .site-content {
      min-height: 100%;
      padding: 0;
    }
    .brand-info {
      color: #fff;
      width: 64%;
      height: 100%;
      position: absolute;
      left: 0;
      padding: 50px 0 20px 30px;
      background-image: url(~@/assets/img/right.png);
      background-size: 100% 100%;
    }
    .brand-info__text {
      margin:  0 0 22px 0;
      font-size: 48px;
      font-weight: 400;
      text-transform : uppercase;
    }
    .brand-info__intro {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.58;
      opacity: .6;
    }
    .login-main {
      position: absolute;
      top: 0;
      right: 0;
      // padding: 150px 60px 180px;
      padding: 0 60px;
      width: 36%;
      min-height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      // margin:30px 30px -130px 0;
      .flex{
        margin-top: calc(50vh - 285px);
      }
      input{
        height:64px;
        line-height: 64px;
        border: 0;
        background: rgba(255, 255, 255, .1);
        color: #f2f2f2;
        font-size: 16px;
        // padding:0 0 0 37px;
      }
      input::-webkit-input-placeholder{/*Webkit browsers*/
          color:#f2f2f2;
      }
      input:-moz-placeholder{/*Mozilla Firefox 4 to 8*/
        color:#f2f2f2;
      }
      input::moz-placeholder{/*Mozilla Firefox 19+*/
        color:#f2f2f2;
      }
      input:-ms-input-placeholder{/*Internet Explorer 10+*/
          color:#f2f2f2;
      }
      // .el-input__icon{
      //   line-height: 52px;
      // }
      .el-icon-thirdyonghuming1,.el-icon-thirdmima2{
        // font-size:20px;
        color:#4c4c4c;
        // margin:0 120px 0 0;
      }
      .login-titlebd{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content:center;
        align-items:center;
        margin-bottom: 34px;
        span{
          display: block;
          width: 140px;
          background: rgb(8, 170, 255);
          height: 4px;
          border-radius: 10px;
        }
      }
    }
    .login-title {
        font-size:28px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:#fff;
        line-height:0px;
        text-align: center;
        font-weight:bold;
        padding-top:0px;
        position: relative;
        padding-bottom: 2.5rem;
    }
    .login-captcha {
      overflow: hidden;
      > img {
        width: 100%;
        height:64px;
        cursor: pointer;
      }
    }
    .login-btn-submit {
      width: 100%;
      margin-top: -4px;
      background: #008CD6FF;
      border: 0;
      line-height: 36px;
      border-radius: 4px;
      color: #f2f2f2;
      font-size: 1.5rem;
      box-shadow: 0px 0px 4px 2px #024896BD;
    }
    .el-input-group__prepend{
      border:0;
      background: rgba(255, 255, 255, .1);
    }
    .el-checkbox__label {
      font-size: 16px;
      color: #fff;
    }
  }
// input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
// 　　 background-color: rgb(250, 255, 189);
//  　　background-image: none;
//  　　color: rgb(0, 0, 0);
// }
input[type="radio"],input[type="checkbox"]{
zoom:180%;
}
</style>
<style lang="scss" scoped>
</style>

