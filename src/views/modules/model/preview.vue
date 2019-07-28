<template>

<div v-if="isRouterAlive">
    <div class="selectmajor">
          <el-select v-model="major" placeholder="请选择专业分组"  @change="majorchange">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.majorName"
              :value="item.id">
            </el-option>
          </el-select>

          <div class="siderleft" >

              <img @click="majorshowimg" v-show="leftbtn"  class="leftbtn animated bounceInLeft" src="~@/assets/img/leftbtn.png">
              <img @click="majorshowimg" v-show="rightbtn"  class="rightbtn animated bounceInLeft" src="~@/assets/img/rightbtn.png">

          </div>

                    <transition name="el-fade-in-linear" enter-active-class="animated bounceIn" leave-active-class="animated bounceOutLeft">
          <div v-show="eltreelistmajorshow" style="">

            <div class="eltreelist eltreelistmajor" >
                    <h1><i style="font-size:1.2rem;" class="el-icon-thirdshuji"></i>专业结构</h1>
                    <div class="treesbox majorcheckbox" :style="{height:cardHeights}">
                        <el-tree class="hidecheckbox"
                            ref="tree"
                            highlight-current	
                            :data="treedata"
                            :props="props"
                            :load="loadNode"
                            node-key="id"
                            :default-checked-keys="jurisdictionId"
                            lazy
                            :show-checkbox="showcheckbox"
                            :expand-on-click-node="false"
                            @check-change="handleCheckChangeMajors">
                        </el-tree>
                    </div>

            </div>
            <div class="eltreelist eltreelistfloor">
                    <h1><i style="font-size:1.5rem;" class="is el-icon-thirdbangonglou"></i>楼层结构</h1>
                    <div class="treesbox floorcheckbox" :style="{height:cardHeights}">
                            <el-tree class="hideflcheckbox"
                            ref="stree"
                            highlight-current	
                            :data="floorhtreedata"
                            :props="props"
                            :load="loadNodefloorh"
                            node-key="id"
                            :default-checked-keys="jurisdictionIds"
                            lazy
                            show-checkbox
                            :expand-on-click-node="false"
                            @check-change="handleCheckChange">
                            </el-tree>
                    </div>
            </div>
          </div>

                    </transition>
    </div>
    <ul class="clickbtn" v-show="clickbtnhide">
        <li @click="saveImage"><img src="~@/assets/img/model_1.png"><i>保存图片</i></li>
        <li @click="selectView"><img src="~@/assets/img/model_2.png"><i>选择视角</i></li>
        <li @click="modelSetup(1)"><img src="~@/assets/img/model_3.png"><i>显示</i></li>
        <li @click="modelSetup(2)"><img src="~@/assets/img/model_4.png"><i>隐藏</i></li>
        <li @click="modelSetup(3)"><img src="~@/assets/img/model_5.png"><i>半透明</i></li>
        <li @click="modelSetup(4)"><img src="~@/assets/img/model_6.png"><i>半透明恢复</i></li>
        <li @click="wireFrame"><img src="~@/assets/img/model_7.png"><i>线框模式</i></li>
    </ul>
    <div id="viewer"   :style="{height:viewHeights,width:viewWidths}">

    </div>

    <gli-gialog v-if="gliGialogVisible" ref="gliGialog"></gli-gialog>
</div>

</template>

