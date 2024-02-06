import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home, About, Results} from './pages'
import { Navbar } from './components'

import './App.css'

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {/* Adding a container class for centering the content */}
        <div className="content-container">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/results" element={<Results />} />
        </Routes>
        </div>
      </main>
      <footer>
        <div className="container">
          <Link to="/" className="logo-font">
            FastCals
          </Link>
          <span className="attribution">
            Craving Fast Food But Don't Want To Cheat On Your Goals? You're At The Right Place!
          </span>
        </div>
      </footer>
    </Router>
  );
}

export default App;