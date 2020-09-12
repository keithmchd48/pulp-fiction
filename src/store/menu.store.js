const state = {
  menuActive: false
}

const getters = {}
const actions = {
  SET_MENU_ACTIVE_ACTION ({commit}, bool) {
    commit('SET_MENU_ACTIVE_MUTATION', bool)
  }
}
const mutations = {
  SET_MENU_ACTIVE_MUTATION (state, payload) {
    state.menuActive = payload
  }
}

export const storeMenu = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
