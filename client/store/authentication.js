import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  jwt: ''
})

export const mutations = {
  setToken (state, token) {
    Vue.set(state, 'jwt', token)
  },
  clearToken (state) {
    Vue.set(state, 'jwt', '')
  }
}

export const getters = {
  token (state) {
    return state.jwt
  },
  isLoggedIn (state) {
    return state.jwt.length > 0
  }
}

export const actions = {
  async login ({ commit }, { username, password }) {
    try {
      const response = await axios.post(process.env.apiURI + '/account/login', {
        username,
        password
      })
      commit('setToken', response.data.token)
      return null
    } catch (error) {
      return error
    }
  },
  async logout ({ getters, commit }) {
    try {
      await axios.post(process.env.apiURI + '/account/logout', {
        token: getters.token
      })
    } catch (error) { }
    commit('clearToken')
  },
  async register ({ commit }, { email, username, password }) {
    try {
      const response = await axios.post(process.env.apiURI + '/account/register', {
        email,
        username,
        password
      })
      commit('setToken', response.data.token)
      return null
    } catch (error) {
      return error
    }
  },
  async makeRequest ({ getters }, axiosConfig) {
    if (!axiosConfig.headers) {
      axiosConfig.headers = {}
    }
    axiosConfig.headers.Authorization = 'Token ' + getters.token
    try {
      return await axios(axiosConfig)
    } catch (e) {
      return e
    }
  }
}
