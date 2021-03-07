/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useRef } from 'react';
import root from 'react-shadow';
import Carousel from 'react-bootstrap/Carousel';
import resetStyles from '!!raw-loader!../styles/reset.css';
import bootstrapStyles from '!!raw-loader!bootstrap/dist/css/bootstrap.min.css';
import galleryStyles from '!!raw-loader!../styles/gallery.css';
import 'bootstrap/js/dist/carousel';

// To get all the images for the gallery, we require every json file from
// the gallery-images directory. (These json files can be generated via the CMS).
// Our custom gallery-json-loader converts the image paths from the JSON into
// the actual image URL info (via responsive-image-loader).
const context = require.context('../cms', true, /\/gallery-images/);
const galleryImages = context.keys().map(key => context(key));

export default function Gallery({ height }) {
  const divContainer = useRef(null);
  if (galleryImages.length === 0) return null;
  return (
    <root.div>
      <div ref={divContainer} style={{ height: 'calc(100vh - 100px)', position: 'relative' }}>
        <Carousel>
          {galleryImages.map(({ title, image: url, description }) => {
            return (
              <Carousel.Item key={title + url}>
                <img
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    display: 'block',
                    height: 'calc(100vh - 100px)',
                  }}
                  alt={`${title}—${description}`}
                  src={url.src}
                  srcSet={url.srcSet}
                  // TODO - is it necessary to set the width and height here?
                  width={url.width}
                  height={url.height}
                  sizes="(max-width: 600px) 600px, (max-width: 1024px) 1024px, (max-width: 2048px) 2048px, 4096px"
                />
                <Carousel.Caption>
                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      padding: '10px 30px',
                      borderRadius: '5px',
                    }}
                  >
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
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
