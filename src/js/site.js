// /* globals jarallax */
// const debounce = require('lodash/debounce');
// const throttle = require('lodash/throttle');

// // setUpForm is at global scope for accessibility from onload in script tag
// window.setUpForm = function setUpForm() {
//   var formTimeout;
//   const debouncedShowNav = debounce(showNav, 5000);
//   var form = document.getElementsByTagName('form')[0];
//   var nav = document.querySelector('nav');
//   function tempHideNav() {
//     hideNav();
//     debouncedShowNav();
//   }
//   function showNav() {
//     nav.style.position = 'fixed';
//     nav.style.top = '0';
//   }
//   function flashSuccess() {
//     formTimeout && clearTimeout(formTimeout);
//     var flash = document.getElementById('flash-message');
//     var flashParagraph = flash.querySelector('p');
//     flashParagraph.innerHTML = 'Form submitted successfully.';
//     flash.classList.add('success');
//     flash.classList.remove('failure');
//     flash.classList.remove('hidden');
//     setTimeout(function () {
//       flash.classList.add('hidden');
//     }, 3000);
//   }
//   function flashFailure() {
//     var message = 'Form failed to submit...Please try again.';
//     formTimeout && clearTimeout(formTimeout);
//     var flash = document.getElementById('flash-message');
//     var flashParagraph = flash.querySelector('p');
//     flashParagraph.innerHTML = message;
//     flash.classList.add('failure');
//     flash.classList.remove('success');
//     flash.classList.remove('hidden');
//     setTimeout(function () {
//       flash.classList.add('hidden');
//     }, 3000);
//   }
//   function hideNav() {
//     nav.style.position = 'absolute';
//     nav.style.top = '0';
//   }
//   function setUpFormSubmission() {
//     function handleFormSubmission(ev) {
//       ev.preventDefault();
//       $.ajax({
//         type: 'POST',
//         url: '/',
//         data: jqueryForm.serialize(),
//         dataType: 'json',
//         success: function (response) {
//           switch (response.message) {
//             case 'success':
//               form.reset();
//               grecaptcha.reset();
//               flashSuccess();
//               break;
//             case 'failure_email':
//               flashFailure();
//           }
//         },
//       });
//     }
//     var jqueryForm = $('form');
//     jqueryForm.submit(handleFormSubmission);
//   }
//   setUpFormSubmission();
// };
// $(function () {
//   function init() {
//     window.setUpForm();
//     document.onscroll = throttle(handleScroll, 200);
//     if (!isMobile) {
//       jarallax(document.querySelectorAll('.jarallax'), { speed: 0.2 });
//     }
//   }
//   function handleScroll(ev) {
//     if (
//       (document.documentElement.scrollTop || document.body.scrollTop) >
//       document.querySelector('nav').clientHeight
//     ) {
//       nav.className = 'translucent';
//     } else {
//       nav.className = '';
//     }
//   }
//   var nav = document.querySelector('nav');
//   var wait;
//   var stagedCallback;
//   init();
// });
