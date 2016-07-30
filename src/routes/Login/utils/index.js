// This is an ``onEnter`` hook for a react-router ``Route`` which validates that a user is logged in.

export default (store) => (nextState, replace, cb) => {
  const state = store.getState()

  if (!state.authenticated) {
    replace(`/login`)
  }

  cb(null)
}