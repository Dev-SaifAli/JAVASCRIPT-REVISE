const output = document.querySelector("#output");
let clockInterval;

function showLocation() {
  output.innerText = `URL: ${location.href}\nPath: ${location.pathname}`;
}

function showScreen() {
  output.innerHTML = `Screen width: ${screen.width}<br> Screen Height: ${screen.height}`;
}

function showBrowser() {
  output.innerHTML = `User agent: ${navigator.userAgent}`;
}

function askName() {
  const name = prompt("What is your name?");
  console.log(name, typeof name);

  output.innerText = name ? `Hello ${name}` : `You didn't enter your name.`;
}

function askConfirm() {
  const response = confirm("Do you like this BOM demo!");
  console.log(response);
  output.innerText = response ? "Great" : "May be next time!";
}

function startClock() {

//   if (clockInterval) return; // preventing multiple setInterval calls from stacking up.

  if (!clockInterval) {
    clockInterval = setInterval(() => {
      output.innerText = "Time: " + new Date().toLocaleTimeString();
    }, 1000);

    console.log(clockInterval);
  }
}
function stopClock() {

  clearInterval(clockInterval); // Stop the repeated action.
  clockInterval = null;
  output.innerText = "Clock stopped!";

}

// console.log(!null);

