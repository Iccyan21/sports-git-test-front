import React, { useState } from 'react';
import axios from 'axios';


interface VideoUpload {
    title: string;
    video?: File;
}

const VideoUploadComponent: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [video, setVideo] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!video) {
            alert("Please select a video to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('video', video);

        try {
            
            const response = await axios.post('http://127.0.0.1:8000/myapp/videos-archive-crearte/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Video uploaded successfully:", response.data);
        } catch (error) {
            console.error("Error uploading video:", error);
        }
    };
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        setVideo(file);
                    }}
                />
                <button type="submit">Upload Video</button>
            </form>
        </div>
    );

};

export default VideoUploadComponent;
