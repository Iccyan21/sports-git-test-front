import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import VideoUploadComponent from './archive/archive';
import PostList from './archive/post-list';
import MovieList from './archive/archive-list';
import PostAndMovieForm from './archive/archive-post';
import ArchiveDetail from './archive/archive-retail';
import RegisterDataForm from './archive/archive-post';
import ArchiveList from './archive/archive-list';
import ArticleForm from './articleForm/articleform';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
            <Route path="archive-form/" element={<RegisterDataForm/>} />
            <Route path="/playarchive/archive/:title" element={<ArchiveDetail/>} />
           <Route path="/post" element={<VideoUploadComponent />} />
           <Route path="post-list/" element={<PostList/>}/>
           <Route path="movie-list/:title" element={<MovieList/>} />
           <Route path="post-create/" element={<PostAndMovieForm/>}/>
           <Route path="archive/" element={<ArchiveList/>}/>
           <Route path="articleform/" element={<ArticleForm/>}/>

        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