<script>
import { Loading } from 'element-ui';
import global from "@/utils/publicUrl";
import GliGialog from './entity/glidialog'
  export default {
    
    data () {
      return {
        leftbtn:true,
        rightbtn:false,
        globalModelUrl:global.modelUrl,
        isRouterAlive:true,
        xk: 0,
        sdzb: '',
        viewHeights:'',
        viewWidths:'',
        cardHeights:'',
        options:[],
        major:'',
        modelList:[],
        datatree:[],
        props: {
            id:'',
            label: 'name',
            children: 'zones'
        },
        treelist: [],
        jurisdictionId:[],
        jurisdictionIds:[],
        professionalhidden:false,
        // professionalhidden:true,
        floorhidden:false,
        clickbtnhide:false,
        treehide:false,
        idS: [],
        treedata:[],
        treedatas:[],
        floorhtreedata:[],
        gid:"" , // 构件id
        value:'',
        showcheckbox:true,
        modelNames:'',
        checkboxdata:'',
        percentage:0,
        goujianListId:[],
        TransparentActAry:[],
        HideActAry:[],
        gliGialogVisible:false,
        // gliGialogVisible:true,
        eltreelistmajorshow:true,
        modelId:[]

      }
    },
    watch:{
        viewWidths(a,b){
          // console.log(a)
        }
    },
    components:{
        GliGialog
    },
        // ClearScene();
    beforeRouteLeave(to, from, next) {
        next();
        if(this.idS.length == 0){
        }else{
            ClearScene();
        }
        this.$destroy()
    },
    mounted() {
        this.viewHeight()
        window.addEventListener('resize',this.viewHeight)
        this.getdatalist()
    },
    methods: {
        viewHeight(){
    　　　　 this.viewHeights = document.documentElement.clientHeight - 120 + 'px'
    　　　　 this.viewWidths = document.documentElement.clientWidth - 300 + 'px'
    　　　　 this.cardHeights = (document.documentElement.clientHeight - 40 -209)/2 + 'px'
            var cardwidth = $(".el-card__body").width()
            var btnwidth= $(".clickbtn").width()
            $(".clickbtn").css({"margin-left":(cardwidth - 40 - btnwidth)/2 +'px'}); 
        },
        getdatalist(){
            this.$http({
              url: this.$http.adornUrl(`/bim/modelMajor/listMajor`),
              method: 'post',
              data:this.$http.adornData({})
            }).then((data)=>{
                if(data.data.code==0){
                    this.options=data.data.result;
                    // console.log(data.data.result[0].id)
                    this.major = data.data.result[0].id
                    this.majorchange(this.major)

                    // this.loadNode()
                }
            })
        },
        majorshowimg(){
            this.eltreelistmajorshow = !this.eltreelistmajorshow 
            if(this.eltreelistmajorshow == false ){
                this.leftbtn = false
                this.rightbtn = true
            }else{
                this.leftbtn = true
                this.rightbtn = false
            }
        },
        majorchange(value){
            this.value = value
            this.$http({
              url: this.$http.adornUrl(`/bim/modelMonomer/listSuccessModelMonomer`),
              method: 'post',
              data:this.$http.adornData({
                "modelMajorId":value
              })
            }).then((data)=>{
                if(data.data.code==0){
                    if(this.idS.length == 0){
                        EngineInit('viewer', true, '../../../../config/cube.glb')
                        SetBackGroundColor(255, 255, 255,0);
                    }else{
                        var arrstr = this.idS
                        for (var i = 0; i < arrstr.length; i++) {
                                RemoveModel(arrstr[i])
                                // console.log("model",arrstr[i])
                        }
                        ClearScene();
                    }
                   this.clickbtnhide = true
                   this.treehide = true
                   this.treedata = data.data.result
                   this.floorhtreedata = data.data.result
                    this.$nextTick(() => {
                        this.$refs.tree.setCheckedNodes(this.treedata)
                        this.$refs.stree.setCheckedNodes(this.floorhtreedata)
                        $(".el-checkbox").hide()
                    });
                    this.modelUpdate(value)

                }
            })

        },
        modelUpdate(value){
            this.$http({
              url: this.$http.adornUrl(`/bim/model/listModel`),
              method: 'post',
              data:this.$http.adornData({
                "modelMajorId":value
              })
            }).then((data)=>{
                if(data.data.code==0){
                    this.modelList = data.data.result
                    var modelListarr = this.modelList
                    this.datatree = this.modelList
                    modelListarr.forEach((item) =>{
                        var moname = item.modelUrl.replace(/\.[^.\/]+$/, "")
                        item.modelUrl = this.globalModelUrl+moname+'/'+moname + 'List.json'
                    })
                    let routerNew = modelListarr
                    routerNew.forEach(e => {
                        delete e.url
                    })
                    
                    var modelList = []
                    var modelNames = []
                    var modelId = []
                    for (var i = 0; i < routerNew.length; i++) {
                        modelList.push(routerNew[i].modelUrl)
                        modelNames.push(routerNew[i].modelName)
                        modelId.push(routerNew[i].id)
                    }

                    var modelLists = modelList
                    var num = 0
                    var mn = 0
                    var t = 0

                    SetClickMode(2)
                    SetPrimitiveView(45,1.5)
                    // 加载第一个模型
                    AddModel(modelList[num], modelId[mn], true)
                    var _this = this
                    // 模型加载完成回调函数
                    OnLoadModelEnd = function (tag) {
                        _this.idS.push(tag)
                        // console.log("tag",tag)
                        num++
                        mn++
                        t++
                        if (num < modelList.length) {
                        // 加载下一个模型
                            if(mn < modelId.length){
                                AddModel(modelLists[num],  modelId[mn] , true)
                            }
                        } else {
                         
                        }
                    }

                    // 监听到当前的加载进度
                    OnLoadModelProcess = function (value) {
                        _this.percentage = value

                        // var str = (value * 100).toString();
                        // if (str.indexOf(".") > 0) {
                        //     str = str.substring(0, str.indexOf("."));
                        // }
                        // const loading = Loading.service({
                        //     lock: true,
                        //     text: '模型加载中'+str + "%",
                        //     spinner: 'el-icon-loading',
                        //     background: 'rgba(0, 0, 0, 0.7)',
                        //     target:document.querySelector('#viewer')
                        // });
                        // if (str == "100") {
                        //     _this.idS = []
                        //     str = ''
                        //     loading.close();
                        // }
                    
                        
                    }
                    // 构件ID获取回调函数
                    OnSelectionChanged = function(id){
                        _this.gid = id 
                        $.each(_this.goujianListId, function (i, item) {
                            if ($.inArray(item, _this.TransparentActAry) == -1 && $.inArray(item,_this.HideActAry) == -1) {
                                ResetActor(item);//恢复构建状态
                            }
                        })
                        _this.goujianListId = [];
                        $.each(id.split('#'), function (i, item) {
                            _this.setColor(item); //构件着色
                            _this.goujianListId.push(item);
                        })

                        // if(_this.kx == 1){
                        //     // 整体状态恢复 
                        //     // ResetAllActor();
                        //     // console.log(id);
                        //     // SetActorColor(id, 0, 0, 255);
                        // }
                    }
                    
                    
                }

            })
                   

        },
        setColor(id){
            // console.log(id)
            SetActorColor(id, 0, 0, 255);
            this.gliGialogVisible = true
            this.gliGialogVisible = true
            this.$nextTick(() => {
                this.$refs.gliGialog.init(id)
            })
        },

      // 线框模式
      wireFrame: function () {
        if (this.xk == 0) {
          for (var i = 0; i < this.idS.length; i++) {
            SetModelWireFrame(this.idS[i])
          }
          this.xk = 1
        } else {
          this.xk = 0
          for (var i = 0; i < this.idS.length; i++) {
            SetModelNomal(this.idS[i])
          }
        }
      },
      // 保存视点
      saveViewpoint: function () {
        this.sdzb = GetCamera()
        // console.log(this.sdzb)
        // console.log(GetImage())
      },
        saveImage(){
            SaveImage()
        },
        selectView(){
            // top:为顶视角 bottom:为底视角 front:为前视角 back:为后视角 left:为左视角 right:为右视角 
            SetViewPort("front");
        },

        modelSetup:function (flag){
            if(flag == 1){
                for(var i = 0 ;i< this.idS.length ; i++){
                    SetModelVisible(this.idS[i],true);
                }
            }else if(flag == 2){
                for(var i = 0 ;i< this.idS.length ; i++){
                    SetModelVisible(this.idS[i],false);
                }
            }else if(flag == 3){
                for(var i = 0 ;i< this.idS.length ; i++){
                    SetModelAlpha(this.idS[i], 0.4);
                }
            }else if(flag == 4){
                for(var i = 0 ;i< this.idS.length ; i++){
                    SetModelAlpha(this.idS[i], 1);
                }
            }
        },
        // 构件设置
        componentSetup:function(flag){
            var str = this.gid
            // str=str.replace(new RegExp(',+',"gm"),'#');
            // console.log(str)
            // if(flag == 1){
            //     console.log("flag",flag)
            //     SetActorVisible(this.gid,true);
            // }else if(flag == 2){
            //     console.log("22222",this.gid)
            //     SetActorVisible(this.gid,false);
            // }else if(flag == 3){
            //     SetActorAlpha(this.gid,0.4);
            // }else if(flag == 4){
            //     SetActorAlpha(this.gid,1);
            // }
        },
        handleCheckChange(item, node, self){
          
          var tagname = item.idsnames
          this.$http({
            url: this.$http.adornUrl(`/bim/modelTree/getModelTreeChildId`),
            method: 'post',
            data:this.$http.adornData({
              "modelId":item.modelId,
              "glId":item.glId
            })
          }).then((data)=>{
                if(data.data.result == null){

                }else{
                  var str = "";
                  var arrstr = (data.data.result).split(',');
                  for (var i = 0; i < arrstr.length; i++) {
                      if(node == false){
                          SetActorVisible(tagname + '_' + arrstr[i], false)
                      }else{
                          SetActorVisible(tagname + '_' + arrstr[i], true)
                      }
                  }
                }
          })
            
        },
        handleCheckChangeMajors(item, node, self){
          var tagname = item.idsnames
          this.$http({
            url: this.$http.adornUrl(`/bim/modelType/getModelTypeChildId`),
            method: 'post',
            data:this.$http.adornData({
              "modelId":item.modelId,
              "glId":item.glId
            })
          }).then((data)=>{
                if(data.data.result == null){

                }else{
                  var str = "";
                  var arrstr = (data.data.result).split(',');
                  for (var i = 0; i < arrstr.length; i++) {
                      if(node == false){
                          SetActorVisible(tagname + '_' + arrstr[i], false)
                      }else{
                          SetActorVisible(tagname + '_' + arrstr[i], true)
                      }
                  }
                }
          })
        },
        loadNode(node, resolve) {
            if (node.level === 0) {
                var arrs = this.treedata
                arrs.forEach((item) =>{
                    item.name = item.modelName 
                })
                resolve(arrs)
            } else if (node.level === 1) {
                this.getChildrenNodelevel(node,resolve)
                //  $(".el-checkbox").hide()
            }else if(node.level === 3){
            //   this.getChildrenNodefours(node,resolve)
              resolve([])
            }else if(node.level === 4){
              resolve([])
            }else if(node.level === 2){
                this.getChildrenNode(node,resolve)
            }
            // else {
            //     this.getChildrenNode(node,resolve)
            // }
        },
        getChildrenNodelevel(node,resolve){
           
          var idsnames = this.idS
          var listdatas = this.datatree
          for(let index in listdatas) {
              listdatas[index].idsnames=idsnames[index];
              listdatas[index].checkbox = false
          };
           this.$http({
              url: this.$http.adornUrl(`/bim/model/listModel`),
              method: 'post',
              data:this.$http.adornData({
                "modelMajorId":node.data.modelMajorId,
                "modelMonomerId":node.data.id
              })
            }).then((data)=>{
                if(data.data.code==0){
                //    $(".el-checkbox").hide()
                    this.modelList=data.data.result;
                    var arr = this.modelList

                    for(var i in arr){
                      for(var j in listdatas){
                        if(arr[i].id == listdatas[j].id){
                            arr[i].idsnames =listdatas[j].idsnames
                            arr[i].checkbox =listdatas[j].checkbox
                        }
                      }
                    }
                    arr.forEach((item) =>{
                        item.name = item.modelName 
                    })
                    resolve(arr)
                    this.$nextTick(() => {
                        // $(".majorcheckbox .is-expanded .el-checkbox").hide()
                            // $(".el-tree-node__children .el-checkbox").each(function(){
                            //    $(this).hide()
                            // });
                    });

                }
            })       
        },
        getChildrenNodes(node,resolve){
            this.$http({
              url: this.$http.adornUrl(`/bim/modelType/listModelType`),
              method: 'post',
              data:this.$http.adornData({
                "modelId":node.data.id
              })
            }).then((data)=>{
                if(data.data.code==0){
                    if(data.data.result == null || data.data.result == ''){
                       resolve([])
                    }else{
                        this.modelList=data.data.result;
                        var arr = this.modelList
                        arr.forEach((item) =>{
                            item.modelName = item.name 
                            item.idsnames = node.data.idsnames
                            item.checkbox = false
                        })
                        resolve(arr)
                    }

                  
                }
            })         
        },
        getChildrenNode(node,resolve){
            this.$http({
              url: this.$http.adornUrl(`/bim/modelType/listModelType`),
              method: 'post',
              data:this.$http.adornData({
                "modelId":node.data.id
              })
            }).then((data)=>{
                if(data.data.code==0){
                    if(data.data.result == null || data.data.result == ''){
                       resolve([])
                    }else{
                        this.modelList=data.data.result;
                        var arr = this.modelList
                        arr.forEach((item) =>{
                            item.modelName = item.name 
                            item.idsnames = node.data.idsnames
                            item.checkbox = false
                        })
                        resolve(arr)


                    }

                  
                }
            })         
        },
        getChildrenNodefours(node,resolve){
            this.$http({
              url: this.$http.adornUrl(`/bim/modelType/listModelType`),
              method: 'post',
              data:this.$http.adornData({
                "modelId":node.data.modelId,
                "parentGlId":node.data.glId
              })
            }).then((data)=>{
                if(data.data.code==0){
                    if(data.data.result == null || data.data.result == ''){
                       resolve([])
                    }else{
                        this.modelList=data.data.result;
                        var arr = this.modelList
                        arr.forEach((item) =>{
                            item.modelName = item.name 
                            item.idsnames = node.data.idsnames
                            item.checkbox = false
                        })
                        resolve(arr)
                    }
                  
                }
            })     

        },
        loadNodefloorh(node, resolve) {
            if (node.level === 0) {
                var arrs = this.floorhtreedata
                arrs.forEach((item) =>{
                    item.name = item.modelName 
                })
                resolve(arrs)
            } else if (node.level === 1) {
                this.getChildrenNodelevelfloorh(node,resolve)
            }else  if (node.level === 2){
                this.getChildrenNodefloorh(node,resolve)
                
            }else  if (node.level === 3){
              resolve([])
                // this.getChildrenNodefloorh(node,resolve)
            }
            // else {
            //     this.getChildrenNodefloorhold(node,resolve)
            // }
        },
        getChildrenNodelevelfloorh(node,resolve){
          var idsnames = this.idS
          var listdatas = this.datatree
          for(let index in listdatas) {
              listdatas[index].idsnames=idsnames[index];
              listdatas[index].checkbox = false
          };
           this.$http({
              url: this.$http.adornUrl(`/bim/model/listModel`),
              method: 'post',
              data:this.$http.adornData({
                "modelMajorId":node.data.modelMajorId,
                "modelMonomerId":node.data.id
              })
            }).then((data)=>{
                if(data.data.code==0){
                    this.modelList=data.data.result;
                    var arr = this.modelList

                    for(var i in arr){
                      for(var j in listdatas){
                        if(arr[i].id == listdatas[j].id){
                            arr[i].idsnames =listdatas[j].idsnames
                            arr[i].checkbox =listdatas[j].checkbox
                        }
                      }
                    }
                    arr.forEach((item) =>{
                        item.name = item.modelName 
                    })
                    resolve(arr)
                    // this.$nextTick(() => {
                    //     $(".floorcheckbox .el-checkbox").hide()
                    // });
                  
                }
            })       
        },
     
        getChildrenNodefloorh(node,resolve){
            this.$http({
              url: this.$http.adornUrl(`/bim/modelTree/listModelTree`),
              method: 'post',
              data:this.$http.adornData({
                "modelId":node.data.id,
                // "parentGlId":node.data.glId
              })
            }).then((data)=>{
                if(data.data.code==0){
                    if(data.data.result == null || data.data.result == ''){
                       resolve([])
                    }else{
                        this.modelList=data.data.result;
                        var arr = this.modelList
                        arr.forEach((item) =>{
                            item.modelName = item.name 
                            item.idsnames = node.data.idsnames
                        })
                        resolve(arr)
                    }
                  
                }
            })         
        },
        getChildrenNodefloorhold(node,resolve){
            this.$http({
              url: this.$http.adornUrl(`/bim/modelTree/listModelTree`),
              method: 'post',
              data:this.$http.adornData({
                "modelId":node.data.modelId,
                "parentGlId":node.data.glId
              })
            }).then((data)=>{
                if(data.data.code==0){
                    if(data.data.result == null || data.data.result == ''){
                       resolve([])
                    }else{
                        this.modelList=data.data.result;
                        var arr = this.modelList
                        arr.forEach((item) =>{
                            item.modelName = item.name 
                            item.idsnames = node.data.idsnames
                        })
                        resolve(arr)
                    }
                  
                }
            })  

        },
        professional(){

            if(this.major == ''){
                this.$message({
                  message: '请先选择专业分组',
                  type: 'warning'
                });
            }else{
                if( this.professionalhidden == false ){
                    this.professionalhidden = true
                        this.floorhidden = false
                }else{
                    this.professionalhidden = false
                }
            }
        },
        floorhiddenclick(){
            if(this.major == ''){
                this.$message({
                  message: '请先选择专业分组',
                  type: 'warning'
                });
            }else{
                if( this.floorhidden == false ){
                    this.floorhidden = true
                    this.professionalhidden = false
                }else{
                    this.floorhidden = false
                }
            }

        }
        

    },
    
    updated() {
        
    }
  }


