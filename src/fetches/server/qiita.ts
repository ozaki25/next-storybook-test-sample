import { ArticleType } from '~/types/article';

const baseUrl = 'https://qiita.com/api/v2';

export const getItems = async ({ username }: { username: string }) => {
  try {
    const res = await fetch(`${baseUrl}/users/${username}/items`);
    if (!res.ok) return [];
    const json: ArticleType[] = await res.json();
    return json;
  } catch (e) {
    console.log(e);
    return [];
  }
};
