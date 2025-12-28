console.log(window.location);
console.log(window);

const refreshBtn = document.querySelector("#refreshBtn");
refreshBtn.addEventListener("click", (event) => {
  location.reload(); // Reloads the current document.
  location.replace("/output");
  location.replace("output");
  event.preventDefault();
  location.search = "?key=value&key=value";
  history.back(); // Loads the previous URL (page) in the history list.
  history.forward(); // Loads the next URL (page) in the history list.
  history.go(1); // Loads a specific URL (page) from the history list.
});

function openWindow() {
  window.open("https://www.facebook.com/");
  window.close();
}

function closeWindow() {
  window.close();
}
