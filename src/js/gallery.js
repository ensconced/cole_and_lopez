import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/reset.css';
import '../styles/gallery.css';
import 'bootstrap/js/dist/carousel';
import brushes from '../img/brushes.jpg?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048';
import miguel from '../img/miguel-painting.jpg?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048';
import dan from '../img/dan-working.jpg?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048';

const images = [
  {
    url: brushes,
    title: 'Brushes',
    description: 'some paint brushes',
  },
  {
    url: miguel,
    title: 'Miguel',
    description: 'this is miguel',
  },
  {
    url: dan,
    title: 'Dan',
    description: 'this is dan',
  },
];

function Gallery() {
  const divContainer = useRef(null);
  const isVerySmall = useMediaQuery({ maxWidth: 400 });
  const isSmall = useMediaQuery({ maxWidth: 800 });
  const isMedium = useMediaQuery({ maxWidth: 1200 });

  function backgroundImageSize() {
    if (isVerySmall) return '300';
    if (isSmall) return '600';
    if (isMedium) return '1024';
    return '2048';
  }

  return (
    <div ref={divContainer}>
      <Carousel>
        {images.map(({ title, url, description }) => {
          return (
            <Carousel.Item key={title}>
              <div
                style={{
                  height: '100vh',
                  width: '100vw',
                  backgroundColor: '#222',
                  backgroundImage: `url(${url}?size=${backgroundImageSize()})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                }}
              />
              <Carousel.Caption>
                <h3>{title}</h3>
                <p>{description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      {/* This icon is licensed under the Creative Commons Attribution 4.0 International license -->
          https://fontawesome.com/license --> */}
      <a
        id="fullscreen"
        onClick={e => {
          e.preventDefault();
          divContainer.current.requestFullscreen();
        }}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="expand"
          className="svg-inline--fa fa-expand fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z" />
        </svg>
      </a>
    </div>
  );
}

ReactDOM.render(<Gallery />, document.getElementById('gallery-container'));
