import { ComponentStory } from "@storybook/react";
import LoginDialog from "./LoginDialog";

export default {
  title: 'LoginDialog',
};

const Template: ComponentStory<typeof LoginDialog> = (props) => <LoginDialog {...props} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => {},
  onLogin: (token: string) => {},
}
