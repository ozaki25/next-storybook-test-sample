import React from 'react';
import { ArticleType } from '~/types/article';
import style from './style.module.css';

type Props = {
  articles: ArticleType[];
};

export function Articles({ articles }: Props) {
  return (
    <section className={style.section}>
      <h1 className={style.title}>記事一覧</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id} className={style.listItem}>
            <a href={article.url} className={style.link}>
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
