// ArchiveDetail.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

type Movie = {
    title: string;
    video: string;
};
  
  type Archive = {
    title: string;
    subtitle: string;
    description: string;
    movies: Movie[];
};
  
  type ArchiveListState = {
    archives: Archive[];
    isLoading: boolean;
    error: string | null;
};

const ArchiveDetail: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [archive, setArchive] = useState<Archive | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<null | string>(null);
  const baseURL = "http://127.0.0.1:8000"; 


  const handleVideoClick = (video: string) => {
    if (playingVideo === video) {
      setPlayingVideo(null);  // 動画を一時停止
    } else {
      setPlayingVideo(video); // 選択された動画を再生
    }
  }

  useEffect(() => {
    axios
      .get<Archive>(`http://127.0.0.1:8000/playarchive/archive/${title}/`)
      .then((response) => {
        setArchive(response.data);
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
      <h2>{archive?.title}</h2>
      <p>{archive?.subtitle}</p>
      <p>{archive?.description}</p>
      <ul>
            {archive?.movies.map((movie) => (
              <li key={movie.title}>
                <span onClick={() => handleVideoClick(movie.video)}>
                  {movie.title}
                </span>
                {playingVideo === movie.video && (
                  <video width="250" height="250" controls autoPlay>
                    <source src={`${baseURL}${movie.video}`} type="video/mp4" />

                    お使いのブラウザは動画タグをサポートしていません。
                  </video>
                )}
              </li>
            ))}
        </ul>
    </div>
  );
};

export default ArchiveDetail;
