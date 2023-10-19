import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Category = {
    id: number;
    name: string;
};

type Tag = {
    id: number;
    name: string;
};

const ArticleForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string>('');

    const [responseMessage, setResponseMessage] = useState<string | null>(null);

    useEffect(() => {
        // カテゴリとタグのデータをサーバーから取得
        axios.get('http://127.0.0.1:8000/articles/category/')
            .then(response => setCategories(response.data))
            .catch(error => console.error("Failed to fetch categories:", error));

        axios.get('http://127.0.0.1:8000/articles/tag/')
            .then(response => setTags(response.data))
            .catch(error => console.error("Failed to fetch tags:", error));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            title,
            content,
            category: selectedCategory,
            tags: selectedTags
        };        

        axios.post('http://127.0.0.1:8000/articles/create/', data)
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
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} />
                </div>
                <div>
                    <label>Category:</label>
                    <select value={selectedCategory || ''} onChange={e => setSelectedCategory(e.target.value)}>
                        <option value="">Select a category...</option>
                        {categories.map(category => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                <label>Tags:</label>
                    {tags.map(tag => (
                        <label key={tag.name}>
                            <input 
                                type="radio"  // タイプを'checkbox'から'radio'に変更
                                name="tags"   // 同じ名前を持つ全てのラジオボタンは同じグループとなります
                                value={tag.name} 
                                checked={selectedTags === tag.name} 
                                onChange={e => {
                                    setSelectedTags(e.target.value);
                                }} 
                            />
                            {tag.name}
                        </label>
                    ))}

                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ArticleForm;
