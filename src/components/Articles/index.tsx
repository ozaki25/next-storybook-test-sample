import React, { FormEvent, useRef, useState } from 'react';
import { ArticleType } from '~/types/article';
import { getItems } from '~/fetches/client/qiita';
import style from './style.module.css';

type Props = {
  articles: ArticleType[];
};

export function Articles({ articles: defaultArticles }: Props) {
  const [articles, setArticles] = useState(defaultArticles);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const username = inputRef.current?.value;
    if (!username) return;

    const { articles } = await getItems({ username });
    setArticles(articles);
  };

  return (
    <section className={style.section}>
      <h1 className={style.title}>記事一覧</h1>
      <form onSubmit={onSubmit} className={style.form}>
        <label htmlFor="username" className={style.label}>
          ユーザ名
        </label>
        <input id="username" name="username" ref={inputRef} />
        <button>取得</button>
      </form>
      {articles.length === 0 ? (
        <p>記事がありません</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id} className={style.listItem}>
              <a href={article.url} className={style.link}>
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
