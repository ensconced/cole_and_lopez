(function () {
  var stuck;
  var nav = document.querySelector('nav');
  var svgWrapper = nav.querySelector('#svg-wrapper');
  var svg = svgWrapper.querySelector('svg');
  var main = document.getElementById('main');
  var footer = document.querySelector('footer');
  var limit;

  var wait;
  var stagedCallback;

  // Cross browser compatible, non-overriding window.onload function
  if (window.addEventListener) {
    window.addEventListener('load', init, false);
  } else {
    window.attachEvent && window.attachEvent('onload', init);
  }

  window.onresize = throttled(init, 500);
  window.addEventListener("orientationchange", function() {
      init();
  });

  // Initialize the page
  function init() {
    setUpForm();
    limit = scrollLimit(windowDimensions());
    console.log(limit);
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
      nav.style.top = '0';
        svg.setAttribute("viewBox", "0 0 435 212.5");
        main.style.top = '0';
        footer.style.bottom = '0';
      }
      stuck = false;
    } else {
      // if in stuck region...and have just scrolled into it
      svgWrapper.style.top = String(limit) + 'px';
      nav.classList.add('stuck');
      nav.style.top = '-' + String(limit) + 'px';
      main.style.top = String(initHeight(...windowDimensions())) + 'px';
      footer.style.bottom = '-' + String(initHeight(...windowDimensions())) + 'px';
      svg.setAttribute("viewBox", "-400 0 1260 212.5");
      stuck = true;
    }
  }

  function windowDimensions() {
    var w = window;
    var d = document;
    var e = d.documentElement;
    var g = d.getElementsByTagName('body')[0];
    var y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    var x = w.innerWidth || e.clientWidth || g.clientWidth;
    return [x, y];
  }

  function scrollLimit(windowDimensions) {
    var width = windowDimensions[0];
    var height = windowDimensions[1];
    var collapsedHeight;
    if (width <= 250 || height <= 500) {
      collapsedHeight = 60;
    } else if (width <= 300) {
      collapsedHeight = 60;
    } else {
      collapsedHeight = 100;
    }
    return initHeight(width, height) - collapsedHeight;
  }

  function initHeight(width, height) {
     if (width <= 250) {
      return Math.min(180, height);
    } else if (width <= 300) {
      return Math.min(300, height);
    } else {
      return Math.min(500, height);
    }
  }

  function setUpForm() {
    var contactFormHost = 'https://cole-and-lopez-form-backend.herokuapp.com/';
    var jqueryForm = $('form');
    var form = document.querySelector('form');
    var spinner = document.getElementById('form-spinner');
    var button = document.getElementById('form-button');
    var recaptchaWrapperWrapper = document.getElementById('recaptcha-wrapper-wrapper');
    if (recaptchaWrapperWrapper.children.length > 1) {
      recaptchaWrapperWrapper.children[1].remove();
    }
    var recaptchaWrapper = document.createElement('div');
    recaptchaWrapper.id = 'recaptcha-wrapper';
    recaptchaWrapperWrapper.appendChild(recaptchaWrapper);
    grecaptcha.render(recaptchaWrapper, {
      sitekey: '6LedD3oUAAAAAF247FcyBJzlJ7PFsvh5IzYVR2mW',
      size: windowDimensions()[0] < 300 ? 'compact' : 'normal',
    });

    jqueryForm.submit(function(ev) {
      ev.preventDefault();
      var recaptchaToken = $("#g-recaptcha-response").val();
      if (!recaptchaToken) {
        flashFailure("Please confirm that you are not a robot");
      } else {
        button.style.display = 'none';
        spinner.style.display = 'block';
        $.ajax({
          type: 'POST',
          url: contactFormHost + 'send_email',
          data: jqueryForm.serialize(),
          dataType: 'json',
          success: function (response) {
            button.style.display = 'block';
            spinner.style.display = 'none';
            switch (response.message) {
              case 'success':
                form.reset();
                grecaptcha.reset();
                flashSuccess();
                break;
              case 'failure_email':
                flashFailure('Form failed to submit...Please try again.');
            }
          },
        });
      }
    });
  }

  function flashSuccess() {
    var flash = document.getElementById('flash-message');
    var flashParagraph = flash.querySelector('p');
    flashParagraph.innerHTML = 'Form submitted successfully.';
    flash.classList.add('success');
    flash.classList.remove('failure');
    flash.classList.remove('hidden');
    setTimeout(function () { flash.classList.add('hidden'); }, 3000);
  }

  function flashFailure(message) {
    var flash = document.getElementById('flash-message');
    var flashParagraph = flash.querySelector('p');
    flashParagraph.innerHTML = message;
    flash.classList.add('failure');
    flash.classList.remove('success');
    flash.classList.remove('hidden');
    setTimeout(function () { flash.classList.add('hidden'); }, 3000);
  }

  function throttled(callback, period) {
    return (function () {
      stagedCallback = function() {
        stagedCallback = null;
        callback();
        wait = true;
        setTimeout(function () {
          wait = false;
          if (stagedCallback) {
            stagedCallback();
          }
        }, period);
      };

      if (!wait) {
        // then do it immediately
        stagedCallback();
      }
    });
  }
}());
