import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
  

const ArchiveList: React.FC = () => {
  const [state, setState] = useState<ArchiveListState>({
    archives: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    axios
      .get<Archive[]>('http://127.0.0.1:8000/playarchive/archive/')
      .then((response) => {
        setState({ archives: response.data, isLoading: false, error: null });
      })
      .catch((error) => {
        setState({ archives: [], isLoading: false, error: error.message });
      });
  }, []);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  return (
    <div>
      {state.archives.map((archive) => (
        <div key={archive.title}>
          <Link to={`/playarchive/archive/${archive.title}`}>
            <h2>{archive.title}</h2>
          </Link>
          <p>{archive.subtitle}</p>
          <p>{archive.description}</p>
          <ul>
            {archive.movies.map((movie) => (
              <li key={movie.title}>
                {movie.title} - {movie.video}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ArchiveList;
