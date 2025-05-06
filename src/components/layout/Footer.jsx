import { Link } from 'react-router-dom'
import '../../styles/components/Footer.css'
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="Localists" />
            <div className="footer-tagline">Find Local Professionals-Fast</div>
          </div>
          
          <p className="footer-text">
            Localist is the world's fastest-growing marketplace, and we have 
            no intention of slowing down any time soon.
          </p>
          
          <div className="footer-help">
            <h3>Need Help?</h3>
            <Link to="/contact" className="contact-btn">Contact Us</Link>
          </div>
        </div>
        
        <div className="footer-nav">
          <div className="footer-column">
            <h3>For Customers</h3>
            <ul>
              <li><Link to="/find-professional">Find a Professional</Link></li>
              <li><Link to="/how-it-works-customer">How it works</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/mobile-app-customer">Mobile App</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>For Professionals</h3>
            <ul>
              <li><Link to="/how-it-works-pro">How it works</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/join-professional">Join as a Professional</Link></li>
              <li><Link to="/help-center">Help Centre</Link></li>
              <li><Link to="/mobile-app-pro">Mobile App</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>About</h3>
            <ul>
              <li><Link to="/about-bark">About Bark</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/press">Press</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-social">
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#" aria-label="Pinterest">
              <i className="fa fa-pinterest"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
          
          <div className="country-select">
            <select defaultValue="GB UK">
              <option value="GB UK">GB UK</option>
              <option value="US">US</option>
              <option value="CA">CA</option>
            </select>
          </div>
          
          <img src="/trustpilot-badge.png" alt="Trustpilot Rating" className="trustpilot-rating" />
        </div>
      </div>
      
      <div className="footer-contact">
        <div className="contact-info">
          <a href="mailto:india@localist.com" className="contact-item">
            <i className="fa fa-envelope"></i> india@localist.com
          </a>
          <a href="tel:+910000000000" className="contact-item">
            <i className="fa fa-phone"></i> +91 0000000000
          </a>
          <span className="contact-item">
            <i className="fa fa-clock-o"></i> (Mon-Fri, 9:00am-6:00pm)
          </span>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Localist. <a href="/terms">Terms & Conditions</a> / <a href="/cookie-policy">Cookie policy</a> / <a href="/privacy-policy">Privacy policy</a></p>
      </div>
    </footer>
  )
}

export default Footer 