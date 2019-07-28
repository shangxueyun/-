<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
          <el-form-item label="标签名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="标签名称"></el-input>
          </el-form-item>
          <el-form-item label="属性" prop="attribute">
              <el-select v-model="dataForm.attribute" width=100% clearable placeholder="请选择属性">
                <el-option
                  v-for="item in attributelist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="类别" prop="type">
               <el-input v-model="dataForm.type" placeholder="类别"></el-input>
          </el-form-item>
          
          <el-form-item label="RFID号" prop="rfId">
            <el-input v-model="dataForm.rfId" disabled placeholder="RFID号"></el-input>
          </el-form-item>
            <el-form-item label="绑定表单" prop="formCharge">
                  <el-select style="width:100%;" v-model="dataForm.formCharge"  width=100% clearable placeholder="请选择表单">
                    <el-option
                      v-for="item in formChargelist"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
            </el-form-item>

            <el-form-item label="负责人" prop="personInCharge">
                  <el-select style="width:100%;" v-model="dataForm.personInCharge" multiple width=100% clearable placeholder="请选择负责人" @change="changeSelect">
                    <el-option
                      v-for="item in personInChargelist"
                      :key="item.userId"
                      :label="item.userName"
                      :value="item.userId+'_'+item.userName">
                    </el-option>
                  </el-select>
            </el-form-item>
          
          <el-form-item label="标签颜色" prop="color">
              <el-color-picker v-model="dataForm.color"></el-color-picker>

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
        attributelist: [],
        formChargelist:[],
        value: '',
        visible: false,
        dataForm: {
          id: 0,
          name: '',
          attribute:'',
          type: '',
          rfId: '',
          personInCharge:'',
          color:'',
          formCharge:'',
        },
        dataRule: {
          name: [
            { required: true, message: '标签名称不能为空', trigger: 'blur' }
          ],
          attribute: [
            { required: true, message: '属性不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型别不能为空', trigger: 'blur' }
          ],
          rfId: [
            { required: true, message: 'rfId不能为空', trigger: 'blur' }
          ],
          personInCharge: [
            { required: true, message: '负责人不能为空', trigger: 'blur' }
          ],
          color: [
            { required: true, message: '颜色不能为空', trigger: 'blur' }
          ],
          formCharge: [
            { required: true, message: '绑定表单不能为空', trigger: 'blur' }
          ]
        },
        laberUserList:[],
        personInChargelist:[]
      }
    },
    created() {
      this.list()
    },
    mounted() {
        
    },
    methods: {
      init (row) {
        
         this.$http({
          url: this.$http.adornUrl('/bim/safetyPatrolForm/list'),
          method: 'post',
          data: this.$http.adornParams({})
        }).then(({data}) => {
          console.log(data.result)
          this.formChargelist = data.result.list
        })
         this.$http({
          url: this.$http.adornUrl('/sys/sysdict/listSysdict'),
          method: 'post',
          data: this.$http.adornParams({
            "type":4
          })
        }).then(({data}) => {
          console.log(data.result)
          this.attributelist = data.result
        })

        this.$http({
          url: this.$http.adornUrl('/sys/user/listUser'),
          method: 'post',
          data: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.code === 0) {
              this.personInChargelist = data.result
          } 
        })
        console.log(row)
        this.dataForm.id = row.id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm.name = row.labelName
          this.dataForm.attribute = Number(row.attribute)
          this.dataForm.type =row.type
          this.dataForm.rfId = row.rfId
          this.dataForm.color = row.colour
          this.dataForm.formCharge = row.safetyPatrolFormId
          var arrs = row.laberUserList
          console.log(arrs)
          var newarr = []
          for (let i = 0; i < arrs.length; i++) {
                var userId = arrs[i].userId;
                var personInCharge = arrs[i].personInCharge;
                var ddd = userId+'_'+personInCharge
                newarr.push(ddd)
          }
          this.dataForm.personInCharge = newarr
          
          var ret = [];
          for (let i = 0; i < newarr.length; i++) {
              var data = newarr[i];
              var data_arr = data.split('_');
              var info = {};
              info["userId"] = data_arr[0];
              info["personInCharge"] = data_arr[1];
              ret.push(info);
          }
          this.laberUserList = ret
        })
      },
      list(){
      },
      changeSelect(){
          console.log(this.dataForm.personInCharge)
          var listdatas = this.dataForm.personInCharge
          var ret = [];
          for (let i = 0; i < listdatas.length; i++) {
              var data = listdatas[i];
              var data_arr = data.split('_');
              var info = {};
              info["userId"] = data_arr[0];
              info["personInCharge"] = data_arr[1];
              ret.push(info);
          }
          this.laberUserList = ret
         
      },
      handleSwitch(val){
          console.log(val)
          this.dataForm.status = val
      },
      // 表单提交
      dataFormSubmit () {
        console.log(this.laberUserList)
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
             
            this.$http({
              url: this.$http.adornUrl(`/bim/laber/update`),
              method: 'post',
              data: this.$http.adornData({
                'id':this.dataForm.id || undefined,
                'labelName':this.dataForm.name,
                'attribute':this.dataForm.attribute,
                'type':this.dataForm.type,
                'colour':this.dataForm.color,
                'rfId':this.dataForm.rfId,
                'safetyPatrolFormId':this.dataForm.formCharge,
                'laberUserList':this.laberUserList,
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
