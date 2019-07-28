<template>
  <div class="equipmentMonitoring" >
    <main class="equipmentMonitoring_contains" ref="equipmentMonitoring_contains">
      <div v-show="equipmentMain == 1">
        <div class="select_div">
          <el-select v-model="equipmentVlaue" @change="equipmentVlaueChange" placeholder="IOT设备">
            <el-option
              v-for="item in equipment_select"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div v-for="(item,key) in dataList" :key="key" >
          <div  :v-if="tower_craneF(item.type)" :style="item.random" @mouseenter="enter($event)" @mouseleave="leave($event)" :class="typeClass(item.type)" @click="equipmentMainFuc(item.type,item)"><i></i>
            <div class="prompt_text" style="display:none">
              <el-header height="20px">{{item.id+"#"+NameType(item.type)}}</el-header>
              <el-main style="padding:4px;">
                设备编号：{{item.equipmentCode}}
                <br>
                设备状态：{{statusF(item.status)}}
              </el-main>
            </div>
          </div>        
        </div>        
      </div>
      <!-- 塔机 -->
      <div v-if="equipmentMain == 2" style="height: 100%;
    position: absolute;
    left: 0;
    width: 100%;">
        <tower :nameObj="nameObj"  @tower="tower"></tower>
      </div>
      <!-- 临边防护 -->
      <div v-if="equipmentMain == 3" style="width: 100%;
    height: 100%;
    margin: 0px auto;
    position: absolute;
    left: 0px;
    top: 0px;">
      <span style="    display: block;
    width: 22px;
    height: 22px;
    position: absolute;
    right: 14px;
    top: 18px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    line-height: 22px;
    z-index: 1111;
    background: #fff;
    border-radius: 12px;" @click="equipmentMain = 1">X</span>
        <over-guard :nameObj="nameObj"  @overGuard="overGuard"></over-guard>
      </div>
      <!-- 视频监控 -->
      <div v-if="equipmentMain == 4" style="width: 100%;
    height: 100%;
    position: absolute;
    background: #fff;">
        <span style="    display: block;
    width: 1rem;
    height: 1rem;
    position: absolute;
    right: 8px;
    top: -10px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    line-height: 1rem;" @click="equipmentMain = 1">X</span>
        <video-box></video-box>
      </div>
      <!-- 悬挑钢平台 -->
      <div v-if="equipmentMain == 5" style="width: 100%;
    height: 100%;
    margin: 0px auto;
    position: absolute;">
        <cantilevered-steel :nameObj="nameObj" @cantileveredSteel="cantileveredSteel"></cantilevered-steel>
      </div>
    </main>
  </div>
</template>

