import { ArticleType } from '~/types/article';

const baseUrl = globalThis.location?.origin;

export const getItems = async ({
  username,
}: {
  username: string;
}): Promise<{ articles: ArticleType[]; hasError?: boolean }> => {
  try {
    const res = await fetch(`${baseUrl}/api/qiita/items`, {
      method: 'POST',
      body: JSON.stringify({ username }),
    });
    if (!res.ok) throw new Error('error');
    const json: { articles: ArticleType[] } = await res.json();
    return json;
  } catch (e) {
    console.log(e);
    return { articles: [], hasError: true };
  }
};
