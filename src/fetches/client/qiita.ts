import { ArticleType } from '~/types/article';

const baseUrl = globalThis.location?.origin;

export const getItems = async ({ username }: { username: string }) => {
  try {
    const res = await fetch(`${baseUrl}/api/qiita/items`, {
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
