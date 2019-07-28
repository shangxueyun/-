<template>
<div>
  
    <div class="boardrow">
          <el-row :gutter="20">
              <el-col :span="24" >
                        <div  class="headerclearfix">
                          <span class="cardtitle">项目简介</span>
                        </div>
                        <el-row :gutter="20">
                            <el-col :span="12" >
                                  <div class="boardbg brief">
                                      <p v-html="introduction">{{introduction}}</p>
                                  </div>
                            </el-col>     
                            <el-col :span="12" >
                              
                        
                                <el-carousel :interval="5000" arrow="always" class="carouselimg">
                  
                  <div id="projectImgList" class="projectImgList" >                
                      <el-carousel-item  v-for="item in projectImgList" :key="item.id">
                            <span v-if="item.type == '1'">
                                   <img class="imgsloop"   @click="imgstype(item)" :src="item.url" >
                            </span>
                            <span v-else>
                                <div class="imgsloop imgsloopvideo"  
                               :style="{'background': 'url('+item.url+') no-repeat center center'}"
                                  @click="videostype(item)">
                                    <i class="el-icon-thirdicon_video"></i>
                                  </div>
                              <!-- <img class="imgsloop" :src="item.url" @click="videostype(item)"> -->
                            </span>
                      </el-carousel-item>
                  </div>
                                </el-carousel>
                                
                            </el-col>  
                        </el-row>   
              </el-col>
             
          </el-row>
    </div>
    <div class="essential">
        <div  class="headerclearfix">
          <span class="cardtitle">项目基本信息</span>
        </div>
        <div class="boardbg">
          
            <el-row :gutter="20">
                <el-col :span="14">
                      <ul class="listboard">
                          <li><span>项目名称：</span>{{projectName}}</li>
                          <li><span>工程地点：</span>{{address}}</li>
                          <li><span>结构形式：</span>{{structuralStyle}}</li>
                          <li><span>业主单位：</span>{{ownerUnit}}</li>
                          <li><span>建设单位：</span>{{constructionUnit}}</li>
                          <li><span>监理单位：</span>{{supervisorUnit}}</li>
                          <li><span>施工单位：</span>{{constructionCompanies}}</li>
                          <li><span>设计单位：</span>{{designUnit}}</li>
                      </ul>
                </el-col>     
                <el-col :span="10">
                    <ul class="listboard">
                        <li><span class="seize">建筑面积：</span>{{floorage}}m²</li>
                        <li><span>工程造价：</span>{{engineeringCost}}元</li>
                        <li><span>规模性质：</span>{{scaleNature}}</li>
                        <li><span>投资类型：</span>{{investmentType}}</li>
                        <li><span>合同开工时间：</span>{{startTime}}</li>
                        <li><span>合同竣工时间：</span>{{endTime}}</li>
                        <li><span>实际开工时间：</span>{{actualStartTime}}</li>
                        <li><span>实际竣工时间：</span>{{actualEndTime}}</li>
                    </ul>
                </el-col>  
            </el-row>   
        </div>
    </div>
       <el-dialog title="视频播放"
       custom-class="dialogbox"
        :visible.sync="dialogPlay" 
    :modal-append-to-body="true"
    :append-to-body="true"
    :close-on-click-modal="false"
       width="40%" @close="closeDialog">

<video-player class="video-player vjs-custom-skin"
			ref="videoPlayer"
			:playsinline="true"
      @ended="onPlayerEnded($event)"
			:options="playerOptions"
		></video-player>

         <!-- <video :src="videoUrl" controls autoplay class="video" 
         :ref="dialogVideo" 
         :options="playerOptions"
         width="100%"></video> -->
      </el-dialog>
</div>
</template>