</script>

<style>


/* .el-tree-node__content .el-tree-node__content .el-checkbox__inner{
  display: block;
  border:1px solid red;
}

.el-tree{
  background: none;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{

  background: none;
}
.el-tree-node__content:hover{
   background: none;
} */
/* .el-tree-node__children .el-tree-node__children{border:1px solid red;} */
</style>

<style lang="scss" scoped>
.siderleft{
    img{
        z-index: 999;
        cursor: pointer;
        position:absolute;
    }
    .leftbtn{
        left:188px;
        top:200px;
    }
    .rightbtn{
        left:-20px;
        top:200px;
    }
}
.eltreelist{
    // margin:10px 0 0 0;
    border:1px solid #d2d2d2;
    background-color: rgba(255,255,255,0.5);
    h1{
        padding:0;
        font-size:14px;
        // text-align: center;
        background: #eeeeee;
        line-height: 35px;
        font-weight:normal;
        border-bottom:1px solid #d2d2d2;
        margin:0;
        i{
            float:left;
            margin:8px 5px 0 10px;
        }
        .is{
            margin:5px 5px 0 10px;
            color:#868686;
        }
    }
    .treesbox{
        // height:400px;
        padding:10px 0;
        overflow: auto;
    }
}
.eltreelistmajor{
    border-radius: 4px 4px 0 0;
    margin-top:20px;
    border-bottom:0;
}
.eltreelistfloor{
    border-radius:0 0 4px 4px;
}
  .selectmajor{
      position: absolute;
      z-index: 99999;
    //   width: 200px;
    //   margin:20px 0 0 20px;
  }
