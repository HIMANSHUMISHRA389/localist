import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import GooglePlacesAutocomplete from '../components/common/GooglePlacesAutocomplete'
import ServiceCard from '../components/common/ServiceCard'
import '../styles/pages/AdditionalServicesForm.css'

const AdditionalServicesForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const service = searchParams.get('service') || 'House And Garden'
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedServices, setSelectedServices] = useState(['House Cleaning', 'Business & Carrier Counselling'])
  const [serviceSuggestions, setServiceSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [radius, setRadius] = useState('1 mile')
  const [postcode, setPostcode] = useState(searchParams.get('postcode') || '')
  const [availableLeads, setAvailableLeads] = useState(23)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Function to fetch suggestions from API
  const fetchSuggestions = async (query) => {
    if (!query || query.trim() === '') {
      setServiceSuggestions([])
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      // Send the payload in the format required by the API
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/search-services`, 
        { search: query }
      )
      
      // Handle the response according to the specified format
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setServiceSuggestions(response.data.data)
      } else {
        setServiceSuggestions([])
      }
    } catch (err) {
      console.error('Error fetching service suggestions:', err)
      setError('Failed to load suggestions')
      setServiceSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }
  
  // Debounce search input to prevent excessive API calls
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        fetchSuggestions(searchQuery)
      }
    }, 300) // Wait 300ms after user stops typing
    
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])
  
  const handleSelectService = (service) => {
    const serviceName = service.name || service
    if (!selectedServices.includes(serviceName)) {
      setSelectedServices([...selectedServices, serviceName])
    }
    setSearchQuery('')
  }
  
  const handleRemoveService = (service) => {
    setSelectedServices(selectedServices.filter(s => s !== service))
  }
  
  const handleExpandRadius = () => {
    setIsExpanded(true)
    // Mock increasing the radius and updating available leads
    if (radius === '1 mile') {
      setRadius('5 miles')
      setAvailableLeads(42)
    } else if (radius === '5 miles') {
      setRadius('10 miles')
      setAvailableLeads(78)
    }
  }
  
  const handleBack = () => {
    navigate(-1) // Go back to the previous page
  }
  
  const handleContinue = async () => {
    try {
      setIsSubmitting(true)
      
      // Get data from previous steps via URL params or localStorage
      const name = searchParams.get('name') || localStorage.getItem('name') || 'Himanshu Mishra'
      const email = searchParams.get('email') || localStorage.getItem('email') || 'himanshum453ishra389@gmail.com'
      const phone = searchParams.get('phone') || localStorage.getItem('phone') || '9354111045'
      const companyName = searchParams.get('companyName') || localStorage.getItem('companyName') || ''
      const isCompanyWebsite = searchParams.get('hasWebsite') === 'true' || localStorage.getItem('isCompanyWebsite') === '1' ? 1 : 0
      const companyWebsite = searchParams.get('websiteAddress') || localStorage.getItem('companyWebsite') || ''
      const newJobs = searchParams.get('jobsPerMonth') || localStorage.getItem('newJobs') || null
      const companySize = searchParams.get('companySize') || localStorage.getItem('companySize') || null
      const companySalesTeam = searchParams.get('hasSalesTeam') === 'true' || localStorage.getItem('companySalesTeam') === '1' ? 1 : 0
      const socialMedia = searchParams.get('usesSocialMedia') === 'true' || localStorage.getItem('socialMedia') === '1' ? 1 : 0
      
      // Get address data
      const streetAddress = searchParams.get('streetAddress') || localStorage.getItem('streetAddress') || '2528'
      const buildingName = searchParams.get('buildingName') || localStorage.getItem('buildingName') || '2528'
      const city = searchParams.get('city') || localStorage.getItem('city') || 'fbd'
      const country = searchParams.get('country') || localStorage.getItem('country') || 'India'
      const zipcode = searchParams.get('postcode') || localStorage.getItem('zipcode') || '121001'
      const isZipcode = searchParams.get('hasPostcode') === 'true' || localStorage.getItem('isZipcode') === '1' ? 1 : 0
      
      // Get service data
      const serviceId = searchParams.get('serviceId') || localStorage.getItem('serviceId') || '4'
      const isOnline = searchParams.get('remote') === 'true' || localStorage.getItem('isOnline') === '1' ? 1 : 0
      const isNationWide = searchParams.get('nationwide') === 'true' || localStorage.getItem('nationwide') === '1' ? 1 : 0
      const autoBid = selectedServices.includes('Auto Bid') ? 1 : 0
      
      // Build the payload
      const payload = {
        name,
        email,
        phone,
        company_name: companyName,
        is_company_website: isCompanyWebsite,
        company_website: companyWebsite,
        new_jobs: newJobs,
        company_size: companySize,
        company_sales_team: companySalesTeam,
        social_media: socialMedia,
        address: streetAddress,
        apartment: buildingName,
        suite: "",
        city,
        state: "",
        country,
        is_zipcode: isZipcode,
        zipcode,
        postcode,
        service_id: serviceId,
        is_online: isOnline,
        nation_wide: isNationWide,
        auto_bid: autoBid,
        miles1: radius.split(' ')[0],
        miles2: "1",
        password: "",
        active_status: 1,
        form_status: 1,
        user_type: 1,
        loggedUser: 1
      }
      
      // Make the API call
      const response = await axios.post(
        'https://localists.zuzucodes.com/admin/api/users/registration',
        payload
      )
      
      if (response.data && response.data.success) {
        // Show success toast
        toast.success('Registration successful! Redirecting to home page...', {
          position: "top-center",
          autoClose: 3000
        })
        
        // Clear any stored data
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        // Clear other items as well...
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        // Show error toast
        toast.error(response.data?.message || 'Registration failed. Please try again.', {
          position: "top-center"
        })
      }
    } catch (error) {
      console.error('Error submitting registration:', error)
      
      // Show error toast
      toast.error('Registration failed. Please try again.', {
        position: "top-center"
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="additional-services-page">
      <div className="additional-services-container">
        <h2 className="services-title">Add other services you can provide</h2>
        <p className="services-subtitle">Maximise your leads</p>
        
        <div className="services-form">
          <div className="service-selection">
            <div className="current-service">
              <label>You've asked for leads for:</label>
              <div className="service-tag">{service}</div>
            </div>
            
            <div className="additional-leads">
              <p>We will also show you leads from</p>
              
              <div className="selected-service-tags">
                {selectedServices.map((selectedService) => (
                  <div key={selectedService} className="service-tag-with-remove">
                    <span>{selectedService}</span>
                    <button 
                      className="remove-tag-btn"
                      onClick={() => handleRemoveService(selectedService)}
                      aria-label={`Remove ${selectedService}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="search-services">
                <input
                  type="text"
                  placeholder="Search for more services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="service-search-input"
                />
                
                {isLoading && (
                  <div className="loading-indicator">Loading...</div>
                )}
                
                {error && (
                  <div className="error-message">{error}</div>
                )}
                
                {!isLoading && !error && searchQuery && serviceSuggestions.length > 0 && (
                  <ul className="service-suggestions">
                    {serviceSuggestions.map((suggestion) => (
                      <li 
                        key={suggestion.id}
                        onClick={() => handleSelectService(suggestion)}
                        className="suggestion-item"
                      >
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                )}
                
                {!isLoading && !error && searchQuery && serviceSuggestions.length === 0 && (
                  <div className="no-results">No services found</div>
                )}
              </div>
            </div>
            
            <div className="location-filters">
              <div className="radius-selection">
                <select 
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="radius-dropdown"
                >
                  <option value="1 mile">1 mile</option>
                  <option value="5 miles">5 miles</option>
                  <option value="10 miles">10 miles</option>
                  <option value="25 miles">25 miles</option>
                </select>
              </div>
              
              <div className="postcode-selection">
                <GooglePlacesAutocomplete
                  value={postcode}
                  onChange={setPostcode}
                  placeholder="Enter your PIN code"
                />
              </div>
            </div>
            
            <button 
              className="expand-radius-button"
              onClick={handleExpandRadius}
              disabled={isExpanded && radius === '10 miles'}
            >
              Expand Radius
            </button>
            
            <div className="leads-counter">
              <div className="counter-number">{availableLeads}</div>
              <div className="counter-label">current available leads</div>
            </div>
          </div>
          
          <div className="form-actions">
            <button onClick={handleBack} className="back-button">
              Back
            </button>
            <button 
              onClick={handleContinue} 
              className="continue-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdditionalServicesForm 