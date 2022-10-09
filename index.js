function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, c.offsetWidth, c.offsetHeight);
}

function drawGalaxy() {
  clearCanvas();
  //draw starfield
  for (let i = 0; i < stars.length; i++) {
    ctx.fillStyle = "white";
    ctx.fillRect(stars[i][0], stars[i][1], 1, 1);
  }

  for (let i = 0; i < galaxy.length; i++) {
    galaxy[i].draw();
  }
}

function updateGalaxy(){
    for (let i = 0; i < galaxy.length; i++) {
        galaxy[i].update();
      }
}
function gameLoop(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;
  fps = Math.round(1 / secondsPassed);
  console.log(fps);
  drawGalaxy();
  updateGalaxy();
  window.requestAnimationFrame(gameLoop);
}

class orbit {
  distance = 0;
  rotatePoint = [];
  objectPosition = [];
  size = 0;
  color = "";
  rotationAmt = 90;
  rotationSpeed = 0;

  constructor(distance, rotatePoint, size, color, rotationSpeed) {
    this.distance = distance;
    this.rotatePoint = rotatePoint;
    this.objectPosition = [
      this.rotatePoint[0] + this.distance,
      this.rotatePoint[1],
    ];
    this.size = size;
    this.color = color;
    this.rotationSpeed = rotationSpeed;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(
      this.objectPosition[0],
      this.objectPosition[1],
      this.size,
      0,
      2 * Math.PI,
      false
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  rotateAroundPoint() {
    //finds x and y as radians
    let rad = degreesToRadians(this.rotationAmt);
    let xMod = this.rotatePoint[0] + this.distance * Math.sin(rad);
    let yMod = this.rotatePoint[1] + this.distance * Math.cos(rad);
    this.objectPosition[0] = xMod;
    this.objectPosition[1] = yMod;
  }

  update()
  {
    this.rotateAroundPoint();
    this.rotationAmt += this.rotationSpeed;
  }
}
//creates a new canvas
var c = document.getElementById("grid-canvas");
var ctx = c.getContext("2d");
//initialise galaxy variables
let stars = [];
let galaxy = [];
let secondsPassed;
let oldTimeStamp;
let fps;

//generate starfield
for (let i = 0; i < c.width; i++) {
  let x = Math.floor(Math.random() * c.width);
  let y = Math.floor(Math.random() * c.height);
  stars.push([x, y]);
}

sun = new orbit(0, [c.width / 2, c.width / 2], 40, "yellow", 0);
earth = new orbit(c.width/3,sun.objectPosition,10,'blue',0.5);
moon = new orbit(earth.distance/5,earth.objectPosition,5,'orange',2)
mars = new orbit(c.width/6,sun.objectPosition, 15,'red',1);
moonSatelite = new orbit(10,moon.objectPosition,2,'green',10)
galaxy.push(sun);
galaxy.push(earth);
galaxy.push(moon);
galaxy.push(mars);
galaxy.push(moonSatelite);

window.requestAnimationFrame(gameLoop);