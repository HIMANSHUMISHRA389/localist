import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/pages/RegistrationForm.css'

const RegistrationForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const service = searchParams.get('service')
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    hasWebsite: false,
    websiteAddress: '',
    jobsPerMonth: '',
    companySize: '',
    hasSalesTeam: false,
    usesSocialMedia: false
  })
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleRadioChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  const handleBack = () => {
    navigate(-1) // Go back to the previous page
  }
  
  const handleNext = () => {
    // Navigate to business address form with the registration data
    const params = new URLSearchParams()
    if (service) params.append('service', service)
    
    // Optionally pass other important data
    params.append('name', formData.name)
    params.append('email', formData.email)
    
    navigate(`/business-address?${params.toString()}`)
  }
  
  return (
    <div className="registration-page">
      <div className="registration-container">
        <h2 className="registration-title">Some details about you</h2>
        <p className="registration-subtitle">
          You're just a few steps away from viewing our {service || 'service'} leads.
        </p>
        
        <div className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="companyName">Company name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="form-input"
            />
            <p className="form-hint">If you aren't a business or don't have this information, you can leave this blank.</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone number (Optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Does your company have a website?</label>
            <div className="radio-buttons">
              <button 
                type="button"
                className={`radio-button ${formData.hasWebsite ? 'active' : ''}`}
                onClick={() => handleRadioChange('hasWebsite', true)}
              >
                Yes
              </button>
              <button 
                type="button"
                className={`radio-button ${formData.hasWebsite === false ? 'active' : ''}`}
                onClick={() => handleRadioChange('hasWebsite', false)}
              >
                No
              </button>
            </div>
          </div>
          
          {formData.hasWebsite && (
            <div className="form-group">
              <label htmlFor="websiteAddress">Website address (optional)</label>
              <input
                type="url"
                id="websiteAddress"
                name="websiteAddress"
                value={formData.websiteAddress}
                onChange={handleChange}
                className="form-input"
                placeholder="https://"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>What is the estimated number of new jobs per month you would like to help grow your business?</label>
            <div className="radio-pill-group">
              <button 
                type="button"
                className={`radio-pill ${formData.jobsPerMonth === '1-5' ? 'active' : ''}`}
                onClick={() => handleRadioChange('jobsPerMonth', '1-5')}
              >
                1-5
              </button>
              <button 
                type="button"
                className={`radio-pill ${formData.jobsPerMonth === '6-10' ? 'active' : ''}`}
                onClick={() => handleRadioChange('jobsPerMonth', '6-10')}
              >
                6-10
              </button>
              <button 
                type="button"
                className={`radio-pill ${formData.jobsPerMonth === '10-20' ? 'active' : ''}`}
                onClick={() => handleRadioChange('jobsPerMonth', '10-20')}
              >
                10-20
              </button>
              <button 
                type="button"
                className={`radio-pill ${formData.jobsPerMonth === '20-30' ? 'active' : ''}`}
                onClick={() => handleRadioChange('jobsPerMonth', '20-30')}
              >
                20-30
              </button>
              <button 
                type="button"
                className={`radio-pill ${formData.jobsPerMonth === '30+' ? 'active' : ''}`}
                onClick={() => handleRadioChange('jobsPerMonth', '30+')}
              >
                30+
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Company size, employees</label>
            <div className="radio-pill-group">
              <button 
                type="button"
                className={`radio-pill ${formData.companySize === 'Self-employed, Sole trader' ? 'active' : ''}`}
                onClick={() => handleRadioChange('companySize', 'Self-employed, Sole trader')}
              >
                Self-employed, Sole trader
              </button>
              <button 
                type="button"
                className={`radio-pill ${formData.companySize === '2-10' ? 'active' : ''}`}
                onClick={() => handleRadioChange('companySize', '2-10')}
              >
                2-10
              </button>
              <button 
                type="button"
                className={`radio-pill ${formData.companySize === '11-50' ? 'active' : ''}`}
                onClick={() => handleRadioChange('companySize', '11-50')}
              >
                11-50
              </button>
              <button 
                type="button"
                className={`radio-pill ${formData.companySize === '51-200' ? 'active' : ''}`}
                onClick={() => handleRadioChange('companySize', '51-200')}
              >
                51-200
              </button>
              <button 
                type="button"
                className={`radio-pill ${formData.companySize === '200+' ? 'active' : ''}`}
                onClick={() => handleRadioChange('companySize', '200+')}
              >
                200+
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Does your company have a sales team?</label>
            <div className="radio-buttons">
              <button 
                type="button"
                className={`radio-button ${formData.hasSalesTeam ? 'active' : ''}`}
                onClick={() => handleRadioChange('hasSalesTeam', true)}
              >
                Yes
              </button>
              <button 
                type="button"
                className={`radio-button ${formData.hasSalesTeam === false ? 'active' : ''}`}
                onClick={() => handleRadioChange('hasSalesTeam', false)}
              >
                No
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Does your company use social media?</label>
            <div className="radio-buttons">
              <button 
                type="button"
                className={`radio-button ${formData.usesSocialMedia ? 'active' : ''}`}
                onClick={() => handleRadioChange('usesSocialMedia', true)}
              >
                Yes
              </button>
              <button 
                type="button"
                className={`radio-button ${formData.usesSocialMedia === false ? 'active' : ''}`}
                onClick={() => handleRadioChange('usesSocialMedia', false)}
              >
                No
              </button>
            </div>
          </div>
          
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

export default RegistrationForm 