import Vue from 'vue'

export const state = () => ({
  theme: 'tomorrow_night',
  indentStyle: 'spaces',
  fontSize: '',
  fontFamily: ''
})

export const mutations = {
  update (state, { theme, indentStyle }) {
    if (theme) { Vue.set(state, 'theme', theme) }
    if (indentStyle) { Vue.set(state, 'indentStyle', indentStyle) }
  }
}
