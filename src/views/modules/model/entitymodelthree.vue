<template>
    <div>
    <div id="viewer"></div>
    <div class="entitymodel" style="display:none;">
           <el-tooltip class="item" effect="dark" content="实体模型" placement="bottom">
            <i class="el-icon-picture-outline" @click="moxing"></i>
           </el-tooltip>
           <div class="treelist">
<el-tree
  :data="datamenu"
  show-checkbox
  node-key="id"
  @node-click="nodeclicks" 
  :props="defaultProps">
  
</el-tree>
<!-- default-expand-all -->
<el-tree
  :props="props"
  :load="loadNode1"
  node-key="id"
  highlight-current
  ref="tree"
  @check-change="nodeclicks"
  
  lazy
  show-checkbox>
</el-tree>
           </div>
    </div>
    <div class="modeldiv">
        <div id="panel" class="collapsed">
            <div id="content">
                <div class="eliconnew">
                    <el-tooltip class="item" effect="dark" content="保存图片" placement="bottom">
                        <i class="el-icon-picture-outline" v-on:click="saveImage()"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="选择视角" placement="bottom">
                        <i class="el-icon-news" v-on:click="selectView()"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="初始状态" placement="bottom">
                        <i class="el-icon-rank" v-on:click="initialization()"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="模型显示" placement="bottom">
                        <i class="el-icon-setting" v-on:click="modelSetup(1)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="模型隐藏" placement="bottom">
                        <i class="el-icon-rank" v-on:click="modelSetup(2)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="模型半透明" placement="bottom">
                        <i class="el-icon-phone-outline" v-on:click="modelSetup(3)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="模型半透明恢复" placement="bottom">
                        <i class="el-icon-service" v-on:click="modelSetup(4)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="构件显示" placement="bottom">
                        <i class="el-icon-edit" v-on:click="componentSetup(1)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="构件隐藏" placement="bottom">
                        <i class="el-icon-success" v-on:click="componentSetup(2)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="构件半透明" placement="bottom">
                        <i class="el-icon-tickets" v-on:click="componentSetup(3)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="构件半透明恢复" placement="bottom">
                        <i class="el-icon-tickets" v-on:click="componentSetup(4)"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="保存视点" placement="bottom">
                        <i class="el-icon-tickets" v-on:click="saveViewpoint()"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="恢复视点" placement="bottom">
                        <i class="el-icon-tickets" v-on:click="recoverViewpoint()"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="标签管理" placement="bottom">
                        <i class="el-icon-tickets" v-on:click="label()"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="线框模式/恢复" placement="bottom">
                        <i class="el-icon-tickets" v-on:click="wireFrame()"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="测量/恢复" placement="bottom">
                        <i class="el-icon-news" v-on:click="measure()"></i>
                    </el-tooltip>

                    <el-tooltip class="item" effect="dark" content="背景图/恢复" placement="bottom">
                        <i class="el-icon-tickets" v-on:click="backgroundImage()"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="漫游" placement="bottom">
                        <i class="el-icon-tickets" v-on:click="modelRoam()"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="框选/取消框选" placement="bottom">
                        <i class="el-icon-tickets" v-on:click="boxSelection()"></i>
                    </el-tooltip>
                    <br/>
                    <!-- 剖切<el-slider v-model="dissection_value" range :max="100" v-on:change="dissection()">
                    </el-slider>
                    <a class="link" target="viewer" v-on:click="measure()">测量/恢复</a>
                    爆炸<el-slider v-model="blast_value" :max="100" v-on:change="blast()"></el-slider> -->
                </div>
            </div>
        </div>

    </div>
    </div>
    
    
</template>

