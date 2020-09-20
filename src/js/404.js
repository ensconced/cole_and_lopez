import "../styles/reset.css";
import "../styles/main.css";
import "../styles/error-page.css";

import Footer from "./footer";
import logo from "../img/logo.svg";

import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <>
      <a href="/">
        <img id="logo" alt="logo" src={logo} />
      </a>
      <main>
        <p>There's nothing here...</p>
        <a href="/">Back to our homepage.</a>
      </main>
      <Footer />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
