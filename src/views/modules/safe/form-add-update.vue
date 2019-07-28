<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="表单名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="表单名称"></el-input>
      </el-form-item>
      <el-form-item label="检查项目" prop="tableData">
          <el-button type="text" @click="dialogFormVisibleclick">点击添加项目表单</el-button>
 <el-table class="tableDatatable" v-show="tableDatatable"
      :data="dataForm.tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="80"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="project"
        align="center"
        label="检查项目">
      </el-table-column>
      <el-table-column label="操作" 
        width="80"
        align="center">
            <template slot-scope="scope">
              <el-button 
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
    </el-table-column>
</el-table>

  <el-dialog title="添加检查项目内容" :visible.sync="dialogFormVisible"
    :modal-append-to-body="true"
    :append-to-body="true">
      <el-form :model="formupdateimg" :rules="ruleFormimg" ref="ruleFormimg" label-width="80px">
        <el-form-item label="检查项目"  prop="project">
                <el-input v-model="formupdateimg.project" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="projectSubmit()">确定</el-button>
      </span>
  </el-dialog>
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
      var validatetableData = (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error('检查项目不能为空'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        tableDatatable:false,
        dataForm: {
          id: 0,
          name: '',
          tableData:[]
        },
        dataRule: {
          name: [
            { required: true, message: '表单名称不能为空', trigger: 'blur' }
          ],
          tableData: [
            { required: true, validator: validatetableData }
          ],
        },
        tableData:[],
        dialogFormVisible: false,
        formupdateimg:{
           project:''
        },
        ruleFormimg:{
          project: [
            { required: true, message: '检查项目不能为空', trigger: 'change' }
          ],

        }
      }
    },
    activated () {
    },
    methods: {
      dialogFormVisibleclick(){
        this.dialogFormVisible = true
        if(this.formupdateimg.project == ''){

        }else{

          this.$refs.ruleFormimg.resetFields()
        }
        // alert(2)
      },
      init (id,name) {
        this.visible = true
        this.dataForm.id = id || 0
        if(this.dataForm.id == 0){
            console.log(this.dataForm.name)
            if(this.dataForm.name !== ''){
              this.$refs.dataForm.resetFields()
            }
            this.dataForm.tableData = []
            this.tableDatatable = false
        }else{
          this.$http({
              url: this.$http.adornUrl('/bim/safetyPatrolForm/findSafetyPatrolFormById'),
              method: 'post',
              data: this.$http.adornParams({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.tableDatatable = true
                this.dataForm.name = name
                this.dataForm.tableData = data.result.safetyPatrolFormDetailList
              } else {

              }
            })
        }
      },
      dddd(){
        this.$refs['dataForm'].validate((valid) => {

        })
      },
      projectSubmit(){
        this.$refs['ruleFormimg'].validate((valid) => {
          if (valid) {
              this.dialogFormVisible = false
              this.tableDatatable = true
              this.dataForm.tableData.push({project:this.formupdateimg.project})
              this.dddd()
              this.$refs.ruleFormimg.resetFields()
          }
        })
      },
      handleDelete(index, row) {
        this.dataForm.tableData.splice(index, 1)
      },
      // 表单提交
      dataFormSubmit () {
        console.log("this.tableData",this.dataForm.tableData)
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/bim/safetyPatrolForm/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'safetyPatrolFormDetailList':this.dataForm.tableData
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$refs.dataForm.resetFields()
                    this.dataForm.tableData = []
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
.tableDatatable{
  margin:10px 0 0 0;
}
.tableDatatable td, .tableDatatable th{
    padding:0;
}
.tableDatatable td{
  padding:4px 0;
}
</style>

