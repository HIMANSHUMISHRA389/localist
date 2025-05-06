import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import GooglePlacesAutocomplete from '../components/common/GooglePlacesAutocomplete'
import '../styles/pages/LocationSelection.css'

const LocationSelection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const service = searchParams.get('service')
  
  const [selectedMiles, setSelectedMiles] = useState('1 mile')
  const [postcode, setPostcode] = useState('')
  const [isNationwide, setIsNationwide] = useState(false)
  const [isRemote, setIsRemote] = useState(true)
  
  const handleNext = () => {
    // Navigate to registration form with the collected location data
    const params = new URLSearchParams()
    if (service) params.append('service', service)
    params.append('miles', selectedMiles)
    if (postcode) params.append('location', postcode)
    params.append('nationwide', isNationwide.toString())
    params.append('remote', isRemote.toString())
    
    navigate(`/registration-form?${params.toString()}`)
  }
  
  return (
    <div className="location-selection-page">
      <div className="location-selection-container">
        <h2 className="location-title">Where would you like to see leads from?</h2>
        <p className="location-subtitle">Tell us the area you cover so we can show you leads for your location</p>
        
        <div className="location-form">
          <div className="form-section">
            <h3 className="section-title">I serve customers within</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Miles</label>
                <select 
                  value={selectedMiles}
                  onChange={(e) => setSelectedMiles(e.target.value)}
                  className="miles-dropdown"
                >
                  <option value="1 mile">1 mile</option>
                  <option value="5 miles">5 miles</option>
                  <option value="10 miles">10 miles</option>
                  <option value="25 miles">25 miles</option>
                  <option value="50 miles">50 miles</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>From</label>
                <GooglePlacesAutocomplete
                  value={postcode}
                  onChange={setPostcode}
                  placeholder="Enter your postcode"
                />
              </div>
            </div>
            
            <div className="checkbox-group">
              <label className="checkbox-container">
                <input 
                  type="checkbox"
                  checked={isNationwide}
                  onChange={() => setIsNationwide(!isNationwide)}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">Nationwide</span>
              </label>
              
              <div className="toggle-container">
                <label className="toggle-switch">
                  <input 
                    type="checkbox"
                    checked={isRemote}
                    onChange={() => setIsRemote(!isRemote)}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className="toggle-label">Online/Remote Lead</span>
              </div>
            </div>
            
            <div className="info-text">
              <span className="info-icon">ℹ️</span>
              <span>You can change your location at any time</span>
            </div>
          </div>
          
          <button onClick={handleNext} className="next-button">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default LocationSelection 