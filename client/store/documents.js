import Vue from 'vue'

export const state = () => ({
  'Welcome.md': {
    name: 'Welcome.md',
    content: '# Hello World!!!',
    mode: 'markdown'
  },
  'SecondDocument.md': {
    name: 'SecondDocument.md',
    content: '## Second Document',
    mode: 'markdown'
  },
  'Directory1/test1.md': {
    name: 'test1.md',
    content: 'test1',
    mode: 'markdown'
  },
  'Directory1/test2.md': {
    name: 'test2.md',
    content: 'test2',
    mode: 'markdown'
  },
  'Z-dir/test.js': {
    name: 'test.js',
    content: 'console.log("TESTING JAVASCRIPT")',
    mode: 'javascript'
  },
  'multiple/directory/test.txt': {
    content: 'hello',
    mode: 'text'
  }
})

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
