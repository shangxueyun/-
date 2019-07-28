<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="项目名称" prop="projectName">
      <el-input v-model="dataForm.projectName" placeholder="项目名称"></el-input>
    </el-form-item>
    <el-form-item label="项目类型1、房建" prop="projectType">
      <el-input v-model="dataForm.projectType" placeholder="项目类型1、房建"></el-input>
    </el-form-item>
    <el-form-item label="项目简称" prop="shortName">
      <el-input v-model="dataForm.shortName" placeholder="项目简称"></el-input>
    </el-form-item>
    <el-form-item label="项目造价" prop="projectCost">
      <el-input v-model="dataForm.projectCost" placeholder="项目造价"></el-input>
    </el-form-item>
    <el-form-item label="项目负责人" prop="projectLeader">
      <el-input v-model="dataForm.projectLeader" placeholder="项目负责人"></el-input>
    </el-form-item>
    <el-form-item label="开工时间" prop="startTime">
      <el-input v-model="dataForm.startTime" placeholder="开工时间"></el-input>
    </el-form-item>
    <el-form-item label="预计完工时间" prop="endTime">
      <el-input v-model="dataForm.endTime" placeholder="预计完工时间"></el-input>
    </el-form-item>
    <el-form-item label="省编码" prop="provinceCode">
      <el-input v-model="dataForm.provinceCode" placeholder="省编码"></el-input>
    </el-form-item>
    <el-form-item label="市编码" prop="cityCode">
      <el-input v-model="dataForm.cityCode" placeholder="市编码"></el-input>
    </el-form-item>
    <el-form-item label="区编码" prop="areaCode">
      <el-input v-model="dataForm.areaCode" placeholder="区编码"></el-input>
    </el-form-item>
    <el-form-item label="业主单位" prop="ownerUnit">
      <el-input v-model="dataForm.ownerUnit" placeholder="业主单位"></el-input>
    </el-form-item>
    <el-form-item label="总包单位" prop="contractorUnit">
      <el-input v-model="dataForm.contractorUnit" placeholder="总包单位"></el-input>
    </el-form-item>
    <el-form-item label="分包单位" prop="subcontractorUnit">
      <el-input v-model="dataForm.subcontractorUnit" placeholder="分包单位"></el-input>
    </el-form-item>
    <el-form-item label="监理单位" prop="supervisorUnit">
      <el-input v-model="dataForm.supervisorUnit" placeholder="监理单位"></el-input>
    </el-form-item>
    <el-form-item label="设计单位" prop="designUnit">
      <el-input v-model="dataForm.designUnit" placeholder="设计单位"></el-input>
    </el-form-item>
    <el-form-item label="造价单位" prop="costUnit">
      <el-input v-model="dataForm.costUnit" placeholder="造价单位"></el-input>
    </el-form-item>
    <el-form-item label="BIM技术咨询" prop="technicalConsultation">
      <el-input v-model="dataForm.technicalConsultation" placeholder="BIM技术咨询"></el-input>
    </el-form-item>
    <el-form-item label="项目简介" prop="introduction">
      <el-input v-model="dataForm.introduction" placeholder="项目简介"></el-input>
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
          projectName: '',
          projectType: '',
          shortName: '',
          projectCost: '',
          projectLeader: '',
          startTime: '',
          endTime: '',
          provinceCode: '',
          cityCode: '',
          areaCode: '',
          ownerUnit: '',
          contractorUnit: '',
          subcontractorUnit: '',
          supervisorUnit: '',
          designUnit: '',
          costUnit: '',
          technicalConsultation: '',
          introduction: '',
          createUser: '',
          createTime: '',
          updateUser: '',
          updateTime: ''
        },
        dataRule: {
          projectName: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          projectType: [
            { required: true, message: '项目类型1、房建不能为空', trigger: 'blur' }
          ],
          shortName: [
            { required: true, message: '项目简称不能为空', trigger: 'blur' }
          ],
          projectCost: [
            { required: true, message: '项目造价不能为空', trigger: 'blur' }
          ],
          projectLeader: [
            { required: true, message: '项目负责人不能为空', trigger: 'blur' }
          ],
          startTime: [
            { required: true, message: '开工时间不能为空', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: '预计完工时间不能为空', trigger: 'blur' }
          ],
          provinceCode: [
            { required: true, message: '省编码不能为空', trigger: 'blur' }
          ],
          cityCode: [
            { required: true, message: '市编码不能为空', trigger: 'blur' }
          ],
          areaCode: [
            { required: true, message: '区编码不能为空', trigger: 'blur' }
          ],
          ownerUnit: [
            { required: true, message: '业主单位不能为空', trigger: 'blur' }
          ],
          contractorUnit: [
            { required: true, message: '总包单位不能为空', trigger: 'blur' }
          ],
          subcontractorUnit: [
            { required: true, message: '分包单位不能为空', trigger: 'blur' }
          ],
          supervisorUnit: [
            { required: true, message: '监理单位不能为空', trigger: 'blur' }
          ],
          designUnit: [
            { required: true, message: '设计单位不能为空', trigger: 'blur' }
          ],
          costUnit: [
            { required: true, message: '造价单位不能为空', trigger: 'blur' }
          ],
          technicalConsultation: [
            { required: true, message: 'BIM技术咨询不能为空', trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '项目简介不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/project/project/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.projectName = data.project.projectName
                this.dataForm.projectType = data.project.projectType
                this.dataForm.shortName = data.project.shortName
                this.dataForm.projectCost = data.project.projectCost
                this.dataForm.projectLeader = data.project.projectLeader
                this.dataForm.startTime = data.project.startTime
                this.dataForm.endTime = data.project.endTime
                this.dataForm.provinceCode = data.project.provinceCode
                this.dataForm.cityCode = data.project.cityCode
                this.dataForm.areaCode = data.project.areaCode
                this.dataForm.ownerUnit = data.project.ownerUnit
                this.dataForm.contractorUnit = data.project.contractorUnit
                this.dataForm.subcontractorUnit = data.project.subcontractorUnit
                this.dataForm.supervisorUnit = data.project.supervisorUnit
                this.dataForm.designUnit = data.project.designUnit
                this.dataForm.costUnit = data.project.costUnit
                this.dataForm.technicalConsultation = data.project.technicalConsultation
                this.dataForm.introduction = data.project.introduction
                this.dataForm.createUser = data.project.createUser
                this.dataForm.createTime = data.project.createTime
                this.dataForm.updateUser = data.project.updateUser
                this.dataForm.updateTime = data.project.updateTime
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
              url: this.$http.adornUrl(`/project/project/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'projectName': this.dataForm.projectName,
                'projectType': this.dataForm.projectType,
                'shortName': this.dataForm.shortName,
                'projectCost': this.dataForm.projectCost,
                'projectLeader': this.dataForm.projectLeader,
                'startTime': this.dataForm.startTime,
                'endTime': this.dataForm.endTime,
                'provinceCode': this.dataForm.provinceCode,
                'cityCode': this.dataForm.cityCode,
                'areaCode': this.dataForm.areaCode,
                'ownerUnit': this.dataForm.ownerUnit,
                'contractorUnit': this.dataForm.contractorUnit,
                'subcontractorUnit': this.dataForm.subcontractorUnit,
                'supervisorUnit': this.dataForm.supervisorUnit,
                'designUnit': this.dataForm.designUnit,
                'costUnit': this.dataForm.costUnit,
                'technicalConsultation': this.dataForm.technicalConsultation,
                'introduction': this.dataForm.introduction,
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
