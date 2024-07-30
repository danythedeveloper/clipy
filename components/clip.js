function createClipElement(clip) {
  // Create the main div element
  const clipDiv = document.createElement("button");
  clipDiv.className = "clip";
  clipDiv.id = clip.id;

  // Create the clip-content div element
  const clipContentDiv = document.createElement("div");
  clipContentDiv.className = "clip-content";

  // Create the paragraph element for the title
  const titleParagraph = document.createElement("p");
  titleParagraph.textContent = clip.text;

  // Append the title paragraph and button to the clip-content div
  clipContentDiv.appendChild(titleParagraph);

  // Append the clip-content div to the main clip div
  clipDiv.appendChild(clipContentDiv);

  clipDiv.addEventListener("click", () => {
    handleCopyText(titleParagraph.textContent);
  });

  // Return the constructed element
  return clipDiv;
}

function handleCopyText(text) {
  // Implement your clipboard logic here
  // Example: clipboard.writeText(text);
  window.api.send("clips:copy", text);
}
