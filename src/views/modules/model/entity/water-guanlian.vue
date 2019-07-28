<template>
  <el-dialog
    title="关联模型"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    width="30%"
    :visible.sync="visible">
        <el-form :model="dataForms" :rules="dataRules" ref="dataForms" @keyup.enter.native="dataFormsSubmit()" label-width="80px">
            <el-form-item label="流水段" prop="results">
                  <el-select v-model="dataForms.results" style="width:150px;" clearable placeholder="请选择流水段">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.flowSectionName"
                      :value="item.id">
                    </el-option>
                  </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="dataFormsSubmit()">确定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        options:[],
        value: '',
        visible: false,
        dataForms: {
          id: 0,
          ids: 0,
          results: '',
        },
        dataRules: {
          results: [
            { required: true, message: '请选择流水段', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id,ids) {
        this.visible = true
        this.dataForms.id = id
        this.dataForms.ids = ids
         this.$http({
            url: this.$http.adornUrl(`/bim/model/listModel`),
            method: 'post',
            data: this.$http.adornData({
              'modelMonomerId': this.dataForms.id
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
                this.options = data.result
            } else {
              this.$message.error(data.msg)
            }
          })

      },
      // 表单提交
      dataFormsSubmit () {
        this.$refs['dataForms'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/bim/pipelineView/update`),
              method: 'post',
              data: this.$http.adornData({
                'modelId': this.dataForms.results,
                'id': this.dataForms.ids
                // 'id': this.dataForms.results,
                // 'modelId': this.dataForms.id
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
