<template>

                    <transition  enter-active-class="animated bounceIn" leave-active-class="animated bounceOutRight">
    <div class="gliddialog" v-show="gliddialoghide">
        <h2>基本属性<i class="el-icon-close closebtn" @click="closebtn"></i></h2>
          <el-tabs v-model="activeName" @tab-click="handleClick" class="activeNametab">
                <el-tab-pane label="属性" name="first">
                    <ul class="gliddialogover" :style="{height:gliddiaheight}">
                      <li  v-for="(item ,i ) in options">
                          <div class="title">{{i}}</div>
                          <div v-for="list in item" class="glidcon">
                            {{list.propertyName}}:{{list.value}}
                          </div>
                      </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="类型" name="second">
                  
                    <ul class="gliddialogover" :style="{height:gliddiaheight}">
                      <li  v-for="(item ,i ) in options">
                          <div class="title">{{i}}</div>
                          <div v-for="list in item" class="glidcon">
                            {{list.propertyName}}:{{list.value}}
                          </div>
                      </li>
                    </ul>
                </el-tab-pane>
          </el-tabs>
    </div>
                    </transition>
</template>

<script>
  export default {
    data () {
      return {
        gliddialoghide:true,
        visible: false,
        options:[],
        activeName: 'first',
        modelglld:'',
        modelid:'',
        glld:'',
        properties:'properties',
        type:'type',
        gliddiaheight:''
      }
    },

    mounted() {
      // this.firstactive()
        this.viewHeights()
    },
    methods: {
        viewHeights(){
    　　　　 this.gliddiaheight = document.documentElement.clientHeight - 350 + 'px'
        },
      init (id) {
        this.gliddialoghide = true
        this.activeName = 'first'
        this.visible = true
        this.modelglld = id
        this.modelid = id.split("_")[0];
        this.glld = id.split("_")[1];
        this.firstactive(this.modelid,this.glld,this.properties)
      },
      firstactive(modelid,glld,properties){
          this.$http({
            url: this.$http.adornUrl(`/bim/modelProperty/getModelPropertyDetails`),
            method: 'post',
            data:this.$http.adornData({
              "modelId":modelid,
              "externalId":glld,
              "propertyTypeName":properties
            })
          }).then((data)=>{
                var listdatas = data.data.result
                var result = {};
                for (let i = 0; i < listdatas.length; i++) {
                    var info = listdatas[i];
                    var proertyTypeName =listdatas[i].propertySetName;
                    if(result.hasOwnProperty(proertyTypeName)){
                        result[proertyTypeName].push(info);
                    }else{
                        var proertyTypeName_arr = [];
                        proertyTypeName_arr.push(info);
                        result[proertyTypeName] =proertyTypeName_arr;
                    }
                }
                this.options = result
          })

      },


      handleClick(tab, event) {
        console.log(this.activeName);
          if(this.activeName == 'second'){
          this.firstactive(this.modelid,this.glld,this.type)
          }else{
          this.firstactive(this.modelid,this.glld,this.properties)
          }
      },
      closebtn(){
          this.gliddialoghide = false
          ResetAllActor();
      }
  



    }
  }
</script>
<style lang="scss" scoped>
.gliddialog{
  position: absolute;
  z-index: 999999;
  right:20px;
  bottom:20px;
  width: 280px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background-color: rgba(255,255,255,0.5);
  h2{
      border:1px solid #d2d2d2;
      border-radius: 3px 3px 0 0;
      font-weight:normal;
      background:#eeeeee;
  }
  .gliddialogover{
    overflow:auto;
    padding:10px;
    margin:0;
    li{
      border-bottom:1px solid #d2d2d2;
      padding: 0 5px;
      margin-bottom:20px;
    }
    .title{
      font-weight: bold;
      padding:0 0 8px 0;
    }
    .glidcon{
      line-height:30px;
      padding:0 0 0 15px;
      color:#666666;
    }
  }
  h2{
      padding:0;
      font-size:14px;
      text-align: left;
      text-indent: 20px;
      line-height: 35px;
      margin:0;
  }
}
.closebtn{
  float:right;
  cursor: pointer;
  margin:10px 10px 0 0;
}

</style>
<style>
.activeNametab .el-tabs__item{
    /* padding: 0 20px;
    border:1px solid red; */
    text-align: center;
    width:100px;
}
</style>


