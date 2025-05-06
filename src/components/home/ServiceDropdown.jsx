import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '../../styles/components/ServiceDropdown.css'

const ServiceDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(value || '')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dropdownRef = useRef(null)
  
  // Update internal search query when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSearchQuery(value)
    }
  }, [value])
  
  // Function to fetch suggestions from API
  const fetchSuggestions = async (query) => {
    if (!query || query.trim() === '') {
      setSuggestions([])
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      // Send the payload in the format required by the API
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/search-services`, 
        { search: query }
      )
      
      // Handle the response according to the specified format
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setSuggestions(response.data.data)
      } else {
        setSuggestions([])
      }
    } catch (err) {
      console.error('Error fetching service suggestions:', err)
      setError('Failed to load suggestions')
      setSuggestions([])
    } finally {
      setLoading(false)
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
  
  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  const handleChange = (e) => {
    const newValue = e.target.value
    setSearchQuery(newValue)
    
    // Call parent onChange if provided
    if (onChange) {
      onChange(newValue)
    }
    
    setIsOpen(true)
  }
  
  const handleSelectService = (service) => {
    // Extract the service name from the service object
    const serviceName = service.name
    
    setSearchQuery(serviceName)
    
    // Call parent onChange if provided
    if (onChange) {
      onChange(serviceName)
    }
    
    setIsOpen(false)
  }
  
  return (
    <div className="service-dropdown" ref={dropdownRef}>
      <input
        type="text"
        className="search-input"
        value={searchQuery}
        onChange={handleChange}
        onClick={() => setIsOpen(true)}
        placeholder="Search for a service..."
      />
      
      {isOpen && (
        <div className="dropdown-menu">
          {loading && (
            <div className="loading-indicator">Loading...</div>
          )}
          
          {error && (
            <div className="error-message">{error}</div>
          )}
          
          {!loading && !error && suggestions.length > 0 && (
            suggestions.map((service) => (
              <div
                key={service.id}
                className="dropdown-item"
                onClick={() => handleSelectService(service)}
              >
                <div className="service-item">
                  {/* {service.category_icon && (
                    <img 
                      src={`${import.meta.env.VITE_API_BASE_URL}/uploads/category/${service.category_icon}`} 
                      alt={service.name} 
                      className="service-icon-img"
                    />
                  )} */}
                  <span>{service.name}</span>
                </div>
              </div>
            ))
          )}
          
          {!loading && !error && suggestions.length === 0 && searchQuery && (
            <div className="no-results">No services found</div>
          )}
          
          {!loading && !error && !searchQuery && (
            <div className="helper-text">Type to search for services</div>
          )}
        </div>
      )}
    </div>
  )
}

export default ServiceDropdown 