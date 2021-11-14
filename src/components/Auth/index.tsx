// Import FirebaseAuth and firebase.
import { FunctionComponent } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { initializeApp } from "@firebase/app";
import { getAuth, EmailAuthProvider } from "@firebase/auth";
import { UserType } from "../../App";
// import { UserState } from "../../App";
// import { useNavigate } from "react-router-dom";
import { DashboardWrapper } from "../Dashboard";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyAgv6pfQ531BWbzO1sXYQLwCVnKTgwtN-o",
  authDomain: "warm-letters.firebaseapp.com",
  projectId: "warm-letters",
  storageBucket: "warm-letters.appspot.com",
  messagingSenderId: "661846584730",
  appId: "1:661846584730:web:5874ff588b1f1340015e23",
};

export const firebase = initializeApp(config);

export const SignInScreen: FunctionComponent = () => {
  //   const { user, setUser } = useContext(UserContext);
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const history = useNavigate();
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/dashboard",
    // We only want user name and password to be able to sign in.
    signInOptions: [EmailAuthProvider.PROVIDER_ID],
    // callbacks: {
    //   signInSuccessWithAuthResult: function (authResult: { user: UserType }) {
    //     console.log(authResult.user);
    //     setUser(authResult.user);
    //     return true;
    //   },
    // },
  };

  //   useEffect(() => {
  //     if (user.uid !== "") {
  //       setIsLoggedIn(true);
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   }, [user]);

  //   if (isLoggedIn) {
  //     return <Navigate to="/dashboard" />;
  //   }

  return (
    <DashboardWrapper>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
    </DashboardWrapper>
  );
};
