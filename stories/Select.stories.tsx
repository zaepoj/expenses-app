import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import Select from "../app/components/Select/index";
import { ThemeProvider } from "styled-components";
import { theme } from "../app/theme";

addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

export default {
  title: "Example/Select",
  component: Select,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <Select name="test" options={args.options} isMulti={args.isMulti} />
);

export const Normal = Template.bind({});
Normal.args = {
  options: [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ],
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  options: [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ],
  isMulti: true,
};
