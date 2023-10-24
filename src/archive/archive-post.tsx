import React, { useState } from 'react';
import axios from 'axios';

type Movie = {
    title: string;
    video: File | null;
};


const RegisterDataForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [description, setDescription] = useState("");
    const [movies, setMovies] = useState<Movie[]>([
        { title: "", video: null }
        // 初期の配列
    ]);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);

    const handleMovieChange = (index: number, type: 'title' | 'video', value: string | File) => {
        const newMovies = [...movies];
        if (type === 'title') {
            newMovies[index].title = value as string;
        } else {
            newMovies[index].video = value as File;
        }
        setMovies(newMovies);
    };
    const addMovieField = () => {
        if (movies.length < 4) {
            setMovies(prevMovies => [...prevMovies, { title: "", video: null }]);
        }
    };

    const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            handleMovieChange(index, 'video', file);
        }
    };

    const removeMovieField = (index: number) => {
        if (movies.length > 1) {
            const newMovies = [...movies];
            newMovies.splice(index, 1);
            setMovies(newMovies);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('description', description);
    
        movies.forEach((movie, index) => {
            formData.append(`movies.title`, movie.title);
            if (movie.video) {
                formData.append(`movies.video`, movie.video);
            }
        });
    
        axios.post('http://127.0.0.1:8000/playarchive/create-archive/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(() => {
            setResponseMessage('Successfully registered!');
        })
        .catch(() => {
            setResponseMessage('Failed to register data.');
        });
    };
    
    
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Subtitle:</label>
                    <input value={subtitle} onChange={e => setSubtitle(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                {
                    movies.map((movie, index) => (
                        <div key={index}>
                            <div>
                                <label>Movie {index + 1} Title:</label>
                                <input value={movie.title} onChange={e => handleMovieChange(index, 'title', e.target.value)} />
                            </div>
                            <div>
                                <label>Movie {index + 1} Video:</label>
                                <input type="file" accept="video/*" onChange={e => handleFileChange(index, e)} />
                            </div>
                            <button type="button" onClick={() => removeMovieField(index)}>Remove Movie</button>
                        </div>
                    ))
                }

                <button type="button" onClick={addMovieField}>Add Movie</button>
                <button type="submit">Submit</button>
            </form>

            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default RegisterDataForm;
