const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-menu");
let open = false;

function setNavHeightVar() {
  const h = nav.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--nav-height", h + "px");
}

function applyScrollState() {
  const scrolled = window.scrollY > 6;
  if (scrolled) {
    nav.classList.add("nav--scrolled");
  } else {
    nav.classList.remove("nav--scrolled");
  }
  document.documentElement.style.setProperty(
    "--nav-offset",
    scrolled ? "6px" : "0px"
  );
  setNavHeightVar();
}

window.addEventListener(
  "scroll",
  function () {
    window.requestAnimationFrame(applyScrollState);
  },
  { passive: true }
);
window.addEventListener("resize", function () {
  window.requestAnimationFrame(setNavHeightVar);
});
applyScrollState();

toggle.addEventListener("click", function () {
  open = !open;
  menu.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
});

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !toggle.contains(e.target)) {
    if (open) {
      open = false;
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && open) {
    open = false;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }
});
