const canvas = document.getElementById("cobrinha-canvas");
const ctx = canvas.getContext("2d");

const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = {
  x: 0,
  y: 0,
  dx: scale,
  dy: 0,
  body: [],
  length: 2
};

let apple = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale
};

// Listen for key presses to control snake
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.keyCode === 37 && snake.dx === 0) {
    // Left arrow key
    snake.dx = -scale;
    snake.dy = 0;
  } else if (event.keyCode === 38 && snake.dy === 0) {
    // Up arrow key
    snake.dy = -scale;
    snake.dx = 0;
  } else if (event.keyCode === 39 && snake.dx === 0) {
    // Right arrow key
    snake.dx = scale;
    snake.dy = 0;
  } else if (event.keyCode === 40 && snake.dy === 0) {
    // Down arrow key
    snake.dy = scale;
    snake.dx = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "#4e9223";
  snake.body.forEach(part => {
    ctx.fillRect(part.x, part.y, scale, scale);
  });
  ctx.fillRect(snake.x, snake.y, scale, scale);

  // Draw apple
  ctx.fillStyle = "#6ac02d";
  ctx.fillRect(apple.x, apple.y, scale, scale);
}

function update() {
  snake.body.push({ x: snake.x, y: snake.y });
  if (snake.body.length > snake.length) snake.body.shift();

  snake.x += snake.dx;
  snake.y += snake.dy;

  // Wrap around the edges
  if (snake.x >= canvas.width) snake.x = 0;
  if (snake.y >= canvas.height) snake.y = 0;
  if (snake.x < 0) snake.x = canvas.width - scale;
  if (snake.y < 0) snake.y = canvas.height - scale;

  // Eat apple
  if (snake.x === apple.x && snake.y === apple.y) {
    snake.length++;
    apple.x = Math.floor(Math.random() * columns) * scale;
    apple.y = Math.floor(Math.random() * rows) * scale;
  }
}

function gameLoop() {
  update();
  draw();
}

setInterval(gameLoop, 150); // Run every 150ms
