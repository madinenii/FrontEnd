import React from 'react';
// import Card from './Card';
// import Carousel from "react-multi-carousel";
// import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 33
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const PanelistsCarousel = ({ cards }) => (
  <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
    {cards.map((card, index) => (
      <div key={index}>
        <Card img={card.img} name={card.name} />
      </div>
    ))}
  </Carousel>
);

export default PanelistsCarousel;