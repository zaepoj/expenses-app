import React from "react";
import { ComponentStory, ComponentMeta, addDecorator } from "@storybook/react";
import ConfirmModal from "../app/components/ConfirmModal/index";
import { ThemeProvider } from "styled-components";
import { theme } from "../app/theme";

addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

export default {
  title: "Example/ConfirmModal",
  component: ConfirmModal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ConfirmModal>;

const Template: ComponentStory<typeof ConfirmModal> = (args) => (
  <ConfirmModal {...args} />
);

export const Normal = Template.bind({});

Normal.args = {
  title: "Delete?",
  confirmText: "Are you sure you want to delete permanently?",
  open: true,
  onClose: () => console.log("onClose"),
  onPrimary: () => console.log("onPrimary"),
};
