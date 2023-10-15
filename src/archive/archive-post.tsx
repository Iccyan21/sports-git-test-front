import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

function PostAndMovieForm() {
    const [postTitle, setPostTitle] = useState('');
    const [description, setDescription] = useState('');
    const [movies, setMovies] = useState<{ movie_title: string; video_file: File | null }[]>([
        { movie_title: '', video_file: null }
    ]);

    const addMovieField = () => {
        setMovies([...movies, { movie_title: '', video_file: null }]);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Postを先に作成
        const postResponse = await axios.post('/api/posts/', { title: postTitle, description });
        
        // 関連するMovieを作成
        for (let movie of movies) {
            await axios.post('/api/movies/', { title: postTitle, ...movie });
        }

        // 成功したら、適切なフィードバックをユーザーに表示するなどの処理を追加
    };
    const handleFileChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newMovies = [...movies];
        if (event.target.files && event.target.files[0]) {
            newMovies[index].video_file = event.target.files[0];
            setMovies(newMovies);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Post Title: <input value={postTitle} onChange={e => setPostTitle(e.target.value)} /></label>
            </div>
            
            {movies.map((movie, index) => (
                <div key={index}>
                    <label>Movie Title: <input value={movie.movie_title} onChange={e => {
                        const newMovies = [...movies];
                        newMovies[index].movie_title = e.target.value;
                        setMovies(newMovies);
                    }} /></label>
                    <label>Video File: 
                        <input 
                            type="file" 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(index, e)} 
                        />
                    </label>
                </div>
            ))}
            <div>
                <label>Description: <textarea value={description} onChange={e => setDescription(e.target.value)} /></label>
            </div>
            <button type="button" onClick={addMovieField}>Add Another Movie</button>
            <button type="submit">Submit</button>
        </form>
    );
}

export default PostAndMovieForm;
