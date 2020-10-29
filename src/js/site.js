/* globals jarallax */
const throttle = require('lodash/throttle');
const isMobile = require('./isMobile');
const Instafeed = require('instafeed.js');

document.addEventListener('DOMContentLoaded', () => {
  function setNavOpacity(ev) {
    if (
      (document.documentElement.scrollTop || document.body.scrollTop) >
      document.querySelector('nav').clientHeight
    ) {
      nav.className = 'translucent';
    } else {
      nav.className = '';
    }
  }
  const nav = document.querySelector('nav');
  document.onscroll = throttle(setNavOpacity, 200);
  if (!isMobile()) {
    jarallax(document.querySelectorAll('.jarallax'), { speed: 0.2 });
  }
  var feed = new Instafeed({
    accessToken: 'your-token',
  });
  feed.run();
});
