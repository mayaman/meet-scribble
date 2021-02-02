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
        name: 'LINE',
        value: 'pressToDraw'
    },
    {
        name: 'DOTS',
        value: 'clickToDraw'
    },
    {
        name: 'EMOJIS',
        value: 'alwaysDraw'
    }
]

const emojiOptions = {
    blue: ["🦋", "🧢", "🐬", "🫐"],
    pink: ["💗", "🐷", "💞", "🌸", "💘"],
    orange: ["🍊", "🍑"],
    green: ["🍏", "🎾"]
}
let emojiCounter = 0;


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
    let ogScribbleImage = document.getElementById('icon-image');
    let scribbleImage = ogScribbleImage.cloneNode();
    console.log(scribbleImage);
    // mainButton.append(scribbleImage);
    settingsDiv.appendChild(mainButton);

    // TOGGLE
    toggleLabel.id = "toggle"
    toggle.setAttribute('checked', 'true');
    toggle.addEventListener('click', toggleScribble);
    settingsDiv.appendChild(toggleLabel);

    // CLEAR BUTTON
    optionsDiv.id = "options-container";
    createButton('♻️ / double click', 20, clearCanvas, optionsDiv);
    // createButton('DOWNLOAD', 36, downloadCanvas, optionsDiv);
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

function createButton(text, yPos, clickFunction, parentDiv) {
    const newButton = document.createElement('button');
    newButton.innerHTML = text;
    newButton.addEventListener('click', clickFunction);
    newButton.style.top = yPos + 'px';
    newButton.classList.add('scribble-button');
    parentDiv.appendChild(newButton);
}

