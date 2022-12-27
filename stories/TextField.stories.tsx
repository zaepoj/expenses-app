import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import TextField from "../app/components/TextField/index";
import { ThemeProvider } from "styled-components";
import { theme } from "../app/theme";

addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

export default {
  title: "Example/TextField",
  component: TextField,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField
    name="test"
    type={args.type}
    label={args.label}
    placeholder={args.placeholder}
  />
);

export const Text = Template.bind({});
Text.args = {
  type: "text",
  placeholder: "Text",
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  placeholder: "Password",
  label: "Password",
};
