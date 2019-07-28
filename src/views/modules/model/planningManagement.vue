<template>
  <div class="planningManagement" ref="planningManagement">
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
                <el-container :style="{height:offHeigth}">
                    <div  id="projectImgList" @click="imgstype()" style="width: 78%;height: 94%;background: #737373;padding: 20px;" v-for="(item,key) in imgList[imgINdex]" :key="key">
                        <img @click="imgstype()" style="width: 100%;height: 100%;" :src="item.src" alt="">
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
              [{src:require("@/assets/img/table/cover.png")}],
              [{src:require("@/assets/img/table/compilation_illustration.jpg")}],
              [{src:require("@/assets/img/table/project_planning1.jpg")}],
              [{src:require("@/assets/img/table/project_planning2.jpg")}],
              [{src:require("@/assets/img/table/project_planning3.jpg")}],
              [{src:require("@/assets/img/table/project_planning4.jpg")}],
              [{src:require("@/assets/img/table/project_planning5.jpg")}],
              [{src:require("@/assets/img/table/project_planning6.jpg")}],
              [{src:require("@/assets/img/table/project_planning7.jpg")}],
              [{src:require("@/assets/img/table/project_planning8.jpg")}],
          ],
          catalogueList:["封面","编制说明","项目策划(1)","项目策划(2)","项目策划(3)","项目策划(4)","项目策划(5)","项目策划(6)","项目策划(7)","项目策划(8)"],
          imgINdex:0,
          offHeigth:0,
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
    },
    methods: {
        switchCatalogue(e){
            let EleUL = this.$refs.mainUL.children;
            for(let i in EleUL)
            {
                if(Number(i).toString()!="NaN"){
                    EleUL[i].style.background = "transparent";
                    EleUL[i].style.color = "#666";
                }
            }
            e.target.style.background = "#008CD6";
            e.target.style.color = "#f2f2f2";
            this.imgINdex = Number(e.target.attributes.index.value)
        },
        imgstype(item){
          //初始化 viewerjs
          var ViewerDom = document.getElementById('projectImgList');
          var viewer = new Viewer(ViewerDom, {
                navbar:false,
                title:false,
                toolbar:false,	
                // url: 'data-original'
                // loop:false,
          })
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
        padding: 4rem 0 0 38px;
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
                    }
                    li:first-child{
                        background:#008CD6;
                        color:#f2f2f2;
                    }
                }

            }
        }
        .catalogue_view{
            width: 47rem;
            height: 12rem;
            position: absolute;
            left: 20rem;
            padding: 0 20px;
        }
    }
}
</style>

