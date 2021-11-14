import { Button, Heading, Pane } from "evergreen-ui";
import { useNavigate } from "react-router";
import { Navigation } from "../Navigation/Navigation";
import { HeaderWrapper } from "../HeaderWrapper";
import logo from "../../image/logo.png";

export const Confirmation = () => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper image={logo}>
      <Pane
        marginX="auto"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading className="heading2" size={900} textAlign="center">
          Thank you for your submission!
        </Heading>
        <Button
          fontSize={24}
          marginTop={16}
          onClick={() => {
            navigate("/dashboard");
          }}
          className="nav-button"
        >
          Return to dashboard
        </Button>
      </Pane>
    </HeaderWrapper>
  );
};