<script>
    import tower from "./tower";
    import videoBox from "./videoBox";overGuard
    import cantileveredSteel from "./cantileveredSteel";
    import overGuard from "./overGuard";
    export default {
       data(){
          return {
            equipment_select:[
              {id:0,name:'所有设备'},
              {id:2,name:'塔机'},
              {id:3,name:'悬挑钢平台'},
              {id:4,name:'视频监控'},
              {id:5,name:'临边防护'},
            ],
            dataList:[],
            equipmentVlaue:'',
            nameObj:{},
            tower_crane:true,
            video_surveillance:true,
            Over_guard:true,
            Cantilevered_steel_platform:true,
            equipmentMain:1,
            equipmentloading:false,
            OfH:0,
            OfW:0,
          }
       },
      components: {
        tower,
        videoBox,
        cantileveredSteel,
        overGuard
      },
      watch: {
        equipmentMain(val){
          if(val == 2 || val == 3)
          {
            this.$refs.equipmentMonitoring_contains.style.width = "100%";
            this.$refs.equipmentMonitoring_contains.style.height = "100%";
          }else if(val == 1)
          {
            this.$refs.equipmentMonitoring_contains.style.width = "100%"
            this.$refs.equipmentMonitoring_contains.style.height = this.OfH;
          }else if(val == 5)
          {
            this.$refs.equipmentMonitoring_contains.style.width = "100%";
            this.$refs.equipmentMonitoring_contains.style.height = (this.$store.state.common.documentClientHeight-80)+"px";
          }
        }
      },
      created() {
        this.getDataList();
      },
      computed: {
      },
      beforeRouteLeave(to, from, next) {
        this.$destroy();
        next();
      },
      mounted() {
        this.OfW = this.$refs.equipmentMonitoring_contains.style.width;
        this.OfH = this.$refs.equipmentMonitoring_contains.style.height;
      },
       methods:{
         equipmentVlaueChange(val){
          this.equipmentloading = true;
          this.video_surveillance = false;
          this.Over_guard = false;
          this.Cantilevered_steel_platform = false;
          this.tower_crane = false;
           switch (val) {
             case 0:
                this.tower_crane = true;
                this.video_surveillance = true;
                this.Over_guard = true;
                this.Cantilevered_steel_platform = true;
                this.unifyAjax(val);
               break;
            case 1:
                this.tower_crane = true;
                this.unifyAjax(val);
                break;
            case 3:
                this.Cantilevered_steel_platform = true;
                this.unifyAjax(val);
                break;
            case 4:
                this.video_surveillance = true;
                this.unifyAjax(val);
                break;
            case 5:
                this.Over_guard = true;
                this.unifyAjax(val);
                break;
           }
         },
         getDataList(){
            this.equipmentloading = true;
            this.equipmentVlaue = "";
            this.$http({
              url: this.$http.partyUrl('/equipment/equipment/groupByType'),
              method: 'get',
              data: this.$http.adornData({})
            }).then(({data}) => {
              this.equipmentloading = false;
              if (data && data.code === 0) {
                let type = data.result,objD = [{id:0,name:"所有设备"}];
                type.unshift("0");
                type.forEach((v,i)=>{
                  if(v == "1")
                  objD.push({id:Number(v),name:'塔机'})
                  else if(v == "3")
                  objD.push({id:Number(v),name:'悬挑钢平台'})
                  else if(v == "4")
                  objD.push({id:Number(v),name:'视频监控'})
                  else if(v == "5")
                  objD.push({id:Number(v),name:'临边防护'})
                });
                this.equipment_select = objD;
                this.equipmentVlaue = 0;
                this.unifyAjax(0);
              }else
              this.$message.error(data.msg);
            }); 
         },
        random(){
            return {top:(1020 - (Math.floor(Math.random()*962)))+"px",left:(1500 - (Math.floor(Math.random()*1274)))+"px"}
        },
        enter(e){
            e.target.children[1].style.display = "block"
        },
        leave(e){
           e.target.children[1].style.display = "none"
        },
        //样式
        typeClass(type){
          if(type == "1")
          return "tower_crane one location"
          else if(type == "3")
          return "Cantilevered_steel_platform six location"
          else if(type == "4")
          return "video_surveillance three location"
          else if(type == "5")
          return "Over_guard five location"
        },
        //子组件调整type
        equipmentMainFuc(type,item){
          if(type == "1")
          {
            this.nameObj = {name:item.equipmentCode,status:this.statusF(item.status),no:item.id}
            this.equipmentMain = 2
          }
          else if(type == "3")
          {
            this.nameObj = {name:item.equipmentCode}
            this.equipmentMain = 3
          }
          else if(type == "4")
          this.equipmentMain = 4
          else if(type == "5")
          {
            this.nameObj = {name:item.equipmentCode,status:this.statusF(item.status)}
            this.equipmentMain = 5
          }
        },
        NameType(type){
          if(type == "1")
          return "塔机"
          else if(type == "3")
          return "悬挑钢平台"
          else if(type == "4")
          return "视频监控"
          else if(type == "5")
          return "临边防护"
        },
        tower_craneF(type){          
          if(type == "1")
          return this.tower_crane;
          else if(type == "3")
          return this.Cantilevered_steel_platform;
          else if(type == "4")
          return this.video_surveillance;
          else if(type == "5")
          return this.Over_guard;
        },
        statusF(type){
          if(type == "1")
          return "离线"
          else if(type == "2")
          return "正常"
          else if(type == "3")
          return "报警"
          else if(type == "4")
          return "故障"
          else if(type == "5")
          return "违章"
          else if(type == "6")
          return "非正常断电"
        },
        unifyAjax(type){
          this.equipmentloading = true;
          this.$http({
            url: this.$http.partyUrl('/equipment/equipment/list/'+type),
            method: 'post',
          }).then(({data}) => {
            this.equipmentloading = false;
            if (data && data.code === 0) {
              let vm = this;
              data.result.forEach((v,i)=>{
                v.random = vm.random();
              });
              this.dataList = data.result;
            }else
            this.$message.error(data.msg);
          }); 
        },
        cantileveredSteel(){
          this.equipmentMain = 1;
        },
        overGuard(){
          this.equipmentMain = 1;
        },
        tower(){
          this.equipmentMain = 1;
        },
       }
    }
