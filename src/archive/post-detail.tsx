import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface MovieProps {
    title: string;
    movie_title: string;
    video_file: string;
}

const MovieList1: React.FC<{ postTitle: string }> = ({ postTitle }) => {
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    useEffect(() => {
        // APIからムービーデータを取得
        axios.get(`http://127.0.0.1:8000/myapp/posts/${postTitle}/movies/`)
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [postTitle]);

    return (
        <div>
            <h1>Movies for {postTitle}</h1>
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

export default MovieList1;
