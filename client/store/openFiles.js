export const state = () => ({
  files: {
    0: {
      content: '# Welcome to Scribble!\nWrite something down!',
      language: 'markdown',
      baseName: 'Welcome',
      type: 'md'
    }
  },
  selectedFileName: 0
})

export const getters = {
  selectedFile (state) {
    return { name: state.selectedFileName, ...state.files[state.selectedFileName] }
  }
}

export const mutations = {
  createFile (state, name) {
    state.files[name] = {
      content: '',
      language: 'javascript',
      baseName: name.substring(0, name.lastIndexOf('.')),
      type: name.substring(name.lastIndexOf('.') + 1)
    }
  },

  updateFileContent (state, { file, content }) {
    state.files[file].content = content
  },

  changeFileLanguage (state, { file, language }) {
    state.files[file].language = language
  },

  changeSelectedFile (state, file) {
    state.selectedFileName = file
  }
}
