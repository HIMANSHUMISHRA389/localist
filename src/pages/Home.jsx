import HeroBanner from '../components/home/HeroBanner'
import PopularServices from '../components/home/PopularServices'
import FeatureSection from '../components/home/FeatureSection'
import '../styles/pages/Home.css'

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container hero-container">
          <HeroBanner />
          <PopularServices />
        </div>
      </div>
      <FeatureSection />
    </div>
  )
}

export default Home 