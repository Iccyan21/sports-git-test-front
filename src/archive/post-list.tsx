import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface PostProps {
    title: string;
    description: string;
}

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);

    useEffect(() => {
        // APIからポストデータを取得
        axios.get('http://127.0.0.1:8000/myapp/posts/')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>
                        <Link to={`/movie-list/${post.title}`}>
                            <h2>{post.title}</h2>
                        </Link>
                        <p>{post.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
