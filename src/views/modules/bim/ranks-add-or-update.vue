<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :modal-append-to-body="true"
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="队伍名称" prop="name">
      <el-select v-model="dataForm.name" width=100% clearable placeholder="请选择队伍">
        <el-option
          v-for="item in ranksoptions"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
        visible: false,
        list:[],
        dataForm: {
          id: 0,
          name: '',
          remark: '',
          createUser: '',
          createTime: '',
          updateUser: '',
          updateTime: ''
        },
        ranksoptions:[],
        dataRule: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
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
            this.ranksoptions = data.result
          }
        })
      },
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        // this.postlistSysdict()
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl('/bim/ranks/info'),
              method: 'post',
              data: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.remark = data.result.remark
                for (var i = 0; i < this.ranksoptions.length; i++) { 
                    if(this.ranksoptions[i].id  == data.result.name){
                      this.dataForm.name = this.ranksoptions[i].id
                    }
                }
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
              url: this.$http.adornUrl(`/bim/ranks/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                // 'remark': this.dataForm.remark,
                // 'createUser': this.dataForm.createUser,
                // 'createTime': this.dataForm.createTime,
                // 'updateUser': this.dataForm.updateUser,
                // 'updateTime': this.dataForm.updateTime
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
