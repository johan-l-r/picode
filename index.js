let position = { x: 0, y: 0 };

const STEP = 50;

const preview = document.getElementById("preview")
const snippet = document.getElementById("snippet");
const snippetContent = document.getElementById("snippet-content");

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

preview.addEventListener("wheel", e => {
  let direction = Math.sign(-e.deltaY);
  let distance = STEP * direction;

  e.preventDefault();

  if(e.shiftKey) {
    position.x += distance;
  } else {
    position.y += distance;
  }

  snippet.style.transform = `translate(${position.x}px, ${position.y}px)`
});
