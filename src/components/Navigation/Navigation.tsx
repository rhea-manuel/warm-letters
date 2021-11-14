import { Button, Icon, Pane, ProjectsIcon } from "evergreen-ui";

export const Navigation = () => {
  return (
    <nav>
      <Pane marginBottom={16}>
        <Button className="nav-button">
          <Icon size={24} icon={ProjectsIcon} marginRight={24} />
          Replies to me.
        </Button>
      </Pane>
    </nav>
  );
};
