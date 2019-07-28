<template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="menuActiveName || 'home'"
        :collapse="sidebarFold"
        :collapseTransition="false"
        background-color="#fff"
        text-color="#333"
        active-text-color="#369FDD"
        :default-openeds="menuList"
        menu-trigger="click"
        :unique-opened="true"
        class="site-sidebar__menu">
        <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes"
          class="mousemove_li"
          @mouseout.native="mouseover($event)"
          @mousemove.native="mousemove(menu,$event)">
        </sub-menu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
  import SubMenu from './main-sidebar-sub-menu'
  import { isURL } from '@/utils/validate'
  export default {
    data () {
      return {
        dynamicMenuRoutes: [],
        menuListS:this.menuListData
      }
    },
    props: {
      menuListData: {
        type: Array,
        required: true
      },
    },
    components: {
      SubMenu
    },
    computed: {
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold }
      },
      menuList: {
        get () { return this.$store.state.common.menuList },
        set (val) { this.$store.commit('common/updateMenuList', val) }
      },
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      }
    },
    watch: {
      $route: 'routeHandle',
      menuListData(val){
        this.menuList = val
      }
    },
    created () {
      //后期修改
      this.menuList = this.menuListS
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]');
      this.routerHref();
      this.routeHandle(this.$route)
    },
    methods: {
      // 路由操作
      routeHandle (route) {
        if (route.meta.isTab) {
          // tab选中, 不存在先添加
          var tab = this.mainTabs.filter(item => item.name === route.name)[0]
          if (!tab) {
            if (route.meta.isDynamic) {
              route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
              if (!route) {
                return console.error('未能找到可用标签页!')
              }
            }
            tab = {
              menuId: route.meta.menuId || route.name,
              name: route.name,
              title: route.meta.title,
              type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
              iframeUrl: route.meta.iframeUrl || '',
              params: route.params,
              query: route.query
            }
            this.mainTabs = this.mainTabs.concat(tab)
          }
          this.menuActiveName = tab.menuId + ''
          this.mainTabsActiveName = tab.name
        }
      },
      routerHref(){
        let href = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
        if(href == "")
        this.$router.push({path:this.menuList[0].url.replace(/\//g,"-")});
        else if(href == "home")
        this.$router.push({path:this.menuList[0].url.replace(/\//g,"-")});
        else{
          if(href.indexOf("-")>=0)
          this.$router.push({path:href});
        }
      },
      mousemove(menu,e){
        if(this.sidebarFold)
        {
          let li;
          if(e.target.localName == "li")
          {
            li = e.target;
          }else{
            if(e.target.localName == "use")
            li = e.target.parentElement.parentElement;
            if(e.target.localName == "svg")
            li = e.target.parentElement;
          }
          if(li.childElementCount!=4)
          {
            let span = document.createElement("span");span.className = "item_span";
            let i = document.createElement("i");i.className = "item_i";
            span.innerText = menu.name;
            li.append(span,i);
            span.style.right = -span.offsetWidth+'px';
          }            
        }
      },
      mouseover(e){
        if(this.sidebarFold)
        {
          let li;
          if(e.target.localName == "li")
          {
            li = e.target;
          }else{
            if(e.target.localName == "use")
            li = e.target.parentElement.parentElement;
            if(e.target.localName == "svg")
            li = e.target.parentElement;
          }
          if(li.childElementCount==4)
          {
            li.children[2].remove();
            li.children[2].remove();
          }
        }
      },
    }
  }
</script>

<style scoped>
.site-sidebar {
    top: 40px;
    background: #fff;
}
.site-sidebar--dark .site-sidebar__menu.el-menu,.site-sidebar--dark .site-sidebar__menu.el-menu .el-submenu.is-opened{
    background-color: #fff;
}
.mousemove_li{
  position: relative;
}
</style>
<style>
.site-sidebar .el-menu--collapse>.el-menu-item span{
    overflow: hidden;
    visibility: inherit;
}
.site-sidebar .el-menu--collapse>.el-menu-item .item_span{
    position: absolute;
    width: auto;
    top: 12px;
    padding: 0 10px;
    height: 2rem;
    display: block;
    background: #333;
    line-height: 2rem;
    color: #fff;
    font-size: 10px;
    text-align: right;
    border-radius: 4px;
}
.site-sidebar .el-menu--collapse>.el-menu-item .item_i{
    position: absolute;
    right: 0px;
    top: 22px;
    border-top: 6px solid transparent;
    border-left: 10px solid transparent;
    border-right: 8px solid #333;
    border-bottom: 6px solid transparent;
}
</style>
