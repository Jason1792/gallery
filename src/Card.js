import "./Card.css";
const Card = ({ 
        imageSrc, imageTiny, headline, dateLocation, date, location, description, filename, keywords, onImageClick }) => {
const tiny = imageTiny || imageSrc; // fall back if tiny missing
return (
        <div className="card">
                <div className="card-image-container">
                        <img src={tiny} alt={headline} onError={(e) => {
                        e.target.onerror = null; // prevent infinite loop
                        e.target.src = "/images/Image Not Available.png";
                        }}
                        onClick={onImageClick} />
                </div>
                <div className="card-text-container">
                        <h3 className="card-headline">{headline || ''}</h3>
                        <p className="card-date-location">{dateLocation}</p>
                        <p className="card-date">{date || ""}</p>
                        <p className="card-location">{location || ""}</p>
                        <p className="card-description">{description || ''}</p>
                        <p className="card-filename">{filename || ''}</p>
                        <p className="card-keywords">{keywords || ''}</p>
                </div>
        </div>
);
}

export default Card;