<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="homeClick">
        <a class="site-navbar__brand-lg" href="javascript:;"><img src="~@/assets/img/logo.png" width="150px"></a>
        <a class="site-navbar__brand-mini" href="javascript:;"><img src="~@/assets/img/smllogo.png" width="50px"></a>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <el-menu
        class="site-navbar__menu"
        mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
      </el-menu>
                <!-- <li v-for="(item,key) in navData" :key="key" >
            <a href="javascript:;" @click="routingUpdate(item,$event)">{{item.name}}</a>
          </li> -->
      <!-- 一级导航 -->
      <div ref="div_ul_" class="div_ul" :style="{width:div_ul_offsetWidth}">
        <ul ref="UI_">
          <li v-for="(item,key) in navData" :key="key" >
            <a href="javascript:;" @click="routingUpdate(item,$event)">{{item.name}}</a>
          </li>
        </ul>
        <span v-if="moveBle" class="left_move"><i @click="moveOffsetWidth($refs.UI_,'right')" class="el-icon-arrow-left"></i></span>
        <span v-if="moveBle" class="right_move"><i @click="moveOffsetWidth($refs.UI_,'left')" class="el-icon-arrow-right"></i></span>
      </div>
      <!-- end -->
      <el-menu
        class="site-navbar__menu site-navbar__menu--right"
        mode="horizontal">
        <!-- <el-menu-item index="1" @click="$router.push({ name: 'theme' })">
          <template slot="title">
            <el-badge value="new">
              <icon-svg name="shezhi" class="el-icon-setting"></icon-svg>
            </el-badge>
          </template>
        </el-menu-item> -->
        <!-- <el-menu-item index="2">
          <el-badge value="hot">
            <a href="//www.renren.io/" target="_blank">官方社区</a>
          </el-badge>
        </el-menu-item> -->
        <!-- <el-submenu index="3">
          <template slot="title">Git源码</template>
          <el-menu-item index="2-1"><a href="//github.com/daxiongYang/renren-fast-vue" target="_blank">前端</a></el-menu-item>
          <el-menu-item index="2-2"><a href="//git.oschina.net/renrenio/renren-fast" target="_blank">后台</a></el-menu-item>
          <el-menu-item index="2-3"><a href="//git.oschina.net/renrenio/renren-generator" target="_blank">代码生成器</a></el-menu-item>
        </el-submenu> -->
        <el-menu-item class="site-navbar__avatar right_menu_head" index="3">
          <div class="board" @click="kanban"><a href="javascript:;"><i class="magnify"></i> 观摩看板 </a></div>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="~@/assets/img/user.png" :alt="userName">
              <span>{{ userName }}</span>
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import { clearLoginInfo } from '@/utils'
import { setTimeout, clearTimeout } from 'timers';
  export default {
    data () {
      return {
        updatePassowrdVisible: false,
        navData:[],
        div_ul_offsetWidth:(document.body.offsetWidth - 490)+"px",
        moveBle:false,
        num:0,
        offWith:0,
        timesOut:null,
      }
    },
    components: {
      UpdatePassword
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { 
          return this.$store.state.common.sidebarFold 
        
        },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    created () {
      this.navData = JSON.parse(sessionStorage.getItem('menuList') || '[]');
    },
    mounted () {
      let refB = sessionStorage.getItem('refB');
      if(refB)
      {
        let li = this.$refs.UI_.children[refB];
        this.ElementCelar(this.$refs.UI_.children);
        li.children[0].style.color = "#fff";
        li.children[0].style.borderBottom = "2px solid #fff";
      }
      if(this.$refs.UI_.offsetWidth - this.$refs.div_ul_.offsetWidth>0)
      {
        this.moveBle = true;
        this.offWith = (this.$refs.UI_.offsetWidth - this.$refs.div_ul_.offsetWidth)
      }
      let vm = this;
      
      document.body.onresize = (fn)=>{
        vm.div_ul_offsetWidth = (document.body.offsetWidth - 490)+"px";
        clearTimeout(vm.timesOut);
        vm.timesOut = setTimeout(function(){
          if(vm.$refs.UI_.offsetWidth - vm.$refs.div_ul_.offsetWidth>0)
          {
            vm.moveBle = true;
            vm.offWith = (vm.$refs.UI_.offsetWidth - vm.$refs.div_ul_.offsetWidth)
          }else{
            vm.moveBle = false;
            vm.$refs.UI_.style.transform=`translateX(0px)`;
          }
          //配合ehcars动态渲染
          vm.$store.commit('common/updateDocumentClientWidth', document.body.offsetWidth);
          vm.$store.commit('common/updateDocumentClientHeight', document.body.offsetHeight);
        },100);
      }
      let hrefS = window.location.href;
      if(hrefS.substring(hrefS.lastIndexOf("#")+1) == '/home' || hrefS.substring(hrefS.lastIndexOf("#")+1) == '/project-board')
      this.reTFunc();
    },
    methods: {
      // 修改密码
      kanban(){
        this.$router.push({  
        path:'/model-amplificationNew',   
         })
      },
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              sessionStorage.removeItem('refB');
              sessionStorage.removeItem('menNavData');
              this.$router.push({ name: 'login' })
            }
          })
        }).catch(() => {})
      },
      routingUpdate(item,e){
        let liEleF = e.target.parentElement.parentElement.children;
        this.ElementCelar(liEleF);
        for(let i in liEleF)
        {
          if(Number(i).toString()!="NaN"){
            if(liEleF[i]==e.target.parentElement)
            {
              sessionStorage.setItem("refB",i);
            }
          }
        }
        e.target.style.color = "#fff";
        e.target.style.borderBottom = "2px solid #fff";
        this.childrenBl(item.list);
        this.$router.push({path:this.ActiveUrl});
        this.$emit('routingResponse',item);
      },
      childrenBl(arr = []){
        if(arr)
        {
          if(arr[0].list)
          {
            this.childrenBl(arr[0].list);
          }else{
            this.ActiveUrl = arr[0].url.replace(/\//g,"-");
          }
        }
      },
      ElementCelar(liEleF){
        for(let i in liEleF)
        {
          if(Number(i).toString()!="NaN"){
            liEleF[i].style.background = "transparent";
            liEleF[i].children[0].style.color = "rgba(255, 255, 255, .7)";
            liEleF[i].children[0].style.borderBottom = "none";
          }
        }
      },
      moveOffsetWidth(ele,str){
        let eles = ele.children[this.num+1].offsetWidth,strs;
        if(ele.style.transform != "")
        strs = Number(ele.style.transform.substring(ele.style.transform.indexOf("(")+1,ele.style.transform.length-3));
        if(str == "left")
        {
          this.numm++;
          if(ele.style.transform == "")
          ele.style.transform=`translateX(${-eles}px)`;
          else
          {
            if(this.offWith + strs>0)
            ele.style.transform=`translateX(${strs-eles}px)`;
            else if(this.offWith + strs == 0)
            ele.style.transform=`translateX(${strs-eles}px)`;
          }
        }else{
          if(strs != 0&&strs != undefined)
          {
            this.numm--;
            ele.style.transform=`translateX(${strs+eles}px)`;
          }
        }
      },
      homeClick(){
        this.$router.push({path:"/project-board"});
        this.reTFunc();
        this.$emit('routingResponse',"show");
      },
      reTFunc(){
        let liEleF = this.$refs.UI_.children;
        this.ElementCelar(liEleF);
        liEleF[0].children[0].style.color = "#fff";
        liEleF[0].children[0].style.borderBottom = "2px solid #fff";
      },
    }
  }
