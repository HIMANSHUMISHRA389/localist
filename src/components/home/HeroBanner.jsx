import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ServiceDropdown from './ServiceDropdown'
import '../../styles/components/HeroBanner.css'

const HeroBanner = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  
  const handleSearch = () => {
    if (searchQuery) {
      // Navigate to location selection page with the service query
      navigate(`/location-selection?service=${encodeURIComponent(searchQuery)}`)
    }
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      handleSearch()
    }
  }
  
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1 className="hero-title">Find Local Jobs For<br />Your Business Now</h1>
        <p className="hero-subtitle">1000's of local and remote clients are already waiting for your services</p>
        
        <div className="search-container" onKeyPress={handleKeyPress}>
          <ServiceDropdown 
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <button 
            className="get-started-button" 
            onClick={handleSearch}
            disabled={!searchQuery}
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner 