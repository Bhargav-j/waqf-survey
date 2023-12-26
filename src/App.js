import "./App.css";
import Main from "./components/main";
import SignInPage from "./components/signin/SignInPage";

import {useDispatch, useSelector } from "react-redux";
import { listenToFirestoreSnapshot } from "./components/firebase/CRUDoperations";
import { useEffect } from "react";

const App = () => {
  const userLogin = useSelector((state) => state.login.userlogin);
  const userUID = useSelector((state) => state.login.userUID);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userUID) {
      listenToFirestoreSnapshot(userUID, dispatch);
    }
  }, [dispatch, userUID]);

  return <div className="App">{userLogin ? <SignInPage /> : <Main />}</div>;
};

export default App;
