import React, { useState } from 'react';
import axios from 'axios';

interface Movie {
    title: string;
    video: File | null;
}

interface Archive {
    title: string;
    subtitle: string;
    description: string;
    movies: Movie[];
}

const ArchiveCreate: React.FC = () => {
    const [archive, setArchive] = useState<Archive>({
        title: '',
        subtitle: '',
        description: '',
        movies: []
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        formData.append('title', archive.title);
        formData.append('subtitle', archive.subtitle);
        formData.append('description', archive.description);
        
        archive.movies.forEach((movie, index) => {
            formData.append(`movies[${index}].title`, movie.title);
            if (movie.video) {
                formData.append(`movies[${index}].video`, movie.video);
            }
        });
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/playarchive/create-archive/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error creating archive:", error);
        }
    };
    
    

    const handleMovieChange = (index: number, field: keyof Movie, value: any) => {
        const newMovies = [...archive.movies];
        newMovies[index] = { ...newMovies[index], [field]: value };
        setArchive(prevState => ({ ...prevState, movies: newMovies }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title: </label>
                <input 
                    type="text" 
                    value={archive.title} 
                    onChange={e => setArchive(prevState => ({ ...prevState, title: e.target.value }))}
                />
            </div>

            <div>
                <label>Subtitle: </label>
                <input 
                    type="text" 
                    value={archive.subtitle} 
                    onChange={e => setArchive(prevState => ({ ...prevState, subtitle: e.target.value }))}
                />
            </div>

            <div>
                <label>Description: </label>
                <textarea 
                    value={archive.description} 
                    onChange={e => setArchive(prevState => ({ ...prevState, description: e.target.value }))}
                ></textarea>
            </div>

            <div>
                <h3>Movies</h3>
                {archive.movies.map((movie, index) => (
                    <div key={index}>
                        <div>
                            <label>Movie Title: </label>
                            <input 
                                type="text" 
                                value={movie.title} 
                                onChange={e => handleMovieChange(index, 'title', e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Video: </label>
                            <input 
                                type="file" 
                                onChange={e => handleMovieChange(index, 'video', e.target.files?.[0] || null)}
                            />
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => setArchive(prevState => ({ ...prevState, movies: [...prevState.movies, { title: '', video: null }]}))}>
                    Add Movie
                </button>
            </div>

            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default ArchiveCreate;
