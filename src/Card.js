import "./Card.css";
const Card = ({ imageSrc, headline, date, location, description, filename, keywords, onImageClick }) => {

return (
        <div className="card">
                <div className="card-image">
                        <img className="card-image" src={imageSrc} alt={headline} onError={(e) => {
                        e.target.onerror = null; // prevent infinite loop
                        e.target.src = "/images/Image Not Available.png";
                        }}
                        onClick={onImageClick}
                        />
                </div>
                <div className="card-text">
                        <h3 className="card-headline">{headline || ''}</h3>
                        <p className="card-date">{date || ''}</p>
                        <p className="card-location">{location || ''}</p>
                        <p className="card-description">{description || ''}</p>
                        <p className="card-filename">{filename || ''}</p>
                        <p className="card-keywords">{keywords || ''}</p>
                </div>
        </div>
);
}

export default Card;