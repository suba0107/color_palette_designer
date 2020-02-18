"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
  document.querySelector("#color_picker").addEventListener("input", getHex);
}

function getHex() {
  const hexDec = this.value;
  prepareHex(hexDec);
  displayColor(hexDec);
}

function prepareHex(hex) {
  const red = hex.substring(1, 3);
  const green = hex.substring(3, 5);
  const blue = hex.substring(5, 7);
  convertToRGB(hex, red, green, blue);
}

function convertToRGB(hex, red, green, blue) {
  const r = Number.parseInt(red, 16);
  const g = Number.parseInt(green, 16);
  const b = Number.parseInt(blue, 16);
  convertToHSL(hex, r, g, b);
}

function convertToHSL(hex, r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = Math.floor(h);
  s = Math.floor(s);
  l = Math.floor(l);

  console.log(h, s, l); // just for testing
  displayText(hex, r, g, b, h, s, l);
}

function displayColor(hex) {
  document.querySelector("#colorbox3").style.setProperty("--color", hex);
}

function displayText(hex, r, g, b, h, s, l) {
  document.querySelector("#colorbox3 #hex").textContent = `Hex: ${hex}`;
  document.querySelector("#colorbox3 #rgb").textContent = `RGB: rgb(${255 * r}, ${255 * g}, ${255 * b})`;
  document.querySelector("#colorbox3 #hsl").textContent = `HSL: hsl(${h}, ${s}%, ${l}%)`;
}
