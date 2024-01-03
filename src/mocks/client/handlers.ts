import { rest } from 'msw';

export const getItemsSuccess = () => {
  return rest.post('/api/qiita/items', (req, res, ctx) => {
    return res(
      ctx.delay(300),
      ctx.json({
        articles: [
          { id: '1', title: 'title1', url: 'https://example.com' },
          { id: '2', title: 'title2', url: 'https://example.com' },
          { id: '3', title: 'title3', url: 'https://example.com' },
        ],
      }),
    );
  });
};

export const getItemsEmpty = () => {
  return rest.post('/api/qiita/items', (req, res, ctx) => {
    return res(
      ctx.delay(300),
      ctx.json({
        articles: [],
      }),
    );
  });
};

export const getItemsError = () => {
  return rest.post('/api/qiita/items', (req, res, ctx) => {
    return res(ctx.delay(300), ctx.status(500));
  });
};
