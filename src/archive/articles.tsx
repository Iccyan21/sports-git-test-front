import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

type Author = {
    username: string;
};

type Article = {
    title: string;
    content: string;
    author: Author;
};

const ArticleDetail: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseURL = "http://127.0.0.1:8000/articles/create/"; 

  useEffect(() => {
    axios
      .get<Article>(`${baseURL}/api/articles/${title}/`)
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
      <h2>{article?.title}</h2>
      <p>By: {article?.author.username}</p>
      <div>
        {article?.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetail;
