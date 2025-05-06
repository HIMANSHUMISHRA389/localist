import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../../styles/components/Header.css'
import logo from '../../assets/logo.png'

const Header = () => {
  const [showServicesMenu, setShowServicesMenu] = useState(false)

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Localists" className="logo" />
          </Link>
        </div>
        
        <div className="services-dropdown dropdown">
          <button 
            className="services-dropdown-button"
            onMouseEnter={() => setShowServicesMenu(true)}
            onMouseLeave={() => setShowServicesMenu(false)}
          >
            Explore Our Services <i className="fa fa-angle-down"></i>
          </button>
          {showServicesMenu && (
            <div 
              className="dropdown-content services-menu"
              onMouseEnter={() => setShowServicesMenu(true)}
              onMouseLeave={() => setShowServicesMenu(false)}
            >
              <Link to="/landscaping" className="dropdown-item">Landscaping</Link>
              <Link to="/events-entertainers" className="dropdown-item">Events & Entertainers</Link>
              <Link to="/photography" className="dropdown-item">General Photography</Link>
              <Link to="/life-coaching" className="dropdown-item">Life Coaching</Link>
              <Link to="/web-development" className="dropdown-item">Web Development</Link>
              <Link to="/health-wellness" className="dropdown-item">Health & Wellness</Link>
              <Link to="/web-designs" className="dropdown-item">Web Designs</Link>
              <Link to="/house-garden" className="dropdown-item">House and Garden</Link>
            </div>
          )}
        </div>
        
        <div className="auth-actions">
          <div className="search-icon">
            <i className="fa fa-search"></i>
          </div>
          <Link to="/login" className="login-button">Login</Link>
          <Link to="/join-professional" className="join-button">Join as a Professional</Link>
        </div>
      </div>
    </header>
  )
}

export default Header 