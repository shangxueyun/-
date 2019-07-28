<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    width="30%"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="分组名称" prop="name">
       <el-input v-model="dataForm.name" placeholder="分组名称"></el-input>
      <!--<el-select v-model="dataForm.type" width=100% clearable placeholder="请选择分组名称">-->
        <!--<el-option-->
          <!--v-for="item in options"-->
          <!--:key="item.id"-->
          <!--:label="item.name"-->
          <!--:value="item.id">-->
        <!--</el-option>-->
      <!--</el-select>-->
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
        options:[],
        value: '',
        isEdit:false,
        visible: false,
        dataForm: {
          name:""
        },
        dataRule: {
          name: [
            { required: true, message: '请选择分组名称', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id,rowId) {
        // this.$http({
        //   url: this.$http.adornUrl(`/sys/sysdict/listSysdict`),
        //   method: 'post',
        //   data: this.$http.adornParams({
        //     'type': '2'
        //   })
        // }).then(({data}) => {
        //   if (data && data.code === 0) {
        //     this.options = data.result
        //   }
        // })
        console.log(id)
        this.dataForm.budgetMajorId =rowId;
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (id) {
            this.dataForm.name =id;
            this.isEdit=true;
          //   this.$http({
          //     url: this.$http.adornUrl(`/sys/sysdict/info/${this.dataForm.id}`),
          //     method: 'get',
          //     params: this.$http.adornParams()
          //   }).then(({data}) => {
          //     if (data && data.code === 0) {
          //       this.dataForm.name = data.result.name
          //       this.dataForm.type = data.result.type
          //       this.dataForm.remark = data.result.remark
          //     }
          //   })
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
                url: this.$http.adornUrl(`/bim/budgetmonomer/save`),
                method: 'post',
                data: this.$http.adornData({
                  'name': this.dataForm.name,
                  'budgetMajorId':this.dataForm.budgetMajorId,
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
                url: this.$http.adornUrl(`/bim/budgetmonomer/update`),
                method: 'post',
                data: this.$http.adornData({
                  'name': this.dataForm.name,
                  'id':this.dataForm.budgetMajorId,
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
