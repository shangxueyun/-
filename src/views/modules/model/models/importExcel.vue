<template>
   <!--导入excel-->
  <el-dialog
    class="importExcel"
    title="修改"
    :visible.sync="dialogVisible"
    width="80%"
    :modal-append-to-body="true"
    :append-to-body="true"
    :lock-scroll="false"
    :before-close="handleClose">
    <el-row :gutter="10">
      <el-form ref="form" :model="form" label-width="100px">
          <!--<el-col :span="8">-->
            <!--<el-form-item label="导入Excel表">-->




            <!--</el-form-item>-->
          <!--</el-col>-->
        <el-col :span="8">
          <el-form-item label="表单名称">
            <el-input v-model="form.tableName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="标段">
            <el-input v-model="form.teders"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择数据表" v-if="!id">
            <el-select v-model="form.sheetName" placeholder="请选择选择数据表" style="width: 100%" @change="changeVal">
              <el-option v-for="item in form.sheetNameList" :label="item" :value="item" :key="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择数据表" v-if="id">
            <el-select v-model="form.sheetName" placeholder="请选择选择数据表" style="width: 100%" @change="changeValEdit">
              <el-option v-for="item in form.sheets" :label="item.sheetName" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input v-model="form.projectName"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row :gutter="10">
      <el-col
        :span="24"
                    v-loading="loading"
                    element-loading-text="正在提交..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    @updateValue="update"
                    class="content_"
      >
        <v-table
          style="width:100%"
          is-horizontal-resize
          id="asddsadaassa1"
          v-if="!id"
          :columns="columns"
          :table-data="sheetName&&form.data[sheetName]"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          :cell-edit-done="cellEditDone"
        ></v-table>
        <v-table
          is-horizontal-resize
          style="width:100%"
          v-if="id"
          :columns="columns"
          :table-data="form.budgetSheet[form.sheetName]&&form.budgetSheet[form.sheetName].list"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          :cell-edit-done="cellEditDone"
        ></v-table>
<!--        <grid-->
<!--          v-if="!id"-->
<!--          :grid-data="sheetName&&form.data[sheetName]"-->
<!--          :columns="columns"-->
<!--          :showCheckbox="showCheckbox"-->
<!--          :columnSet="columnSet"-->
<!--          :left-height="20"-->
<!--          @focus="focus"-->
<!--          v-loading="loading"-->
<!--          element-loading-text="正在提交..."-->
<!--          element-loading-spinner="el-icon-loading"-->
<!--          element-loading-background="rgba(255, 255, 255, 0.8)"-->
<!--          @updateValue="update"-->
<!--          :showRate="true"></grid>-->
<!--        <grid v-if="id"-->
<!--              :grid-data="form.budgetSheet[form.sheetName]&&form.budgetSheet[form.sheetName].list"-->
<!--              :columns="columns"-->
<!--              :showCheckbox="showCheckbox"-->
<!--              :columnSet="columnSet"-->
<!--              :left-height="20"-->
<!--              @focus="focus"-->
<!--              v-loading="loading"-->
<!--              element-loading-text="正在提交..."-->
<!--              element-loading-spinner="el-icon-loading"-->
<!--              element-loading-background="rgba(255, 255, 255, 0.8)"-->
<!--              @updateValue="update"-->
<!--              :showRate="true"></grid>-->
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
  </el-dialog>

