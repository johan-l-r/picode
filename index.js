let position = { x: 0, y: 0 };
let zoomLevel = 1;

const STEP = 20;
const ZOOM_INCREMENT = 0.1;

const preview = document.getElementById("preview")
const snippet = document.getElementById("snippet");
const snippetContent = document.getElementById("snippet-content");
const zoomController = document.getElementById("zoom-level");
const editor = document.getElementById("editor");

// Restore saved size on page load
const savedHeight = localStorage.getItem("snippet-content-height");

if(savedHeight) {
  snippetContent.style.height = savedHeight;
}

// Auto-resize + Save height
snippetContent.addEventListener("input", e => {
  // reset height first
  snippetContent.style.height = "auto";

  // get the new scrollHeight
  let newHeight = e.target.scrollHeight;

  // apply it
  snippetContent.style.height = `${newHeight}px`;

  // save it
  localStorage.setItem("snippet-content-height", snippetContent.style.height);
});

// mapping  and zooming 
preview.addEventListener("wheel", e => {
  let direction = Math.sign(-e.deltaY);
  let distance = STEP * direction;

  e.preventDefault();

  if(e.ctrlKey && !e.shiftKey) {
    zoomLevel += ZOOM_INCREMENT * direction;
    zoomLevel = Math.min(Math.max(zoomLevel, 0.2), 2.5);
  } else if(e.shiftKey) {
    position.x += distance; 
  } else {
    position.y += distance;
  }

  updateTransform();
});

function updateTransform() {
  snippet.style.transform = `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`;
}

editor.addEventListener("input", e => {
  const style = e.target; // get the changed element
  const property = style.getAttribute("data-style")

  if(!style.hasAttribute("data-style")) return;
  snippet.style[property] = style.value;
});
