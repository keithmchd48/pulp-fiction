const state = {
  apiKey: '5dae77f03d0a12ab0aef062edacf9398',
  apiUrl: 'https://api.themoviedb.org/3/',
  apiRequest: {
    option1: '',
    option2: ''
  },
  imagePath: 'https://image.tmdb.org/t/p/w1280'
}
//sort_by=popularity.desc&api_key=5dae77f03d0a12ab0aef062edacf9398&page=1
const getters = {
  getApiUrl (state) {
    return `${state.apiUrl}${state.apiRequest.option1}&api_key=${state.apiKey}&${state.apiRequest.option2}`
  }
}
const actions = {
  SET_API_REQUEST_ACTION ({commit}, req) {
    commit('SET_API_REQUEST_MUTATION', req)
  }
}
const mutations = {
  SET_API_REQUEST_MUTATION (state, payload) {
    state.apiRequest = payload
  }
}

export const storeMovies = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
