import { ArticleType } from '~/types/article';

export const getItems = async ({ username }: { username: string }) => {
  try {
    const res = await fetch('/api/qiita/items', {
      method: 'POST',
      body: JSON.stringify({ username }),
    });
    if (!res.ok) return { articles: [] };
    const json: { articles: ArticleType[] } = await res.json();
    return json;
  } catch (e) {
    console.log(e);
    return { articles: [] };
  }
};
