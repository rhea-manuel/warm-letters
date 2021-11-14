import { Pane, Image } from "evergreen-ui";

export const Wrapper = ({ children }: { children: any }) => {
  return (
    <Pane padding={16}>
      {/* <Heading size={900} textAlign="center" color="#FA8072" marginY="4%">
        Warm Letters
      </Heading> */}

      {children}
    </Pane>
  );
};
