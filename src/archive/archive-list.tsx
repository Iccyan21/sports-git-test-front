import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface MovieProps {
    title: string;
    movie_title: string;
    video_file: string;
}

const MovieList: React.FC = () => {
    const { title } = useParams<{ title: string }>();
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    useEffect(() => {
        // APIからムービーデータを取得
        axios.get(`http://127.0.0.1:8000/myapp/posts/${title}/movies/`)
            .then(response => {
                setMovies(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [title]);

    return (
        <div>
            <h1>Movies for {title}</h1>
            <ul>
                {movies.map((movie, index) => (
                    <li key={index}>
                        <button onClick={() => setSelectedVideo(movie.video_file)}>
                            {movie.movie_title}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedVideo && (
                <video controls width="600" src={selectedVideo} autoPlay></video>
            )}
        </div>
    );
};

export default MovieList;
