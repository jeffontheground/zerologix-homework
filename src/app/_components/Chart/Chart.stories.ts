import type { Meta, StoryObj } from "@storybook/react";

import Chart from "./Chart";

const meta: Meta<typeof Chart> = {
  title: "Example/Chart",
  component: Chart,
  tags: ["autodocs"],
  argTypes: {
    symbol: {
      description: "The text shown in the background.",
      control: "text",
    },
    timeSeries: {
      description: "OHLC time series.",
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const Primary: Story = {
  args: {
    symbol: "APPL",
    timeSeries: [
      {
        open: 100.0,
        high: 100.11,
        low: 97.3,
        close: 98.39,
      },
      {
        open: 100.41,
        high: 100.77,
        low: 99.625,
        close: 100.41,
      },
      {
        open: 102.075,
        high: 102.46,
        low: 100.88,
        close: 101.14,
      },
      {
        open: 101.37,
        high: 102.52,
        low: 101.12,
        close: 101.87,
      },
      {
        open: 99.65,
        high: 101.0,
        low: 99.5,
        close: 100.86,
      },
      {
        open: 100.01,
        high: 101.11,
        low: 99.42,
        close: 100.86,
      },
      {
        open: 101.51,
        high: 101.53,
        low: 100.07,
        close: 100.13,
      },
    ],
  },
};
