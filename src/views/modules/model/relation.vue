<template>

<div>
    <div class="btns"><el-button @click="model">模型</el-button></div>
    <div id="viewer"  :style="{height:viewHeights,width:viewWidths}">

    </div>
</div>

</template>

<script>

import { Loading } from 'element-ui';

  export default {
    
    data () {
      return {
        viewHeights:'',
        viewWidths:'',
        cardHeights:'',
        list:[],
      
        idS: [],
       
        gid:"" , // 构件id

      }
    },
    watch:{
        viewWidths(a,b){
          // console.log(a)
        }
    },
    activated(){
        this.viewHeight()
        window.addEventListener('resize',this.viewHeight)
    },
    methods: {
        viewHeight(){
    　　　　 this.viewHeights = document.documentElement.clientHeight - 180 + 'px'
    　　　　 this.viewWidths = document.documentElement.clientWidth - 300 + 'px'
        },
        model(){
            this.$http({
              url: this.$http.adornUrl(`/bim/model/findBudgetModel`),
              method: 'post',
              data:this.$http.adornData({
                "id":'1113'
              })
            }).then((data)=>{
                if(data.data.code==0){
                    this.list = data.data.result
                    this.modelList = data.data.result
                    var modelListarr = this.modelList
                    modelListarr.forEach((item) =>{
                        item.modelUrl = 'http://222.184.237.179:8088/'+item.modelName+'/'+item.modelName + 'List.json'
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
                    // console.log(modelList)
                    // this.componenthide()
                    EngineInit('viewer', true, '../../../../config/cube.glb')
                    var modelLists = modelList
                    var num = 0
                    var t = 0
                    SetClickMode(2)

                    // 加载第一个模型
                    AddModel(modelLists[num], "testtag", true)
                    var _this = this
                    // 模型加载完成回调函数
                    OnLoadModelEnd = function (tag) {
                        _this.idS.push(tag)
                        num++
                        t++
                        if (num < modelLists.length) {
                        // 加载下一个模型
                            if(tag == 'testtag'){
                                AddModel(modelLists[num], 'testtag'+t , true)
                            }
                        } else {
                          // alert("模型加载完成");
                          // console.log(num)
                          _this.componenthide()

                        }
                    }
                    // 监听到当前的加载进度
                    OnLoadModelProcess = function (value) {
                        //  console.log(value);
                        // console.log('进度', value)
                    }
                    
                  
                }
            })
        },
        componenthide(){
            this.$http({
              url: this.$http.adornUrl(`/bim/modelTree/getBudgetModelTreeChildId`),
              method: 'post',
              data:this.$http.adornData({
                "id":'1113'
              })
            }).then((data)=>{
                var idsnames = this.idS
                var listdatas = data.data.result
                for(let index in listdatas) {
                    listdatas[index].idsnames=idsnames[index];
                };
                for (let i = 0; i < listdatas.length; i++) {
                        var arrstr = (listdatas[i].externalId).split(',');
                        var idsnames = '';
                        for (var j = 0; j < arrstr.length; j++) {
                          if(idsnames == ''){
                              idsnames = listdatas[i].idsnames+'_'+arrstr[j];
                          }else{
                              idsnames = idsnames+'#'+listdatas[i].idsnames+'_'+arrstr[j];
                          }
                    }
                    SetActorVisible(idsnames, false)
                    console.log(idsnames)
                 }

           


            })
        }
       

    }
  }


</script>



<style lang="scss" scoped>
 .btns{
   position: absolute;
   z-index: 10;
 }

  #viewer {
    position: absolute;
    border:1px solid red;
  }
  

</style>
