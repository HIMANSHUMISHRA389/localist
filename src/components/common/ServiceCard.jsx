import '../../styles/components/ServiceCard.css'

const ServiceCard = ({ name, icon }) => {
  // Check if the icon is a URL (image path)
  // const isImageUrl = icon && (icon.startsWith('http') || icon.startsWith('/'));
  
  // // Check if the icon is an SVG path
  // const isSvgPath = icon && icon.startsWith('<svg') || icon.startsWith('data:image/svg');
  
  return (
    <div className="service-card">
      {/* <div className="service-icon">
        {isImageUrl ? (
          // Render image if it's a URL
          // <img src={icon} alt={name} className="service-icon-img" /> 
          ""
        ) : isSvgPath ? (
          // Render SVG if it's an SVG string
          <div dangerouslySetInnerHTML={{ __html: icon }} />
        ) : icon ? (
          // Render icon class if it's a class name
          <i className={icon}></i>
        ) : (
          // Fallback icon if none provided
          <div className="default-icon">{name.charAt(0)}</div>
        )}
      </div> */}
      <h3 className="service-name">{name}</h3>
    </div>
  )
}

export default ServiceCard 