const canvas = document.getElementById("circleCanvas");
const ctx = canvas.getContext("2d");

let circles = [];
let selectedCircle = null;
let isDragging = false;

canvas.addEventListener("mousedown", function (e) {
  const { offsetX, offsetY } = e;
  const clickedCircle = circles.find(c => Math.hypot(c.x - offsetX, c.y - offsetY) < c.radius);

  if (clickedCircle) {
    selectedCircle = clickedCircle;
    selectedCircle.color = "red";
    isDragging = true;
  } else {
    circles.forEach(c => c.color = "dodgerblue");
    selectedCircle = null;
    circles.push({ x: offsetX, y: offsetY, radius: 20, color: "dodgerblue" });
  }

  drawCircles();
});

canvas.addEventListener("mousemove", function (e) {
  if (isDragging && selectedCircle) {
    selectedCircle.x = e.offsetX;
    selectedCircle.y = e.offsetY;
    drawCircles();
  }
});

canvas.addEventListener("mouseup", function () {
  isDragging = false;
});

canvas.addEventListener("wheel", function (e) {
  if (selectedCircle) {
    e.preventDefault();
    selectedCircle.radius += e.deltaY < 0 ? 2 : -2;
    if (selectedCircle.radius < 5) selectedCircle.radius = 5;
    drawCircles();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Delete" && selectedCircle) {
    circles = circles.filter(c => c !== selectedCircle);
    selectedCircle = null;
    drawCircles();
  }
});

function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
    ctx.stroke();
  });
}