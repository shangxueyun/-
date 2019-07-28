<template>
  <el-dialog
    :title="!dataForm.id ? '新增班组' : '修改班组'"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
    <el-form-item label="队伍id" prop="ranksId" v-show="hide">
      <el-input v-model="dataForm.ranksId" placeholder="队伍id"></el-input>
    </el-form-item>
    <el-form-item label="班组名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="班组名称"></el-input>
    </el-form-item>
    <el-form-item label="代班联系人" prop="contact">
      <el-input v-model="dataForm.contact" placeholder="代班联系人"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" prop="contactInformation">
      <el-input v-model="dataForm.contactInformation" placeholder="联系方式"></el-input>
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
      var validatephone = (rule, value, callback) => {
        var pat = /^1[3-9]\d{9}$/
        console.log("value2:",value)
        if (value) {
          if(!pat.test(value)){
            return callback(new Error('请正确输入11位手机号'))
          }else{
            return callback()
          }
        }else{
            return callback()
        }
      }
      return {
        hide:false,
        visible: false,
        dataForm: {
          id: 0,
          ranksId: '',
          contact:'',
          name: '',
          contactInformation: '',
          ids:''
        },
        dataRule: {
          name: [
            {required: true, message: '班组名称不能为空', trigger: 'blur' }
          ],
          contactInformation: [
            {required: false,validator: validatephone}
          ]
          // remark: [
          //   { required: true, message: '备注不能为空', trigger: 'blur' }
          // ],
        }
      }
    },
    methods: {

      inits (id,name,contact,contactInformation,ranksId) {
        this.dataForm.id = id || 0
        this.dataForm.ids = ranksId
        this.dataForm.ranksId = id
        if (id) {
          this.dataForm.name = name
          this.dataForm.contact = contact
          this.dataForm.contactInformation = contactInformation
        }else{
          this.dataForm.ranksId = name
          this.dataForm.name = ''
          this.dataForm.contact = ''
          this.dataForm.contactInformation = ''
        }
        // if(id !== 0 || id == "" || id == undefined){

        // }
        // else{
        //   this.dataForm.name = name
        //   this.dataForm.contact = contact
        //   this.dataForm.contactInformation = contactInformation
        // }
        this.visible = true
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].resetFields()
        //   if (id) {
        //     this.dataForm.name =rowId;
        //     this.isEdit=true;
        //   }else{
        //     this.isEdit=false;
        //   }
        // })

        // this.$nextTick(() => {
        //   this.$refs['dataForm'].resetFields()
        //   if (this.dataForm.id) {
        //     this.$http({
        //       url: this.$http.adornUrl('/bim/team/info'),
        //       method: 'post',
        //       data: this.$http.adornParams({
        //         'id': this.dataForm.id
        //       })
        //     }).then(({data}) => {
        //       if (data && data.code === 0) {
        //         this.dataForm.ranksId = data.result.id
        //         this.dataForm.name = data.result.name
        //         this.dataForm.remark = data.result.remark
        //       }
        //     })
        //   }
        // })
      },
      // 表单提交
      dataFormSubmit () {
        // alert(1)
        var idsnew;
        console.log(this.dataForm.id)
        if(!this.dataForm.id ? 'save' : 'update' == 'update'){
              idsnew = this.$http.adornData({
                'id':this.dataForm.ranksId,
                'ranksId':this.dataForm.ids,
                'name': this.dataForm.name,
                'contact': this.dataForm.contact,
                'contactInformation': this.dataForm.contactInformation
              })
        }
        if(!this.dataForm.id ? 'save' : 'update' == 'save'){
              idsnew = this.$http.adornData({
                'ranksId':this.dataForm.ranksId,
                'name': this.dataForm.name,
                'contact': this.dataForm.contact,
                'contactInformation': this.dataForm.contactInformation
              })
        }
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/bim/team/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: idsnew
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
