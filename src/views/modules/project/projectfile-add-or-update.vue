<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="项目id" prop="projectId">
      <el-input v-model="dataForm.projectId" placeholder="项目id"></el-input>
    </el-form-item>
    <el-form-item label="" prop="name">
      <el-input v-model="dataForm.name" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="url">
      <el-input v-model="dataForm.url" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="文件类型1、视频2、图片" prop="type">
      <el-input v-model="dataForm.type" placeholder="文件类型1、视频2、图片"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="introduction">
      <el-input v-model="dataForm.introduction" placeholder="简介"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
    </el-form-item>
    <el-form-item label="" prop="createUser">
      <el-input v-model="dataForm.createUser" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="updateUser">
      <el-input v-model="dataForm.updateUser" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder=""></el-input>
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
        dataForm: {
          id: 0,
          projectId: '',
          name: '',
          url: '',
          type: '',
          introduction: '',
          sort: '',
          createUser: '',
          createTime: '',
          updateUser: '',
          updateTime: ''
        },
        dataRule: {
          projectId: [
            { required: true, message: '项目id不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '文件类型1、视频2、图片不能为空', trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '简介不能为空', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          createUser: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          updateUser: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/project/projectfile/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.projectId = data.projectfile.projectId
                this.dataForm.name = data.projectfile.name
                this.dataForm.url = data.projectfile.url
                this.dataForm.type = data.projectfile.type
                this.dataForm.introduction = data.projectfile.introduction
                this.dataForm.sort = data.projectfile.sort
                this.dataForm.createUser = data.projectfile.createUser
                this.dataForm.createTime = data.projectfile.createTime
                this.dataForm.updateUser = data.projectfile.updateUser
                this.dataForm.updateTime = data.projectfile.updateTime
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
              url: this.$http.adornUrl(`/project/projectfile/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'projectId': this.dataForm.projectId,
                'name': this.dataForm.name,
                'url': this.dataForm.url,
                'type': this.dataForm.type,
                'introduction': this.dataForm.introduction,
                'sort': this.dataForm.sort,
                'createUser': this.dataForm.createUser,
                'createTime': this.dataForm.createTime,
                'updateUser': this.dataForm.updateUser,
                'updateTime': this.dataForm.updateTime
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
