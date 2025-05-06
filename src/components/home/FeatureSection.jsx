import FeatureCard from './FeatureCard'
import '../../styles/components/FeatureSection.css'

const FeatureSection = () => {
  const features = [
    {
      id: 1,
      title: 'Get quality leads',
      bulletPoints: [
        'View leads locally or nationwide',
        'Review leads for free',
        'Get leads sent to you in real time'
      ],
      buttonText: 'How it works',
      buttonLink: '/how-it-works',
      icon: 'leads-icon'
    },
    {
      id: 2,
      title: 'Win new clients',
      bulletPoints: [
        'Pick the best leads for your business',
        'Unlock verified contact details',
        'Call or email them to win the job'
      ],
      buttonText: 'See an example lead',
      buttonLink: '/example-lead',
      icon: 'clients-icon'
    },
    {
      id: 3,
      title: 'Grow your Business',
      bulletPoints: [
        'Keep 100% of what you earn',
        'No commission or hidden fees',
        'Get Hired Guarantee on first leads'
      ],
      buttonText: 'See more about pricing',
      buttonLink: '/pricing',
      icon: 'business-icon'
    }
  ]

  return (
    <section className="feature-section">
      <div className="container">
        <div className="features-grid">
          {features.map(feature => (
            <FeatureCard 
              key={feature.id}
              title={feature.title}
              bulletPoints={feature.bulletPoints}
              buttonText={feature.buttonText}
              buttonLink={feature.buttonLink}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection 