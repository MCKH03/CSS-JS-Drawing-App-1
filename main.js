"use strict";

// Selecting needed elements
const box = document.querySelector(".drawing-box");

// Creating the dot element

// Functions
const draw = function (e) {
  e.preventDefault();

  // Selecting the touch
  const rect = e.target.closest(".drawing-box").getBoundingClientRect();
  const [touch] = [...e.changedTouches];

  // Creating the dot element
  const dot = document.createElement("span");
  dot.classList.add("dot");

  // Setting the position of the dot
  dot.style.left = touch.clientX - rect.left + "px";
  dot.style.top = touch.clientY - rect.top + "px";

  box.insertAdjacentElement("beforeend", dot);
};

// Event listeners
box.addEventListener("touchstart", draw);
box.addEventListener("touchmove", draw);
