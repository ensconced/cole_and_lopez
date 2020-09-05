import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import brushes from "../img/brushes.jpg";
class MyGallery extends React.Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <div
            style={{
              backgroundImage: `url("https://picsum.photos/800/400")`,
            }}
            alt="First slide"
          ></div>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://picsum.photos/800/400" alt="Third slide" />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://picsum.photos/800/400" alt="Third slide" />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

ReactDOM.render(<MyGallery />, document.getElementById("gallery-container"));
