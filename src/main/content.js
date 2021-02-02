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
