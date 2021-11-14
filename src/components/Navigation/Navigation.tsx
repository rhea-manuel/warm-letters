import {
  Button,
  Icon,
  Pane,
  ProjectsIcon,
  HomeIcon,
  ExportIcon,
} from "evergreen-ui";
import { useNavigate } from "react-router";
import { signOut, getAuth } from "@firebase/auth";

export const Navigation = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  return (
    <nav>
      <Pane marginBottom={32} display="flex" justifyContent="center">
        <Button
          className="nav-button"
          fontSize={21}
          marginX={16}
          onClick={() => {
            navigate("/view-replies");
          }}
        >
          <Icon size={24} icon={ProjectsIcon} marginRight={24} />
          Replies to me.
        </Button>
        <Button
          className="nav-button"
          fontSize={21}
          marginX={16}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <Icon size={24} icon={HomeIcon} marginRight={24} />
          Dashboard
        </Button>
        <Button
          className="nav-button"
          fontSize={21}
          marginX={16}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <Icon
            size={24}
            icon={ExportIcon}
            marginRight={24}
            onClick={() => {
              signOut(auth);
              navigate("/");
            }}
          />
          Logout
        </Button>
      </Pane>
    </nav>
  );
};
