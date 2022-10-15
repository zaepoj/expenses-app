import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import Card from "../app/components/Card/index";
import { ThemeProvider } from "styled-components";
import { theme } from "../app/theme";

addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

export default {
  title: "Example/Card",
  component: Card,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <p>1241 $</p>
  </Card>
);

export const Normal = Template.bind({});
Normal.args = {
  title: "Expenses",
  infoLabel: "per month",
  clickable: true,
  onClick: () => alert("card click"),
};
