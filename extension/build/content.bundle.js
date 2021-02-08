/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/content.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/content.js":
/*!*****************************!*\
  !*** ./src/main/content.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

const FRAMES_PER_SECOND = 5
const drawingDiv = document.createElement('div');
const settingsDiv = document.createElement('div');
settingsDiv.classList.add('scribble-settings-container');
const optionsDiv = document.createElement('div');
const selectMode = document.createElement('select');
const selectLineStyle = document.createElement('select');
const mainButton = document.createElement('button');

const toggleLabel = document.createElement('label');
toggleLabel.classList.add('switch');
const toggle = document.createElement('input');
toggle.setAttribute('type', 'checkbox');
const slider = document.createElement('span');
slider.classList.add('slider');
slider.classList.add('round');
toggleLabel.appendChild(toggle);
toggleLabel.appendChild(slider);

let setupComplete = false;
let isDrawing = false;
let currentLineWidth = 6; //4
let canv, ctx;
let greatGrandparentElt;
let optionsShowing = false;
let scribbleActive = true;

let currentColor = '#b0f2ff';
let mode = 'pressToDraw';
const modeOptions = [
    {
        name: '𝕃𝕀ℕ𝔼',
        value: 'pressToDraw'
    },
    {
        name: 'ⓓⓞⓣⓢ',
        value: 'clickToDraw'
    },
    {
        name: '𝐸𝑀🍑𝒥ℹ️𝒮💞',
        value: 'alwaysDraw'
    }
]

const emojiOptions = {
    blue: ["🦋", "🌀", "💎", "🧢", "❄️", "🐬", "🫐", "💙", "🐳", "💧"],
    pink: ["💗", "🌺", "💞", "🌸", "🎀"],
    orange: ["🍊", "🔥", "🍑", "🧡", "🦀", "💥", "✴️"],
    green: ["🍏", "✳️", "🎾", "♻️", "🌱", "🥝", "💚"]
}
let emojiCounter = 0;
currentEmojis = emojiOptions['blue'];



function init() {
    console.log("🌸🌸🌸 Hell0000 FROM SCRIBBLER XO")
    let setupChecker = setInterval(() => {
        if (!setupComplete) {
            setup();
        } else {
            console.log("✏️ CLEARING INTERVAL");
            clearInterval(setupChecker);
        }
    }, Math.round(1000 / FRAMES_PER_SECOND))
}

function fixPosition(e, gCanvasElement) {
    var x;
    var y;
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop;
    return { x: x, y: y };
}

function setup() {
    const ownVideoPreview = document.querySelector('[data-fps-request-screencast-cap]')
    greatGrandparentElt = ownVideoPreview.parentElement.parentElement.parentElement;

    const buttons = ownVideoPreview && greatGrandparentElt

    if (buttons && !setupComplete) { // do this once once the Meet document divs are ready
        // greatGrandparentElt.prepend(buttons.children[1].cloneNode())
        setupDrawing();
        window.addEventListener("resize", resizeCanvas);
        setupComplete = true;
    }
}

function setupDrawing() {
    // DRAWING CONTAINER
    drawingDiv.id = 'drawing-container';

    // Create icon
    mainButton.classList.add('scribble-button');
    mainButton.id = "main-button"
    mainButton.addEventListener('click', toggleOptions);
    mainButton.innerHTML = '🖍';
    // let ogScribbleImage = document.getElementById('icon-image');
    // let scribbleImage = ogScribbleImage.cloneNode();
    // console.log(scribbleImage);
    // mainButton.append(scribbleImage);
    settingsDiv.appendChild(mainButton);

    // TOGGLE
    toggleLabel.id = "toggle"
    toggle.setAttribute('checked', 'true');
    toggle.addEventListener('click', toggleScribble);
    settingsDiv.appendChild(toggleLabel);

    // CLEAR BUTTON
    optionsDiv.id = "options-container";
    createButton('ℂ𝕃𝔼𝔸ℝ <br> (double click)', 32, clearCanvas, optionsDiv, 'clear-button');
    // createButton('DOWNLOAD', 80, downloadCanvas, optionsDiv);
    settingsDiv.appendChild(optionsDiv);

    // MODE SELECTOR
    selectMode.addEventListener('change', changeMode)
    selectMode.classList.add('scribble-button');
    selectMode.style.zIndex = '99';
    selectMode.id = 'select-mode';
    modeOptions.forEach((mode) => {
        const newMode = document.createElement('option');
        newMode.value = mode.value;
        newMode.innerText = mode.name;
        newMode.id = mode.value;
        selectMode.appendChild(newMode);
    });
    optionsDiv.appendChild(selectMode);

    createColorButton('#b0f2ff', 5, optionsDiv, 'blue');
    createColorButton('hotpink', 30, optionsDiv, 'pink');
    createColorButton('lime', 55, optionsDiv, 'green');
    createColorButton('#F4A91E', 80, optionsDiv, 'orange');


    // DRAWING CANVAS
    canv = document.createElement('canvas'); // creates new canvas element
    canv.id = 'drawing-canvas'; // gives canvas id
    canv.height = window.innerHeight; //get original canvas height
    canv.width = window.innerWidth;; // get original canvas width
    canv.style.position = 'absolute';
    canv.style.zIndex = 0;
    canv.style.cursor = 'pointer';

    ctx = canv.getContext('2d');
    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentColor;
    ctx.lineWidth = currentLineWidth;
    ctx.lineJoin = "round";
    canv.addEventListener('dblclick', (e) => {
        clearCanvas();
    });

    canv.addEventListener('mousedown', mouseIsDown)
    canv.addEventListener('mousemove', mouseMove)
    canv.addEventListener('mouseup', mouseUp);

    drawingDiv.appendChild(canv);
    drawingDiv.appendChild(settingsDiv);
    clearCanvas();
    greatGrandparentElt.parentElement.parentElement.parentElement.parentElement.appendChild(drawingDiv); // adds the canvas to the body element
}

function createButton(text, yPos, clickFunction, parentDiv, id) {
    const newButton = document.createElement('button');
    newButton.innerHTML = text;
    newButton.addEventListener('click', clickFunction);
    newButton.style.top = yPos + 'px';
    newButton.classList.add('scribble-button');
    newButton.id = id;
    parentDiv.appendChild(newButton);
}

function createColorButton(colorString, leftPos, parentDiv, colorKey) {
    const newButton = document.createElement('button');
    newButton.classList.add('scribble-button');
    newButton.classList.add('color-button');
    newButton.style.background = colorString;
    newButton.style.left = leftPos + 'px';
    if (colorKey == 'blue') {
        newButton.style.borderStyle = 'solid';

    } else {
        newButton.style.borderStyle = 'dotted';
    }

    newButton.id = leftPos;
    parentDiv.appendChild(newButton);

    newButton.addEventListener('click', (e) => {
        ctx.strokeStyle = colorString;
        ctx.fillStyle = colorString;
        currentColor = colorString;
        let allColors = document.getElementsByClassName('color-button');
        currentEmojis = emojiOptions[colorKey];
        emojiCounter = 0;
        for (let i = 0; i < allColors.length; i++) {
            const currentColorButton = allColors[i];
            currentColorButton.style.borderStyle = 'dotted';
        }
        e.target.style.borderStyle = 'solid';
    });
}

function toggleOptions() {
    optionsShowing = !optionsShowing;
    if (optionsShowing) {
        optionsDiv.style.display = 'block';
    } else {
        optionsDiv.style.display = 'none';
    }
}

function changeMode() {
    mode = selectMode.value;
}

function resizeCanvas() {
    console.log('resizing canvas!');
    canv.height = window.innerHeight; //get original canvas height
    canv.width = window.innerWidth;; // get original canvas width

    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentColor;
    ctx.lineWidth = currentLineWidth;
}

function toggleScribble() {
    scribbleActive = !scribbleActive;
    console.log("toggling scribble: ", toggle.checked);
    if (toggle.checked) {
        canv.style.display = 'block';
        mainButton.style.opacity = 1.0;
    } else {
        canv.style.display = 'none';
        mainButton.style.opacity = 0.5;
        if (optionsShowing) {
            optionsShowing = false;
            // mainButton.innerHTML = '✎';
            optionsDiv.style.display = 'none';
        }
    }
}

function clearCanvas() {
    console.log("trying to clear canvas!!!");
    ctx.clearRect(0, 0, canv.width, canv.height);
    // ctx.fillStyle = '#e8e8e840'
    ctx.fillStyle = '#0000001A'
    ctx.fillRect(0, 0, canv.width, canv.height);
    isDrawing = false;
}

function downloadCanvas() {
    const link = document.createElement('a');
    link.download = 'my_scribble.png';
    link.href = document.getElementById('drawing-canvas').toDataURL()
    link.click();
}

function mouseIsDown(e) {
    let mousePos = fixPosition(e, canv);
    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    isDrawing = true;
}

function mouseMove(e) {
    let mousePos = fixPosition(e, canv);
    if (isDrawing) {
        if (mode == 'pressToDraw') {
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
        } else if (mode == 'clickToDraw') {
            let shapeSize = 8;
            ctx.fillStyle = currentColor;
            ctx.beginPath();
            ctx.arc(mousePos.x, mousePos.y, shapeSize, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        } else if (mode == 'alwaysDraw') {
            let fontSize = 28;
            ctx.font = fontSize + "px Verdana";
            ctx.fillStyle = currentColor;
            ctx.fillText(currentEmojis[emojiCounter], mousePos.x - fontSize / 2, mousePos.y + fontSize / 4);
            emojiCounter = (emojiCounter + 1) % currentEmojis.length;
            console.log('EMOJI LENGTH', currentEmojis.length);
        }
    }
}

function mouseUp(e) {
    if (isDrawing) {
        isDrawing = false;
    }
}

init();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsNENBQTRDO0FBQzVDLCtCQUErQjtBQUMvQixxQ0FBcUM7QUFDckMsb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdHQUF3RztBQUN4Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckMsb0NBQW9DOztBQUVwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImNvbnRlbnQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi9jb250ZW50LmpzXCIpO1xuIiwiY29uc3QgRlJBTUVTX1BFUl9TRUNPTkQgPSA1XG5jb25zdCBkcmF3aW5nRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBzZXR0aW5nc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuc2V0dGluZ3NEaXYuY2xhc3NMaXN0LmFkZCgnc2NyaWJibGUtc2V0dGluZ3MtY29udGFpbmVyJyk7XG5jb25zdCBvcHRpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBzZWxlY3RNb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG5jb25zdCBzZWxlY3RMaW5lU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbmNvbnN0IG1haW5CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblxuY29uc3QgdG9nZ2xlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xudG9nZ2xlTGFiZWwuY2xhc3NMaXN0LmFkZCgnc3dpdGNoJyk7XG5jb25zdCB0b2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xudG9nZ2xlLnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcicpO1xuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3JvdW5kJyk7XG50b2dnbGVMYWJlbC5hcHBlbmRDaGlsZCh0b2dnbGUpO1xudG9nZ2xlTGFiZWwuYXBwZW5kQ2hpbGQoc2xpZGVyKTtcblxubGV0IHNldHVwQ29tcGxldGUgPSBmYWxzZTtcbmxldCBpc0RyYXdpbmcgPSBmYWxzZTtcbmxldCBjdXJyZW50TGluZVdpZHRoID0gNjsgLy80XG5sZXQgY2FudiwgY3R4O1xubGV0IGdyZWF0R3JhbmRwYXJlbnRFbHQ7XG5sZXQgb3B0aW9uc1Nob3dpbmcgPSBmYWxzZTtcbmxldCBzY3JpYmJsZUFjdGl2ZSA9IHRydWU7XG5cbmxldCBjdXJyZW50Q29sb3IgPSAnI2IwZjJmZic7XG5sZXQgbW9kZSA9ICdwcmVzc1RvRHJhdyc7XG5jb25zdCBtb2RlT3B0aW9ucyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICfwnZWD8J2VgOKElfCdlLwnLFxuICAgICAgICB2YWx1ZTogJ3ByZXNzVG9EcmF3J1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAn4pOT4pOe4pOj4pOiJyxcbiAgICAgICAgdmFsdWU6ICdjbGlja1RvRHJhdydcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ/CdkLjwnZGA8J+NkfCdkqXihLnvuI/wnZKu8J+SnicsXG4gICAgICAgIHZhbHVlOiAnYWx3YXlzRHJhdydcbiAgICB9XG5dXG5cbmNvbnN0IGVtb2ppT3B0aW9ucyA9IHtcbiAgICBibHVlOiBbXCLwn6aLXCIsIFwi8J+MgFwiLCBcIvCfko5cIiwgXCLwn6eiXCIsIFwi4p2E77iPXCIsIFwi8J+QrFwiLCBcIvCfq5BcIiwgXCLwn5KZXCIsIFwi8J+Qs1wiLCBcIvCfkqdcIl0sXG4gICAgcGluazogW1wi8J+Sl1wiLCBcIvCfjLpcIiwgXCLwn5KeXCIsIFwi8J+MuFwiLCBcIvCfjoBcIl0sXG4gICAgb3JhbmdlOiBbXCLwn42KXCIsIFwi8J+UpVwiLCBcIvCfjZFcIiwgXCLwn6ehXCIsIFwi8J+mgFwiLCBcIvCfkqVcIiwgXCLinLTvuI9cIl0sXG4gICAgZ3JlZW46IFtcIvCfjY9cIiwgXCLinLPvuI9cIiwgXCLwn46+XCIsIFwi4pm777iPXCIsIFwi8J+MsVwiLCBcIvCfpZ1cIiwgXCLwn5KaXCJdXG59XG5sZXQgZW1vamlDb3VudGVyID0gMDtcbmN1cnJlbnRFbW9qaXMgPSBlbW9qaU9wdGlvbnNbJ2JsdWUnXTtcblxuXG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCLwn4y48J+MuPCfjLggSGVsbDAwMDAgRlJPTSBTQ1JJQkJMRVIgWE9cIilcbiAgICBsZXQgc2V0dXBDaGVja2VyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoIXNldHVwQ29tcGxldGUpIHtcbiAgICAgICAgICAgIHNldHVwKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuKcj++4jyBDTEVBUklORyBJTlRFUlZBTFwiKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2V0dXBDaGVja2VyKTtcbiAgICAgICAgfVxuICAgIH0sIE1hdGgucm91bmQoMTAwMCAvIEZSQU1FU19QRVJfU0VDT05EKSlcbn1cblxuZnVuY3Rpb24gZml4UG9zaXRpb24oZSwgZ0NhbnZhc0VsZW1lbnQpIHtcbiAgICB2YXIgeDtcbiAgICB2YXIgeTtcbiAgICBpZiAoZS5wYWdlWCB8fCBlLnBhZ2VZKSB7XG4gICAgICAgIHggPSBlLnBhZ2VYO1xuICAgICAgICB5ID0gZS5wYWdlWTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHggPSBlLmNsaWVudFggKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgK1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICAgIHkgPSBlLmNsaWVudFkgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCArXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIH1cbiAgICB4IC09IGdDYW52YXNFbGVtZW50Lm9mZnNldExlZnQ7XG4gICAgeSAtPSBnQ2FudmFzRWxlbWVudC5vZmZzZXRUb3A7XG4gICAgcmV0dXJuIHsgeDogeCwgeTogeSB9O1xufVxuXG5mdW5jdGlvbiBzZXR1cCgpIHtcbiAgICBjb25zdCBvd25WaWRlb1ByZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcHMtcmVxdWVzdC1zY3JlZW5jYXN0LWNhcF0nKVxuICAgIGdyZWF0R3JhbmRwYXJlbnRFbHQgPSBvd25WaWRlb1ByZXZpZXcucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICBjb25zdCBidXR0b25zID0gb3duVmlkZW9QcmV2aWV3ICYmIGdyZWF0R3JhbmRwYXJlbnRFbHRcblxuICAgIGlmIChidXR0b25zICYmICFzZXR1cENvbXBsZXRlKSB7IC8vIGRvIHRoaXMgb25jZSBvbmNlIHRoZSBNZWV0IGRvY3VtZW50IGRpdnMgYXJlIHJlYWR5XG4gICAgICAgIC8vIGdyZWF0R3JhbmRwYXJlbnRFbHQucHJlcGVuZChidXR0b25zLmNoaWxkcmVuWzFdLmNsb25lTm9kZSgpKVxuICAgICAgICBzZXR1cERyYXdpbmcoKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplQ2FudmFzKTtcbiAgICAgICAgc2V0dXBDb21wbGV0ZSA9IHRydWU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cERyYXdpbmcoKSB7XG4gICAgLy8gRFJBV0lORyBDT05UQUlORVJcbiAgICBkcmF3aW5nRGl2LmlkID0gJ2RyYXdpbmctY29udGFpbmVyJztcblxuICAgIC8vIENyZWF0ZSBpY29uXG4gICAgbWFpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzY3JpYmJsZS1idXR0b24nKTtcbiAgICBtYWluQnV0dG9uLmlkID0gXCJtYWluLWJ1dHRvblwiXG4gICAgbWFpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZU9wdGlvbnMpO1xuICAgIG1haW5CdXR0b24uaW5uZXJIVE1MID0gJ/Cflo0nO1xuICAgIC8vIGxldCBvZ1NjcmliYmxlSW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaWNvbi1pbWFnZScpO1xuICAgIC8vIGxldCBzY3JpYmJsZUltYWdlID0gb2dTY3JpYmJsZUltYWdlLmNsb25lTm9kZSgpO1xuICAgIC8vIGNvbnNvbGUubG9nKHNjcmliYmxlSW1hZ2UpO1xuICAgIC8vIG1haW5CdXR0b24uYXBwZW5kKHNjcmliYmxlSW1hZ2UpO1xuICAgIHNldHRpbmdzRGl2LmFwcGVuZENoaWxkKG1haW5CdXR0b24pO1xuXG4gICAgLy8gVE9HR0xFXG4gICAgdG9nZ2xlTGFiZWwuaWQgPSBcInRvZ2dsZVwiXG4gICAgdG9nZ2xlLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICd0cnVlJyk7XG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2NyaWJibGUpO1xuICAgIHNldHRpbmdzRGl2LmFwcGVuZENoaWxkKHRvZ2dsZUxhYmVsKTtcblxuICAgIC8vIENMRUFSIEJVVFRPTlxuICAgIG9wdGlvbnNEaXYuaWQgPSBcIm9wdGlvbnMtY29udGFpbmVyXCI7XG4gICAgY3JlYXRlQnV0dG9uKCfihILwnZWD8J2UvPCdlLjihJ0gPGJyPiAoZG91YmxlIGNsaWNrKScsIDMyLCBjbGVhckNhbnZhcywgb3B0aW9uc0RpdiwgJ2NsZWFyLWJ1dHRvbicpO1xuICAgIC8vIGNyZWF0ZUJ1dHRvbignRE9XTkxPQUQnLCA4MCwgZG93bmxvYWRDYW52YXMsIG9wdGlvbnNEaXYpO1xuICAgIHNldHRpbmdzRGl2LmFwcGVuZENoaWxkKG9wdGlvbnNEaXYpO1xuXG4gICAgLy8gTU9ERSBTRUxFQ1RPUlxuICAgIHNlbGVjdE1vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2hhbmdlTW9kZSlcbiAgICBzZWxlY3RNb2RlLmNsYXNzTGlzdC5hZGQoJ3NjcmliYmxlLWJ1dHRvbicpO1xuICAgIHNlbGVjdE1vZGUuc3R5bGUuekluZGV4ID0gJzk5JztcbiAgICBzZWxlY3RNb2RlLmlkID0gJ3NlbGVjdC1tb2RlJztcbiAgICBtb2RlT3B0aW9ucy5mb3JFYWNoKChtb2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld01vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgbmV3TW9kZS52YWx1ZSA9IG1vZGUudmFsdWU7XG4gICAgICAgIG5ld01vZGUuaW5uZXJUZXh0ID0gbW9kZS5uYW1lO1xuICAgICAgICBuZXdNb2RlLmlkID0gbW9kZS52YWx1ZTtcbiAgICAgICAgc2VsZWN0TW9kZS5hcHBlbmRDaGlsZChuZXdNb2RlKTtcbiAgICB9KTtcbiAgICBvcHRpb25zRGl2LmFwcGVuZENoaWxkKHNlbGVjdE1vZGUpO1xuXG4gICAgY3JlYXRlQ29sb3JCdXR0b24oJyNiMGYyZmYnLCA1LCBvcHRpb25zRGl2LCAnYmx1ZScpO1xuICAgIGNyZWF0ZUNvbG9yQnV0dG9uKCdob3RwaW5rJywgMzAsIG9wdGlvbnNEaXYsICdwaW5rJyk7XG4gICAgY3JlYXRlQ29sb3JCdXR0b24oJ2xpbWUnLCA1NSwgb3B0aW9uc0RpdiwgJ2dyZWVuJyk7XG4gICAgY3JlYXRlQ29sb3JCdXR0b24oJyNGNEE5MUUnLCA4MCwgb3B0aW9uc0RpdiwgJ29yYW5nZScpO1xuXG5cbiAgICAvLyBEUkFXSU5HIENBTlZBU1xuICAgIGNhbnYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsgLy8gY3JlYXRlcyBuZXcgY2FudmFzIGVsZW1lbnRcbiAgICBjYW52LmlkID0gJ2RyYXdpbmctY2FudmFzJzsgLy8gZ2l2ZXMgY2FudmFzIGlkXG4gICAgY2Fudi5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7IC8vZ2V0IG9yaWdpbmFsIGNhbnZhcyBoZWlnaHRcbiAgICBjYW52LndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7OyAvLyBnZXQgb3JpZ2luYWwgY2FudmFzIHdpZHRoXG4gICAgY2Fudi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgY2Fudi5zdHlsZS56SW5kZXggPSAwO1xuICAgIGNhbnYuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgY3R4ID0gY2Fudi5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IGN1cnJlbnRDb2xvcjtcbiAgICBjdHguZmlsbFN0eWxlID0gY3VycmVudENvbG9yO1xuICAgIGN0eC5saW5lV2lkdGggPSBjdXJyZW50TGluZVdpZHRoO1xuICAgIGN0eC5saW5lSm9pbiA9IFwicm91bmRcIjtcbiAgICBjYW52LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY2xlYXJDYW52YXMoKTtcbiAgICB9KTtcblxuICAgIGNhbnYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VJc0Rvd24pXG4gICAgY2Fudi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpXG4gICAgY2Fudi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XG5cbiAgICBkcmF3aW5nRGl2LmFwcGVuZENoaWxkKGNhbnYpO1xuICAgIGRyYXdpbmdEaXYuYXBwZW5kQ2hpbGQoc2V0dGluZ3NEaXYpO1xuICAgIGNsZWFyQ2FudmFzKCk7XG4gICAgZ3JlYXRHcmFuZHBhcmVudEVsdC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGRyYXdpbmdEaXYpOyAvLyBhZGRzIHRoZSBjYW52YXMgdG8gdGhlIGJvZHkgZWxlbWVudFxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdXR0b24odGV4dCwgeVBvcywgY2xpY2tGdW5jdGlvbiwgcGFyZW50RGl2LCBpZCkge1xuICAgIGNvbnN0IG5ld0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG5ld0J1dHRvbi5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIG5ld0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrRnVuY3Rpb24pO1xuICAgIG5ld0J1dHRvbi5zdHlsZS50b3AgPSB5UG9zICsgJ3B4JztcbiAgICBuZXdCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2NyaWJibGUtYnV0dG9uJyk7XG4gICAgbmV3QnV0dG9uLmlkID0gaWQ7XG4gICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKG5ld0J1dHRvbik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbG9yQnV0dG9uKGNvbG9yU3RyaW5nLCBsZWZ0UG9zLCBwYXJlbnREaXYsIGNvbG9yS2V5KSB7XG4gICAgY29uc3QgbmV3QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbmV3QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NjcmliYmxlLWJ1dHRvbicpO1xuICAgIG5ld0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdjb2xvci1idXR0b24nKTtcbiAgICBuZXdCdXR0b24uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yU3RyaW5nO1xuICAgIG5ld0J1dHRvbi5zdHlsZS5sZWZ0ID0gbGVmdFBvcyArICdweCc7XG4gICAgaWYgKGNvbG9yS2V5ID09ICdibHVlJykge1xuICAgICAgICBuZXdCdXR0b24uc3R5bGUuYm9yZGVyU3R5bGUgPSAnc29saWQnO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV3QnV0dG9uLnN0eWxlLmJvcmRlclN0eWxlID0gJ2RvdHRlZCc7XG4gICAgfVxuXG4gICAgbmV3QnV0dG9uLmlkID0gbGVmdFBvcztcbiAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobmV3QnV0dG9uKTtcblxuICAgIG5ld0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yU3RyaW5nO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3JTdHJpbmc7XG4gICAgICAgIGN1cnJlbnRDb2xvciA9IGNvbG9yU3RyaW5nO1xuICAgICAgICBsZXQgYWxsQ29sb3JzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29sb3ItYnV0dG9uJyk7XG4gICAgICAgIGN1cnJlbnRFbW9qaXMgPSBlbW9qaU9wdGlvbnNbY29sb3JLZXldO1xuICAgICAgICBlbW9qaUNvdW50ZXIgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbENvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudENvbG9yQnV0dG9uID0gYWxsQ29sb3JzW2ldO1xuICAgICAgICAgICAgY3VycmVudENvbG9yQnV0dG9uLnN0eWxlLmJvcmRlclN0eWxlID0gJ2RvdHRlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZS50YXJnZXQuc3R5bGUuYm9yZGVyU3R5bGUgPSAnc29saWQnO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVPcHRpb25zKCkge1xuICAgIG9wdGlvbnNTaG93aW5nID0gIW9wdGlvbnNTaG93aW5nO1xuICAgIGlmIChvcHRpb25zU2hvd2luZykge1xuICAgICAgICBvcHRpb25zRGl2LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnNEaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNoYW5nZU1vZGUoKSB7XG4gICAgbW9kZSA9IHNlbGVjdE1vZGUudmFsdWU7XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZUNhbnZhcygpIHtcbiAgICBjb25zb2xlLmxvZygncmVzaXppbmcgY2FudmFzIScpO1xuICAgIGNhbnYuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0OyAvL2dldCBvcmlnaW5hbCBjYW52YXMgaGVpZ2h0XG4gICAgY2Fudi53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoOzsgLy8gZ2V0IG9yaWdpbmFsIGNhbnZhcyB3aWR0aFxuXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY3VycmVudENvbG9yO1xuICAgIGN0eC5maWxsU3R5bGUgPSBjdXJyZW50Q29sb3I7XG4gICAgY3R4LmxpbmVXaWR0aCA9IGN1cnJlbnRMaW5lV2lkdGg7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVNjcmliYmxlKCkge1xuICAgIHNjcmliYmxlQWN0aXZlID0gIXNjcmliYmxlQWN0aXZlO1xuICAgIGNvbnNvbGUubG9nKFwidG9nZ2xpbmcgc2NyaWJibGU6IFwiLCB0b2dnbGUuY2hlY2tlZCk7XG4gICAgaWYgKHRvZ2dsZS5jaGVja2VkKSB7XG4gICAgICAgIGNhbnYuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIG1haW5CdXR0b24uc3R5bGUub3BhY2l0eSA9IDEuMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjYW52LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIG1haW5CdXR0b24uc3R5bGUub3BhY2l0eSA9IDAuNTtcbiAgICAgICAgaWYgKG9wdGlvbnNTaG93aW5nKSB7XG4gICAgICAgICAgICBvcHRpb25zU2hvd2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gbWFpbkJ1dHRvbi5pbm5lckhUTUwgPSAn4pyOJztcbiAgICAgICAgICAgIG9wdGlvbnNEaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJDYW52YXMoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0cnlpbmcgdG8gY2xlYXIgY2FudmFzISEhXCIpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2Fudi53aWR0aCwgY2Fudi5oZWlnaHQpO1xuICAgIC8vIGN0eC5maWxsU3R5bGUgPSAnI2U4ZThlODQwJ1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMDAwMDFBJ1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52LndpZHRoLCBjYW52LmhlaWdodCk7XG4gICAgaXNEcmF3aW5nID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGRvd25sb2FkQ2FudmFzKCkge1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5kb3dubG9hZCA9ICdteV9zY3JpYmJsZS5wbmcnO1xuICAgIGxpbmsuaHJlZiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcmF3aW5nLWNhbnZhcycpLnRvRGF0YVVSTCgpXG4gICAgbGluay5jbGljaygpO1xufVxuXG5mdW5jdGlvbiBtb3VzZUlzRG93bihlKSB7XG4gICAgbGV0IG1vdXNlUG9zID0gZml4UG9zaXRpb24oZSwgY2Fudik7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8obW91c2VQb3MueCwgbW91c2VQb3MueSk7XG4gICAgaXNEcmF3aW5nID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gbW91c2VNb3ZlKGUpIHtcbiAgICBsZXQgbW91c2VQb3MgPSBmaXhQb3NpdGlvbihlLCBjYW52KTtcbiAgICBpZiAoaXNEcmF3aW5nKSB7XG4gICAgICAgIGlmIChtb2RlID09ICdwcmVzc1RvRHJhdycpIHtcbiAgICAgICAgICAgIGN0eC5saW5lVG8obW91c2VQb3MueCwgbW91c2VQb3MueSk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSAnY2xpY2tUb0RyYXcnKSB7XG4gICAgICAgICAgICBsZXQgc2hhcGVTaXplID0gODtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjdXJyZW50Q29sb3I7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHguYXJjKG1vdXNlUG9zLngsIG1vdXNlUG9zLnksIHNoYXBlU2l6ZSwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdhbHdheXNEcmF3Jykge1xuICAgICAgICAgICAgbGV0IGZvbnRTaXplID0gMjg7XG4gICAgICAgICAgICBjdHguZm9udCA9IGZvbnRTaXplICsgXCJweCBWZXJkYW5hXCI7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY3VycmVudENvbG9yO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGN1cnJlbnRFbW9qaXNbZW1vamlDb3VudGVyXSwgbW91c2VQb3MueCAtIGZvbnRTaXplIC8gMiwgbW91c2VQb3MueSArIGZvbnRTaXplIC8gNCk7XG4gICAgICAgICAgICBlbW9qaUNvdW50ZXIgPSAoZW1vamlDb3VudGVyICsgMSkgJSBjdXJyZW50RW1vamlzLmxlbmd0aDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFTU9KSSBMRU5HVEgnLCBjdXJyZW50RW1vamlzLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdXNlVXAoZSkge1xuICAgIGlmIChpc0RyYXdpbmcpIHtcbiAgICAgICAgaXNEcmF3aW5nID0gZmFsc2U7XG4gICAgfVxufVxuXG5pbml0KCk7XG4iXSwic291cmNlUm9vdCI6IiJ9