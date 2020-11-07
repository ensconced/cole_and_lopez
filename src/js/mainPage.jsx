import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './gallery';
import InstaGrid from './instagram';
import Footer from './footer';
import logo from '../img/logo.svg';
import miguelPainting from '../img/miguel-painting.jpg';
import { productions } from '../cms/productions.json';
import { address } from '../cms/address.json';

const context = require.context('../cms/main-sections');
const sectionsFromCMS = context.keys().map(key => context(key));

function Sections() {
  return sectionsFromCMS.map(section => {
    return (
      <React.Fragment key={section.title}>
        <div data-speed="0.2" className="jarallax">
          <img
            alt={section['title-background-image-alt-text']}
            className="jarallax-img img-small lazyload"
            src={section['title-background-image'].src}
          />
          <h2>{section.title}</h2>
        </div>
        <section className="about-us">
          {React.createElement(section['section-body-markdown'])}
        </section>
      </React.Fragment>
    );
  });
}

function App() {
  return (
    <>
      <nav>
        <img id="logo" alt="logo" src={logo} />
        <a
          href="https://www.instagram.com/cole_and_lopez/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            alt="follow us on instagram"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              id="insta-path"
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            />
          </svg>
        </a>
        <span>Design and fabrication for creative industries.</span>
      </nav>
      <div id="main-wrapper">
        <div id="main">
          <Sections />
          <div id="gallery-container" style={{ margin: '40px 0' }}>
            <Gallery />
          </div>
          <div data-speed="0.2" className="jarallax">
            <img
              alt="miguel at work"
              className="jarallax-img img-small lazyload"
              src={`${miguelPainting}?size=600`}
            />
            <h2>Contact</h2>
          </div>
          <section className="contact">
            <table>
              <tbody>
                <tr>
                  <th>Address:</th>
                  <td>
                    {address
                      .split('\n')
                      .filter(line => line.length > 0)
                      .map(line => (
                        <p key={line}>{line}</p>
                      ))}
                  </td>
                </tr>
              </tbody>
            </table>
            <form id="form" method="POST" name="contact">
              <input type="hidden" name="form-name" value="contact" required={true} />
              <label htmlFor="email">Your email address: </label>
              <input
                id="email"
                className="standard-input"
                type="email"
                name="email"
                required={true}
              />
              <span id="email-error" className="error" aria-live="polite"></span>
              <label htmlFor="subject">Subject: </label>
              <input
                id="subject"
                className="standard-input"
                name="subject"
                type="text"
                autoComplete="nope"
                required={true}
              />
              <span id="subject-error" className="error" aria-live="polite"></span>
              <label htmlFor="message">Message: </label>
              <textarea
                id="message"
                className="standard-input"
                name="message"
                required={true}
              ></textarea>
              <span id="message-error" className="error" aria-live="polite"></span>
              <button id="form-button" type="submit">
                Send Message
              </button>
            </form>
          </section>
        </div>
        <h2>Our Work</h2>
        <InstaGrid />
        <div id="previous-projects">
          <h3>Productions we have been involved with</h3>
          <div
            className="autocarousel"
            data-period="3000"
            data-slide-duration="1000"
            data-items-per-view="4"
            data-min-item-width="150"
          >
            <ul>
              {productions
                .split('\n')
                .filter(production => production.length > 0)
                .map(production => (
                  <li key={production}>{production}</li>
                ))}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