<script>
    
    export default {
        name: 'HelloWorld3',
        data () {
            return {
                dissection_value: [0, 100],
                dissection_from:0,
                dissection_to:100,
                blast_value:0,
                idS:[],
                sdzb:"",
                xk:0,
                pq:0,
                cl:0,
                bz:0,
                bjt:0,
                bq:0,
                jbxs : 0 ,
                kx:0,
                gid:"",  // 构件id
                // datamenu: [],
                // datastwo:[],
                // defaultProps: {
                //     children: 'children',
                //     label: 'label'
                // },

                props: {
                label: 'name',
                children: 'zones',
                isLeaf: 'leaf'
                },
                model_url:'',
                glid:'',
                externalId:'',
                modelDataId:''
            }
        },
        beforeRouteLeave(to, from, next) {
            this.$destroy()
            ClearScene();
            next();
        },
        activated () {
            /* eslint-disable */
            // 初始化画布 
            EngineInit("viewer" , true ,'./static/js/bim/cube.glb')
            // 模型数据
            var modelList = new Array("http://222.184.237.179:8088/hotel/hotelList.json");
            // var modelList = new Array("");
            console.log("333",modelList)

            var num = 0;
            
            SetClickMode(2);
            
            // 加载第一个模型
            AddModel(modelList[num], 'testtag1',true);
            
            var _this=this;
            // 模型加载完成回调函数
            OnLoadModelEnd =function(tag){
                _this.idS.push(tag);
                num ++;
                if(num < modelList.length ){
                    // 加载下一个模型
                    console.log(num)
                    AddModel(modelList[num], 'testtag1',true);
                }else{
                    // alert("模型加载完成");
                    // console.log(num)
                }
            }

            // 监听到当前的加载进度
            OnLoadModelProcess =function(value){
                //  console.log(value);
                console.log("进度",value)
            }
            //  坐标获取回调函数
            OnClickPosition = function(position){
                RemoveAnchor("label_test");
                if(_this.bq == 1){
                    AddAnchor(position,"static/label.png",10,10,"label_test",false);
                }
            }
            // 构件ID获取回调函数
            OnSelectionChanged = function(id){
                _this.gid = id 

                console.log("id",_this.gid)
                if(_this.kx == 1){
                    // 整体状态恢复 
                    ResetAllActor();
                    console.log(id);
                    SetActorColor(id, 0, 0, 255);
                }
            }
            
            // 测量结果监听
            OnMeasureResult = function(result) {
                console.log(result);
            }
            
            // 点击标签图标回调事件
            OnAnchorClick = function(tag){
                console.log(tag);
            }

            
        },methods: {
            // 保存图片
            saveImage:function (){
                SaveImage();
            },
            // 切换视角
            selectView:function (){
                // top:为顶视角 bottom:为底视角 front:为前视角 back:为后视角 left:为左视角 right:为右视角 
                SetViewPort("top");
            },
            // 恢复初始状态
            initialization:function (){
                ResetAllActor();
            },
            // 模型设置
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
                if(flag == 1){
                    console.log("flag",flag)
                    SetActorVisible(this.gid,true);
                }else if(flag == 2){
                    console.log("22222",this.gid)
                    SetActorVisible(this.gid,false);
                }else if(flag == 3){
                    SetActorAlpha(this.gid,0.4);
                }else if(flag == 4){
                    SetActorAlpha(this.gid,1);
                }
            },
            // 保存视点
            saveViewpoint:function(){
                this.sdzb = GetCamera();
                console.log(this.sdzb);
                console.log(GetImage());
            },
            // 恢复视点
            recoverViewpoint:function(){
                if(this.sdzb != ""){
                    SetCamera(this.sdzb);
                }
            },
            // 标签管理
            label:function(){
                console.log(this.bq)
                if(this.bq == 0){
                    this.bq = 1;
                    SetClickMode(3);
                }else{
                    RemoveAnchor("label_test");
                    this.bq = 0;
                    SetClickMode(0);
                }
            },
            // 线框模式
            wireFrame:function(){
                if(this.xk == 0){
                    for(var i = 0 ;i< this.idS.length ; i++){
                        SetModelWireFrame(this.idS[i]);
                    }
                    this.xk = 1;
                }else{
                    this.xk = 0;
                    for(var i = 0 ;i< this.idS.length ; i++){
                        SetModelNomal(this.idS[i]);
                    }
                }
            },
            
            // 剖切
            dissection:function(){
//              PlateClip(TYPE, VALUE)
//              TYPE：为裁剪的类型，类型分为'x-min'，'x-max'，'y-min'，'y-max'，'z-min'，'z-max'；
//              VALUE:为裁剪的程度，值为0.0-1.0
                // 重置爆炸参数
                this.blast_value = 0;
                // 恢复爆炸
                PopOut(0);
                if(this.dissection_value[0] != this.dissection_from){
                    console.log("--------------1111-------------");
                    console.log(this.dissection_value[0]);
                    console.log(this.dissection_from);
                    console.log(this.dissection_value[0] / 100);
                    PlateClip('x-min', this.dissection_value[0] / 100);
                    this.dissection_from = this.dissection_value[0];
                }
                if(this.dissection_value[1] != this.dissection_to){
                    console.log(this.dissection_value[1]);
                    console.log(this.dissection_to);
                    console.log((100 - this.dissection_value[1]) / 100);
                    PlateClip('x-max', (100 - this.dissection_value[1]) / 100);
                    this.dissection_to = this.dissection_value[1];
                }
            },
            // 测量
            measure:function(){
//              4:为距离测量模式,响应鼠标点击模型构件两点测距方法；
//              5:为角度测量模式,响应鼠标点击模型构件三点测量角度方法；
//              6:为平面面积测量模式,响应鼠标点击模型构件计算模型平面面积测量方法；
//              7:为表面积测量模式,响应鼠标点击模型构件计算模型表面积测量方法；
//              8:为体积测量模式,响应鼠标点击模型构件计算模型体积测量方法；
//              9:为重量测量模式,响应鼠标点击模型构件计算模型重量测量方法；目前引擎设置密度为固定值，参数可以修改
//                  重量测量密度设置
//                  SetThickness(密度值);
                
                if(this.cl == 0){
                    SetClickMode(4);
                    this.cl = 1;
                }else{
                    SetClickMode(0);
                    this.cl = 0;
                }
            },
            // 爆炸
            blast:function(){
                // 重置抛切相关参数
                this.dissection_value = [0,100];
                this.dissection_from = 0;
                this.dissection_to = 100;
                // 恢复抛切
//              ResetClip();
                PlateClip('x-min', 0);
                PlateClip('x-max', 0);
                // 爆炸
                PopOut(this.blast_value / 100);
            },
            // 背景图片设置
            backgroundImage:function(){
                if(this.bjt == 0){
                    SetBackGroundImg('static/111.jpg');
                    this.bjt = 1;
                }else{
                    RemoveBackGroundImg();
                    this.bjt = 0;
                }
            },
            // 局部显示
            localShow:function (){
                if(this.jbxs == 0){
                    var actArray = [];
                    actArray.push('1_35959');
                    ShowActors(actArray);
                    this.jbxs = 1;
                }else{
                    this.jbxs = 0;
                    ResetAllActor();
                }
                
            },
            // 漫游
            modelRoam:function (){
                var aniArray = [];
                // 坐标数据是通过 视点接口获取到的  GetCamera();
                aniArray.push('3089.37890625,-8059.361328125,-2139.7786865234375,0.4246275854639981,0,0.37909343485103836');
                aniArray.push('3089.37890625,-8059.361328125,-2139.7786865234375,0.23373441558659003,0,-0.18307819387050275');
                aniArray.push('3089.37890625,-8059.361328125,-2139.7786865234375,0.2074647133098825,0,-1.0412218015762822');
                aniArray.push('3089.37890625,-8059.361328125,-2139.7786865234375,0.22497784816102087,0,-1.8328154968477357');
                aniArray.push('3089.37890625,-8059.361328125,-2139.7786865234375,0.3423158516636478,0,-2.6576841483363527');
                aniArray.push('3089.37890625,-8059.361328125,-2139.7786865234375,0.37559080788081073,0,-3.8258102429072816');
                FlyAnimation(aniArray, 2000);
            },
            // 框选
            boxSelection:function (){
                if(this.kx == 0){
                    // 0 非透过模式 1 透过模式
                    StartRectCheck(1);
                    this.kx = 1;
                }else{
                    CloseRectCheck();
                    this.kx = 0;
                }
            },
            loadNode1(node, resolve) {
                  if (node.level === 0) {
                        this.$http({
                            url: this.$http.adornUrl('/bim/tree/getPropertyTypeItemList/9'),
                            // url: 'http://222.184.237.179:8090/JavaDemo/Tree/GetPropertyTypeItemList.do',
                            method: 'get',
                            params: this.$http.adornParams({
                                // 'MileageID': 6
                            })
                        }).then(({data}) => {
                            if (data && data.code === 0) {
                                var arr = data.result
                                for (var i = 0; i < arr.length; i++) {                   
                                    arr[i].label =  arr[i].model_name;     

                                    //  this.$refs.tree.setCheckedNodes(node)
                                     resolve([{ name: arr[i].model_name,model_url: arr[i].model_url}]); 
 
                                     this.$refs.tree.setCheckedNodes(data.result)


                                }

                            } else {
                                
                            }
                        })
                    }

                  if (node.level == 1) {
                      this.model_url = node.data.model_url
                      this.$http({
                            url: this.$http.adornUrl('/bim/tree/getPropertyTypeData/11'),
                            method: 'get',
                            params: this.$http.adornParams({
                                // 'MileageID': 6
                            })
                        }).then(({data}) => {
                            if (data && data.code === 0) {
                                //  this.$refs.tree.setCheckedNodes(data.result)
                                resolve(data.result)
                                this.$refs.tree.setCheckedNodes(data.result)
                            } else {
                                
                            }
                        })
                  }

                  if (node.level == 2) {

                    //   alert(2)
                      this.modelDataId = node.data.modelDataId
                      this.externalId = node.data.externalId
                      this.glid = node.data.glid
                      this.$http({
                            url: this.$http.adornUrl('/bim/tree/getPropertyTypeItemList'),
                            method: 'post',
                            data: this.$http.adornParams({
                                'mileageId': 11,
                                'pid': this.glid,
                                'filename': this.model_url
                            })
                        }).then(({data}) => {
                            if (data && data.code === 0) {
                                resolve(data.result)
                                // this.$refs.tree.setCheckedNodes(data.result)
                            } else {
                                
                            }
                        })
                  }
                  if (node.level == 3) {
                    resolve([]);
                  } 
            },
            moxing(){
                    this.$http({
                        url: this.$http.adornUrl('/bim/tree/getPropertyTypeItemList/6'),
                        // url: 'http://222.184.237.179:8090/JavaDemo/Tree/GetPropertyTypeItemList.do',
                        method: 'get',
                        params: this.$http.adornParams({
                            // 'MileageID': 6
                        })
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                            this.datamenu = data.result
                            var arr = this.datamenu
                            for (var i = 0; i < arr.length; i++) {                   
                                arr[i].label =  arr[i].model_name;                 
                            }
                        } else {
                           
                        }
                    })
            },
            nodeclicks(item , node ,self){
                // alert(1)
                console.log(node)
                if(node == true ){
                        this.$http({
                            url: this.$http.adornUrl('/bim/tree/getTypeChildId'),
                            method: 'get',
                            params: this.$http.adornParams({
                                'extid':this.modelDataId+'_'+this.externalId,
                                'glid':this.glid,
                                'filename':this.model_url
                            })
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                            var arrstr = (data.result).split(',');
                            for (var i = 0; i < arrstr.length; i++) {

                                SetActorVisible('testtag1' + "_" + arrstr[i], true);
                                console.log('testtag1'+"_" + arrstr[i])
                            }

                        } else {
                            
                        }
                    })
                }else{
                        this.$http({
                            url: this.$http.adornUrl('/bim/tree/getTypeChildId'),
                            method: 'get',
                            params: this.$http.adornParams({
                                'extid':this.modelDataId+'_'+this.externalId,
                                'glid':this.glid,
                                'filename':this.model_url
                            })
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                            var arrstr = (data.result).split(',');
                            for (var i = 0; i < arrstr.length; i++) {

                                SetActorVisible('testtag1' + "_" + arrstr[i], false);
                                console.log('testtag1'+"_" + arrstr[i])
                            }

                        } else {
                            
                        }
                    })
                }

                  
            }
        },
        
    }
    
    
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    html,body{
        height: 100%;
    }
    .modeldiv{
      /* position: relative; */
    }
    .eliconnew i{
      font-size:1.5rem;
      cursor: pointer;
      border:1px solid #000;
      padding: 5px;
      /* margin: 5px 0 5px 0 */
      
    }
    .eliconnew .item{margin: 10px 10px 0 0;}
     body {
        background-color: #ffffff;
        margin: 0px;
        height: 100%;
        color: #555;
        font-family: 'inconsolata';
        font-size: 15px;
        line-height: 18px;
        overflow: hidden;
    }

    #viewer {
        /* position: absolute; */
        /* border: 0px;
        left: 18px; 
        top: 0px;
        right:20px;
        bottom: -120px; */
        width: 100%;
        background: red;
        
        height: 100%; background: #BBE8F2; position: absolute; top: 0 ; left: 0 ; width: 100%;
        /* height: 650px; */
        /* top:0; */
        
    }

    #panel {
        
        position: absolute;
        right: 150px;
        width: 550px;
        margin: 0 auto;
        /* height: 100%; */
        z-index: 999;
        overflow: auto;
        /* background: #fafafa; */
        /* border:1px solid red; */
        /* filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5; */
    }
    .entitymodel{
        position: absolute;
        left: 20px;
        /* width: 550px; */
        /* height: 100%; */
        z-index: 999;

    }
    .treelist{
        position: absolute;
        left: -18px;
        width: 250px;
        height: 400px;
        overflow: auto;
        background: #ffffff;
        /* background:red; */
        z-index: 999;

    }
    .entitymodel i{

      font-size:1.5rem;
      cursor: pointer;
      border:1px solid #000;
      padding: 5px;
      border-radius: 50%;
    }

    #panel #content {
        padding: 0px 20px 20px 20px;
    }

    #panel #content .link {
        color: #2194CE;
        text-decoration: none;
        cursor: pointer;
        display: block;
    }

    #panel #content .selected {
        color: #ff0000;
    }

    #panel #content .link:hover {
        text-decoration: underline;
    }


    #button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 8px;
        color: #fff;
        background-color: #555;
        opacity: 0.7;
    }

    #button:hover {
        cursor: pointer;
        opacity: 1;
    }

    #modelname {
        width: 95%;
        padding: 5px;
        font-family: inherit;
        font-size: 15px;
        outline: none;
        border: 1px solid #dedede;
    }

    #modelname:focus{
        border: 1px solid #2194CE;
    }


    #panel li b {
        font-weight: bold;
    }

    @media all and ( max-width: 840px ) {
        
        #panel{
            position: absolute;
            left: 0;
            top: 0;
            height: 480px;
            width: 100%;
            right: 0;
            z-index: 10000;
            overflow: hidden;
            border-bottom: 1px solid #dedede;
        }
        #content{
            position: absolute;
            left: 0;
            top: 90px;
            right: 0;
            bottom: 0;
            font-size: 17px;
            line-height: 22px;
            overflow: auto;
        }
        

        #panel.collapsed{
            height: 56px;
        }
    }
</style>
