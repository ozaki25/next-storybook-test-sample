import type { Meta, StoryObj } from '@storybook/react';

import { Articles } from '.';
import {
  getItemsEmpty,
  getItemsError,
  getItemsSuccess,
} from '~/mocks/client/handlers';
import { expect, userEvent, waitFor, within } from '@storybook/test';

const meta = {
  title: 'Interaction/Articles',
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

export const Story3: Story = {
  name: '検索結果を取得できる場合',
  parameters: {
    msw: {
      handlers: [getItemsSuccess()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText('ユーザ名');
    await userEvent.type(input, 'ozaki', { delay: 100 });

    const button = canvas.getByRole('button');
    await userEvent.click(button);

    await waitFor(() => {
      expect(canvas.getAllByRole('link', { name: /ozaki/ })).toHaveLength(3);
    });
  },
  tags: ['play-test'],
};

export const Story4: Story = {
  name: '検索結果が0件の場合',
  parameters: {
    msw: {
      handlers: [getItemsEmpty()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText('ユーザ名');
    await userEvent.type(input, 'ozaki', { delay: 100 });

    const button = canvas.getByRole('button');
    await userEvent.click(button);

    await waitFor(() => {
      expect(canvas.queryByRole('link')).not.toBeInTheDocument();
      expect(canvas.getByText('記事がありません')).toBeInTheDocument();
    });
  },
  tags: ['play-test'],
};

export const Story5: Story = {
  name: '検索エラーの場合',
  parameters: {
    msw: {
      handlers: [getItemsError()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText('ユーザ名');
    await userEvent.type(input, 'ozaki', { delay: 100 });

    const button = canvas.getByRole('button');
    await userEvent.click(button);

    await waitFor(() => {
      expect(canvas.getByText('記事がありません')).toBeInTheDocument();
    });
  },
  tags: ['play-test'],
};