//   .selectmajor [class*=" el-icon-"], [class^=el-icon-]{
//         border:1px solid #3E8EF7;
//         height:40px;
//         line-height: 40px;
//         width:40px;
//         border-radius: 50%;
//         text-align: center;
//         margin:20px 20px 10px 0;
//         color:#3E8EF7;
//         cursor: pointer;
//   }
  .el-cardheight{
      width: 300px;
      overflow: auto;
      position: absolute;
     background-color: rgba(255,255,255,0.5);


      h2{
        padding:0 0 10px 0;
        margin:0;
        text-align: center;
        font-size:14px;
      }
  }

  #viewer {
    position: absolute;
    background: none;
    z-index: 99;
  }
  .clickbtn{
      list-style: none;
      padding:0;
      bottom:25px;
      z-index: 999;
      position: absolute;
      border:1px solid #cccccc;
      background-color: rgba(255,255,255,0.5);
      border-radius: 5px;
      li{
          float: left;
          width:90px;
          text-align: center;
          cursor: pointer;
          border-right:1px solid #d8d8d8;
          padding:5px 8px;
            img{
                display: block;
                width: 35px;
                height:35px;
                margin:0 auto;
            }
            i{
                font-style:normal;
                font-size:12px;
            }
            &:hover{
                background: #f4f4f4;
            }

      }
  }


  .clickbtn li:last-child{
        border:0
  }

 

</style>
<style lang="scss">
.hidecheckbox .el-tree-node__children .el-checkbox{
    display: none;
}
.hidecheckbox .el-tree-node__children .el-tree-node__children .el-checkbox{
    	display: inline-block;
}
.hidecheckbox .el-tree-node__children .el-tree-node__children .el-tree-node__expand-icon{
    	display: none;
}
.hideflcheckbox .el-tree-node__children .el-checkbox{
    display: none;
}
.hideflcheckbox .el-tree-node__children .el-tree-node__children .el-checkbox{
    	display: inline-block;
}
.hideflcheckbox .el-tree-node__children .el-tree-node__children .el-tree-node__expand-icon{
    	display: none;
}


</style>

