const svg = document.querySelector("svg");
const inner = svg.querySelector("g");
let translation = { x: 0, y: 0 };
let scale = 1;
let mouseDownPosition = undefined;
let mouseOverPosition = undefined;
centerInner();

svg.addEventListener("mousedown", (event) => {
    mouseDownPosition = { x: event.clientX, y: event.clientY };
});

svg.addEventListener("mousemove", (event) => {
    if (mouseDownPosition) {
        mouseOverPosition = { x: event.clientX, y: event.clientY };
        inner.setAttribute("transform", getTransform());
    }
});

svg.addEventListener("mouseup", () => {
    onMouseExit();
});

svg.addEventListener("mouseleave", () => {
    onMouseExit();
});

svg.addEventListener("wheel", (event) => {
    event.preventDefault();
    const currentTranslation = getTranslation();
    const svgRect = svg.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.x;
    const mouseY = event.clientY - svgRect.y;

    // https://d3js.org/d3-zoom#zoom_wheelDelta
    const wheelDelta = -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
    const scaleFactor = Math.pow(2, wheelDelta);

    translation.x -= (mouseX - currentTranslation.x) * (scaleFactor - 1);
    translation.y -= (mouseY - currentTranslation.y) * (scaleFactor - 1);
    scale *= scaleFactor;
    inner.setAttribute("transform", getTransform());
});

function centerInner() {
    const svgRect = svg.getBoundingClientRect();
    const innerRect = inner.getBoundingClientRect();
    translation = {
        x: (svgRect.width - innerRect.width) / 2,
        y: (svgRect.height - innerRect.height) / 2
    };
    inner.setAttribute("transform", getTransform());
}

function onMouseExit() {
    translation = getTranslation();
    mouseDownPosition = undefined;
    mouseOverPosition = undefined;
}

function getTransform() {
    const { x, y } = getTranslation();
    return `translate(${x}, ${y}) scale(${scale})`;
}

function getTranslation() {
    let { x, y } = translation;
    if (mouseDownPosition && mouseOverPosition) {
        x += mouseOverPosition.x - mouseDownPosition.x;
        y += mouseOverPosition.y - mouseDownPosition.y;
    }
    return { x, y };
}
