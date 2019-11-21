export const forceAuthentication = ({ store, redirect }) => {
  setTimeout(() => {
    if (!store.getters['authentication/isLoggedIn']) {
      redirect('/')
    }
  }, 0)
}

export const forceNonAuthentication = ({ store, redirect }) => {
  setTimeout(() => {
    if (store.getters['authentication/isLoggedIn']) {
      redirect('/')
    }
  }, 0)
}

export const logout = async ({ store, redirect }) => {
  await store.dispatch('authentication/logout')
  redirect('/')
}
