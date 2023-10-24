import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Article = {
    id: number;
    author: string;
    category: string;
    tags: string[];
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
};

const ArticlesList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    axios
      .get<Article[]>(`${API_URL}/articles/list/`) // <str:title>/の部分は省略しています。
      .then((response) => {
        setArticles(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>
            <Link to={`/articles/detail/${article.title}/`}>
              {article.title}
            </Link>
          </h2>
          <p>Author: {article.author}</p>
          <p>Category: {article.category}</p>
          <p>Tags: {article.tags.join(', ')}</p>
          <p>{article.content}</p>
          <p>Created At: {article.created_at}</p>
          <p>Updated At: {article.updated_at}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ArticlesList;
