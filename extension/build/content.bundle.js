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
const scribbleDiv = document.createElement('div');
const drawingDiv = document.createElement('div');
let setupComplete = false;

let mouseDown = false;

function init() {
    console.log('SCRIBBLER TEST 2');
    setInterval(() => {
        const ownVideoPreview = document.querySelector('[data-fps-request-screencast-cap]')
        const greatGrandparentElt = ownVideoPreview.parentElement.parentElement.parentElement;

        const buttons = ownVideoPreview && greatGrandparentElt

        // console.log('setup: ', setupComplete);
        // console.log('buttons: ', buttons);

        if (buttons && !setupComplete) { // do this once once the Meet document divs are ready
            console.log("SCRIBBEL TEST MATRIX");
            greatGrandparentElt.prepend(buttons.children[1].cloneNode())
            scribbleDiv.id = 'scribbleDivId';
            scribbleDiv.className = 'block';
            scribbleDiv.innerHTML = "";
            scribbleDiv.style.border = "1px white";
            scribbleDiv.style.fontSize = "18px";
            scribbleDiv.style.color = "gray";
            scribbleDiv.style.display = 'inlineBlock';
            scribbleDiv.style.minWidth = "100px";
            scribbleDiv.style.textAlign = "center"
            scribbleDiv.style.verticalAlign = "middle"
            scribbleDiv.style.padding = "10px";
            scribbleDiv.innerHTML = ":-)"
            scribbleDiv.classList = greatGrandparentElt.children[1].classList
            // scribbleDiv.onclick = toggleView;
            // scribbleDiv.onmouseover = mouseOver;
            // scribbleDiv.onmouseout = mouseOut;
            greatGrandparentElt.prepend(scribbleDiv);

            // Add canvas
            const canv = document.createElement('canvas'); // creates new canvas element
            canv.id = 'drawing-canvas'; // gives canvas id
            canv.height = window.innerWidth; //get original canvas height
            canv.width = window.innerHeight;; // get original canvas width
            canv.style.position = 'absolute';
            canv.style.zIndex = 99999999;

            const ctx = canv.getContext('2d');
            ctx.strokeStyle = '#cc00fa';
            ctx.lineWidth = 5;
            ctx.fillRect(200, 200, 200, 290);
            canv.addEventListener('mousedown', (e) => {
                let mousePos = fixPosition(e, canv);
                ctx.beginPath();
                ctx.moveTo(mousePos.x, mousePos.y);
                mouseDown = true;
            })

            canv.addEventListener('mousemove', (e) => {
                if (mouseDown) {
                    let mousePos = fixPosition(e, canv);
                    ctx.lineTo(mousePos.x, mousePos.y);
                    ctx.stroke();
                }
            })

            canv.addEventListener('mouseup', (e) => {
                mouseDown = false;
            })

            greatGrandparentElt.parentElement.parentElement.parentElement.parentElement.appendChild(canv); // adds the canvas to the body element

            setupComplete = true;
            console.log('setup after being SET: ', setupComplete);
        }
    }, Math.round(1000 / FRAMES_PER_SECOND));
}

