// setUpForm is at global scope for accessibility from onload in script tag
window.setUpForm = function setUpForm() {
  var formTimeout;
  var debouncedShowNav = debounce(showNav, 5000);
  var form = document.getElementsByTagName("form")[0];
  var button = document.getElementById("form-button");
  var nav = document.querySelector("nav");
  var spinner = document.getElementById("form-spinner");
  var fields = [].slice.call(form.querySelectorAll("#form .standard-input"));
  var errors = [].slice.call(form.querySelectorAll("#form .error"));
  function tempHideNav() {
    hideNav();
    debouncedShowNav();
  }
  function showNav() {
    nav.style.position = "fixed";
    nav.style.top = "0";
  }
  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  function flashSuccess() {
    formTimeout && clearTimeout(formTimeout);
    var flash = document.getElementById("flash-message");
    var flashParagraph = flash.querySelector("p");
    flashParagraph.innerHTML = "Form submitted successfully.";
    flash.classList.add("success");
    flash.classList.remove("failure");
    flash.classList.remove("hidden");
    setTimeout(function () {
      flash.classList.add("hidden");
    }, 3000);
  }
  function flashFailure() {
    var message = "Form failed to submit...Please try again.";
    formTimeout && clearTimeout(formTimeout);
    var flash = document.getElementById("flash-message");
    var flashParagraph = flash.querySelector("p");
    flashParagraph.innerHTML = message;
    flash.classList.add("failure");
    flash.classList.remove("success");
    flash.classList.remove("hidden");
    setTimeout(function () {
      flash.classList.add("hidden");
    }, 3000);
  }
  function windowDimensions() {
    var w = window;
    var d = document;
    var e = d.documentElement;
    var g = d.getElementsByTagName("body")[0];
    var y = w.innerHeight || e.clientHeight || g.clientHeight;
    var x = w.innerWidth || e.clientWidth || g.clientWidth;
    return [x, y];
  }
  function hideNav() {
    nav.style.position = "absolute";
    nav.style.top = "0";
  }
  function setUpRecaptcha() {
    var recaptchaWrapperWrapper = document.getElementById(
      "recaptcha-wrapper-wrapper"
    );
    if (recaptchaWrapperWrapper.children.length > 1) {
      recaptchaWrapperWrapper.children[1].remove();
    }
    var recaptchaWrapper = document.createElement("div");
    recaptchaWrapper.id = "recaptcha-wrapper";
    recaptchaWrapperWrapper.appendChild(recaptchaWrapper);
    grecaptcha.render(recaptchaWrapper, {
      sitekey: "6LedD3oUAAAAAF247FcyBJzlJ7PFsvh5IzYVR2mW",
      size: windowDimensions()[0] < 300 ? "compact" : "normal",
      callback: function () {
        errors[3].className = "error";
      },
    });
  }
  function configureError(field, error) {
    field.addEventListener(
      "input",
      function (event) {
        if (field.validity.valid && field.value) {
          error.innerHTML = "";
          error.className = "error";
        } else {
          error.innerHTML = "please enter a valid " + field.id;
          error.className = "error active";
        }
      },
      false
    );
  }
  function setUpFormSubmission() {
    function handleFormSubmission(ev) {
      function showPendingButton() {
        button.disabled = true;
        button.className = "pending";
        button.innerHTML = "Sending message...";
        var spinner = document.createElement("img");
        spinner.setAttribute("id", "form-spinner");
        spinner.setAttribute("src", "./img/tail-spin-dark.svg");
        button.appendChild(spinner);
      }
      function showNormalButton() {
        var spinner = button.querySelector("img");
        button.removeChild(spinner);
        button.disabled = false;
        button.className = "";
        button.innerHTML = "Send message";
      }

      ev.preventDefault();

      for (var i = 0; i < fields.length; i++) {
        field = fields[i];
        if (!field.validity.valid || !field.value) {
          errors[i].innerHTML = "please enter a valid " + field.id;
          errors[i].className = "error active";
          field.focus();
          return;
        }
      }
      var recaptchaToken = grecaptcha.getResponse();
      if (!recaptchaToken) {
        var recaptchaError = document.getElementById("recaptcha-error");
        recaptchaError.innerHTML = "please confirm that you are not a robot";
        recaptchaError.className = "error active";
      } else {
        formTimeout = setTimeout(function () {
          button.style.display = "block";
          spinner.style.display = "none";
          flashFailure();
        }, 10000);
        showPendingButton();
        $.ajax({
          type: "POST",
          url: "/",
          data: jqueryForm.serialize(),
          dataType: "json",
          success: function (response) {
            showNormalButton();
            switch (response.message) {
              case "success":
                form.reset();
                grecaptcha.reset();
                flashSuccess();
                break;
              case "failure_email":
                flashFailure();
            }
          },
        });
      }
    }
    var jqueryForm = $("form");
    jqueryForm.submit(handleFormSubmission);
  }

  fields.forEach(function (field, idx) {
    var error = errors[idx];
    if (isMobile) {
      // hide nav when filling in form
      // otherwise inputs are obstructed when browser auto-scrolls them into view

      field.onfocus = tempHideNav;
      field.oninput = tempHideNav;
    }
    configureError(field, error);
  });

  setUpRecaptcha();
  setUpFormSubmission();
};

$(function () {
  function init() {
    window.onRecaptchaReady = setUpForm;
    document.onscroll = throttled(handleScroll, 200);
    if (!isMobile) {
      jarallax(document.querySelectorAll(".jarallax"), { speed: 0.2 });
    }
  }
  function handleScroll(ev) {
    if (
      (document.documentElement.scrollTop || document.body.scrollTop) >
      document.querySelector("nav").clientHeight
    ) {
      nav.className = "translucent";
    } else {
      nav.className = "";
    }
  }
  function throttled(callback, period) {
    return function () {
      stagedCallback = function () {
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
    };
  }
  var nav = document.querySelector("nav");
  var wait;
  var stagedCallback;
  init();
});
