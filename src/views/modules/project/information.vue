<template>
<div>
<el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="项目基本信息" name="1">
  
    <div>
      <el-form :inline="true" :model="formInline" :rules="rulesformInline" ref="formInline" label-width="120px" class="demo-form-inline">
          <el-form-item label="项目名称" prop="projectName">
            <el-input style="width:370px" v-model="formInline.projectName" placeholder="项目名称"></el-input>
          </el-form-item>
          <el-form-item label="工程地点" prop="address">
            <el-input style="width:370px" v-model="formInline.address" placeholder="工程地点"></el-input>
          </el-form-item>
          <el-form-item label="结构形式" prop="structuralStyle">
            <el-input style="width:370px" v-model="formInline.structuralStyle" placeholder="结构形式"></el-input>
          </el-form-item>
          <el-form-item label="业主单位" prop="ownerUnit">
            <el-input style="width:370px" v-model="formInline.ownerUnit" placeholder="业主单位"></el-input>
          </el-form-item>
          <el-form-item label="建设单位" prop="constructionUnit">
            <el-input style="width:370px" v-model="formInline.constructionUnit" placeholder="建设单位"></el-input>
          </el-form-item>
          <el-form-item label="监理单位" prop="supervisorUnit">
            <el-input style="width:370px" v-model="formInline.supervisorUnit" placeholder="监理单位"></el-input>
          </el-form-item>
          <el-form-item label="施工单位" prop="constructionCompanies">
            <el-input style="width:370px" v-model="formInline.constructionCompanies" placeholder="施工单位"></el-input>
          </el-form-item>
          <el-form-item label="设计单位" prop="designUnit">
            <el-input style="width:370px" v-model="formInline.designUnit" placeholder="设计单位"></el-input>
          </el-form-item>
          <el-form-item label="建筑面积" prop="floorage">
            <el-input style="width:370px" v-model="formInline.floorage" placeholder="建筑面积">
              <template slot="append">m²</template></el-input>
            </el-input>
          </el-form-item>
          <el-form-item label="工程造价" prop="engineeringCost">
            <el-input style="width:370px" v-model="formInline.engineeringCost" placeholder="工程造价">
              <template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="规模性质">
            <el-input style="width:370px" v-model="formInline.scaleNature" placeholder="规模性质"></el-input>
          </el-form-item>
          <el-form-item label="投资类型">
            <el-input style="width:370px" v-model="formInline.investmentType" placeholder="投资类型"></el-input>
          </el-form-item>
          <el-form-item label="合同开工时间" prop="startTime">
              <el-date-picker type="date" @change="changestartTime" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formInline.startTime" style="width: 370px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="合同竣工时间" prop="endTime">
              <el-date-picker type="date" @change="changeendTime" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formInline.endTime" style="width: 370px"></el-date-picker>
          </el-form-item>
          <br/>
          <el-form-item label="实际开工时间" prop="actualStartTime">
              <el-date-picker  type="date" @change="changeactualStartTime" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formInline.actualStartTime" style="width: 370px"></el-date-picker>
          </el-form-item>
          <el-form-item label="实际竣工时间" prop="actualEndTime">
              <el-date-picker type="date" @change="changeactualEndTime" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formInline.actualEndTime" style="width: 370px"></el-date-picker>
          </el-form-item>
          

      </el-form>
    </div>


  </el-collapse-item>

  <el-collapse-item title="项目简介" name="2">
    <div>
        <div ref="editor" style="text-align:left"></div>
        <!-- <button v-on:click="getContent">查看内容</button> -->
    </div>
  </el-collapse-item>

  <el-collapse-item title="项目图片" name="3">
    <div>
      

  <el-button type="primary" @click="dialogFormVisible = true">添加图片</el-button>
  <el-dialog :title="!formupdateimg.id ? '添加图片' : '修改图片'" :visible.sync="dialogFormVisible"
  
    :modal-append-to-body="true"
    :append-to-body="true">
      <el-form :model="formupdateimg" :rules="ruleFormimg" ref="ruleFormimg" @keyup.enter.native="dataFormSubmit()" >
        
        <el-form-item label="名称" :label-width="formLabelWidth" v-show="false">
                <el-input v-model="formupdateimg.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="formupdateimg.name" autocomplete="off"></el-input>
        </el-form-item>
              <el-form-item label="简介" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="formupdateimg.desc"></el-input>
              </el-form-item>
              <el-form-item label="上传图片" :label-width="formLabelWidth">
                    <el-upload action='' :on-remove="handleRemove" :on-change="getFile" :limit="1" 
                    :file-list="fileList"
                    list-type="picture" :auto-upload="false" ref="upload">
                      <el-button size="small" type="primary">选择图片</el-button>
                    </el-upload>
              </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
  </el-dialog>

