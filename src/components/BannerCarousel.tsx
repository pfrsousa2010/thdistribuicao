import React, { useState, useEffect } from 'react';
import './BannerCarousel.css';

const BannerCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    '/home/banners/1.png',
    '/home/banners/2.png',
    '/home/banners/3.png',
    '/home/banners/4.png',
    '/home/banners/5.png',
    '/home/banners/6.png',
    '/home/banners/7.png',
    '/home/banners/8.png',
    '/home/banners/9.png',
    '/home/banners/10.png',
    '/home/banners/11.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // 5 segundos

    return () => clearInterval(timer);
  }, [banners.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="banner-carousel">
      <div className="carousel-container">
        <div className="carousel-slides">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={banner} alt={`Banner ${index + 1}`} />
            </div>
          ))}
        </div>
        
        <button className="carousel-btn prev" onClick={goToPrevious}>
          ‹
        </button>
        <button className="carousel-btn next" onClick={goToNext}>
          ›
        </button>
      </div>
    </div>
  );
};

export default BannerCarousel;
