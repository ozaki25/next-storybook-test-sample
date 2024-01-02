import { ArticleType } from '~/types/article';

const baseUrl = 'https://qiita.com/api/v2';

export const getItems = async ({ username }: { username: string }) => {
  const res = await fetch(`${baseUrl}/users/${username}/items`);
  const json: ArticleType[] = await res.json();
  return json;
};
