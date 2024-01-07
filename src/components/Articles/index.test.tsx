import { composeStories } from '@storybook/react';
import { expect, fireEvent, userEvent, waitFor } from '@storybook/test';
import { afterEach, describe, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import * as stories from './Article.stories';

const { Story1, Story2, Story3, Story4, Story5 } = composeStories(stories);

describe('Articles', () => {
  afterEach(() => {
    cleanup();
  });
  describe('表示内容の確認', () => {
    test('見出しが表示されること', () => {
      render(<Story1 />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        '記事一覧',
      );
    });
    test('入力フォームが表示されること', () => {
      render(<Story1 />);

      expect(screen.getByLabelText('ユーザ名')).toBeInTheDocument();
    });
    describe('記事が存在する場合', () => {
      test('記事の一覧が表示されること', () => {
        render(<Story1 />);

        expect(screen.getAllByRole('link', { name: /タイトル/ })).toHaveLength(
          3,
        );
      });
    });
    describe('記事が存在しない場合', () => {
      test('記事の一覧が表示されないこと', () => {
        render(<Story2 />);

        expect(screen.queryByRole('link')).not.toBeInTheDocument();
      });
      test('記事なしのメッセージが表示されること', () => {
        render(<Story2 />);

        expect(screen.getByText('記事がありません')).toBeInTheDocument();
      });
    });
  });
  describe('検索の確認', () => {
    test('検索結果が存在する場合一覧が更新されること', async () => {
      render(<Story3 />);
      const input = screen.getByLabelText('ユーザ名');
      const button = screen.getByRole('button', { name: '取得' });
      await userEvent.type(input, 'ozaki');
      await fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getAllByRole('link', { name: /ozaki/ })).toHaveLength(3);
      });
    });
    test('検索結果が存在しない場合一覧が表示されずメッセージが表示されること', async () => {
      render(<Story4 />);
      const input = screen.getByLabelText('ユーザ名');
      const button = screen.getByRole('button', { name: '取得' });
      await userEvent.type(input, 'ozaki');
      await fireEvent.click(button);

      await waitFor(() => {
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
        expect(screen.getByText('記事がありません')).toBeInTheDocument();
      });
    });
    test('検索エラー場合メッセージが表示されること', async () => {
      render(<Story5 />);
      const input = screen.getByLabelText('ユーザ名');
      const button = screen.getByRole('button', { name: '取得' });
      await userEvent.type(input, 'ozaki');
      await fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('エラーが発生しました')).toBeInTheDocument();
      });
    });
  });
});
