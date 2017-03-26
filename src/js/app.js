// JS Goes here - ES6 supported
require("prismjs/components/prism-core.js");
const lazyLoad = require("vanilla-lazyload");

require("prismjs/components/prism-markup.js");
require("prismjs/components/prism-bash.js");
require("prismjs/components/prism-clike.js");
require("prismjs/components/prism-css.js");
require("prismjs/components/prism-go.js");
require("prismjs/components/prism-javascript.js");
require("prismjs/components/prism-scss.js");

const myLazyLoad = new lazyLoad();

function toggleDetails(event) {
  const el = (event.target.tagName === "svg") ? event.target : event.target.parentElement;
  const target = el.dataset.target;
  document.getElementById(target).classList.toggle("open");
}

// resume expand/close buttons
const expandFeature = document.querySelectorAll(".resume__featured-expand");
expandFeature.forEach((button) => button.addEventListener("click", (e) => toggleDetails(e)));
