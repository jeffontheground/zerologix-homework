import type { Meta, StoryObj } from "@storybook/react";

import Toolbar from "./Toolbar";

const meta: Meta<typeof Toolbar> = {
  title: "Example/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Primary: Story = {};
