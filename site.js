var stuck;
var nav = document.querySelector('nav');
var svgWrapper = nav.querySelector('#svg-wrapper');
var svg = svgWrapper.querySelector('svg');
var limit;

// Cross browser compatible, non-overriding window.onload function
if (window.addEventListener) {
  window.addEventListener('load', init, false);
} else {
  window.attachEvent && window.attachEvent('onload', init);
}

window.onresize = init;

// Initialize the page
function init() {
  limit = scrollLimit(windowWidth());
  // Fade in the body
  document.body.classList.add('js-has-loaded');
  // Otherwise check if page is already scrolled
  setScrolledClass();
  shrinkLogo();
  // Show/Hide the navbar on scroll
  window.onscroll = function() {
    setScrolledClass();
    shrinkLogo();
  };
}

// Set the js-has-scrolled class on the body depending on scroll position
function setScrolledClass() {
  if (isScrolled() == true) {
    document.body.classList.add('js-has-scrolled');
  } else {
    document.body.classList.remove('js-has-scrolled');
  }
}

// Check if the user has scrolled
function isScrolled() {
  // IE...
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 0) {
    return true;
  } else {
    return false;
  }
}

function shrinkLogo() {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop < limit) {
    svgWrapper.style.top = String(scrollTop) + 'px';
    if (stuck) {
    // then we have just scrolled out of "stuck" region
      nav.classList.remove('stuck');
      svg.setAttribute("viewBox", "0 0 435 212.5");
    }
    stuck = false;
  } else {
    // if in stuck region...and have just scrolled into it
    svgWrapper.style.top = String(limit) + 'px';
    nav.classList.add('stuck');
    console.log("enlarging viewbox...");
    svg.setAttribute("viewBox", "-400 0 1260 212.5");
    stuck = true;
  }
}

function windowWidth() {
  var w = window;
  var d = document;
  var e = d.documentElement;
  var g = d.getElementsByTagName('body')[0];
  return w.innerWidth || e.clientWidth || g.clientWidth;
}

function scrollLimit(windowWidth) {
  if (windowWidth <= 250) {
    return 120;
  } else if (windowWidth <= 400) {
    return 240;
  } else {
    return 400;
  }
}
