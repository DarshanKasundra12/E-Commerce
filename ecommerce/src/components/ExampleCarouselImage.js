// src/components/ExampleCarouselImage.js
import React from 'react';
import Image from 'react-bootstrap/Image';

function ExampleCarouselImage({ src, text }) {
  return (
    <Image
      src={src}
      alt={text}
      style={{ width: '800px', height: '400px' }} // Ensure the image fits the specified dimensions
      className="d-block w-100"
    />
  );
}

export default ExampleCarouselImage;
