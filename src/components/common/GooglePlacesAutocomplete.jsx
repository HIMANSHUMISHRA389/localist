import { useState, useEffect, useRef } from 'react'
import '../../styles/components/GooglePlacesAutocomplete.css'

const GooglePlacesAutocomplete = ({ value, onChange, placeholder }) => {
  const [predictions, setPredictions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  // Load Google Maps JavaScript API script
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => initAutocomplete()
      document.head.appendChild(script)
      
      return () => {
        document.head.removeChild(script)
      }
    } else if (window.google && window.google.maps && window.google.maps.places) {
      initAutocomplete()
    }
  }, [])

  // Initialize the autocomplete service
  const initAutocomplete = () => {
    if (window.google && window.google.maps && window.google.maps.places) {
      window.autocompleteService = new window.google.maps.places.AutocompleteService()
      window.placesService = new window.google.maps.places.PlacesService(document.createElement('div'))
    }
  }

  // Fetch predictions when input value changes
  useEffect(() => {
    if (!value || value.length < 2 || !window.autocompleteService) return

    setIsLoading(true)
    
    const fetchPredictions = async () => {
      try {
        // For numeric inputs (likely a PIN code), use postal_code type
        const isNumeric = /^\d+$/.test(value)
        
        const request = {
          input: value,
          componentRestrictions: { country: 'IN' }, // India
          // Use only one type at a time - postal_code for numeric inputs, geocode otherwise
          types: isNumeric ? ['postal_code'] : ['geocode']
        }
        
        window.autocompleteService.getPlacePredictions(
          request,
          (predictions, status) => {
            setIsLoading(false)
            
            if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
              setPredictions([])
              return
            }
            
            setPredictions(predictions)
            setShowDropdown(true)
          }
        )
      } catch (error) {
        console.error('Error fetching place predictions:', error)
        setIsLoading(false)
        setPredictions([])
      }
    }

    const timer = setTimeout(() => {
      fetchPredictions()
    }, 300) // Debounce input

    return () => clearTimeout(timer)
  }, [value])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle prediction selection
  const handleSelectPrediction = (prediction) => {
    // Get place details to get the formatted address
    window.placesService.getDetails(
      {
        placeId: prediction.place_id,
        fields: ['formatted_address', 'geometry'],
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // Extract full address and PIN code
          const formattedAddress = place.formatted_address
          const mainText = prediction.structured_formatting?.main_text || ''
          
          // For display, we want to show the full location or PIN code
          // Depending on what was selected
          
          // If the user selected a PIN code directly
          if (/^\d{6}$/.test(mainText)) {
            onChange(mainText)
          } else {
            // Extract PIN code from address or use formatted address
            const pinCode = extractIndianPostcode(formattedAddress)
            onChange(pinCode || formattedAddress)
          }
          
          setShowDropdown(false)
        }
      }
    )
  }

  // Helper function to extract Indian postcode from address
  const extractIndianPostcode = (address) => {
    // Indian PIN codes are 6 digits
    const pinCodeRegex = /\b(\d{6})\b/
    const match = address.match(pinCodeRegex)
    
    return match ? match[1] : null
  }

  return (
    <div className="google-places-autocomplete">
      <div className="location-input">
        <span className="location-icon">📍</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value && predictions.length > 0 && setShowDropdown(true)}
          placeholder={placeholder || "Enter your PIN code or location"}
          className="postcode-input"
        />
        {isLoading && <div className="spinner"></div>}
      </div>
      
      {showDropdown && predictions.length > 0 && (
        <ul ref={dropdownRef} className="predictions-dropdown">
          {predictions.map((prediction) => (
            <li
              key={prediction.place_id}
              onClick={() => handleSelectPrediction(prediction)}
              className="prediction-item"
            >
              <div className="prediction-icon">📍</div>
              <div className="prediction-text">
                <div className="prediction-main">
                  {prediction.structured_formatting.main_text}
                </div>
                <div className="prediction-secondary">
                  {prediction.structured_formatting.secondary_text}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default GooglePlacesAutocomplete 