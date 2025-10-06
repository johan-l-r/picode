const snippetContent = document.getElementById("snippet-content")

// Restore saved size on page load
const savedHeight = localStorage.getItem("snippet-content-height")

if (savedHeight) {
  snippetContent.style.height = savedHeight
}

// Auto-resize + Save height
snippetContent.addEventListener("input", e => {
  // reset height first
  snippetContent.style.height = "auto"

  // get the new scrollHeight
  let newHeight = e.target.scrollHeight

  // apply it
  snippetContent.style.height = `${newHeight}px`

  // save it
  localStorage.setItem("snippet-content-height", snippetContent.style.height)
})
