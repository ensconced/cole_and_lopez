import React from "react";
import ReactDOM from "react-dom";

import Footer from "./footer";
import logo from "../img/logo.svg";
import danWorking from "../img/dan-working.jpg";
import danWorkingSmall from "../img/dan-working-small.jpg";
import miguelPainting from "../img/miguel-painting.jpg";
import miguelPaintingSmall from "../img/miguel-painting-small.jpg";
import tailSpin from "../img/tail-spin.svg";

function App() {
  return (
    <>
      <div id="flash-message" className="hidden">
        <p></p>
      </div>
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
          <div data-speed="0.2" className="jarallax">
            <img
              alt="dan at work"
              className="jarallax-img img-small lazyload"
              src={danWorkingSmall}
              data-src={danWorking}
            />
            <h2>About Us</h2>
          </div>
          <section className="about-us">
            <p>Design and fabrication for creative industries.</p>
            <p>
              We are a company that makes original and unique objects for film,
              TV and theatre productions, as well as fine artists and designers.
              All with passion and to a high technical standard.
            </p>
            <p>
              Formed by Daniel Cole and Miguel Lopez. Together we have a diverse
              skill base and knowledge of creative techniques and processes that
              we bring to our work, and over the many years that we have worked
              in the film industry we have built up a close network of skilled
              and passionate colleagues and collaborators who work over a
              variety of disciplines. This gives us the scope to take on and
              successfully execute all manner of projects involving design,
              sculpting, modelmaking, electronics, graphics, special effects,
              mouldmaking, casting and fabrication in a wide range of materials.
            </p>
            <p>Contact us to discuss how we can make your project happen.</p>
          </section>
          <iframe id="gallery" src="/gallery.html" frameborder="0"></iframe>
          <div data-speed="0.2" className="jarallax">
            <img
              alt="miguel at work"
              className="jarallax-img img-small lazyload"
              src={miguelPaintingSmall}
              data-src={miguelPainting}
            />
            <h2>Contact</h2>
          </div>
          <section className="contact">
            <table>
              <tbody>
                <tr>
                  <th>Address:</th>
                  <td>
                    <p>Cole and Lopez Ltd</p>
                    <p>Unit 17 Gemini Project</p>
                    <p>Landmann Way</p>
                    <p>London</p>
                    <p>SE14 5RL</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <form id="form" method="POST" name="contact" novalidate>
              <input type="hidden" name="form-name" value="contact" />
              <label for="email">Your email address: </label>
              <input
                id="email"
                className="standard-input"
                type="email"
                name="email"
              />
              <span
                id="email-error"
                className="error"
                aria-live="polite"
              ></span>
              <label for="subject">Subject: </label>
              <input
                id="subject"
                className="standard-input"
                name="subject"
                type="text"
                autocomplete="nope"
              />
              <span
                id="subject-error"
                className="error"
                aria-live="polite"
              ></span>
              <label for="message">Message: </label>
              <textarea
                id="message"
                className="standard-input"
                name="message"
              ></textarea>
              <span
                id="message-error"
                className="error"
                aria-live="polite"
              ></span>
              <div id="recaptcha-wrapper-wrapper">
                <img
                  alt="wait-for-recaptcha"
                  id="wait-for-recaptcha"
                  src={tailSpin}
                />
              </div>
              <span
                id="recaptcha-error"
                className="error"
                aria-live="polite"
              ></span>
              <button id="form-button" type="submit">
                Send Message
              </button>
            </form>
          </section>
        </div>
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
              <li>Game of Thrones</li>
              <li>Vikings</li>
              <li>Peaky Blinders</li>
              <li>Black Mirror</li>
              <li>Humans</li>
              <li>Taboo</li>
              <li>Eastenders</li>
              <li>Kiss Me First</li>
              <li>Killing Eve</li>
              <li>The Bodyguard</li>
              <li>Trust</li>
              <li>Casualty</li>
              <li>Fortitude</li>
              <li>Britannia</li>
              <li>Vanity Fair</li>
              <li>Unforgotten</li>
              <li>Holby City</li>
              <li>Bounty Hunters</li>
              <li>The Halcyon</li>
              <li>Will</li>
              <li>Ordeal by Innocence</li>
              <li>The Crown</li>
              <li>Overlord</li>
              <li>Jurassic World</li>
              <li>Wonder Woman</li>
              <li>Spectre</li>
              <li>Skyfall</li>
              <li>Justice League</li>
              <li>Ready Player One</li>
              <li>Hunter Killer</li>
              <li>Mission Impossible: Fallout</li>
              <li>Bohemian Rhapsody</li>
              <li>Mary Poppins</li>
              <li>The Nutcracker and the Four Realms</li>
              <li>Kingsman</li>
              <li>Beauty and the Beast</li>
              <li>Transformers: The Last Knight</li>
              <li>Fantastic Beasts and Where to Find Them</li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
