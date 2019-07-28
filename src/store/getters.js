const getters = {
  groupingName: (state) =>{
    let arr=state.user.groupIng.filter((item)=>{
      return item.id==id
    })
   return arr[0]&&arr[0].name;
  }

}
export default getters
