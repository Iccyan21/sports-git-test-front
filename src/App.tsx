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
import ArticlesList from './articleForm/articlelist';
import ArticleDetail from './articleForm/article-detail';
import ArchiveEdit from './archive/archive-edit';
import ArchiveCreate from './archive/archive-create';
import ArchiveDelete from './archive/archive-delete';


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
            <Route path="articles/" element={<ArticlesList/>}/>
           <Route path="articleform/" element={<ArticleForm/>}/>
           <Route path="articles/detail/:title/" element={<ArticleDetail/>}/>
           <Route path="/playarchive/edit-archive/:title" element={<ArchiveEdit/>}/>
           <Route path="create-archive/"element={<ArchiveCreate/>}/>
           <Route path="archive/delete/:title" element={<ArchiveDelete/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
