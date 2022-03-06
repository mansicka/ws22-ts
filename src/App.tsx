import React from 'react';
import Posts from './routes/Posts';
import SinglePost from './routes/SinglePost'
import UserProfile from './routes/UserProfile'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/post" element={<SinglePost />} >
        <Route path=":postId" element={<SinglePost />}/>
        </Route>
      <Route path="/user" element={<UserProfile/>}> 
      <Route path=":userId" element={<UserProfile/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
