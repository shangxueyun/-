<template>
  <!--关联模型-->
  <div>

       <el-button type="primary" @click="goModel">返回上一级</el-button>
  <el-row :gutter="10">
    <el-col :span="14">
      <modelTableList :datas="data" ref="modelTableList" @rowClickData="rowClickDataFun" @getOldRow="getOldRow"></modelTableList>
    </el-col>
    <el-col :span="10" >
<!--      <a-affix :offsetTop="120" @change="change">-->
      <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="leaveTab"  style="overflow: auto">
        <el-tab-pane label="模型选项" name="first" v-if="!JSON.parse($route.query.isShow)">
            <el-row :gutter="10">

                <el-form label-position="top" label-width="80px" ref="ruleForm"  :rules="rules" :model="form">
                  <el-col :span="12">
                  <el-form-item label="选择专业（单选）" prop="professionals">
                    <el-select v-model="form.professionals" placeholder="" style="width: 100%" @change="changeVal" :disabled="JSON.stringify(rowData)=='{}'">
                      <el-option v-for="item in professionalData" :label="item.majorName" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  </el-col>
                  <el-col :span="12">
                  <el-form-item label="选择单体（单选）" prop="monomer">
                    <el-select v-model="form.monomer" placeholder=""  style="width: 100%" @change="changeMonomer" :disabled="JSON.stringify(rowData)=='{}'">
                      <el-option  v-for="item in monomerData" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="选择模型和构建（多选）">
                      <el-tree
                        :props="props"
                        :data="floorhtreedata"
                        v-loading="treeLoad"
                        ref="tree"
                        node-key="glId"
                        :expand-on-click-node="false"
                        :default-checked-keys="defaultChecked"
                        @check="handleCheckChange"
                        show-checkbox>
                      </el-tree>

                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-button :disabled="!isAssociated" @click="cancelAssociat">取消关联</el-button>
                    <el-button type="primary" @click="assSubmit('ruleForm')">确定</el-button>
                  </el-col>
                </el-form>

            </el-row>
        </el-tab-pane>
        <el-tab-pane label="查看模型视图" name="second">
          <div id="viewers"  :style="{height:viewHeights}">

          </div>
        </el-tab-pane>
      </el-tabs>
<!--      </a-affix>-->
    </el-col>
  </el-row>

  </div>
</template>
<script>
  import { Message, MessageBox } from 'element-ui'
