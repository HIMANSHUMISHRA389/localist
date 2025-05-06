import { Link } from 'react-router-dom'
import '../../styles/components/FeatureCard.css'

const FeatureCard = ({ title, bulletPoints, buttonText, buttonLink, icon }) => {
  const [firstWord, ...restWords] = title.split(' ')
  
  return (
    <div className="feature-card">
      <div className="feature-header">
        <div className="feature-icon">
          <i className={icon}></i>
        </div>
        <h3 className="feature-title">
          {firstWord} <span className="highlight">{restWords.join(' ')}</span>
        </h3>
      </div>
      
      <ul className="feature-list">
        {bulletPoints.map((point, index) => (
          <li key={index} className="feature-item">
            {point}
          </li>
        ))}
      </ul>
      
      <Link to={buttonLink} className="feature-button">
        {buttonText}
      </Link>
    </div>
  )
}

export default FeatureCard 