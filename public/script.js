document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav ul li a");
  const tabPanes = document.querySelectorAll(".tab-pane");
  // make tab1 active by default
  document.querySelector("#tab1").classList.add("active");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("href");

      navLinks.forEach(function (link) {
        link.classList.remove("active");
        link.classList.add("inActive");
      });

      tabPanes.forEach(function (pane) {
        pane.classList.remove("active");
        link.classList.add("inActive");
      });

      this.classList.add("active");
      document.querySelector(target).classList.add("active");
      this.classList.remove("inActive")
      document.querySelector(target).classList.remove("inActive");
    });
  });
});
