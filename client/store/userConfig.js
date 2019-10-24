import Vue from 'vue'

export const state = () => ({
  theme: 'tomorrow_night',
  defaultLanguage: 'javascript',
  fontSize: '',
  fontFamily: ''
})

export const mutations = {
  update (state, { theme }) {
    if (theme) { Vue.set(state, 'theme', theme) }
  }
}
