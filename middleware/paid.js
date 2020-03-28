export default function ({ store, redirect }) {
  if (!store.state.auth.user.paid) {
    return redirect('/');
  }
};