<script>
 import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';


  export default {
    data () {
      return {
        videoUrl:'',
        dialogVideo:'',
        dialogPlay:false,
        activeName: 'first',
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
        actualEndTime:'',
        introduction:'',
        projectImgList:[],
        playerOptions: {
          //playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "",
            src: "http://vjs.zencdn.net/v/oceans.mp4" //你的m3u8地址（必填）
          }],
          // poster: "poster.jpg", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
              timeDivider: true,
              durationDisplay: true,
              remainingTimeDisplay: false,
              fullscreenToggle: true //全屏按钮
          }
        }
      }
    },
    components: {
      videoPlayer
    },
    activated () {
      this.getDataList()
    },
    beforeDestroy:function(){
     
    },
    mounted() {
      
    },
    computed:{
        player () {
            return this.$refs.videoPlayer.player
        }
    },
    methods: {

      onPlayerEnded(player) {
        console.log("ended");
        console.log(player.currentTime());
      },
      closeDialog(){
        this.$refs.videoPlayer.player.pause();
      },
      videostype(rows){
          console.log('rows',rows)
          this.dialogPlay = true
          this.playerOptions.sources[0].type = 'video/mp4'
          this.playerOptions.sources[0].src = rows.videoUrl
        
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
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
              url: this.$http.adornUrl('/bim/project/findProject'),
              method: 'post',
              data: this.$http.adornData({
                'id': 1
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                if(data.result == null){
                  this.$message.success('暂无数据')
                }else{
                  this.projectName = data.result.projectName
                  this.address = data.result.address
                  this.structuralStyle = data.result.structuralStyle
                  this.ownerUnit = data.result.ownerUnit
                  this.constructionUnit = data.result.constructionUnit
                  this.supervisorUnit = data.result.supervisorUnit
                  this.constructionCompanies = data.result.constructionCompanies
                  this.designUnit = data.result.designUnit
                  this.floorage = data.result.floorage
                  this.engineeringCost = data.result.engineeringCost
                  this.scaleNature = data.result.scaleNature
                  this.investmentType = data.result.investmentType
                  this.startTime = data.result.startTime
                  this.endTime = data.result.endTime
                  this.actualStartTime = data.result.actualStartTime
                  this.actualEndTime = data.result.actualEndTime
                  this.introduction = data.result.introduction
                  this.projectImgList = data.result.projectFileList
                }
                
                
              } else {
                this.$message.error(data.msg)
              }
        })
        
      }
    },

    updated() {
      
          // var ViewerDom = document.getElementById('projectImgList');
          // var ViewerDom = $('.projectImgList');
          // var viewer = new Viewer(ViewerDom, {
          //       navbar:false,
          //       title:false,
          //       toolbar:false,	
          //       // url: 'data-original'
          //       // loop:false,
          // })
    }
  }
</script>
<style>

.dialogbox .el-dialog__body{
  padding:0;
}
.dialogbox .el-dialog__header{
  padding:17px 0 15px 15px;
}

.video-js .vjs-big-play-button{
    width: 50px;;
    height: 50px;
    line-height:50px;
    position:absolute;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    background: rgba(0, 0, 0, .7);
    border: none;
    border-radius: 50%;

}
.video-js .vjs-icon-placeholder {
    width: 100%;
    height: 100%;
    display: block;
}

video,button{
  outline:none;
}
.sssddd{
  display: none;
}
</style>


<style  lang="scss" >
.videostypeimg{
  
}
.imgsloop{
  width: 100%;
  height:100%;
  position: absolute;
}
.carouselimg{
  height:400px;
  .el-carousel__container{
    height:400px;
  }
}
.headerclearfix{
  line-height: 40px;
  border-bottom:1px solid #d1d1d1;
  margin-bottom:20px;  
}
  .cardtitle{
      color:#4d4d4d;
      font-weight:bold;
  }
  .listboard{
      list-style: none;
      padding:0 20px;
      margin:0;
      li{
        // display: inline-block;
        line-height: 2.5rem;
        // width: 33%;
        color:#4d4d4d;
        span{
           font-weight:bold;
        }
      }
  }
  .boardrow{
    margin:0 0 0 0;
  }
  .essential{
    margin:20px 0 0 0;
  }
  .headercardtit{
    padding:0;
    .el-card__header{
      padding:10px 0 5px 20px;
      border:0;

    }
    .el-card__body{
      padding:0;
    }
  }
  .brief{
      height:400px;
      overflow: auto;
      h1{
        padding:0;
        margin:0;
        font-size:14px;
      }
      p{
        line-height: 1.5rem;
        text-indent: 20px;
      }
  }
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .imgsloopvideo{
    cursor: pointer;
    i{
      font-size:100px;
      text-align:center;
      justify-content: center;
      align-items:center;
      position: absolute;
      width:100px;
      height:100px;
      color:#000000;
      top: calc(50% - 50px);
      left: calc(50% - 50px);
    }
    &:hover{
      i{
        color:#404040;
      }
    }
  }
</style>