function createColorButton(colorString, leftPos, parentDiv, colorKey) {
    const newButton = document.createElement('button');
    newButton.classList.add('scribble-button');
    newButton.classList.add('color-button');
    newButton.style.background = colorString;
    newButton.style.left = leftPos + 'px';
    // if (colorString == '#b0f2ff') {
    //     newButton.style.opacity = 1.0;

    // } else {
    //     newButton.style.opacity = 0.5;
    // }

    newButton.id = leftPos;
    parentDiv.appendChild(newButton);

    newButton.addEventListener('click', (e) => {
        ctx.strokeStyle = colorString;
        ctx.fillStyle = colorString;
        currentColor = colorString;
        let allColors = document.getElementsByClassName('color-button');
        currentEmojis = emojiOptions[colorKey];
        console.log(currentEmojis);
        emojiCounter = 0;
        // for (let i = 0; i < allColors.length; i++) {
        //     const currentColorButton = allColors[i];
        //     currentColorButton.style.opacity = 0.5;
        // }
        // e.target.style.opacity = 1.0;
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
    if (mode == 'alwaysDraw') {
        ctx.beginPath();
        ctx.moveTo(mousePos.x, mousePos.y);
    }
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
            let shapeSize = 10;
            ctx.fillStyle = currentColor;
            // ctx.fillRect(mousePos.x - shapeSize / 2, mousePos.y - shapeSize / 2, shapeSize, shapeSize);

            ctx.beginPath();
            ctx.arc(mousePos.x, mousePos.y, shapeSize, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        } else if (mode == 'alwaysDraw') {
            let fontSize = 36;
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

    // CLICK TO DRAW CODE
    // isDrawing = !isDrawing;
    // if (isDrawing) {
    //     let mousePos = fixPosition(e, canv);
    //     ctx.beginPath();
    //     ctx.moveTo(mousePos.x, mousePos.y);
    // }
}

init();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsNENBQTRDO0FBQzVDLCtCQUErQjtBQUMvQixxQ0FBcUM7QUFDckMsb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdHQUF3RztBQUN4Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHNCQUFzQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckMsb0NBQW9DOztBQUVwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiY29udGVudC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluL2NvbnRlbnQuanNcIik7XG4iLCJjb25zdCBGUkFNRVNfUEVSX1NFQ09ORCA9IDVcbmNvbnN0IGRyYXdpbmdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IHNldHRpbmdzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5zZXR0aW5nc0Rpdi5jbGFzc0xpc3QuYWRkKCdzY3JpYmJsZS1zZXR0aW5ncy1jb250YWluZXInKTtcbmNvbnN0IG9wdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IHNlbGVjdE1vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbmNvbnN0IHNlbGVjdExpbmVTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuY29uc3QgbWFpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG5jb25zdCB0b2dnbGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG50b2dnbGVMYWJlbC5jbGFzc0xpc3QuYWRkKCdzd2l0Y2gnKTtcbmNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG50b2dnbGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG5jb25zdCBzbGlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJyk7XG5zbGlkZXIuY2xhc3NMaXN0LmFkZCgncm91bmQnKTtcbnRvZ2dsZUxhYmVsLmFwcGVuZENoaWxkKHRvZ2dsZSk7XG50b2dnbGVMYWJlbC5hcHBlbmRDaGlsZChzbGlkZXIpO1xuXG5sZXQgc2V0dXBDb21wbGV0ZSA9IGZhbHNlO1xubGV0IGlzRHJhd2luZyA9IGZhbHNlO1xubGV0IGN1cnJlbnRMaW5lV2lkdGggPSA2OyAvLzRcbmxldCBjYW52LCBjdHg7XG5sZXQgZ3JlYXRHcmFuZHBhcmVudEVsdDtcbmxldCBvcHRpb25zU2hvd2luZyA9IGZhbHNlO1xubGV0IHNjcmliYmxlQWN0aXZlID0gdHJ1ZTtcblxubGV0IGN1cnJlbnRDb2xvciA9ICcjYjBmMmZmJztcbmxldCBtb2RlID0gJ3ByZXNzVG9EcmF3JztcbmNvbnN0IG1vZGVPcHRpb25zID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ0xJTkUnLFxuICAgICAgICB2YWx1ZTogJ3ByZXNzVG9EcmF3J1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnRE9UUycsXG4gICAgICAgIHZhbHVlOiAnY2xpY2tUb0RyYXcnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdFTU9KSVMnLFxuICAgICAgICB2YWx1ZTogJ2Fsd2F5c0RyYXcnXG4gICAgfVxuXVxuXG5jb25zdCBlbW9qaU9wdGlvbnMgPSB7XG4gICAgYmx1ZTogW1wi8J+mi1wiLCBcIvCfp6JcIiwgXCLwn5CsXCIsIFwi8J+rkFwiXSxcbiAgICBwaW5rOiBbXCLwn5KXXCIsIFwi8J+Qt1wiLCBcIvCfkp5cIiwgXCLwn4y4XCIsIFwi8J+SmFwiXSxcbiAgICBvcmFuZ2U6IFtcIvCfjYpcIiwgXCLwn42RXCJdLFxuICAgIGdyZWVuOiBbXCLwn42PXCIsIFwi8J+OvlwiXVxufVxubGV0IGVtb2ppQ291bnRlciA9IDA7XG5cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIvCfjLjwn4y48J+MuCBIZWxsMDAwMCBGUk9NIFNDUklCQkxFUiBYT1wiKVxuICAgIGxldCBzZXR1cENoZWNrZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICghc2V0dXBDb21wbGV0ZSkge1xuICAgICAgICAgICAgc2V0dXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi4pyP77iPIENMRUFSSU5HIElOVEVSVkFMXCIpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZXR1cENoZWNrZXIpO1xuICAgICAgICB9XG4gICAgfSwgTWF0aC5yb3VuZCgxMDAwIC8gRlJBTUVTX1BFUl9TRUNPTkQpKVxufVxuXG5mdW5jdGlvbiBmaXhQb3NpdGlvbihlLCBnQ2FudmFzRWxlbWVudCkge1xuICAgIHZhciB4O1xuICAgIHZhciB5O1xuICAgIGlmIChlLnBhZ2VYIHx8IGUucGFnZVkpIHtcbiAgICAgICAgeCA9IGUucGFnZVg7XG4gICAgICAgIHkgPSBlLnBhZ2VZO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgeCA9IGUuY2xpZW50WCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCArXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgICAgeSA9IGUuY2xpZW50WSArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wICtcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgfVxuICAgIHggLT0gZ0NhbnZhc0VsZW1lbnQub2Zmc2V0TGVmdDtcbiAgICB5IC09IGdDYW52YXNFbGVtZW50Lm9mZnNldFRvcDtcbiAgICByZXR1cm4geyB4OiB4LCB5OiB5IH07XG59XG5cbmZ1bmN0aW9uIHNldHVwKCkge1xuICAgIGNvbnN0IG93blZpZGVvUHJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZwcy1yZXF1ZXN0LXNjcmVlbmNhc3QtY2FwXScpXG4gICAgZ3JlYXRHcmFuZHBhcmVudEVsdCA9IG93blZpZGVvUHJldmlldy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgIGNvbnN0IGJ1dHRvbnMgPSBvd25WaWRlb1ByZXZpZXcgJiYgZ3JlYXRHcmFuZHBhcmVudEVsdFxuXG4gICAgaWYgKGJ1dHRvbnMgJiYgIXNldHVwQ29tcGxldGUpIHsgLy8gZG8gdGhpcyBvbmNlIG9uY2UgdGhlIE1lZXQgZG9jdW1lbnQgZGl2cyBhcmUgcmVhZHlcbiAgICAgICAgLy8gZ3JlYXRHcmFuZHBhcmVudEVsdC5wcmVwZW5kKGJ1dHRvbnMuY2hpbGRyZW5bMV0uY2xvbmVOb2RlKCkpXG4gICAgICAgIHNldHVwRHJhd2luZygpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZXNpemVDYW52YXMpO1xuICAgICAgICBzZXR1cENvbXBsZXRlID0gdHJ1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldHVwRHJhd2luZygpIHtcbiAgICAvLyBEUkFXSU5HIENPTlRBSU5FUlxuICAgIGRyYXdpbmdEaXYuaWQgPSAnZHJhd2luZy1jb250YWluZXInO1xuXG4gICAgLy8gQ3JlYXRlIGljb25cbiAgICBtYWluQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NjcmliYmxlLWJ1dHRvbicpO1xuICAgIG1haW5CdXR0b24uaWQgPSBcIm1haW4tYnV0dG9uXCJcbiAgICBtYWluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlT3B0aW9ucyk7XG4gICAgbWFpbkJ1dHRvbi5pbm5lckhUTUwgPSAn8J+WjSc7XG4gICAgbGV0IG9nU2NyaWJibGVJbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpY29uLWltYWdlJyk7XG4gICAgbGV0IHNjcmliYmxlSW1hZ2UgPSBvZ1NjcmliYmxlSW1hZ2UuY2xvbmVOb2RlKCk7XG4gICAgY29uc29sZS5sb2coc2NyaWJibGVJbWFnZSk7XG4gICAgLy8gbWFpbkJ1dHRvbi5hcHBlbmQoc2NyaWJibGVJbWFnZSk7XG4gICAgc2V0dGluZ3NEaXYuYXBwZW5kQ2hpbGQobWFpbkJ1dHRvbik7XG5cbiAgICAvLyBUT0dHTEVcbiAgICB0b2dnbGVMYWJlbC5pZCA9IFwidG9nZ2xlXCJcbiAgICB0b2dnbGUuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ3RydWUnKTtcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVTY3JpYmJsZSk7XG4gICAgc2V0dGluZ3NEaXYuYXBwZW5kQ2hpbGQodG9nZ2xlTGFiZWwpO1xuXG4gICAgLy8gQ0xFQVIgQlVUVE9OXG4gICAgb3B0aW9uc0Rpdi5pZCA9IFwib3B0aW9ucy1jb250YWluZXJcIjtcbiAgICBjcmVhdGVCdXR0b24oJ+KZu++4jyAvIGRvdWJsZSBjbGljaycsIDIwLCBjbGVhckNhbnZhcywgb3B0aW9uc0Rpdik7XG4gICAgLy8gY3JlYXRlQnV0dG9uKCdET1dOTE9BRCcsIDM2LCBkb3dubG9hZENhbnZhcywgb3B0aW9uc0Rpdik7XG4gICAgc2V0dGluZ3NEaXYuYXBwZW5kQ2hpbGQob3B0aW9uc0Rpdik7XG5cbiAgICAvLyBNT0RFIFNFTEVDVE9SXG4gICAgc2VsZWN0TW9kZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBjaGFuZ2VNb2RlKVxuICAgIHNlbGVjdE1vZGUuY2xhc3NMaXN0LmFkZCgnc2NyaWJibGUtYnV0dG9uJyk7XG4gICAgc2VsZWN0TW9kZS5zdHlsZS56SW5kZXggPSAnOTknO1xuICAgIHNlbGVjdE1vZGUuaWQgPSAnc2VsZWN0LW1vZGUnO1xuICAgIG1vZGVPcHRpb25zLmZvckVhY2goKG1vZGUpID0+IHtcbiAgICAgICAgY29uc3QgbmV3TW9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBuZXdNb2RlLnZhbHVlID0gbW9kZS52YWx1ZTtcbiAgICAgICAgbmV3TW9kZS5pbm5lclRleHQgPSBtb2RlLm5hbWU7XG4gICAgICAgIG5ld01vZGUuaWQgPSBtb2RlLnZhbHVlO1xuICAgICAgICBzZWxlY3RNb2RlLmFwcGVuZENoaWxkKG5ld01vZGUpO1xuICAgIH0pO1xuICAgIG9wdGlvbnNEaXYuYXBwZW5kQ2hpbGQoc2VsZWN0TW9kZSk7XG5cbiAgICBjcmVhdGVDb2xvckJ1dHRvbignI2IwZjJmZicsIDUsIG9wdGlvbnNEaXYsICdibHVlJyk7XG4gICAgY3JlYXRlQ29sb3JCdXR0b24oJ2hvdHBpbmsnLCAzMCwgb3B0aW9uc0RpdiwgJ3BpbmsnKTtcbiAgICBjcmVhdGVDb2xvckJ1dHRvbignbGltZScsIDU1LCBvcHRpb25zRGl2LCAnZ3JlZW4nKTtcbiAgICBjcmVhdGVDb2xvckJ1dHRvbignI0Y0QTkxRScsIDgwLCBvcHRpb25zRGl2LCAnb3JhbmdlJyk7XG5cblxuICAgIC8vIERSQVdJTkcgQ0FOVkFTXG4gICAgY2FudiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyAvLyBjcmVhdGVzIG5ldyBjYW52YXMgZWxlbWVudFxuICAgIGNhbnYuaWQgPSAnZHJhd2luZy1jYW52YXMnOyAvLyBnaXZlcyBjYW52YXMgaWRcbiAgICBjYW52LmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDsgLy9nZXQgb3JpZ2luYWwgY2FudmFzIGhlaWdodFxuICAgIGNhbnYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDs7IC8vIGdldCBvcmlnaW5hbCBjYW52YXMgd2lkdGhcbiAgICBjYW52LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBjYW52LnN0eWxlLnpJbmRleCA9IDA7XG4gICAgY2Fudi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICBjdHggPSBjYW52LmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY3VycmVudENvbG9yO1xuICAgIGN0eC5maWxsU3R5bGUgPSBjdXJyZW50Q29sb3I7XG4gICAgY3R4LmxpbmVXaWR0aCA9IGN1cnJlbnRMaW5lV2lkdGg7XG4gICAgY3R4LmxpbmVKb2luID0gXCJyb3VuZFwiO1xuICAgIGNhbnYuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjbGVhckNhbnZhcygpO1xuICAgIH0pO1xuXG4gICAgY2Fudi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZUlzRG93bilcbiAgICBjYW52LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSlcbiAgICBjYW52LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTtcblxuICAgIGRyYXdpbmdEaXYuYXBwZW5kQ2hpbGQoY2Fudik7XG4gICAgZHJhd2luZ0Rpdi5hcHBlbmRDaGlsZChzZXR0aW5nc0Rpdik7XG4gICAgY2xlYXJDYW52YXMoKTtcbiAgICBncmVhdEdyYW5kcGFyZW50RWx0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZHJhd2luZ0Rpdik7IC8vIGFkZHMgdGhlIGNhbnZhcyB0byB0aGUgYm9keSBlbGVtZW50XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbih0ZXh0LCB5UG9zLCBjbGlja0Z1bmN0aW9uLCBwYXJlbnREaXYpIHtcbiAgICBjb25zdCBuZXdCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBuZXdCdXR0b24uaW5uZXJIVE1MID0gdGV4dDtcbiAgICBuZXdCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0Z1bmN0aW9uKTtcbiAgICBuZXdCdXR0b24uc3R5bGUudG9wID0geVBvcyArICdweCc7XG4gICAgbmV3QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NjcmliYmxlLWJ1dHRvbicpO1xuICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChuZXdCdXR0b24pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb2xvckJ1dHRvbihjb2xvclN0cmluZywgbGVmdFBvcywgcGFyZW50RGl2LCBjb2xvcktleSkge1xuICAgIGNvbnN0IG5ld0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG5ld0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdzY3JpYmJsZS1idXR0b24nKTtcbiAgICBuZXdCdXR0b24uY2xhc3NMaXN0LmFkZCgnY29sb3ItYnV0dG9uJyk7XG4gICAgbmV3QnV0dG9uLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclN0cmluZztcbiAgICBuZXdCdXR0b24uc3R5bGUubGVmdCA9IGxlZnRQb3MgKyAncHgnO1xuICAgIC8vIGlmIChjb2xvclN0cmluZyA9PSAnI2IwZjJmZicpIHtcbiAgICAvLyAgICAgbmV3QnV0dG9uLnN0eWxlLm9wYWNpdHkgPSAxLjA7XG5cbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgICBuZXdCdXR0b24uc3R5bGUub3BhY2l0eSA9IDAuNTtcbiAgICAvLyB9XG5cbiAgICBuZXdCdXR0b24uaWQgPSBsZWZ0UG9zO1xuICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChuZXdCdXR0b24pO1xuXG4gICAgbmV3QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3JTdHJpbmc7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvclN0cmluZztcbiAgICAgICAgY3VycmVudENvbG9yID0gY29sb3JTdHJpbmc7XG4gICAgICAgIGxldCBhbGxDb2xvcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb2xvci1idXR0b24nKTtcbiAgICAgICAgY3VycmVudEVtb2ppcyA9IGVtb2ppT3B0aW9uc1tjb2xvcktleV07XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRFbW9qaXMpO1xuICAgICAgICBlbW9qaUNvdW50ZXIgPSAwO1xuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGFsbENvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyAgICAgY29uc3QgY3VycmVudENvbG9yQnV0dG9uID0gYWxsQ29sb3JzW2ldO1xuICAgICAgICAvLyAgICAgY3VycmVudENvbG9yQnV0dG9uLnN0eWxlLm9wYWNpdHkgPSAwLjU7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZS50YXJnZXQuc3R5bGUub3BhY2l0eSA9IDEuMDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlT3B0aW9ucygpIHtcbiAgICBvcHRpb25zU2hvd2luZyA9ICFvcHRpb25zU2hvd2luZztcbiAgICBpZiAob3B0aW9uc1Nob3dpbmcpIHtcbiAgICAgICAgb3B0aW9uc0Rpdi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zRGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjaGFuZ2VNb2RlKCkge1xuICAgIG1vZGUgPSBzZWxlY3RNb2RlLnZhbHVlO1xufVxuXG5mdW5jdGlvbiByZXNpemVDYW52YXMoKSB7XG4gICAgY29uc29sZS5sb2coJ3Jlc2l6aW5nIGNhbnZhcyEnKTtcbiAgICBjYW52LmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDsgLy9nZXQgb3JpZ2luYWwgY2FudmFzIGhlaWdodFxuICAgIGNhbnYud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDs7IC8vIGdldCBvcmlnaW5hbCBjYW52YXMgd2lkdGhcblxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGN1cnJlbnRDb2xvcjtcbiAgICBjdHguZmlsbFN0eWxlID0gY3VycmVudENvbG9yO1xuICAgIGN0eC5saW5lV2lkdGggPSBjdXJyZW50TGluZVdpZHRoO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVTY3JpYmJsZSgpIHtcbiAgICBzY3JpYmJsZUFjdGl2ZSA9ICFzY3JpYmJsZUFjdGl2ZTtcbiAgICBjb25zb2xlLmxvZyhcInRvZ2dsaW5nIHNjcmliYmxlOiBcIiwgdG9nZ2xlLmNoZWNrZWQpO1xuICAgIGlmICh0b2dnbGUuY2hlY2tlZCkge1xuICAgICAgICBjYW52LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBtYWluQnV0dG9uLnN0eWxlLm9wYWNpdHkgPSAxLjA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2Fudi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBtYWluQnV0dG9uLnN0eWxlLm9wYWNpdHkgPSAwLjU7XG4gICAgICAgIGlmIChvcHRpb25zU2hvd2luZykge1xuICAgICAgICAgICAgb3B0aW9uc1Nob3dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIG1haW5CdXR0b24uaW5uZXJIVE1MID0gJ+Kcjic7XG4gICAgICAgICAgICBvcHRpb25zRGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2FudmFzKCkge1xuICAgIGNvbnNvbGUubG9nKFwidHJ5aW5nIHRvIGNsZWFyIGNhbnZhcyEhIVwiKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnYud2lkdGgsIGNhbnYuaGVpZ2h0KTtcbiAgICAvLyBjdHguZmlsbFN0eWxlID0gJyNlOGU4ZTg0MCdcbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAwMDAxQSdcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2Fudi53aWR0aCwgY2Fudi5oZWlnaHQpO1xuICAgIGlzRHJhd2luZyA9IGZhbHNlO1xuICAgIGlmIChtb2RlID09ICdhbHdheXNEcmF3Jykge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8obW91c2VQb3MueCwgbW91c2VQb3MueSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkb3dubG9hZENhbnZhcygpIHtcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxpbmsuZG93bmxvYWQgPSAnbXlfc2NyaWJibGUucG5nJztcbiAgICBsaW5rLmhyZWYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJhd2luZy1jYW52YXMnKS50b0RhdGFVUkwoKVxuICAgIGxpbmsuY2xpY2soKTtcbn1cblxuZnVuY3Rpb24gbW91c2VJc0Rvd24oZSkge1xuICAgIGxldCBtb3VzZVBvcyA9IGZpeFBvc2l0aW9uKGUsIGNhbnYpO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKG1vdXNlUG9zLngsIG1vdXNlUG9zLnkpO1xuICAgIGlzRHJhd2luZyA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIG1vdXNlTW92ZShlKSB7XG4gICAgbGV0IG1vdXNlUG9zID0gZml4UG9zaXRpb24oZSwgY2Fudik7XG4gICAgaWYgKGlzRHJhd2luZykge1xuICAgICAgICBpZiAobW9kZSA9PSAncHJlc3NUb0RyYXcnKSB7XG4gICAgICAgICAgICBjdHgubGluZVRvKG1vdXNlUG9zLngsIG1vdXNlUG9zLnkpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ2NsaWNrVG9EcmF3Jykge1xuICAgICAgICAgICAgbGV0IHNoYXBlU2l6ZSA9IDEwO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGN1cnJlbnRDb2xvcjtcbiAgICAgICAgICAgIC8vIGN0eC5maWxsUmVjdChtb3VzZVBvcy54IC0gc2hhcGVTaXplIC8gMiwgbW91c2VQb3MueSAtIHNoYXBlU2l6ZSAvIDIsIHNoYXBlU2l6ZSwgc2hhcGVTaXplKTtcblxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmFyYyhtb3VzZVBvcy54LCBtb3VzZVBvcy55LCBzaGFwZVNpemUsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSAnYWx3YXlzRHJhdycpIHtcbiAgICAgICAgICAgIGxldCBmb250U2l6ZSA9IDM2O1xuICAgICAgICAgICAgY3R4LmZvbnQgPSBmb250U2l6ZSArIFwicHggVmVyZGFuYVwiO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGN1cnJlbnRDb2xvcjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChjdXJyZW50RW1vamlzW2Vtb2ppQ291bnRlcl0sIG1vdXNlUG9zLnggLSBmb250U2l6ZSAvIDIsIG1vdXNlUG9zLnkgKyBmb250U2l6ZSAvIDQpO1xuICAgICAgICAgICAgZW1vamlDb3VudGVyID0gKGVtb2ppQ291bnRlciArIDEpICUgY3VycmVudEVtb2ppcy5sZW5ndGg7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRU1PSkkgTEVOR1RIJywgY3VycmVudEVtb2ppcy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtb3VzZVVwKGUpIHtcbiAgICBpZiAoaXNEcmF3aW5nKSB7XG4gICAgICAgIGlzRHJhd2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIENMSUNLIFRPIERSQVcgQ09ERVxuICAgIC8vIGlzRHJhd2luZyA9ICFpc0RyYXdpbmc7XG4gICAgLy8gaWYgKGlzRHJhd2luZykge1xuICAgIC8vICAgICBsZXQgbW91c2VQb3MgPSBmaXhQb3NpdGlvbihlLCBjYW52KTtcbiAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIC8vICAgICBjdHgubW92ZVRvKG1vdXNlUG9zLngsIG1vdXNlUG9zLnkpO1xuICAgIC8vIH1cbn1cblxuaW5pdCgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==