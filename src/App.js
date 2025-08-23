import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Card from "./Card";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import ImageModal from "./ImageModal";

function App() {
  const [cardData, setCardData] = useState([]);
  const [filteredCardData, setFilteredCardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  
  const [selectedIndex, setSelectedIndex] = useState(null);

useEffect(() => {
  fetch("https://script.google.com/macros/s/AKfycbz7AC7ptwQ91zSTO9xYisad8JmB5YmtB3jDq_ZZatYxZHtbuJPlvlswu-JUXcJgKiBJ1g/exec")
    .then(res => res.json())
      .then(data => {
        setCardData(data);
        setFilteredCardData(data); // Initialize filtered data with all cards
      });
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

  return (
    <div className="App">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <main>
        <div className="card-grid">
                {filteredCardData.length > 0 ? (
                filteredCardData.map((card, idx) => (
        <Card
          key={idx}
          imageSrc={card.imageSrc}
          headline={card.headline}
          date={card.date}
          location={card.location}
          description={card.description}
          filename={card.filename}
          keywords={card.keywords}
          onImageClick={() => setSelectedIndex(idx)}   // store index instead of card
      />
      ))
    ) : (
      <p>No results found for your search term.</p>
    )}
  </div>
</main>
      <Footer />
       {selectedIndex !== null && (
  <ImageModal
    imageSrc={filteredCardData[selectedIndex].imageSrc}
    headline={filteredCardData[selectedIndex].headline}
    date={filteredCardData[selectedIndex].date}
    location={filteredCardData[selectedIndex].location}
    description={filteredCardData[selectedIndex].description}
    filename={filteredCardData[selectedIndex].filename}
    keywords={filteredCardData[selectedIndex].keywords}
    onClose={() => setSelectedIndex(null)}
    onNext={() =>
      setSelectedIndex((prev) =>
        (prev + 1) % filteredCardData.length
      )
    }
    onPrev={() =>
      setSelectedIndex((prev) =>
        (prev - 1 + filteredCardData.length) % filteredCardData.length
      )
    }
  />
)}
    </div>
   

  );
}

export default App;
