export const state = () => ({
  file: [{
    content: ''
  }]
})

export const mutations = {
  updateFileContent (state, { file, content }) {
    state.file[file].content = content
  }
}
