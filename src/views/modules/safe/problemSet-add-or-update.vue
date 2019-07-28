<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    width="30%"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
  
    <el-form-item label="区域类型" prop="type">
        <el-select v-model="dataForm.type"  width=100%  placeholder="请选择区域类型"  @change="typeChange" style="width:100%;">
              <el-option
                v-for="item in typelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="单体模型" prop="model">
        <el-select v-model="dataForm.model" :disabled="disabledmodel" width=100%  placeholder="请选择单体模型" style="width:100%;">
              <el-option
                v-for="item in modellist"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="负责人员" prop="name">
        <el-select v-model="dataForm.name" multiple @change="changeSelectName" width=100%  placeholder="请选择人员" style="width:100%;">
              <el-option
                v-for="item in namelist"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId+'_'+item.userName">
              </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="负责班组" prop="team">
        <el-select v-model="dataForm.team" multiple @change="changeSelectTeam"  width=100%  placeholder="请选择班组" style="width:100%;">
              <el-option
                v-for="item in teamlist"
                :key="item.id"
                :label="item.name"
                :value="item.id+'_'+item.name">
              </el-option>
        </el-select>
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
        typelist: [{
          value: '1',
          label: '单体模型'
        },{
          value: '2',
          label: '场布模型'
        }],
        namelist:[],
        teamlist:[],
        modellist: [],
        visible: false,
        disabledmodel:true,
        modelMajorId:'',
        problemTrackingSettingUserList:[],
        problemTrackingSettingTeamList:[],
        dataForm: {
          id: 0,
          model: '',
          name:'',
          type: '',
          team: ''
        },
        dataRule: {
          type: [
            { required: true, message: '区域类型不能为空', trigger: 'blur' }
          ],
          model: [
            { required: false, message: '区域类型不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '负责人员不能为空', trigger: 'blur' }
          ],
          team: [
            { required: true, message: '负责班组不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    mounted() {
      this.list()
    },
    methods: {
      list(){
        this.$http({
          url: this.$http.adornUrl('/sys/user/listUser'),
          method: 'post',
          data: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
            console.log(data.result)
              this.namelist = data.result
          } 
        })
        this.$http({
          url: this.$http.adornUrl('/bim/team/listTeam'),
          method: 'post',
          data: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
              this.teamlist = data.result
          } 
        })

      },
      typeChange(){
          if(this.dataForm.type == 1){
               this.disabledmodel = false
               this.$http({
                  url: this.$http.adornUrl(`/bim/modelMajor/listMajor`),
                  method: 'post',
                  data:this.$http.adornData({})
                }).then((data)=>{
                    if(data.data.code==0){
                        this.major = data.data.result[0].id
                        this.modelMajorId = data.data.result[0].id
                        this.majorchange(this.major)
                    }
                })
          }else{
               this.disabledmodel = true
               this.dataForm.model = ""
          }
      },
      majorchange(value){
          this.$http({
            url: this.$http.adornUrl(`/bim/modelMonomer/listSuccessModelMonomer`),
            method: 'post',
            data:this.$http.adornData({
              "modelMajorId":value
            })
          }).then((data)=>{
              if(data.data.code == 0){
                this.modellist = data.data.result

              }
          })

      },
      changeSelectName(){
          var listdatas = this.dataForm.name
          var ret = [];
          for (let i = 0; i < listdatas.length; i++) {
              var data = listdatas[i];
              var data_arr = data.split('_');
              var info = {};
              info["userId"] = data_arr[0];
              info["userName"] = data_arr[1];
              ret.push(info);
          }
          this.problemTrackingSettingUserList = ret
      },
      changeSelectTeam(){
          var listdatas = this.dataForm.team
          var rets = [];
          for (let i = 0; i < listdatas.length; i++) {
              var data = listdatas[i];
              var data_arr = data.split('_');
              var info = {};
              info["teamId"] = data_arr[0];
              info["teamName"] = data_arr[1];
              rets.push(info);
          }
          this.problemTrackingSettingTeamList = rets
          console.log(rets)

      },
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            // this.$http({
            //   url: this.$http.adornUrl(`/sys/sysdict/info/${this.dataForm.id}`),
            //   method: 'get',
            //   params: this.$http.adornParams()
            // }).then(({data}) => {
            //   if (data && data.code === 0) {
            //     this.dataForm.name = data.result.name
            //     this.dataForm.type = data.result.type
            //     this.dataForm.remark = data.result.remark
            //     this.dataForm.status = data.result.status
            //   }
            // })
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
            this.$http({
              url: this.$http.adornUrl(`/bim/problemTrackingSetting/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'regionalType': this.dataForm.type,
                'modelMajorId': this.modelMajorId,
                'modelMonomerId': this.dataForm.model ,
                'problemTrackingSettingUserList': this.problemTrackingSettingUserList,
                'problemTrackingSettingTeamList': this.problemTrackingSettingTeamList
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
