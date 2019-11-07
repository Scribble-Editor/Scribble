import Vue from 'vue'

export const state = () => ({})

export const mutations = {
  add (state, { name, content, mode }) {
    Vue.set(state, name, { content, mode })
  },

  remove (state, name) {
    delete (state[name])
  },

  update (state, { name, content, mode }) {
    if (content) { Vue.set(state, name, { content, mode: state[name].mode }) }
    if (mode) { Vue.set(state, name, { content: state[name].content, mode }) }
  },

  rename (state, { name, newName }) {
    this.add(newName, { content: state[name].content, mode: state[name].mode })
    this.remove(name)
  }
}
