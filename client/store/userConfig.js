import Vue from 'vue'

export const state = () => ({
  theme: 'tomorrow_night',
  indentStyle: 'spaces',
  tabSize: 4,
  fontSize: '',
  fontFamily: ''
})

export const mutations = {
  update (state, { theme, indentStyle, tabSize }) {
    if (theme) { Vue.set(state, 'theme', theme) }
    if (indentStyle) { Vue.set(state, 'indentStyle', indentStyle) }
    if (tabSize) { Vue.set(state, 'tabSize', tabSize) }
  }
}
