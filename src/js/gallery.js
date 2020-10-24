/* eslint-disable import/no-webpack-loader-syntax */
import React, { useRef, useState, useEffect } from 'react';
import root from 'react-shadow';
import { useMediaQuery } from 'react-responsive';
import Carousel from 'react-bootstrap/Carousel';
import resetStyles from '!!raw-loader!../styles/reset.css';
import bootstrapStyles from '!!raw-loader!bootstrap/dist/css/bootstrap.css';
import galleryStyles from '!!raw-loader!../styles/gallery.css';
import 'bootstrap/js/dist/carousel';
import brushes from '../img/gallery/brushes.jpg';
import miguel from '../img/gallery/miguel-painting.jpg';
import dan from '../img/gallery/dan-working.jpg';
import cat1 from '../img/gallery/cat1.jpeg';

const images = [
  {
    image: cat1,
    title: 'Cat',
    description: 'a cat',
  },
  {
    image: brushes,
    title: 'Brushes',
    description: 'some paint brushes',
  },
  {
    image: miguel,
    title: 'Miguel',
    description: 'this is miguel',
  },
  {
    image: dan,
    title: 'Dan',
    description: 'this is dan',
  },
];

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default function Gallery({ height }) {
  const divContainer = useRef(null);
  // window size for determining gallery height
  const windowSize = useWindowSize();

  // screen width for determining image sizes to use
  const isVerySmall = useMediaQuery({ maxWidth: 400 });
  const isSmall = useMediaQuery({ maxWidth: 800 });
  const isMedium = useMediaQuery({ maxWidth: 1200 });

  function backgroundImageSize() {
    if (isVerySmall) return '600';
    if (isSmall) return '1024';
    if (isMedium) return '2048';
    return '4096';
  }
  const maxImageHeight = images.reduce((acc, { image }) => Math.max(image.height, acc), 0);

  return (
    <root.div style={{ height: `${maxImageHeight}px` }}>
      <div ref={divContainer} style={{ height: '100%', display: 'flex' }}>
        <Carousel>
          {images.map(({ title, image, description }) => {
            return (
              <Carousel.Item key={title}>
                <div
                  style={{
                    height: '100%',
                    border: '2px solid blue',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <picture
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      flex: '0 0 auto',
                    }}
                  >
                    {/* <source srcSet={responsiveImageWebp.srcSet} type="image/webp" /> */}
                    <img
                      alt={`${title} — ${description}`}
                      src={image.src}
                      srcSet={image.srcSet}
                      width={image.width}
                      height={image.height}
                      sizes="300px"
                      loading="lazy"
                    />
                  </picture>
                </div>
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
        {/* <a
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
        </a> */}
      </div>
      <style type="text/css">{resetStyles}</style>
      <style type="text/css">{galleryStyles}</style>
      <style type="text/css">{bootstrapStyles}</style>
    </root.div>
  );
}
