export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    groupIng:[],
    groupName:"",
    tabList:[],//关联清单数据
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    getTabList(state,list){
      state.tabList=list;

    },
    getGroupList(state,list){
      state.groupIng=list;
    },
    getGroupName(state,id){

    },
    updateName (state, name) {
      state.name = name
    }
  },
  getters:{
    groupingName(state,id){
      let arr=state.groupIng.filter((item)=>{
        return item.id==id
      })
      return arr[0]&&arr[0].name;
    }
  },
  actions:{
    getExcelDetailDataFun(id){
      return new Promise((resolve,reject)=>{
        this.$http({
          url: this.$http.adornUrl(`/bim/budget/queryById?id=${id}`),
          method:"post",
          // data:this.$http.adornParams({'id':id})
        }).then((data)=>{
          if(data.data.code==0){
            commit('getTabList',data.data.result)
            resolve(data.data.result)

          }
        }).catch((err)=>{
          reject(err)
        })
      })
    },
    getGroupData({commit}){
      return new Promise((resolve,reject)=>{
        this.$http({
          url: this.$http.adornUrl('/sys/sysdict/listSysdict'),
          method: 'post',
          data: this.$http.adornParams({'type': 2,})
        }).then((data)=>{
          if(data.data.code==0){
            resolve(data.data.result)
             commit('getGroupList',data.data.result)
          }
        }).catch((err)={

        })
      })
    }
  }
}
