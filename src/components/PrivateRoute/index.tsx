import { getAuth } from "firebase/auth";
import { FunctionComponent } from "react";
import { Pane, Button } from "evergreen-ui";
import { Link, RouteProps } from "react-router-dom";

// export const PrivateRoute = (props: RouteProps) => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (!user?.uid) {
//     return (
//       <Pane>
//         You do not have permission to access this page.
//         <Link to={"/"}>Return to login</Link>
//       </Pane>
//     );
//   } else return <props.children />;
// };
