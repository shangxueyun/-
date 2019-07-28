<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :modal-append-to-body="true"
    :append-to-body="true"
    width="30%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" >
      <el-form-item label="分组名称" prop="majorCode">
        <el-select v-model="form.majorCode" placeholder="请选择分组名称">
          <el-option v-for="item in list" :label="item.name"  :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="sumit('form')">确定</el-button>
  </span>
  </el-dialog>
</template>
<script>
  import { mapActions,mapMutations  } from 'vuex'
  export default{
    data(){
        return {
          title:'添加',
          dialogVisible:false,
          form:{
            majorCode:"",
          },
          list:[],
          rules:{
            majorCode: [
              { required: true, message: '请选择分组名称', trigger: 'blur' },
            ],
          }
        }
    },
    mounted(){
      // this.$nextTick(() => {

      // })
    },
    methods:{
      init(id,data){
        this.list=data;
        console.log(data)
        if(id){

          this.title='修改';
          this.form=Object.assign(this.form,id)
          this.form.majorCode=this.form.id
        }else{
          this.title='添加';
        }
      },
      sumit(formName){
        this.$refs[formName].validate((valid) => {``
          if (valid) {
            if(!this.form.id){
              this.$http({
                url:this.$http.adornUrl('/bim/budgetmajor/save'),
                method: "post",
                data: this.$http.adornData({'majorCode':this.form.majorCode,})
              }).then((data)=>{
                if(data.data.code==0){
                  this.$message({
                    message: '添加成功!',
                    type: 'success'
                  });
                  this.$emit('changeDom')
                  this.close()
                  setTimeout(()=>{
                    this.dialogVisible=false;
                  },500)
                }else{
                  this.$message.error('添加失败,请重试!');
                }
              })
            }else{
              this.$http({
                url:this.$http.adornUrl('/bim/budgetmajor/update'),
                method: "post",
                data: this.$http.adornData({'majorCode':this.form.majorCode,'id':this.form.id})
              }).then((data)=>{
                if(data.data.code==0){
                  this.$message({
                    message: '修改成功!',
                    type: 'success'
                  });
                  this.close();
                  this.$emit('changeDom')
                  setTimeout(()=>{
                    this.dialogVisible=false;
                  },500)
                }else{
                  this.$message.error('修改失败,请重试!');
                }
              })
            }

          } else {

            return false;
          }
        });
      },
      close(){
        this.dialogVisible=false;
        this.$refs.form.resetFields();
        this.form={};
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
       this.close()
          })
          .catch(_ => {});
      }
    }
  }
</script>
<style>

</style>
