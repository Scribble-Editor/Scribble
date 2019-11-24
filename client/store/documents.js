import Vue from 'vue'

export const state = () => ({})

export const mutations = {
  add (state, { name, content, mode }) {
    Vue.set(state, name, { content, mode, compileOptions: { author: 'Anonymous', target: 'win64' } })
  },

  remove (state, name) {
    delete (state[name])
  },

  update (state, { name, content, mode }) {
    if (content) { Vue.set(state[name], 'content', content) }
    if (mode) { Vue.set(state[name], 'mode', mode) }
  },

  updateCompileOptions (state, { documentName, author, target }) {
    if (author) { Vue.set(state[documentName].compileOptions, 'author', author) }
    if (target) { Vue.set(state[documentName].compileOptions, 'target', target) }
  },

  rename (state, { name, newName }) {
    this.add(newName, { content: state[name].content, mode: state[name].mode })
    this.remove(name)
  }
}
