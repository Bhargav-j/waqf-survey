import { auth } from "./Config";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { store } from "../redux/ReduxStore";


onAuthStateChanged(auth, async (user) => {
  if (user) {
    // console.log(user);
    const uid = user.uid;
    // console.log(uid)
    // console.log(user.displayName)

    store.dispatch({
      type: 'login',
      userUID : uid,
      userName : user.displayName ? user.displayName : "Survey Batch 1"
    })
  } else {
    // setUserUID(null);
    // setUserName("Hello User!");

    store.dispatch({
      type: 'logout',
    })
  }
})


//signIn with userName and Password
export const handleLogin = async ({ email, password }) => {
  //   console.log(email);
  //   console.log(password);
  // const err = null
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // console.log(userCredential.UID)
  } catch (error) {
    console.log(error.message)
    return error.message;
  }
};

// SignOut
export const handleSignOut = async () => {
  try {
    await signOut(auth).then(alert("Signed Out"));
  } catch (error) {
    alert(error.message);
  }
};
