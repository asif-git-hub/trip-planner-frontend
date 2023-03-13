import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import { About } from './pages/About';
import { NotFoundError } from './pages/Error';
import Navbar from './components/Navbar';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { Footer } from './components/Footer';

function App() {

  return (
    <div className='App'>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/about" element={<About></About>} />
          <Route path="/blogs" element={<Blog></Blog>} />
          <Route path="/contact" element={<Contact></Contact>} />
          <Route path="*" element={<NotFoundError></NotFoundError>} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>

  );
}

export default App;
