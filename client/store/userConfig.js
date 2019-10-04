export const state = () => ({
  theme: 'tomorrow_night',
  defaultLanguage: 'javascript',
  fontSize: '',
  fontFamily: ''
})

export const mutations = {
  changeTheme (state, newTheme) {
    state.theme = newTheme
  },

  changeLanguage (state, newLanguage) {
    state.defaultLanguage = newLanguage
  }
}