</script>

<style lang="scss" scoped>
  .equipmentMonitoring{
    width: 100%;
    max-height: 100%;
  }
  .equipmentMonitoring{
    width: 100%;
    height: 100%;
    .equipmentMonitoring_contains{
      width: 100%;
      height: 1120px;
      background: url(~@/assets/img/equipment.jpg) no-repeat;
      background-size: 100% 100%;
      position: relative;
      .select_div{
        position: absolute;
        top: 1rem;
        left: 1rem;
        width: 12rem;
      }
      .location{
        width: 4rem;
        height: 5rem;
        position: absolute;
        background: url(~@/assets/img/location.png) no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        i{
          display: block;
          width: 70%;
          height: 63%;
          margin: 0 auto;
          margin-top: 8px;
        }
        .prompt_text{
          display: none;
          width: 144px;
          margin-left: 52px;
          header{
            height: 20px;
            text-align: center;
            background: rgba(0, 153, 102, 1);
            color: #f2f2f2;
            font-size: 12px;
            line-height: 20px;
          }
          main{
            background: rgba(0, 153, 102, 0.6);
            font-size: 10px;
            color: #f2f2f2;
          }
        }
      }
      .location:hover{
        cursor: pointer;
      }
      .tower_crane{
        i{
          background: url(~@/assets/img/tower_crane.png) no-repeat;
          background-size: 100%;
        }
      }
      .video_surveillance{
        i{
          background: url(~@/assets/img/video_surveillance.png) no-repeat;
          background-size: 100%;
        }
      }
      .Over_guard{
        i{
          background: url(~@/assets/img/Over_guard.png) no-repeat;
          background-size: 100%;
        }
      }
      .Cantilevered_steel_platform{
        i{
          background: url(~@/assets/img/Cantilevered_steel_platform.png) no-repeat;
          background-size: 100%;
        }
      }
      .tower_crane:hover .tower_crane>div{
        display: block;
      }
      .tower_crane:hover #tower_crane2{
        display: block;
      }
      .video_surveillance:hover #video_surveillance1{
        display: block;
      }
      .Cantilevered_steel_platform:hover #Cantilevered_steel_platform1{
        display: block;
      }
      .Over_guard:hover #Over_guard1{
        display: block;
      }
      .Over_guard:hover #Over_guard2{
        display: block;
      }
      .one{
        left: 352px;
        top: 176px;
      }
      .two{
        left: 1230px;
        top: 518px;
      }
      .three{
        left: 428px;
        top: 330px;
      }
      .four{
        left: 1406px;
        top: 326px;
      }
      .five{
        left: 1006px;
        top: 230px;
      }
      .six{
        left: 760px;
        top: 220px;
      }
    }
  }
</style>
