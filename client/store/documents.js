export const state = () => ({})

export const mutations = {
  add (state, { name, content, mode }) {
    state[name] = { content, mode }
  },

  remove (state, name) {
    delete (state[name])
  },

  update (state, { name, content, mode }) {
    if (content) { state[name].content = content }
    if (mode) { state[name].mode = mode }
  },

  rename (state, { name, newName }) {
    this.add(newName, { content: state[name].content, mode: state[name].mode })
    this.remove(name)
  }
}
