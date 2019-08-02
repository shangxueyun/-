<template>
  <div class="planningManagement" ref="planningManagement" v-loading="planningManagementLoading">
      <main class="contains">
          <div class="catalogue_left">
                <el-container>
                    <el-header height="44px">目录</el-header>
                    <el-main>
                        <ul ref="mainUL">
                            <li v-for="(item,key) in catalogueList" :key="key" :index="key" @click="switchCatalogue($event)">{{item}}</li>
                        </ul>
                    </el-main>
                </el-container>
          </div>
          <div class="catalogue_view">
                <el-container v-if="projectImgListBle" id="projectImgList" :style="{height:offHeigth}">
                    <div :style="imgStyle(imgList[imgINdex])" v-for="(item,key) in imgList[imgINdex]" :key="key">
                        <img @click="imgstype()" style="width: 100%;height:100%" :src="item.src" alt="">
                        <br>
                    </div>
                </el-container>
          </div>
      </main>
  </div>
</template>

<script>
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';
  export default {
    components: {

    },
    data () {
      return {
          imgList:[
              [{src:require("@/assets/img/table/cover1.png")}],
              [{src:require("@/assets/img/table/compilation_illustration.png")}],
              [{src:require("@/assets/img/table/project_planning1.png")}],
              [{src:require("@/assets/img/table/project_planning1-2.png")}],
              [{src:require("@/assets/img/table/project_planning2.png")}],
              [{src:require("@/assets/img/table/project_planning3.png")}],
              [{src:require("@/assets/img/table/project_planning4.png")}],
              [{src:require("@/assets/img/table/project_planning5.png")}],
              [{src:require("@/assets/img/table/project_planning6.png")}],
              [{src:require("@/assets/img/table/project_planning7.png")}],
              [{src:require("@/assets/img/table/project_planning7-2.png")}],
              [{src:require("@/assets/img/table/project_planning7-3.png")}],
              [{src:require("@/assets/img/table/project_planning8.png")}],
              [{src:require("@/assets/img/table/project_planning8-2.png")}],
          ],
          catalogueList:[
              "封面",
              "编制说明",
              "概况及管理目标-1",
              "概况及管理目标-2",
              "总进度计划",
              "现场管理人员配置方案",
              "分包选择方案",
              "物资采购方案",
              "施工机械配置方案",
              "办公设备配置方案-1",
              "办公设备配置方案-2",
              "办公设备配置方案-3",
              "实施方案编制-1",
              "实施方案编制-2",
            ],
          imgINdex:0,
          indexBle:0,
          projectImgListBle:false,
          planningManagementLoading:false,
          offHeigth:0,
          times:null,
      }
    },
    watch: {

    },
    created() {
        
    },
    computed: {

    },
    mounted() {
        this.offHeigth = this.$refs.planningManagement.parentElement.offsetHeight - 130+"px";
        this.projectImgListBle = true;
    },
    methods: {
        switchCatalogue(e){
            this.projectImgListBle = false;
            this.planningManagementLoading = true;
            let EleUL = this.$refs.mainUL.children;
            for(let i in EleUL)
            {
                if(Number(i).toString()!="NaN"){
                    EleUL[i].style.background = "transparent";
                    EleUL[i].style.color = "#666";
                }
            }
            let vm = this;
            this.times = window.setTimeout(()=>{
                vm.projectImgListBle = true;
                vm.imgINdex = Number(e.target.attributes.index.value);
                vm.planningManagementLoading = false;
                var ViewerDom = document.getElementById('projectImgList');
                var viewer = new Viewer(ViewerDom, {
                        navbar:false,
                        title:false,
                        toolbar:false,
                        rotatable:false,
                        scalable:false,
                        zoomable:false,
                        transition:true,
                        fullscreen:false,
                        keyboard:false,
                        backdrop:true,
                        loop:true,
                        loading:true,
                })
            },500);
            e.target.style.background = "#008CD6";
            e.target.style.color = "#f2f2f2";
        },
        imgstype(item){
          //初始化 viewerjs
          var ViewerDom = document.getElementById('projectImgList');
          var viewer = new Viewer(ViewerDom, {
                navbar:false,
                title:false,
                toolbar:false,
                rotatable:false,
                scalable:false,
                zoomable:false,
                transition:true,
                fullscreen:false,
                keyboard:false,
                backdrop:true,
                loop:true,
                loading:true,
                // url: 'data-original'
                // loop:false,
          })
      },
      imgStyle(item){
          let obj;
          if(item.length == 3)
          {
            return {
                width: '33.3%',
                height: '94%',
                padding: '20px',
                display: 'flex',
                'align-items': 'center',
                'margin-left':"4px",
            }
          }else if(item.length == 2){
            return {
                width: '50%',
                height: '94%',
                padding: '20px',
                display: 'flex',
                'align-items': 'center',
                'margin-left':"4px",
            }
          }else if(item.length == 1){
            return {
                width: '54rem',
                height: '32rem',
                padding: '20px',
                'margin-left':"4px",
            }
          }
      },
    },
  }
</script>

<style lang="scss" scoped>
.planningManagement{
    position: relative;
    width: 100%;
    .contains{
        width: 100%;
        padding: 2rem 0 0 0px;
        .catalogue_left{
            width: 14rem;
            height: 100%;
            position: absolute;
            height: 30rem;
            header{
                width: 100%;
                line-height: 44px;
                text-align: center;
                font-size: 18px;
                font-weight: 700;
            }
            main{
                width: 100%;
                text-align: center;
                font-size: 16px;
                padding: 0 20px;
                ul{
                    padding: 0;
                    li{
                        list-style: none;
                        font-size: 16px;
                        line-height: 36px;
                        cursor: pointer;
                        text-align: left;
                        padding-left: 8px;
                    }
                    li:first-child{
                        background:#008CD6;
                        color:#f2f2f2;
                    }
                }

            }
        }
        .catalogue_view{
            width: auto;
            height: 36rem;
            position: absolute;
            left: 218px;
            padding: 0 20px;
        }
    }
}
</style>

