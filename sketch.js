let scl = 30;
let cols, rows;
let chunks = [];
let pg;

let temperatureButton;
let salinityButton;
let pressureButton;

let temperatureViewBool = true;
let salinityViewBool = false;
let pressureViewBool = false;
let SSPViewBool = false;

let rays = [];
let img;

let submarine;

function preload() {

  img = loadImage("sub.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight-100);

  temperatureButton = createButton("Temperature View");
  temperatureButton.position(0, height);
  temperatureButton.mousePressed(temperatureView);

  salinityButton = createButton("Salinity View");
  salinityButton.position(200, height);
  salinityButton.mousePressed(salinityView);

  pressureButton = createButton("Pressure View");
  pressureButton.position(400, height);
  pressureButton.mousePressed(pressureView);

  SSPButton = createButton("SSP View");
  SSPButton.position(600, height);
  SSPButton.mousePressed(SSPView);

  //let d = window.pixelDensity();
  //pg = createGraphics(width * d, height * d);
  //  makeBackground();
  textSize(16);
  angleMode(DEGREES);
  makeOcean();
  imageMode(CENTER);
  submarine = new Submarine(0, 235);
}

function draw() {
  background(0);
  //Show the buffered image of the ocean collumn
  //imageMode(CORNER);
  //image(pg, 0, 0);
  //Debugging
  for (let i = 0; i < chunks.length; i++) {
    chunks[i].debug();
  }
  //Draw the UI
  for (let y = 0; y < height; y++) {
    if (y % 100 === 0) {
      stroke(255, 128);
      fill(255);
      text(y + "m", width - (32 * 3), y - 2);
      line(0, y, width, y);
    }
  }
  //Show ocean stats at mouse position
  for (let i = 0; i < chunks.length; i++) {
    if (mouseX >= chunks[i].x && mouseX <= chunks[i].x + scl &&
      mouseY >= chunks[i].y && mouseY <= chunks[i].y + scl) {
      noFill();
      fill(255);
      //text(chunks[i].x+", "+chunks[i].y,mouseX,mouseY);
      text(nf(chunks[i].temperature, 2, 2) + "°C", mouseX + 16, mouseY + 16);
      text(nf(chunks[i].salinity * 1000, 2, 2) + " PPT", mouseX + 16, mouseY + 16 * 2);
      text(chunks[i].pressure + "m", mouseX + 16, mouseY + 16 * 3)
      text(nf(chunks[i].SSP, 4, 2) + "m/s", mouseX + 16, mouseY + 16 * 4)
    }
  }

  //Add a ray of sound
  if (frameCount % 5 === 0) {
    rays.push(new SoundRay(0, scl, 45, 1498));
  }
  //Update and show that ray of sound
  for (let i = 0; i < rays.length; i++) {
    rays[i].update();
    rays[i].show();
  }
  //Remove rays that have traveled off screen
  for (let i = rays.length - 1; i >= 0; i--) {
    if (rays[i].isDead()) {
      rays.splice(i, 1);
    }
  }

  submarine.update();
  submarine.detected();
}
