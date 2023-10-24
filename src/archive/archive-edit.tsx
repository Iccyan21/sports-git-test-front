import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type Movie = {
    title: string;
    video: string | File;
};


type Archive = {
    title: string;
    subtitle: string;
    description: string;
    movies: Movie[];
};

interface ArchiveEditProps {
    match: {
        params: {
            title: string;
        }
    };
}

const ArchiveEdit: React.FC = () => {
    const { title } = useParams<{ title: string }>();
    const [archive, setArchive] = useState<Archive | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/playarchive/edit-archive/${title}/`)
            .then(response => response.json())
            .then(data => {
                setArchive(data);
                setMovies(data.movies);
            });
    }, [title]);

    const handleSave = () => {
        if (!archive) return; // archiveがnullの場合、処理を終了する
    
        const formData = new FormData();
    
        formData.append('title', archive.title);
        formData.append('subtitle', archive.subtitle);
        formData.append('description', archive.description);
        movies.forEach((movie, index) => {
            formData.append(`movies[${index}].title`, movie.title);
            if (typeof movie.video === 'string') {
                formData.append(`movies[${index}].video`, movie.video);
            } else {
                formData.append(`movies[${index}].video`, movie.video, movie.video.name);
            }
        });
    
        fetch(`http://127.0.0.1:8000/playarchive/edit-archive/${title}/`, {
            method: 'PUT',
            body: formData, // JSONを直接送信する代わりにFormDataを使用
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            return response.json();
        })
        .then(data => {
            alert('Data successfully updated!');
        })
        .catch(error => {
            console.error("There was an error updating the archive:", error);
            alert('Error updating archive!');
        });
    };
    
    
    

    return (
        <div>
            <h2>Edit Archive</h2>
            {archive && (
                <>
                    <div>
                        <label>Title: </label>
                        <input value={archive.title} onChange={e => setArchive({ ...archive, title: e.target.value })} />
                    </div>
                    <div>
                        <label>Subtitle: </label>
                        <input value={archive.subtitle} onChange={e => setArchive({ ...archive, subtitle: e.target.value })} />
                    </div>
                    <div>
                        <label>Description: </label>
                        <textarea value={archive.description} onChange={e => setArchive({ ...archive, description: e.target.value })} />
                    </div>

                    <h3>Movies</h3>
                    {movies.map((movie, index) => (
                        <div key={index}>
                            <label>Movie Title: </label>
                            <input 
                                value={movie.title} 
                                onChange={e => setMovies([...movies.slice(0, index), { ...movie, title: e.target.value }, ...movies.slice(index + 1)])} 
                            />
                            <div>
                                <label>Upload Video: </label>
                                <input 
                                    type="file" 
                                    accept="video/*"
                                    onChange={e => {
                                        const file = e.target.files ? e.target.files[0] : null;
                                        if (file) {
                                            setMovies([...movies.slice(0, index), { ...movie, video: file }, ...movies.slice(index + 1)]);}}}/>
                                                </div>
                                                <button onClick={() => {
                                                    // 削除ボタンの処理
                                                    const newMovies = [...movies];
                                                    newMovies.splice(index, 1);
                                                    setMovies(newMovies);
                                                }}>
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                        <button onClick={() => {
                                            // 追加ボタンの処理
                                            setMovies([...movies, { title: "", video: "" }]);
                        }}>
                        Add Movie
                    </button>
                </>
            )}

            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default ArchiveEdit;