</script>

<style scoped>
/* !important */
.board{
  float: left;
  margin-right: 1rem;
  color: #fff;
}
.board .magnify{
    display: block;
    width: 1rem !important;
    height: 1rem;
    background: url(~@/assets/img/magnify.png) no-repeat;
    background-size: 100%;
    float: left;
    margin: 12px 4px;
}
.right_menu_head .el-dropdown{
    width: auto;
    position: relative;
}
.site-navbar__avatar .el-dropdown-link > img {
    width: 20px;
    margin-right: 2px;
}
.site-navbar__avatar .el-dropdown-link > span {
  font-size: 14px;
  color: #fff;
}
.site-navbar__avatar .el-dropdown > span {
    display: block;
    width: auto;
}
.el-menu-item.is-active i {
    color: #ffff;
    width: 20px;
}
.el-menu-item i {
    color: #fff;
    width: 20px;
}
.site-navbar__header {
    background: #fff;
    height: 40px;
}
.site-navbar {
    top: 0px;
    height: 40px;
}
.site-navbar__brand {
    height: 32px;
    line-height: 36px;
}
.site-navbar__menu .el-menu-item{
    height: 40px;
    line-height: 40px;
    color: #f2f2f2;
}
.site-navbar__menu .el-menu-item:focus,.site-navbar__menu .el-menu-item:hover{
  background: transparent;
  color: #fff;
}
.site-navbar__menu .el-menu-item:hover,
.site-navbar__menu .el-menu-item:link,
.site-navbar__menu .el-menu-item:active,
.site-navbar__menu .el-menu-item:visited{
    color: #f2f2f2;
    background: transparent;
}
.site-navbar__body {
    background-color: #008CD6;
}
.site-navbar__menu--right {
    position: absolute;
    right: 0;
}
</style>
<style lang="scss" scoped>
.div_ul{
    position: absolute;
    left: 3.5rem;
    overflow: hidden;
    padding: 0 20px;
    ul{
      padding: 0;
      margin: 0;
      white-space: nowrap;
      position: relative;
      transition: transform .3s;
      float: left;
      z-index: 2;
      li{
        padding: 0 20px;
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 16px;
        font-weight: 500;
        color: transparent;
        position: relative;
        text-align: center;
        a{
          color: rgba(255, 255, 255, .7);
          padding-bottom: 6px;
          font-size: .9rem;
          text-decoration: none;
        }
        a:hover{
           cursor: pointer;
        }
      }
    }
    .left_move{
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      display: list-item;
      height: 40px;
      margin-left: 0px;
      background: #008CD6;
      list-style: none;
      z-index: 1111;
      i{
        position: absolute;
        top: 14px;
        left: 0;
        font-size: 16px;
        color: #fff;
      }
    }
    .left_move:hover{
      cursor: pointer;
    }
    .right_move{
      position: absolute;
      top: 0;
      right: 0;
      display: list-item;
      width: 20px;
      height: 40px;
      background: #008CD6;
      z-index: 1111;
      list-style: none;
      i{
        position: absolute;
        top: 14px;
        left: 0;
        font-size: 16px;
        color: #fff;
      }
    }
    .right_move:hover{
      cursor: pointer;
    }
}
.div_ul ul li:first-child{
  a{
    padding-bottom: 6px;
    border-bottom: 2px solid #fff;
    color: #fff;
  }
}
</style>


