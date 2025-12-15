const container = document.getElementById("container");
const icon = document.querySelector("i");

container.addEventListener("dblclick", () => {
  icon.style.transform = "translate(-50%,-50%) scale(1.3)";
  icon.style.opacity = 1;

  setTimeout(function () {
    icon.style.transform = "translate(-50%,-50%) scale(1)";
  }, 300);

  setTimeout(function () {
    icon.style.transform = "translate(-50%,-50%) scale(0)";
    icon.style.opacity = 0;
  }, 1000);
});
