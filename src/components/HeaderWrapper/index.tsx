import { Image, Pane } from "evergreen-ui";
export const HeaderWrapper = ({ children, image }: any) => {
  return (
    <>
      <Image
        alt="Warm Letters Logo"
        src={image}
        textAlign="center"
        marginX="auto"
        display="flex"
      />
      <Pane paddingX={32}>{children}</Pane>
    </>
  );
};
