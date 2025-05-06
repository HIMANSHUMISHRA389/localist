import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import GooglePlacesAutocomplete from '../components/common/GooglePlacesAutocomplete'
import '../styles/pages/BusinessAddressForm.css'

const BusinessAddressForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const service = searchParams.get('service')
  
  // Form state
  const [formData, setFormData] = useState({
    streetAddress: '',
    buildingName: '',
    city: '',
    country: '',
    hasPostcode: true,
    postcode: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleRadioChange = (value) => {
    setFormData(prev => ({
      ...prev,
      hasPostcode: value
    }))
  }
  
  const handleBack = () => {
    navigate(-1) // Go back to the previous page
  }
  
  const handleNext = () => {
    // Navigate to additional services page with the collected address data
    const params = new URLSearchParams()
    if (service) params.append('service', service)
    
    // Pass the postcode to the next screen
    if (formData.hasPostcode && formData.postcode) {
      params.append('postcode', formData.postcode)
    }
    
    navigate(`/additional-services?${params.toString()}`)
  }
  
  return (
    <div className="address-page">
      <div className="address-container">
        <h2 className="address-title">Your business address</h2>
        <p className="address-subtitle">This will be used for tax & billing</p>
        
        <div className="address-form">
          <div className="form-group">
            <label htmlFor="streetAddress">Street address</label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="buildingName">Building or House Name/Number</label>
            <input
              type="text"
              id="buildingName"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Postcode</label>
            <div className="radio-buttons">
              <button 
                type="button"
                className={`radio-button ${formData.hasPostcode ? 'active' : ''}`}
                onClick={() => handleRadioChange(true)}
              >
                Yes
              </button>
              <button 
                type="button"
                className={`radio-button ${formData.hasPostcode === false ? 'active' : ''}`}
                onClick={() => handleRadioChange(false)}
              >
                No
              </button>
            </div>
          </div>
          
          {formData.hasPostcode && (
            <div className="form-group">
              <GooglePlacesAutocomplete
                value={formData.postcode}
                onChange={(value) => setFormData(prev => ({ ...prev, postcode: value }))}
                placeholder="Postcode"
              />
            </div>
          )}
          
          <div className="form-actions">
            <button onClick={handleBack} className="back-button">
              Back
            </button>
            <button onClick={handleNext} className="next-button">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessAddressForm 