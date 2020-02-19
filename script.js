"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
  document.querySelector("#color_picker").addEventListener("input", colorPicker);
}

function colorPicker() {
  const hexCode = this.value;
  document.querySelector("#test").addEventListener("change", function() {
    viewHandler(hexCode);
  });
  return viewHandler(hexCode);
}

function viewHandler(hexCode) {
  displayText(hexCode, "#base");
  displayColor(hexCode, "#base");

  let color = harmonyChanger(hexCode);
  displayText(color.c1, "#colorbox1");
  displayText(color.c2, "#colorbox2");
  displayText(color.c3, "#colorbox3");
  displayText(color.c4, "#colorbox4");

  displayColor(color.c1, "#colorbox1");
  displayColor(color.c2, "#colorbox2");
  displayColor(color.c3, "#colorbox3");
  displayColor(color.c4, "#colorbox4");
}

function harmonyChanger(hexCode) {
  if (document.querySelector("#analogous").checked) {
    return angoulous(hexCode);
  } else if (document.querySelector("#monochromatic").checked) {
    return monochromatic(hexCode);
  } else if (document.querySelector("#triad").checked) {
    return triad(hexCode);
  } else if (document.querySelector("#complementary").checked) {
    return complementary(hexCode);
  } else if (document.querySelector("#compound").checked) {
    return compound(hexCode);
  } else if (document.querySelector("#shades").checked) {
    return shades(hexCode);
  }
}
function rgb2Hex(rgb) {
  //FROM https://css-tricks.com/converting-color-spaces-in-javascript/
  let r = rgb.r.toString(16);
  let g = rgb.g.toString(16);
  let b = rgb.b.toString(16);
  if (r.length == 1) {
    r = "01";
  }
  if (g.length == 1) {
    g = "01";
  }
  if (b.length == 1) {
    b = "01";
  }
  return "#" + r + g + b;
}
function angoulous(base) {
  const rgb = prepareHex2rgb(base);
  const hsl = rgb2HSL(rgb);

  const h1 = 10;
  const h2 = 20;
  const h3 = 30;
  const h4 = 40;

  const hue1 = calculateDegrees(hsl.h, h1);
  const hue2 = calculateDegrees(hsl.h, h2);
  const hue3 = calculateDegrees(hsl.h, h3);
  const hue4 = calculateDegrees(hsl.h, h4);

  const color1 = { h: hue1, s: hsl.s, l: hsl.l };
  const color2 = { h: hue2, s: hsl.s, l: hsl.l };
  const color3 = { h: hue3, s: hsl.s, l: hsl.l };
  const color4 = { h: hue4, s: hsl.s, l: hsl.l };

  const rgb1 = hsl2RGB(color1);
  const rgb2 = hsl2RGB(color2);
  const rgb3 = hsl2RGB(color3);
  const rgb4 = hsl2RGB(color4);

  const hex1 = rgb2Hex(rgb1);
  const hex2 = rgb2Hex(rgb2);
  const hex3 = rgb2Hex(rgb3);
  const hex4 = rgb2Hex(rgb4);

  const colorRGB = { c1: hex1, c2: hex2, c3: hex3, c4: hex4 };

  return colorRGB;
}
function monochromatic(base) {
  const rgb = prepareHex2rgb(base);
  const hsl = rgb2HSL(rgb);

  const sat1 = calculatePercent(hsl.s, -30);
  const sat2 = calculatePercent(hsl.s, 20);
  const light1 = calculatePercent(hsl.l, -10);
  const light2 = calculatePercent(hsl.l, 20);

  const color1 = { h: hsl.h, s: sat1, l: hsl.l };
  const color2 = { h: hsl.h, s: sat2, l: hsl.l };
  const color3 = { h: hsl.h, s: hsl.s, l: light1 };
  const color4 = { h: hsl.h, s: hsl.s, l: light2 };

  const rgb1 = hsl2RGB(color1);
  const rgb2 = hsl2RGB(color2);
  const rgb3 = hsl2RGB(color3);
  const rgb4 = hsl2RGB(color4);

  const hex1 = rgb2Hex(rgb1);
  const hex2 = rgb2Hex(rgb2);
  const hex3 = rgb2Hex(rgb3);
  const hex4 = rgb2Hex(rgb4);

  const colorRGB = { c1: hex1, c2: hex2, c3: hex3, c4: hex4 };

  return colorRGB;
}
function triad(base) {
  const rgb = prepareHex2rgb(base);
  const hsl = rgb2HSL(rgb);

  const h1 = -120;
  const h2 = +120;

  const hue1 = calculateDegrees(hsl.h, h1);
  const hue2 = calculateDegrees(hsl.h, h2);

  const l1 = 20;
  const light = calculatePercent(hsl.l, l1);

  const color1 = { h: hue1, s: hsl.s, l: light };
  const color2 = { h: hue1, s: hsl.s, l: hsl.l };
  const color3 = { h: hue2, s: hsl.s, l: hsl.l };
  const color4 = { h: hue2, s: hsl.s, l: light };

  const rgb1 = hsl2RGB(color1);
  const rgb2 = hsl2RGB(color2);
  const rgb3 = hsl2RGB(color3);
  const rgb4 = hsl2RGB(color4);

  const hex1 = rgb2Hex(rgb1);
  const hex2 = rgb2Hex(rgb2);
  const hex3 = rgb2Hex(rgb3);
  const hex4 = rgb2Hex(rgb4);

  const colorRGB = { c1: hex1, c2: hex2, c3: hex3, c4: hex4 };

  return colorRGB;
}
function complementary(base) {
  const rgb = prepareHex2rgb(base);
  const hsl = rgb2HSL(rgb);

  const h1 = 180;

  const hue = calculateDegrees(hsl.h, h1);

  const l1 = 20;
  const l2 = -20;

  const light1 = calculateDegrees(hsl.l, l1);
  const light2 = calculateDegrees(hsl.l, l2);

  const color1 = { h: hsl.h, s: hsl.s, l: light2 };
  const color2 = { h: hsl.h, s: hsl.s, l: light1 };
  const color3 = { h: hue, s: hsl.s, l: hsl.l };
  const color4 = { h: hue, s: hsl.s, l: light1 };

  const rgb1 = hsl2RGB(color1);
  const rgb2 = hsl2RGB(color2);
  const rgb3 = hsl2RGB(color3);
  const rgb4 = hsl2RGB(color4);

  const hex1 = rgb2Hex(rgb1);
  const hex2 = rgb2Hex(rgb2);
  const hex3 = rgb2Hex(rgb3);
  const hex4 = rgb2Hex(rgb4);

  const colorRGB = { c1: hex1, c2: hex2, c3: hex3, c4: hex4 };

  return colorRGB;
}
function compound(base) {
  const rgb = prepareHex2rgb(base);
  const hsl = rgb2HSL(rgb);

  const h1 = 180;
  const h2 = -20;
  const h3 = h2 + 180;
  const l1 = -20;

  const hue1 = calculateDegrees(hsl.h, h1);
  const hue2 = calculateDegrees(hsl.h, h2);
  const hue3 = calculateDegrees(hsl.h, h3);
  const light = calculatePercent(hsl.l, l1);

  const color1 = { h: hue3, s: hsl.s, l: hsl.l };
  const color2 = { h: hsl.h, s: hsl.s, l: light };
  const color3 = { h: hue1, s: hsl.s, l: hsl.l };
  const color4 = { h: hue1, s: hsl.s, l: light };

  const rgb1 = hsl2RGB(color1);
  const rgb2 = hsl2RGB(color2);
  const rgb3 = hsl2RGB(color3);
  const rgb4 = hsl2RGB(color4);

  const hex1 = rgb2Hex(rgb1);
  const hex2 = rgb2Hex(rgb2);
  const hex3 = rgb2Hex(rgb3);
  const hex4 = rgb2Hex(rgb4);

  const colorRGB = { c1: hex1, c2: hex2, c3: hex3, c4: hex4 };

  return colorRGB;
}
function shades(base) {
  const rgb = prepareHex2rgb(base);
  const hsl = rgb2HSL(rgb);

  const l1 = 20;
  const l2 = 10;
  const l3 = -10;
  const l4 = -20;

  const light1 = calculatePercent(hsl.l, l1);
  const light2 = calculatePercent(hsl.l, l2);
  const light3 = calculatePercent(hsl.l, l3);
  const light4 = calculatePercent(hsl.l, l4);

  const color1 = { h: hsl.h, s: hsl.s, l: light1 };
  const color2 = { h: hsl.h, s: hsl.s, l: light2 };
  const color3 = { h: hsl.h, s: hsl.s, l: light3 };
  const color4 = { h: hsl.h, s: hsl.s, l: light4 };

  const rgb1 = hsl2RGB(color1);
  const rgb2 = hsl2RGB(color2);
  const rgb3 = hsl2RGB(color3);
  const rgb4 = hsl2RGB(color4);

  const hex1 = rgb2Hex(rgb1);
  const hex2 = rgb2Hex(rgb2);
  const hex3 = rgb2Hex(rgb3);
  const hex4 = rgb2Hex(rgb4);

  const colorRGB = { c1: hex1, c2: hex2, c3: hex3, c4: hex4 };

  return colorRGB;
}
function prepareHex2rgb(hex) {
  const red = hex.substring(1, 3);
  const green = hex.substring(3, 5);
  const blue = hex.substring(5, 7);
  const hexRGB = { r: red, g: green, b: blue };
  return hex2RGB(hexRGB);
  // convertToRGB(hex, red, green, blue);
}
function hex2RGB(hexRGB) {
  const red = Number.parseInt(hexRGB.r, 16);
  const green = Number.parseInt(hexRGB.g, 16);
  const blue = Number.parseInt(hexRGB.b, 16);
  const rgb = { r: red, g: green, b: blue };
  return rgb;
}
function rgb2HSL(rgb) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

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

  const hsl = { h: h, s: s, l: l };
  return hsl;
}
function hsl2RGB(hsl) {
  //FROM https://css-tricks.com/converting-color-spaces-in-javascript/

  let h = hsl.h;
  let s = hsl.s;
  let l = hsl.l;

  if (s === 0) {
    s = 10;
  }
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const rgb = { r: r, g: g, b: b };
  return rgb;
}
function calculateDegrees(oldNmb, addNmb) {
  const nmbAdd = oldNmb + addNmb;
  if (nmbAdd > 360) {
    const dif = 360 - oldNmb;
    return addNmb - dif;
  } else if (nmbAdd < 0) {
    const dif = 0 - oldNmb;
    return 360 + dif;
  } else {
    return nmbAdd;
  }
}

function calculatePercent(oldNmb, addNmb) {
  const nmbAdd = oldNmb + addNmb;
  if (nmbAdd > 100) {
    return 100;
  } else if (nmbAdd < 0) {
    return 0;
  } else {
    return nmbAdd;
  }
}
function displayColor(hexCode, whichBox) {
  document.querySelector(`${whichBox} .displaybox`).style.setProperty("--color", hexCode);
}
function displayText(hexCode, whichBox) {
  const rgb = prepareHex2rgb(hexCode);
  const hsl = rgb2HSL(rgb);
  document.querySelector(`${whichBox} #hex`).textContent = `Hex: ${hexCode}`;
  document.querySelector(`${whichBox} #rgb`).textContent = `RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  document.querySelector(`${whichBox} #hsl`).textContent = `HSL: hsl(${hsl.h}, ${hsl.s}, ${hsl.l})`;
}
