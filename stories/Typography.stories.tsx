import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import Typography from "../app/components/Typography/index";
import { ThemeProvider } from "styled-components";
import { theme } from "../app/theme";
import '../../frontend/app/shared.css'

addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

export default {
  title: "Example/Typography",
  component: Typography,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args} />
);

export const H1 = Template.bind({});
H1.args = {
  text: "Text",
  type: 'h1'
};

export const H2 = Template.bind({});
H2.args = {
  text: "Text",
  type: 'h2'
};
export const H3 = Template.bind({});
H3.args = {
  text: "Text",
  type: 'h3'
};
export const H4 = Template.bind({});
H4.args = {
  text: "Text",
  type: 'h4'
};

export const H5 = Template.bind({});
H5.args = {
  text: "Text",
  type: 'h5'
};

export const H6 = Template.bind({});
H6.args = {
  text: "Text",
  type: 'h6'
};


export const Body1= Template.bind({});
Body1.args = {
  text: "Text",
  type: 'body1'
};

export const Body2= Template.bind({});
Body2.args = {
  text: "Text",
  type: 'body2'
};