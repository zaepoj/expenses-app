import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import ListItem from "../app/components/ListItem/index";
import { ThemeProvider } from "styled-components";
import { theme } from "../app/theme";
import { FcHome } from "react-icons/fc";


addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

export default {
  title: "Example/ListItem",
  component: ListItem,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ListItem>;

const Template: ComponentStory<typeof ListItem> = (args) => (
  <ListItem {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  text: "Rent",
	info: "living costs",
	icon:  FcHome,
	unit: '650 $'
};