init();

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



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4vY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBEQUEwRDtBQUMxRCx1Q0FBdUM7QUFDdkMsNENBQTRDO0FBQzVDLDZDQUE2QztBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsYUFBYTs7QUFFYiwwR0FBMEc7O0FBRTFHO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1oiLCJmaWxlIjoiY29udGVudC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluL2NvbnRlbnQuanNcIik7XG4iLCJjb25zdCBGUkFNRVNfUEVSX1NFQ09ORCA9IDVcbmNvbnN0IHNjcmliYmxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBkcmF3aW5nRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5sZXQgc2V0dXBDb21wbGV0ZSA9IGZhbHNlO1xuXG5sZXQgbW91c2VEb3duID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coJ1NDUklCQkxFUiBURVNUIDInKTtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG93blZpZGVvUHJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZwcy1yZXF1ZXN0LXNjcmVlbmNhc3QtY2FwXScpXG4gICAgICAgIGNvbnN0IGdyZWF0R3JhbmRwYXJlbnRFbHQgPSBvd25WaWRlb1ByZXZpZXcucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgY29uc3QgYnV0dG9ucyA9IG93blZpZGVvUHJldmlldyAmJiBncmVhdEdyYW5kcGFyZW50RWx0XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NldHVwOiAnLCBzZXR1cENvbXBsZXRlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2J1dHRvbnM6ICcsIGJ1dHRvbnMpO1xuXG4gICAgICAgIGlmIChidXR0b25zICYmICFzZXR1cENvbXBsZXRlKSB7IC8vIGRvIHRoaXMgb25jZSBvbmNlIHRoZSBNZWV0IGRvY3VtZW50IGRpdnMgYXJlIHJlYWR5XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNDUklCQkVMIFRFU1QgTUFUUklYXCIpO1xuICAgICAgICAgICAgZ3JlYXRHcmFuZHBhcmVudEVsdC5wcmVwZW5kKGJ1dHRvbnMuY2hpbGRyZW5bMV0uY2xvbmVOb2RlKCkpXG4gICAgICAgICAgICBzY3JpYmJsZURpdi5pZCA9ICdzY3JpYmJsZURpdklkJztcbiAgICAgICAgICAgIHNjcmliYmxlRGl2LmNsYXNzTmFtZSA9ICdibG9jayc7XG4gICAgICAgICAgICBzY3JpYmJsZURpdi5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgc2NyaWJibGVEaXYuc3R5bGUuYm9yZGVyID0gXCIxcHggd2hpdGVcIjtcbiAgICAgICAgICAgIHNjcmliYmxlRGl2LnN0eWxlLmZvbnRTaXplID0gXCIxOHB4XCI7XG4gICAgICAgICAgICBzY3JpYmJsZURpdi5zdHlsZS5jb2xvciA9IFwiZ3JheVwiO1xuICAgICAgICAgICAgc2NyaWJibGVEaXYuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmVCbG9jayc7XG4gICAgICAgICAgICBzY3JpYmJsZURpdi5zdHlsZS5taW5XaWR0aCA9IFwiMTAwcHhcIjtcbiAgICAgICAgICAgIHNjcmliYmxlRGl2LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCJcbiAgICAgICAgICAgIHNjcmliYmxlRGl2LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSBcIm1pZGRsZVwiXG4gICAgICAgICAgICBzY3JpYmJsZURpdi5zdHlsZS5wYWRkaW5nID0gXCIxMHB4XCI7XG4gICAgICAgICAgICBzY3JpYmJsZURpdi5pbm5lckhUTUwgPSBcIjotKVwiXG4gICAgICAgICAgICBzY3JpYmJsZURpdi5jbGFzc0xpc3QgPSBncmVhdEdyYW5kcGFyZW50RWx0LmNoaWxkcmVuWzFdLmNsYXNzTGlzdFxuICAgICAgICAgICAgLy8gc2NyaWJibGVEaXYub25jbGljayA9IHRvZ2dsZVZpZXc7XG4gICAgICAgICAgICAvLyBzY3JpYmJsZURpdi5vbm1vdXNlb3ZlciA9IG1vdXNlT3ZlcjtcbiAgICAgICAgICAgIC8vIHNjcmliYmxlRGl2Lm9ubW91c2VvdXQgPSBtb3VzZU91dDtcbiAgICAgICAgICAgIGdyZWF0R3JhbmRwYXJlbnRFbHQucHJlcGVuZChzY3JpYmJsZURpdik7XG5cbiAgICAgICAgICAgIC8vIEFkZCBjYW52YXNcbiAgICAgICAgICAgIGNvbnN0IGNhbnYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsgLy8gY3JlYXRlcyBuZXcgY2FudmFzIGVsZW1lbnRcbiAgICAgICAgICAgIGNhbnYuaWQgPSAnZHJhd2luZy1jYW52YXMnOyAvLyBnaXZlcyBjYW52YXMgaWRcbiAgICAgICAgICAgIGNhbnYuaGVpZ2h0ID0gd2luZG93LmlubmVyV2lkdGg7IC8vZ2V0IG9yaWdpbmFsIGNhbnZhcyBoZWlnaHRcbiAgICAgICAgICAgIGNhbnYud2lkdGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7OyAvLyBnZXQgb3JpZ2luYWwgY2FudmFzIHdpZHRoXG4gICAgICAgICAgICBjYW52LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIGNhbnYuc3R5bGUuekluZGV4ID0gOTk5OTk5OTk7XG5cbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IGNhbnYuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjY2MwMGZhJztcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSA1O1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDIwMCwgMjAwLCAyMDAsIDI5MCk7XG4gICAgICAgICAgICBjYW52LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1vdXNlUG9zID0gZml4UG9zaXRpb24oZSwgY2Fudik7XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8obW91c2VQb3MueCwgbW91c2VQb3MueSk7XG4gICAgICAgICAgICAgICAgbW91c2VEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGNhbnYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobW91c2VEb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3VzZVBvcyA9IGZpeFBvc2l0aW9uKGUsIGNhbnYpO1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKG1vdXNlUG9zLngsIG1vdXNlUG9zLnkpO1xuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY2Fudi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGdyZWF0R3JhbmRwYXJlbnRFbHQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChjYW52KTsgLy8gYWRkcyB0aGUgY2FudmFzIHRvIHRoZSBib2R5IGVsZW1lbnRcblxuICAgICAgICAgICAgc2V0dXBDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2V0dXAgYWZ0ZXIgYmVpbmcgU0VUOiAnLCBzZXR1cENvbXBsZXRlKTtcbiAgICAgICAgfVxuICAgIH0sIE1hdGgucm91bmQoMTAwMCAvIEZSQU1FU19QRVJfU0VDT05EKSk7XG59XG5cbmluaXQoKTtcblxuZnVuY3Rpb24gZml4UG9zaXRpb24oZSwgZ0NhbnZhc0VsZW1lbnQpIHtcbiAgICB2YXIgeDtcbiAgICB2YXIgeTtcbiAgICBpZiAoZS5wYWdlWCB8fCBlLnBhZ2VZKSB7XG4gICAgICAgIHggPSBlLnBhZ2VYO1xuICAgICAgICB5ID0gZS5wYWdlWTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHggPSBlLmNsaWVudFggKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgK1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICAgIHkgPSBlLmNsaWVudFkgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCArXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIH1cbiAgICB4IC09IGdDYW52YXNFbGVtZW50Lm9mZnNldExlZnQ7XG4gICAgeSAtPSBnQ2FudmFzRWxlbWVudC5vZmZzZXRUb3A7XG4gICAgcmV0dXJuIHsgeDogeCwgeTogeSB9O1xufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9