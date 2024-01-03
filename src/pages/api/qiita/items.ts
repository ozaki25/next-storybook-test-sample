import type { NextApiRequest, NextApiResponse } from 'next';
import { getItems } from '~/fetches/server/qiita';
import { ArticleType } from '~/types/article';

type ResponseProps = {
  articles: ArticleType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps>,
) {
  const { username } = JSON.parse(req.body);
  const articles = await getItems({ username });
  res.status(200).json({ articles });
}
