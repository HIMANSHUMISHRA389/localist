import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../styles/components/PopularServices.css'

const PopularServices = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Landscaping', icon: '🏡' },
    { id: 2, name: 'Events & Entertainers', icon: '🎪' },
    { id: 3, name: 'General Photography', icon: '📸' },
    { id: 4, name: 'Life Coaching', icon: '🧠' },
    { id: 5, name: 'Web Development', icon: '💻' },
    { id: 6, name: 'test', icon: '🧪' },
    { id: 7, name: 'Health & Wellness', icon: '🧘' },
    { id: 8, name: 'Web Designs', icon: '🎨' },
    { id: 9, name: 'House and Garden', icon: '🏠' }
  ])

  // Optionally fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/services/popular`)
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setServices(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching popular services:', error)
      }
    }

    // Uncomment to fetch from API
    // fetchServices()
  }, [])

  return (
    <div className="popular-services">
      <h2 className="services-title">Popular services</h2>
      <div className="services-grid">
        {services.map((service) => (
          <Link 
            to={`/location-selection?service=${encodeURIComponent(service.name)}`}
            key={service.id} 
            className="service-item"
          >
            <span className="service-icon">{service.icon}</span>
            <span className="service-name">{service.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PopularServices 