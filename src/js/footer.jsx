import React from "react";
import copyright from "./copyright";

export default function Footer() {
  return (
    <footer id="footer">
      <div>
        <span className="outer">
          &copy; Cole &amp; Lopez <span>{copyright}</span>
        </span>
        <span className="outer">
          Design by&nbsp;
          <a
            href="https://github.com/ensconced"
            target="_blank"
            rel="noopener noreferrer"
          >
            ensconced
          </a>
        </span>
      </div>
    </footer>
  );
}
