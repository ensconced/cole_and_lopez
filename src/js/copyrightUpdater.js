window.addEventListener("DOMContentLoaded", () => {
  var copyright = document.getElementById("yearRange");
  var year = new Date().getFullYear();
  var secondPart;
  if (year === 2018) {
    secondPart = "";
  } else {
    secondPart = " - " + year;
  }
  copyright.innerHTML = "2018" + secondPart;
});
