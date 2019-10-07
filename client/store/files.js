export const state = () => ({
  file: [{
    content: '',
    language: 'text'
  }]
})

export const mutations = {
  updateFileContent (state, { file, content }) {
    state.file[file].content = content
  },

  changeFileLanguage (state, { file, language }) {
    state.file[file].language = language
  }
}
