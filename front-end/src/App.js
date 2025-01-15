import React from 'react';
import "./assets/styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, PostPage, CreatePost, EditPost, Dashboard, Test, Subscribe, Advitalk, Finops, AI, BC, Bitcoin } from './pages'
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/advitalk" element={<Advitalk />} />
          <Route path="/finops" element={<Finops />} />
          <Route path="/ai" element={< AI/>} />
          <Route path="/bc" element={< BC/>} />
          <Route path="/bitcoin" element={< Bitcoin/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
