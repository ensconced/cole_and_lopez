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
  var isMobile = checkIfMobile();
  var formTimeout;

  // Cross browser compatible, non-overriding window.onload function
  if (window.addEventListener) {
    window.addEventListener('load', function () {
      init(true);
    }, false);
  } else {
    window.attachEvent && window.attachEvent('onload', init);
  }

  window.onresize = throttled(function () {
    console.log('resize');
    if (!isMobile) {
      resizeHandler();
    } else {
      scrollTo();
      // scroll to active element

    }
  }, 500);

  window.addEventListener("orientationchange", function() {
      resizeHandler();
  });

  function init() {
    setUpForm();
    limit = scrollLimit(windowDimensions());
    shrinkLogo();
    window.onscroll = function() {
      shrinkLogo();
    };
    if (isMobile) {
      document.ontouchstart = function (ev) {
        if (!['INPUT', 'TEXTAREA'].includes(ev.target.tagName)) {
          nav.style.display = 'block';
        }
      };
    }
  }

  function resizeHandler() {
    limit = scrollLimit(windowDimensions());
    shrinkLogo();
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
      var recaptchaToken = grecaptcha.getResponse();
      if (!recaptchaToken) {
        flashFailure("Please confirm that you are not a robot");
      } else {
        formTimeout = setTimeout(function () {
          button.style.display = 'block';
          spinner.style.display = 'none';
          flashFailure('Form failed to submit...Please try again.');
        }, 10000);
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

  function handleTextArea() {
    var textarea = document.querySelector('#form textarea#message');
    var recaptchaWrapperWrapper = document.getElementById('recaptcha-wrapper-wrapper');
    var formSpinner = document.getElementById('form-spinner');
    var formButton = document.getElementById('form-button');
    var footer = document.getElementById('footer');
    var initialDisplayStyles = {
      'recaptcha-wrapper-wrapper': recaptchaWrapperWrapper.style.display,
      'form-spinner': formSpinner.style.display,
      'form-button': formButton.style.display,
      'footer': footer.style.display,
    };
    textarea.onfocus = function () {
      [recaptchaWrapperWrapper, formSpinner, formButton, footer].forEach(function (element) {
        element.style.display = 'none';
      });
    };

    textarea.onblur = function() {
      ['recaptcha-wrapper-wrapper', 'form-spinner', 'form-button', 'footer'].forEach(function (id) {
        document.getElementById(id).style.display = initialDisplayStyles[id];
      });
    };
  }

  function flashSuccess() {
    formTimeout && clearTimeout(formTimeout);
    var flash = document.getElementById('flash-message');
    var flashParagraph = flash.querySelector('p');
    flashParagraph.innerHTML = 'Form submitted successfully.';
    flash.classList.add('success');
    flash.classList.remove('failure');
    flash.classList.remove('hidden');
    setTimeout(function () { flash.classList.add('hidden'); }, 3000);
  }

  function flashFailure(message) {
    formTimeout && clearTimeout(formTimeout);
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

  function checkIfMobile() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  ['#email', '#subject', '#message'].forEach(function (input) {
    $(input).on('focus', scrollTo);
  });

  function scrollTo() {
    setTimeout(function () {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        document.documentElement.scrollTop += document.activeElement.getBoundingClientRect().top - 45;
      }
    }, 500);
  }
}());