</template>
<script>
  import grid from "../../../grid/index"
   export default{
     components:{
      grid
    },
     data(){
       return {
         loading:false,
         dialogVisible:false,
         result:{},
         editReault:{},
         fileList:[],
         sheetName:"",
         id:"",
         form:{
           sheetNameList:[],
           name:"",
           teders:"",
           projectName:""
         },
         columnSet: true,
         showCheckbox: false,
         data: [],
         changeData:[],//修改的数据
         columns: [
           { title: '项目编码', field: 'projectCode', width: 80,titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true },
           { title: '项目名称', field: 'projectName', width: 150,titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true },
           { title: '项目特征描述', field: 'description', width: 100,titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true },
           { title: '计量单位', field: 'unit', width: 100,titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:false },
           { title: '工程量', field: 'projectQuantity', width: 70,titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true},
           { title: '综合单价', field: 'comprehensivePrice', type: 'number', width: 70,titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true },
           { title: '合价', field: 'valency', width: 150,titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:false },
         ],
       }
     },
     created(){

     },
     methods:{
       init(id,result){

         this.form=result;
         this.sheetName=this.form.sheetNameList&&this.form.sheetNameList[0];
         this.form.sheetName=this.sheetName;
         console.log(this.form)
         if(id){
           // this.data=data;
           this.id=id;
           let arr=[];
           result.id=id;
           this.form.budgetSheet.forEach((a,i)=>{
             let obj={};
             obj.id=i;
             obj.sheetName=a.sheetName;
             arr.push(obj)
           })
           this.form.sheets=arr;
           this.form.sheetName= this.form.sheets[0]&& this.form.sheets[0].id;
           console.log(this.form);
         }
       },
       changeValEdit(val){
         this.$forceUpdate()
         // this.sheetName=val;
         console.log(this.form.budgetSheet[val])
         if(!this.form.budgetSheet[val].list.length){
           this.$message({
             message: '暂无数据!',
             type: 'warning'
           });
         }
       },
       changeVal(val){
         console.log(val)
         this.$forceUpdate()
         this.sheetName=val;
         if(!this.form.data[this.sheetName].length){
           this.$message({
             message: '暂无数据!',
             type: 'warning'
           });
         }
       },
       getFormData(data){
         if(data){
           return data;
         }else{

         }
       },
       submit(){//提交
         this.loading=true;
         if(!this.id){
           console.log(this.form)
           for(var i in this.form){
             this.result[i]=this.form[i]
           }
           let arr=[];
           for(var i in this.result.data){
             let obj={};
             obj.list=this.result.data[i];
             obj.sheetName=i;
             arr.push(obj);
           }
           this.result.budgetSheet=arr;
           delete this.result.data;
           // this.result = JSON.parse(JSON.stringify(this.result).replace(/description/,"discrible"));
           console.log( this.result)
           this.$http({

             url: this.$http.adornUrl(`/bim/budget/saveList`),
             method:"post",
             data:this.result
           }).then((data)=>{
             if(data.data.code==0){
               let that=this;
               this.loading=false;
               this.$message({
                 message: '添加成功!',
                 type: 'success',
                 onClose:()=>{
                   that.dialogVisible=false;
                 }
               });
               this.$emit('changedom')
             }
           })
         }else{
             console.log(this.form)
           this.$http({
             url:this.$http.adornUrl(`/bim/budget/updateList`),
             method:"post",
             data:this.form
           }).then((data)=>{
             if(data.data.code==0){
               let that=this;
               this.loading=false;
               this.$message({
                 message: '修改成功!',
                 type: 'success',
                 onClose:()=>{
                   that.dialogVisible=false;

                 }
               });
               // this.$parent.getExcelDetail(this.id)
               this.$emit('changedom')
             }
           })
         }

       },
       update(value) {
         console.log(value) //eslint-disable-line

           this.form.data[this.form.sheetName].forEach((a,i)=>{
             if(a['序号']==value[0].rowData['序号']){
               a=value[0].rowData
             }
           })


       },
       cellEditDone(newValue,oldValue,rowIndex,rowData,field){
         console.log(newValue)
         if(this.id){
           this.form.budgetSheet[this.form.sheetName].list[rowIndex][field] = newValue;
         }else{
           this.form.data[this.sheetName][rowIndex][field] = newValue;
         }


         // 接下来处理你的业务逻辑，数据持久化等...
       },
       focus(value) {
         console.log(value) //eslint-disable-line
       },
       handleClose(done) {
         this.$confirm('确认关闭？')
           .then(_ => {
             done();
           })
           .catch(_ => {});
       }
     }
   }
</script>
<style>
.importExcel .v-table-rightview .v-table-body{
  height: 26rem !important;
}
.importExcel .el-table td div {
  height: 26rem !important;
}
.content_>div{
  height: 26rem !important;
}
</style>