<div class="imgdatelistbox">
<el-table v-show="imgdatelist"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="introduction"
        label="简介"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.url"  min-width="50" height="50" />
        </template>
      </el-table-column>
       <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
        <el-button 
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
</el-table>
</div>

    </div>
  </el-collapse-item>
</el-collapse>

<div style="text-align:center;margin-top:30px;"><el-button @click="primarysub('formInline')" type="primary">提交</el-button></div>

</div>
</template>

<script>
import E from 'wangeditor'
export default {
    data () {
      var reg = /^[1-9]{1}[0-9]{0,10}[.]{0,1}[0-9]{0,2}$/;
      var validatefloorage = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入建筑面积'));
        }else if(!reg.test(value)){
          callback(new Error('建筑面积格式错误，请重新输入'));
        }else {
          callback();
        }
      };
      var validateengineeringCost = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入工程造价'));
        }else if(!reg.test(value)){
          callback(new Error('工程造价格式错误，请重新输入'));
        }else {
          callback();
        }
      };
      
      return {
        activeNames: ['1'],
        provinceid:'',
        provincelist:[],
        cityid:'',
        citylist:[],
        blockid:'',
        blocklist:[],
        formInline: {
            projectName:'',
            address:'',
            structuralStyle:'',
            ownerUnit:'',
            constructionUnit:'',
            supervisorUnit:'',
            constructionCompanies:'',
            designUnit:'',
            floorage:'',
            engineeringCost:'',
            scaleNature:'',
            investmentType:'',
            startTime:'',
            endTime:'',
            actualStartTime:'',
            actualEndTime:''
        },
        rulesformInline: {
          projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入工程地点', trigger: 'blur' }
          ],
          structuralStyle: [
            { required: true, message: '请输入结构形式', trigger: 'blur' }
          ],
          // ownerUnit: [
          //   { required: true, message: '请输入业主单位', trigger: 'blur' }
          // ],
          constructionUnit: [
            { required: true, message: '请输入建设单位', trigger: 'blur' }
          ],
          supervisorUnit: [
            { required: true, message: '请输入监理单位', trigger: 'blur' }
          ],
          constructionCompanies: [
            { required: true, message: '请输入施工单位', trigger: 'blur' }
          ],
          designUnit: [
            { required: true, message: '请输入设计单位', trigger: 'blur' }
          ],
          floorage: [
            { required: true, trigger: 'blur',validator: validatefloorage}
          ],
          engineeringCost: [
            { required: true, trigger: 'blur',validator: validateengineeringCost }
          ],
          startTime: [
            {  required: true, message: '请选择合同开工时间', trigger: 'change' }
          ],
          endTime: [
            {required: true, message: '请选择合同竣工时间', trigger: 'change'  }
          ],
          actualStartTime: [
            {required: true, message: '请选择实际开工时间', trigger: 'change'  }
          ],
          actualEndTime: [
            { required: true, message: '请选择实际竣工时间', trigger: 'change'  }
          ]
        },
        editor: null,
        editorContent: '',
        // addbtn:true,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        formupdateimg:{
            name:'',
            desc:'',
            img:''
        },
        ruleFormimg:{

        },
        projectImgList:[],
        imgdatelist:false,
        tableData:[],
        fileList: [],
        ids:'',
        content:''
        
        
      }
    },
    mounted() {
    },
    deactivated() {
          this.$destroy()
          sessionStorage.removeItem("tableDataList"); 
    },
    activated (){
      // this.activeNames = ['2'],
      this.getCityData()
      this.imgdatelist = true
      this.tableData = JSON.parse(sessionStorage.getItem('tableDataList'))
      if(this.tableData == null){
        this.tableData = []
      }

      
        
    
    },
    methods: {

      getFile(file, fileList) {
          this.getBase64(file.raw).then(res => {
              this.formupdateimg.img = res
          });
      },
      handleRemove(file, fileList) {
              this.formupdateimg.img = ''
      },
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
      getContent: function () {
          alert(this.editorContent)
      },
      handleChange(val) {
        // console.log(val)
      },
      
      getCityData () {
          //初始化      
        var editor = new E(this.$refs.editor)
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            // 'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            // 'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            // 'table',  // 表格
            // 'video',  // 插入视频
            // 'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.showLinkImg = false
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
        
        // this.editorContent= '11211212'
        // console.log("this.editorContent",this.editorContent)
        this.$http({
              url: this.$http.adornUrl('/bim/project/findProject'),
              method: 'post',
              data: this.$http.adornData({
                'id': 1
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                  if(data.result !== null){
                    
                    var imlist = JSON.stringify(data.result.projectFileList)
                    JSON.stringify(sessionStorage.setItem("tableDataList",imlist))
                    this.ids = data.result.id
                    this.formInline.projectName = data.result.projectName
                    this.formInline.address = data.result.address
                    this.formInline.structuralStyle = data.result.structuralStyle
                    this.formInline.ownerUnit = data.result.ownerUnit
                    this.formInline.constructionUnit = data.result.constructionUnit
                    this.formInline.supervisorUnit = data.result.supervisorUnit
                    this.formInline.constructionCompanies = data.result.constructionCompanies
                    this.formInline.designUnit = data.result.designUnit
                    this.formInline.floorage = data.result.floorage
                    this.formInline.engineeringCost = data.result.engineeringCost
                    this.formInline.scaleNature = data.result.scaleNature
                    this.formInline.investmentType = data.result.investmentType
                    this.formInline.startTime = data.result.startTime
                    this.formInline.endTime = data.result.endTime
                    this.formInline.actualStartTime = data.result.actualStartTime
                    this.formInline.actualEndTime = data.result.actualEndTime
                    this.formInline.introduction = data.result.introduction
                    this.formInline.projectImgList = data.result.projectFileList
                    this.content = data.result.introduction
                    editor.txt.html(data.result.introduction);
                    this.tableData = data.result.projectFileList
                    
                  }
              } 
        })
      },
      dataFormSubmit(){
          this.imgdatelist = true
          this.dialogFormVisible = false
          if (!this.formupdateimg.id) {
            // 新增
            // alert(1)
              this.tableData.push({id:this.tableData.length,name:this.formupdateimg.name,url:this.formupdateimg.img,introduction:this.formupdateimg.desc})
              sessionStorage.setItem('tableDataList', JSON.stringify(this.tableData || '[]'))
              // console.log(this.tableData.length)
              this.formupdateimg.name = ''
              this.formupdateimg.img = ''
              this.formupdateimg.desc = ''
              this.$refs.upload.clearFiles()
          } else {

              // var arr = this.tableData
              // for ( var i = 0; i <arr.length; i++){
              //   console.log(arr[i]);
              //   if(arr[i] == this.formupdateimg.id){
              //       arr[i].name = this.formupdateimg.name
              //       arr[i].url = this.formupdateimg.img
              //       arr[i].introduction = this.formupdateimg.desc
              //   }
              // }
            
          }

      },
      handleEdit(index, row) {
        // this.$set(row, 'isEgdit', true)
        this.dialogFormVisible = true
        this.formupdateimg.id = row.id
        this.formupdateimg.name = row.name
        this.formupdateimg.img = row.url
        this.formupdateimg.desc = row.introduction
        this.fileList = [{url: row.url}]
        console.log("row.id",row.id)
      },
      handleDelete(index, row) {
        this.tableData.splice(index, 1)
        // console.log("111",this.tableData)
        sessionStorage.setItem('tableDataList', JSON.stringify(this.tableData || '[]'))
      },
      changestartTime(val){
          this.formInline.startTime = val
      },
      changeendTime(val){
          this.formInline.endTime = val
      },
      changeactualStartTime(val){
          this.formInline.actualStartTime = val
      },
      changeactualEndTime(val){
          this.formInline.actualEndTime = val
      },
      primarysub(formInline){
        
          var urls;
          if(this.ids == ""){
              var urls = '/bim/project/save'
          }else{
              var urls = '/bim/project/update'
          }
          
          var cons;
          if(this.editorContent == ""){
            cons = this.content
          }else{
            cons = this.editorContent
          }
          

        this.$refs[formInline].validate((valid) => {
          if (valid) {
              var imlists = JSON.parse(sessionStorage.getItem('tableDataList'))
              if(imlists == '' || imlists == null || imlists == undefined){
                  this.$message.error('项目图片不能为空')
              }else if(cons == '' || cons == null || cons == undefined ){
                  this.$message.error('项目简介不能为空')
              }else{
                  this.$http({
                    url: this.$http.adornUrl(urls),
                    method: 'post',
                    data: this.$http.adornParams({
                      'id':this.ids,
                      'projectName':this.formInline.projectName,
                      'address':this.formInline.address,
                      'structuralStyle':this.formInline.structuralStyle,
                      'ownerUnit':this.formInline.ownerUnit,
                      'constructionUnit':this.formInline.constructionUnit,
                      'supervisorUnit':this.formInline.supervisorUnit,
                      'constructionCompanies':this.formInline.constructionCompanies,
                      'designUnit':this.formInline.designUnit,
                      'floorage':this.formInline.floorage,
                      'engineeringCost':this.formInline.engineeringCost,
                      'scaleNature':this.formInline.scaleNature,
                      'investmentType':this.formInline.investmentType,
                      'startTime':this.formInline.startTime,
                      'endTime':this.formInline.endTime,
                      'actualStartTime':this.formInline.actualStartTime,
                      'actualEndTime':this.formInline.actualEndTime,
                      'introduction':cons,
                      'projectFileList': JSON.parse(sessionStorage.getItem('tableDataList'))
                    })
                  }).then(({data}) => {
                    if (data && data.code === 0) {
                      this.$message({
                          message: '操作成功',
                          type: 'success',
                          duration: 1500,
                          onClose: () => {
                            this.getCityData()
                          }
                        })
                    }else{
                      
                        this.$message.error(data.msg)
                    }
                  })
              }

          } else {
            console.log('error submit!!');
            return false;
          }
        });



        
        // this.editorContent
       

       
      }
   }

}
</script>


<style lang="scss">
.imgdatelistbox{
  // border:1px solid red;
  margin-top:20px;
}
.el-collapse-item__header{
   font-size: 15px;
  //  text-indent: 20px;
   background:#f7f7f7;
   padding:0 0 20px 20px;
   margin: 0 0 20px 0;
}
.edit_container{
  width: 100%;
  height: 300px;
  overflow: auto;
}
#editor{
   height:300px;
   border:1px solid #c4c4c4;
   border-width: 0 1px 1px 1px;
   overflow: auto;
}

</style>
