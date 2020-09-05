import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/reset.css";
import "../styles/gallery.css";
import "bootstrap/js/dist/carousel.js";
import brushes from "../img/brushes.jpg";
import miguel from "../img/miguel-painting.jpg";
import dan from "../img/dan-working.jpg";

function Image({ url }) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#222",
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    ></div>
  );
}

function Gallery() {
  const divContainer = useRef(null);
  return (
    <div ref={divContainer}>
      <Carousel
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#333",
        }}
      >
        <Carousel.Item>
          <Image url={brushes} />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image url={miguel} />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image url={dan} />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* This icon is licensed under the Creative Commons Attribution 4.0 International license -->
          https://fontawesome.com/license --> */}
      <a
        id="fullscreen"
        onClick={(e) => {
          e.preventDefault();
          divContainer.current.requestFullscreen();
        }}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="expand"
          class="svg-inline--fa fa-expand fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path>
        </svg>
      </a>
    </div>
  );
}

ReactDOM.render(<Gallery />, document.getElementById("gallery-container"));
