export default async function({ $auth, redirect, store }) {
  debugger;
  const { user } = $auth.$state;
  if (user && user.userID === 1) {
  } else {
    store.dispatch("snackbar/setSnack", "please contact the adm!");
    redirect("/");
  }
}
