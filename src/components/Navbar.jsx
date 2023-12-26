import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { handleSignOut } from "./firebase/SignIn";
import {useState } from "react";
import Report from "./Report";

function NavScrollExample() {
  // const { userLogin, userName } = useSelector(state => ({
  //   userLogin: state.login.userlogin,
  //   userName: state.login.userName,
  // }));

  const [generateReport, setGenerateReport] = useState(false);

  const userLogin = useSelector((state) => state.login.userlogin);
  const userName = useSelector((state) => state.login.userName);
  const userUID = useSelector((state) => state.login.userUID);

  // console.log(userLogin)
  const dispatch = useDispatch();

  const onSignInClick = async () => {
    if (!userLogin && !userUID) {
      dispatch({ type: "UserLoginPage" });
    } else {
      await handleSignOut();

      // Redux action
      dispatch({ type: "logout" });
      window.location.reload(false);
    }
  };

  return (
    <div className="navBar">
      <Navbar
        expand="lg"
        className="bg-body-primary bg-primary d-flex justify-content-end"
      >
        <Navbar.Brand href="#home">Hello {userName}</Navbar.Brand>
        <button
          type="button"
          className="btn btn-success mx-3"
          onClick={onSignInClick}
        >
          {userUID ? "Logout" : "Login"}
        </button>
        <button
          type="button"
          className="btn btn-warning mx-3"
          onClick={() => setGenerateReport(true)}
        >
          Generate the Report
        </button>
      </Navbar>
      {generateReport && <Report setGenerateReport={setGenerateReport} />}
    </div>
  );
}

export default NavScrollExample;
