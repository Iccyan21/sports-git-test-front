import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import VideoUploadComponent from './archive/archive';
import PostList from './archive/post-list';
import MovieList from './archive/archive-list';
import PostAndMovieForm from './archive/archive-post';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
           <Route path="/post" element={<VideoUploadComponent />} />
           <Route path="post-list/" element={<PostList/>}/>
           <Route path="movie-list/:title" element={<MovieList/>} />
           <Route path="post-create/" element={<PostAndMovieForm/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
