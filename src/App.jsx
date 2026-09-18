import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Placeholders (We will create these next)
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
// import Rentals from './pages/Rentals';
import Club from './pages/Club';
import Donate from './pages/Donate';
import Gallery from './pages/Gallery';
import SundaySchool from './pages/SundaySchool';
import Contact from './pages/Contact';
import Membership from './pages/Membership';
import Spotlight from './pages/Spotlight';
import Login from './pages/Login';
import Portal from './pages/Portal';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
          <div className="prayer-flag-border"></div>
          <div className="desktop-notice">
            ✨ For the best experience, we highly recommend using a desktop browser.
          </div>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              {/* <Route path="/rentals" element={<Rentals />} /> */}
              <Route path="/club" element={<Club />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/sundayschool" element={<SundaySchool />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/spotlight" element={<Spotlight />} />
              <Route path="/login" element={<Login />} />
              <Route path="/portal" element={<Portal />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
