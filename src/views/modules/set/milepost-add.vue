<template>
  <el-dialog
    title="添加里程碑节点"
    :modal-append-to-body="true"
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
            <el-form-item label="里程碑内容" prop="content">
                <el-input v-model="dataForm.content" placeholder="里程碑内容"></el-input>
            </el-form-item>
            <!-- <el-form-item label="开工日期" prop="starttime">
                <el-date-picker
                  @change="startDatechange"
                  v-model="dataForm.starttime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :picker-options="startTime"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="竣工日期" prop="endtime">
                <el-date-picker
                  @change="endDatechange"
                  v-model="dataForm.endtime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  :picker-options="endTime"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item> -->
            <el-form-item label="里程碑日期" prop="mileptime">
                <el-date-picker
                  @change="mileptimechange"
                  v-model="dataForm.mileptime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
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
        list:[],
        starttime: '',
        endtime: '',
        dataForm: {
          content: '',
          mileptime:''
        },
        ranksoptions:[],
        dataRule: {
          content: [
            { required: true, message: '里程碑内容不能为空', trigger: 'blur' }
          ],
          // starttime: [
          //   { required: true, message: '开工日期不能为空', trigger: 'blur' }
          // ],
          // endtime: [
          //   { required: true, message: '竣工日期不能为空', trigger: 'blur' }
          // ],
          mileptime: [
            { required: true, message: '里程碑日期不能为空', trigger: 'blur' }
          ]
        },
        startTime: {
                disabledDate: time => {
                      if (this.dataForm.endtime) {
                            return time.getTime() > new Date(this.dataForm.endtime).getTime()
                      }
              }
        },
        endTime: {
                disabledDate: time => {
                      if (this.dataForm.starttime) {
                            return time.getTime() < new Date(this.dataForm.starttime).getTime() - 86400000
                      }
                  }
        },
      }
    },
    methods: {
      init (starttime,endtime) {
        this.starttime = starttime
        this.endtime = endtime
        this.visible = true
        // this.postlistSysdict()
        this.$nextTick(() => {
              this.$refs['dataForm'].resetFields()
        })
      },
      startDatechange(val){
        this.dataForm.starttime = val
      },
      endDatechange(val){
        this.dataForm.endtime = val
      },
      mileptimechange(val){
        this.dataForm.mileptime = val
      },
      // 表单提交
      dataFormSubmit () {
        console.log(this.starttime)
        console.log(this.endtime)
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/bim/projectmilestone/save`),
              method: 'post',
              data: this.$http.adornData({
                'startDate': this.starttime,
                'endDate': this.endtime,
                'milestoneName': this.dataForm.content,
                'milestoneDate': this.dataForm.mileptime
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
