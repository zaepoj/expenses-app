import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import IconButton from "../app/components/IconButton/index";
import { ThemeProvider } from "styled-components";
import { theme } from "../app/theme";
import { FcHome } from "react-icons/fc";

addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

export default {
  title: "Example/IconButton",
  component: IconButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  icon: FcHome,
  onClick: () => alert("Clicked"),
  tooltip: "Home",
};
