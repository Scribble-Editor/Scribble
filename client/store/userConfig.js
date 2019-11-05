import Vue from 'vue'

export const state = () => ({
  theme: 'tomorrow_night',
  indentStyle: 'spaces',
  tabSize: 4,
  showLineNumbers: true,
  showInvisibles: false,
  fontSize: '',
  fontFamily: ''
})

export const mutations = {
  update (state, { theme, indentStyle, tabSize, showLineNumbers, showInvisibles }) {
    if (theme) { Vue.set(state, 'theme', theme) }
    if (indentStyle) { Vue.set(state, 'indentStyle', indentStyle) }
    if (tabSize) { Vue.set(state, 'tabSize', tabSize) }
    if (typeof showLineNumbers === 'boolean') { Vue.set(state, 'showLineNumbers', showLineNumbers) }
    if (typeof showInvisibles === 'boolean') { Vue.set(state, 'showInvisibles', showInvisibles) }
  }
}
