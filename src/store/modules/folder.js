export default {
  state: {
    viewFolder: {},
    parentFolder: {},
    expand: []
  },
  getters: {},
  mutations: {
    setViewFolder (state, folder) {
      state.viewFolder = folder
    },
    setParentFolder (state, folder) {
      state.parentFolder = folder
    },
    setExpand (state, folder) {
      state.expand.push(folder.id)
    },
    cleanExpand (state, folder) {
      state.expand = []
    }

  }

}
