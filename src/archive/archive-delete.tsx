import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface ArchiveDeleteProps {
    title?: string;  // もし必要であれば型を調整してください
}

const ArchiveDelete: React.FC<ArchiveDeleteProps> = () => {
    const navigate = useNavigate();
    const { title } = useParams();

    const handleDelete = () => {
        fetch(`http://127.0.0.1:8000/playarchive/delete/${title}/`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            navigate('/path-to-redirect-after-delete');  // こちらで削除後のリダイレクト先を指定してください
        })
        .catch(error => {
            console.error("There was an error deleting the archive:", error);
            alert('Error deleting archive!');
        });
    };

    return (
        <div>
            <h2>Are you sure you want to delete this archive?</h2>
            <button onClick={handleDelete}>Confirm Delete</button>
            <button onClick={() => navigate(-1)}>Cancel</button>  {/* 一つ前のページに戻ります */}
        </div>
    );
}

export default ArchiveDelete;
