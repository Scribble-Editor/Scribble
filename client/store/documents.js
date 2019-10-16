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
    content: '',
    mode: 'markdown'
  },
  'Directory1/test2.md': {
    name: 'test1.md',
    content: '',
    mode: 'markdown'
  },
  'Z-dir/test.css': {
    name: 'test.css',
    content: '',
    mode: 'markdown'
  }
})

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
