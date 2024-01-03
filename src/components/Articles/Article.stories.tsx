import type { Meta, StoryObj } from '@storybook/react';

import { Articles } from '.';
import {
  getItemsEmpty,
  getItemsError,
  getItemsSuccess,
} from '~/mocks/client/handlers';

const meta = {
  title: 'Story/Articles',
  component: Articles,
  args: {
    articles: [
      { id: '1', title: 'タイトル1', url: 'https://example.com' },
      { id: '2', title: 'タイトル2', url: 'https://example.com' },
      { id: '3', title: 'タイトル3', url: 'https://example.com' },
    ],
  },
  parameters: {
    msw: {
      handlers: [getItemsSuccess()],
    },
  },
} satisfies Meta<typeof Articles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story1: Story = {
  name: '記事一覧がある場合',
};

export const Story2: Story = {
  name: '記事がない場合',
  args: { articles: [] },
};

export const Story3: Story = {
  name: '検索結果を取得できる場合',
  parameters: {
    msw: {
      handlers: [getItemsSuccess()],
    },
  },
};

export const Story4: Story = {
  name: '検索結果が0件の場合',
  parameters: {
    msw: {
      handlers: [getItemsEmpty()],
    },
  },
};

export const Story5: Story = {
  name: '検索エラーの場合',
  parameters: {
    msw: {
      handlers: [getItemsError()],
    },
  },
};