import modelTableList from './models/modelTableList'
  import {getExcelDetailData} from '@/utils/index'
  export default{
    components: {
      modelTableList
    },
    data (){
      return {
        viewHeights: '',
        viewWidths: '',
        rules: {
          professionals: [
            { required: true, message: '请选择专业', trigger: 'blur' }
          ],
          monomer: [
            { required: true, message: '请选择单体', trigger: 'blur' }
          ]
        },
        idS: [],
        activeName: 'first',
        professionalData: [],
        floorhtreedata: [],
        monomerData: [],
        result: {},
        treeLoad: false, //
        isAssociated: false, // 是否关联
        checkBoxList: [], // 后台返回选中的值
        defaultChecked: [], // 树形显示的选中值
        treeFirst: [], // 树形结构第一层
        rowData: {}, // 点击table数据
        glldList: [],
        ModelRenderingName: '',
        props: {
          label: 'name',
          children: 'children',
          isLeaf: 'leaf'
        },
        form: {
          professionals: '',
          monomer: ''
        },
        data: JSON.parse(sessionStorage.getItem('tabList'))
      }
    },
    activated (){
      this.viewHeight()
      window.addEventListener('resize', this.viewHeight)
    },
    mounted (){
    //  if(JSON.parse(this.$route.query.isShow)){
    //    this.activeName='second';
    //  }else{
    //    this.activeName='first';
    //  }
      this.getProfessional()
      this.$refs.modelTableList.init(this.data, 1)

      // this.changeMonomerComment(2).then((data)=>{
      //   console.log(data)
      //   this.floorhtreedata=data;
      // })
    },
    methods: {

      goModel (){
        this.$router.go(-1)
        if(this.idS.length == 0){
        }else{
          ClearScene()
        }
        this.$destroy()
      },
      componenthide (id){
        this.$http({
          url: this.$http.adornUrl(`/bim/modelTree/getBudgetModelTreeChildId`),
          method: 'post',
          data: this.$http.adornData({
            'id': id
          })
        }).then((data) => {
          var idsnames = this.idS
          var listdatas = data.data.result
          for(let index in listdatas) {
            listdatas[index].idsnames=idsnames[index]
          };
          for (let i = 0; i < listdatas.length; i++) {
            var arrstr = (listdatas[i].externalId).split(',')
            var idsnames = ''
            for (var j = 0; j < arrstr.length; j++) {
              if(idsnames == ''){
                idsnames = listdatas[i].idsnames+'_'+arrstr[j]
              }else{
                idsnames = idsnames+'#'+listdatas[i].idsnames+'_'+arrstr[j]
              }
            }
            SetActorVisible(idsnames, false)
            console.log(idsnames)
          }
        })
      },
      model (id){ // 模型展示
        sessionStorage.setItem('modelsid', id)
        //  this.idS.length = -1
      },
      viewHeight (){
        this.viewHeights = document.documentElement.clientHeight - 180 + 'px'
        this.viewWidths = document.documentElement.clientWidth - 300 + 'px'
      },
      getOldRow (row){ // 获取点击table行变化的值
         // if(row){
         //   this.submitComment(row.id).then((data)=>{
         //     if(data){
         //       this.glldList=data.glId
         //       this.assSubmit('ruleForm',row)
         //     }else{
         //       this.assSubmit('ruleForm',row)
         //     }
         //     this.$refs.ruleForm.resetFields();
         //   })
         //
         //   //
         // }
        // debugger;
      },
      cancelAssociat (id){ // 取消关联
        this.$confirm('是否确定取消关联?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.rowData)
          let budgetId=sessionStorage.getItem('excelId')
          this.$http({
            url: this.$http.adornUrl(`/bim/budgetdetailmodeltree/remove/${this.rowData.id||id}?budgetId=${budgetId}`),
            method: 'POST',
            data: this.$http.adornData({
            })
          }).then((data) => {
            if(data.data.code==0){
              this.$message({
                message: '取消关联成功!',
                type: 'success'
              })
              getExcelDetailData(sessionStorage.getItem('excelId'), this).then((result) => { // 关联成功后的回调
                this.$refs.modelTableList.init(result, 1)
                // 清空数据
                this.isAssociated=false
                this.form={
                  professionals: '',
                  monomer: ''
                }
                this.floorhtreedata=[]
                this.defaultChecked=[]
              })
            }else{
              this.$message({
                message: '取消关联失败!',
                type: 'error'
              })
            }
          })
        }).catch(() => {

        })
      },
      changeResult (data){ // 处理修改数据
        let arr=''
        let att=[]
        data.forEach((a, i) => {
          arr=a.glId+','
          let obj={}
          obj.glId=a.glId
          obj.modelId=a.modelId
          att.push(obj)
        })

        console.log(att)
        return {
          detailArr: arr.split(','),
          att
        }
      },
      changeResultCheck (data){ // 获取修改参数
        data.forEach((a, i) => {
          a.modelTypeId=this.form.professionals
          a.momerId=this.form.monomer
        })
      },
      assSubmit (formName, row){ // 确定
        let rowId=row?row.id:this.rowData.id
        let params={
          budgetDetailId: rowId,
          // glId:this.glldList,
          momerId: this.form.monomer,
          list: this.list,
          modelTypeId: this.form.professionals,
          id: this.result.id
        }
        let paramsUpdate=this.result

      // console.log("this.glldList",this.glldList)
        let that=this
        this.$refs[formName].validate((valid) => {
          // console.log(valid,this.isAssociated)
          if(valid){
            let url=''
            console.log(this.isAssociated)
            if(this.isAssociated){
              url='/bim/budgetdetailmodeltree/updates'
              if (!params.list||!params.list.length) {
                this.$message({
                  message: '请选择构建和模型',
                  type: 'warning'
                })
                return
              }
            }else {
              url = '/bim/budgetdetailmodeltree/saves'
              if (!params.list||!params.list.length) {
                this.$message({
                  message: '请选择构建和模型',
                  type: 'warning'
                })
                return
              }
            }

            console.log(params)
              //  debugger;
            this.$http({
              url: this.$http.adornUrl(url),
              method: 'POST',
              data: this.$http.adornData(params)
            }).then((data) => {
              if(data.data.code==0){
                if(!row){
                  Message.success({
                    message: '操作成功'
                  })
                }

                this.isAssociated=true
                getExcelDetailData(sessionStorage.getItem('excelId'), this).then((result) => { // 关联成功后的回调
                  this.$refs.modelTableList.init(result, 1)
                })
              }else{
                this.$message.error(`${data.data.message}`)
              }
            })
          }
        })
      },
      submitComment (id){
        return new Promise((resolve, reject) => {
          this.$http({
            url: this.$http.adornUrl(`/bim/budgetdetailmodeltree/detail/${id}`),
            method: 'POST',
            data: this.$http.adornData({

            })
          }).then((data) => {
            if(data.data.code==0){
              let result=data.data.result
              resolve(result)
            }
          }).catch((err) => {
            reject()
          })
        })
      },
      getResultModel (data){ // 返回数据改成修改的格式

      },
      beforeRouteLeave (to, from, next) {
        next()
        if(this.idS.length == 0){
        }else{
          ClearScene()
        }
        this.$destroy()
      },
      rowClickDataFun (row){
        var isShow = this.$route.query.isShow
        if(isShow == 'true' || isShow == true){
          this.activeName = 'second'
          if(this.idS.length == 0){
          }else{
            var arrstr = this.idS
            for (var i = 0; i < arrstr.length; i++) {
              RemoveModel(arrstr[i])
                        // console.log("model",arrstr[i])
            }
            ClearScene()
          }

          this.models(row.id)
        }else{
          this.activeName = 'first'
        }
        if(row.modelStatus==1){ // 模型已经删除
          if(JSON.parse(this.$route.query.isShow)){
            this.$alert('该模型已删除', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {

              }
            })
          }else{
            this.$confirm('该模型已删除,是否取消关联?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.cancelAssociat(row.id)
            }).catch(() => {

            })
          }
        }else{ // 模型未删除
          this.rowData=row
          this.defaultChecked=[]
          this.glldList=[]
          this.model(row.id)
          console.log(this.activeName)
          if(JSON.parse(this.$route.query.isShow)){
            this.leaveTab(this.rowData.id)
          }else{
            this.$refs.ruleForm.resetFields()
            this.submitComment(row.id).then((data) => {
              let result=data
              if(result&&result.length){
                this.isAssociated=true
                this.result=result
                this.defaultChecked=this.changeResult(this.result).detailArr
                this.list=this.changeResult(this.result).att
                this.$set(this.form, 'professionals', result[0].modelTypeId)
                this.$set(this.form, 'monomer', '')
                this.changeVal(this.form.professionals)
                this.changeMonomer()
                // this.form.professionals=result.momerId;
                //  this.changeMonomer(this.form.professionals)
              }else{
                this.isAssociated=false
                this.form={}
                this.floorhtreedata=[]
                this.defaultChecked=[]
              }
            })
          }
        }

     //  console.log(row)
      },
      isCheckbox (data){ // 获取接口时，根据后台返回的选中值进行对比，返回应该默认选中的值
        data.forEach((a, i) => {
          this.checkBoxList.forEach((m, n) => {
            if(Number(a.id)==Number(m)){
              this.defaultChecked.push(Number(a.id))
            }
          })
        })

        this.defaultChecked=this.unique1(this.defaultChecked)
        // this.$refs.tree.setCheckedKeys(this.defaultChecked)
      },
      unique1 (arr){ // 数组去去重
        var hash=[]
        for (var i = 0; i < arr.length; i++) {
          if(hash.indexOf(arr[i])==-1){
            hash.push(arr[i])
          }
        }
        return hash
      },
      changeMonomer (id){
        if(id){
          this.treeLoad=true
          this.changeMonomerComment(id).then((data) => {
            this.treeLoad=false
            this.floorhtreedata=data
            this.floorhtreedata.forEach((a, i) => {
              a.name=a.modelName
            })
          })
        }else{
          this.floorhtreedata=[]
        }
      },
      changeMonomerComment (id){
        return new Promise((resolve, reject) => {
          this.$http({
            url: this.$http.adornUrl('/bim/model/listModelTree'),
            method: 'POST',
            data: this.$http.adornData({
              'modelMonomerId': this.form.monomer
            })
          }).then((data) => {
            if(data.data.code==0){
              resolve(data.data.result)
            }else if(data.data.code==1){
              this.$message.error('无此权限')
              this.treeLoad=false
            }
          })
        })
      },
      changeVal (val){ // 单体数据
        this.$http({
          url: this.$http.adornUrl('/bim/modelMonomer/listSuccessModelMonomer'),
          method: 'POST',
          data: this.$http.adornData({
            'modelMajorId': val
          })
        }).then((data) => {
          if(data.data.code==0){
            this.monomerData=data.data.result
        //   this.form.monomer=this.monomerData[0]&&this.monomerData[0].id;
        //  this.changeMonomer(this.monomerData[0]&&this.monomerData[0].id)
          }
        })
      },
      getProfessional (){ // 专业
        this.$http({
          url: this.$http.adornUrl('/bim/modelMajor/listMajor'),
          method: 'POST',
          data: this.$http.adornData({})
        }).then((data) => {
          if(data.data.code==0){
            this.professionalData=data.data.result
          }
        })
      },
      handleClick (tab, event) {
        // console.log(this.activeName)

          // if(!this.rowData.id){
          //   this.$message({
          //     message: '请选择项目',
          //     type: 'warning'
          //   });
          //   return ;
          // }else{
          //   if(this.activeName=='second') {
          //     this.model(this.rowData.id)
          //   }
          // }
        
      },
      leaveTab (activeName, oldActiveName) {
        // console.log("qingkongchangj");
        //  console.log(activeName);
        console.log(this.idS)

        if(activeName == 'first'){
          if(this.idS.length == 0){
          }else{
            var arrstr = this.idS
            for (var i = 0; i < arrstr.length; i++) {
              RemoveModel(arrstr[i])
                        // console.log("model",arrstr[i])
            }
            ClearScene()
          }
        }else
        if(activeName == 'second'){
          if(!this.rowData.id){
            this.$message({
              message: '请选择项目',
              type: 'warning'
            })
            return false
          }else{
            var isShow = this.$route.query.isShow
            if(isShow == 'true' || isShow == true){

            }else{
              this.models(this.rowData.id)
            }
          }
        }
      },
      models (id){
  this.$http({
    url: this.$http.adornUrl(`/bim/model/findBudgetModel`),
    method: 'post',
    data: this.$http.adornData({
      'id': id
    })
  }).then((data) => {
    if(data.data.code==0){
      if(data.data.result == '' || data.data.result == null){

                // this.$message({
                //   message: '请先关联模型',
                //   type: 'warning'
                // });
                // return false

      }
      this.list = data.data.result
      this.modelList = data.data.result
      var modelListarr = this.modelList
      modelListarr.forEach((item) => {
        var moname = item.modelUrl.replace(/\.[^.\/]+$/, '')
        item.modelUrl = 'http://222.184.237.179:8088/'+moname+'/'+moname + 'List.json'
      })

      let routerNew = modelListarr
      routerNew.forEach(e => {
        delete e.url
      })
      var modelList = []
      var modelNames = []
      for (var i = 0; i < routerNew.length; i++) {
        modelList.push(routerNew[i].modelUrl)
      }

      if(this.idS.length == 0){
        EngineInit('viewers', true, '../../../../config/cube.glb')
      }
      var modelLists = modelList
      var num = 0
      var t = 0
      SetClickMode(2)

            // 加载第一个模型
      AddModel(modelLists[num], 'testtag', true)
      var _this = this
            // 模型加载完成回调函数
      OnLoadModelEnd = function (tag) {
        _this.idS.push(tag)
            // console.log(_this.idS);
            // console.log("moxingjiazwancheng");

        _this.ModelRenderingName = _this.idS
        num++
        t++
        if (num < modelLists.length) {
                // 加载下一个模型
          if(tag == 'testtag'){
            AddModel(modelLists[num], 'testtag'+t, true)
          }
        } else {
                // alert("模型加载完成");
                // console.log(num)
          _this.componenthide(id)
        }
      }
            // 监听到当前的加载进度
      OnLoadModelProcess = function (value) {
        console.log('进度', value)
      }
    }
  })
      },

      getChildrenNode (node, resolve){
        this.$http({
          url: this.$http.adornUrl('/bim/modelTree/listModelTree'),
          method: 'POST',
          data: this.$http.adornData({
            'modelId': node.data.id,
            'parentGlId': node.data.glId
          })
        }).then((data) => {
          if(data.data.code==0){
            data.data.result.forEach((a, i) => {
              a.modelName=a.name
            })
            resolve(data.data.result)
          }
        })
      },
      // getChildrenNodefours(node,resolve,num){
      //   let params=node.data.modelId;
      //   if(num){
      //     params=node.data.id;
      //   }else{
      //     params=node.data.modelId;
      //   }
      //   this.$http({
      //     url: this.$http.adornUrl(`/bim/modelType/listModelType`),
      //     method: 'post',
      //     data:this.$http.adornData({
      //       "modelId":params,
      //       "parentGlId":node.data.glId
      //     })
      //   }).then((data)=>{
      //     if(data.data.code==0){
      //       if(data.data.result == null || data.data.result == ''){
      //         resolve([])
      //       }else{
      //
      //         // this.isCheckbox( data.data.result)
      //         // this.$refs.tree.setCheckedKeys(this.defaultChecked)
      //       //  debugger;
      //         data.data.result.forEach((a,i)=>{
      //           a.modelName=a.name;
      //         })
      //
      //         resolve(data.data.result)
      //       }
      //
      //     }
      //   })
      //
      // },
      handleCheckChange (data, checkBox){
        console.log(checkBox)
        // if(this.isAssociated){//修改
        //   console.log(this.result)
        //   let allArrUpdate=checkBox.checkedNodes;
        //   allArrUpdate.forEach((a,i)=>{
        //     this.result.forEach((m,n)=>{
        //       if(a.modelId==m.modelId){
        //         m.glId=m.glId+',';
        //       }else{}
        //     })
        //   })
        // }else{//添加
        let allArr=checkBox.checkedNodes
        let halfCheckedNodes=checkBox.halfCheckedNodes
        console.log(halfCheckedNodes)
        let list=[]
        let att=[]
        let arr1=[]
        if(!halfCheckedNodes.length){
          list=[{
            modelId: allArr[1].modelId
          }]
        }else{
          halfCheckedNodes.forEach((a, i) => {
            this.floorhtreedata.forEach((m, n) => {
              if(m.id==a.id){
                var obj={}
                console.log(a.id)
                obj.modelId=a.id
              }
              list.push(obj)
            })
          })
        }

        for(var i = 0; i<list.length; i++) {
          if(list[i] == ' ' || list[i] == null || typeof (list[i]) === 'undefined') {
            list.splice(i, 1)
            i= i-1
          }
        }

        allArr.forEach((a, i) => {
          list.forEach((m, n) => {
            if(m.modelId==a.modelId){
              // console.log(a)

              att.push(a.glId)
              m.glId=att.join(',')
            }
          })
        })
        this.list=list
      // }
      },

      change (){

      }
    }
  }
</script>
<style>
#viewers{
  width:100%;
  /* border:1px solid red; */
}
</style>
