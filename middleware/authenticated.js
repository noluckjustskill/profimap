export default function ({ store, redirect }) {
  if (!store.state.auth.loggedIn || store.state.auth.user.status !== 'active') {
    return redirect('/login');
  }
};
