import type { Meta, StoryObj } from '@storybook/react';

import { Articles } from '.';

const meta = {
  title: 'Articles',
  component: Articles,
  args: {
    articles: [
      { id: '1', title: 'タイトル1', url: 'https://example.com' },
      { id: '2', title: 'タイトル2', url: 'https://example.com' },
      { id: '3', title: 'タイトル3', url: 'https://example.com' },
    ],
  },
} satisfies Meta<typeof Articles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story1: Story = {};

export const Story2: Story = { args: { articles: [] } };
