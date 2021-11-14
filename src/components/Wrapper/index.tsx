import { Heading, Pane, Image } from "evergreen-ui";
import logo from "../../image/logo.png";

export const Wrapper = ({ children }: { children: any }) => {
  return (
    <Pane padding={16}>
      {/* <Heading size={900} textAlign="center" color="#FA8072" marginY="4%">
        Warm Letters
      </Heading> */}
      <Image
        alt="Warm Letters Logo"
        src={logo}
        textAlign="center"
        marginX="auto"
        display="flex"
      />
      {children}
    </Pane>
  );
};
