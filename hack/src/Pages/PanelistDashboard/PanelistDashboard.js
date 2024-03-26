import React, { useState } from 'react';
import Modal from './Modal'; // Assuming you have a Modal component
import './MyComponent.css'; // Import CSS for MyComponent
import imageSrc from './PanelDashboard.jpg';

const MyComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  // Generate cards data (assuming you have some card data)
  const totalCards = 10;
  const cards = Array.from({ length: totalCards }, (_, index) => index + 1);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className="container">
      <div className="left-content">
        <div className="cards-container">
          {currentCards.map((card) => (
            <div key={card} className="card" onClick={() => handleCardClick(card)}>
              Card {card}
            </div>
          ))}
          <div className="pagination">
            {/* Pagination buttons */}
            {currentPage > 1 && <button className="btn" onClick={handlePrevPage}>Previous</button>}
            {currentPage < Math.ceil(totalCards / cardsPerPage) && <button className="btn" onClick={handleNextPage}>Next</button>}
          </div>
        </div>
      </div>
      <div className="right-content">
      <img src={imageSrc} alt="Description of the image" />
      </div>
      {showModal && (
        <Modal onClose={handleModalClose}>
          {/* Render modal content here */}
          <div>Modal Content for Card {selectedCard}</div>
        </Modal>
      )}
    </div>
  );
};

export default MyComponent;
