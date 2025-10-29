import "./App.css";
import Header from "./Header";
import Card from "./Card";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";

function App() {
  const [cardData, setCardData] = useState([]);
  const [filteredCardData, setFilteredCardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);   // 👈 NEW

  useEffect(() => {
    setLoading(true);
    fetch("https://script.google.com/macros/s/AKfycbz7AC7ptwQ91zSTO9xYisad8JmB5YmtB3jDq_ZZatYxZHtbuJPlvlswu-JUXcJgKiBJ1g/exec")
      .then(res => res.json())
      .then(data => {
        setCardData(data);
        setFilteredCardData(data);
      })
      .catch(err => console.error("Error loading data:", err))
      .finally(() => setLoading(false));           // 👈 clear loading
  }, []);


useEffect(() => {
  const toText = (v, fieldName, card) => {
    if (v == null) return ""; // null/undefined → safe empty string
    if (typeof v !== "string") {
      console.warn(
        `Non-string value in field "${fieldName}" for card:`,
        card,
        "Value:",
        v
      );
      return String(v); // still coerce to string so search works
    }
    return v.toLowerCase();
  };

  const term = searchTerm.toLowerCase();

  if (searchTerm === "") {
    setFilteredCardData(cardData);
  } else {
    const results = cardData.filter((card) =>
      [ "headline", "filename", "description", "keywords" ].some((field) =>
        toText(card[field], field, card).includes(term)
      )
    );
    setFilteredCardData(results);
  }
}, [searchTerm, cardData]);

// Safe text coercion for anything (null, number, object, etc.)
const asText = (v) => {
  if (v == null) return "";            // null/undefined
  if (typeof v === "string") return v.trim();
  // If it's a Date (unlikely after JSON), format it; else String() then trim
  if (v instanceof Date) return v.toLocaleDateString();
  return String(v).trim();
};

// Combine date + location safely (no dangling separators)
const formatDateLocation = (date, location) => {
  const d = asText(date);
  const l = asText(location);
  return d && l ? `${d} • ${l}` : d || l;
};
cardData.forEach((c, i) => {
  if (c.date != null && typeof c.date !== "string")
    console.warn("Non-string date at row", i, c.date);
  if (c.location != null && typeof c.location !== "string")
    console.warn("Non-string location at row", i, c.location);
});
  return (
    <div className="App">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
<main>
  {loading ? (
    <div className="no-results">
      <p>Loading...</p>
    </div>
  ) : filteredCardData.length > 0 ? (
    <div className="card-grid">
      {filteredCardData.map((card, idx) => (
        <Card
          key={idx}
          imageSrc={card.imageSrc}
          imageTiny={card.imageTiny}
          headline={card.headline}
          dateLocation={formatDateLocation(card.date, card.location)}
          date={card.date}
          location={card.location}
          description={card.description}
          filename={card.filename}
          keywords={card.keywords}
          onImageClick={() => setSelectedIndex(idx)}
        />
      ))}
    </div>
  ) : (
    <div className="no-results">
      <p>No results found for your search term</p>
    </div>
  )}
</main>
       {selectedIndex !== null && (
        <ImageModal
        imageSrc={filteredCardData[selectedIndex].imageSrc}
        imageSmall={filteredCardData[selectedIndex].imageSmall}
        imageMedium={filteredCardData[selectedIndex].imageMedium}
        imageLarge={filteredCardData[selectedIndex].imageLarge} 
        headline={filteredCardData[selectedIndex].headline}
        dateLocation={formatDateLocation(
                filteredCardData[selectedIndex].date,
                filteredCardData[selectedIndex].location)}
        date={filteredCardData[selectedIndex].date}
        location={filteredCardData[selectedIndex].location}
        description={filteredCardData[selectedIndex].description}
        filename={filteredCardData[selectedIndex].filename}
        keywords={filteredCardData[selectedIndex].keywords}
        onClose={() => setSelectedIndex(null)}
        onNext={() => setSelectedIndex((prev) => (prev + 1) % filteredCardData.length)}
        onPrev={() => setSelectedIndex((prev) => (prev - 1 + filteredCardData.length) % filteredCardData.length)}/>)}</div>);}
export default App;
