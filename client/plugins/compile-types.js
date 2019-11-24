const BUILD_SUPPORTED_LANGUAGES = [
  { language: 'c', interactive: false },
  { language: 'cpp', interactive: false },
  { language: 'python', interactive: true },
  { language: 'ruby', interactive: true }
]

const LANGUAGES_ONLY = BUILD_SUPPORTED_LANGUAGES.map(supportedLang => supportedLang.language)

const LANGUAGE_INTERACTIVITY = {}
BUILD_SUPPORTED_LANGUAGES.forEach((supportedLang) => {
  LANGUAGE_INTERACTIVITY[supportedLang.language] = supportedLang.interactive
})

export { LANGUAGES_ONLY as LANGUAGES, LANGUAGE_INTERACTIVITY }
export default { BUILD_SUPPORTED_LANGUAGES }
