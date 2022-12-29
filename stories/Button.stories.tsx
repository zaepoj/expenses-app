import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import Button from "../app/components/Button/index";
import { ThemeProvider } from "styled-components";
import { theme } from "../app/theme";

addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{args.label}</Button>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: "Primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
  label: "Secondary",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  tertiary: true,
  label: "Tertiary",
  uppercase: true,
};

export const Round = Template.bind({});
Round.args = {
  primary: true,
  label: "Round",
  round: true,
};
