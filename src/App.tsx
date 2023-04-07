import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { NotFoundError } from "./pages/Error"
import Navbar from "./components/Navbar"
import { Contact } from "./pages/Contact"
import { Blog } from "./pages/Blog"
import { Footer } from "./components/Footer"
import { Privacy } from "./pages/Privacy"
import { TermsOfService } from "./pages/TermsOfService"
import { POI } from "./pages/POI"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/home" element={<Home></Home>} />
          <Route path="/poi/:location/:destination" element={<POI></POI>} />
          <Route path="/about" element={<About></About>} />
          <Route path="/blogs" element={<Blog></Blog>} />
          <Route path="/contact" element={<Contact></Contact>} />
          <Route path="/privacy" element={<Privacy></Privacy>} />
          <Route path="/terms" element={<TermsOfService></TermsOfService>} />
          <Route path="*" element={<NotFoundError></NotFoundError>} />
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  )
}

export default App
