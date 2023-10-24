import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

const ArticleDetail: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Article>(`http://127.0.0.1:8000/articles/detail/${title}/`)
      .then((response) => {
        setArticle(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [title]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{article?.title}</h1>
      <p>Author: {article?.author}</p>
      <p>Category: {article?.category}</p>
      <p>Tags: {article?.tags.join(', ')}</p>
      <p>{article?.content}</p>
      <p>Created At: {article?.created_at}</p>
      <p>Updated At: {article?.updated_at}</p>
    </div>
  );
};

export default ArticleDetail;
