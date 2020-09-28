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

