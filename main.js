"use strict";

// Selecting needed elements
const canvas = document.querySelector(".canvas");
const colorInput = document.querySelector(".input");
const clearBtn = document.querySelector(".clear");

// Selecting canvas context
const ctx = canvas.getContext("2d");

let painting = false;

// Functions
const drawDesktop = function (e) {
  // Guard clause
  if (!painting) return;

  const canvasBox = canvas.getBoundingClientRect();

  ctx.lineTo(e.clientX - canvasBox.left, e.clientY - canvasBox.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY - canvasBox.top);
};

const drawMobile = function (e) {
  // Guard clause
  if (!painting) return;

  const [touch] = [...e.changedTouches];

  const canvasBox = canvas.getBoundingClientRect();

  ctx.lineTo(touch.clientX - canvasBox.left, touch.clientY - canvasBox.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(touch.clientX - canvasBox.left, touch.clientY - canvasBox.top);
};

const resetCanvas = function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Default canvas context properties
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 10;

  // Default color of input
  colorInput.value = "#ffffff";
};

// Event Listeners
// // Desktop handlers
canvas.addEventListener("mousedown", (e) => {
  painting = true;
  drawDesktop(e);
});
canvas.addEventListener("mouseup", () => {
  painting = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", function (e) {
  // Drawing
  drawDesktop(e);
});

// // Mobile handlers
canvas.addEventListener("touchstart", (e) => {
  painting = true;
  drawMobile(e);
});
canvas.addEventListener("touchend", () => {
  painting = false;
  ctx.beginPath();
});

canvas.addEventListener("touchmove", function (e) {
  // Drawing
  drawMobile(e);
});

colorInput.addEventListener("input", function () {
  ctx.strokeStyle = colorInput.value;
});

clearBtn.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

window.addEventListener("resize", resetCanvas);

// Setting the size of the canvas
resetCanvas();
