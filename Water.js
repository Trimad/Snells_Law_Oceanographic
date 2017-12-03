class Water {

  constructor(x, y, temperature, salinity, pressure) {

    this.x = x;
    this.y = y;
    this.temperature = temperature;
    this.salinity = salinity;
    this.pressure = pressure;
    this.SSP = getSoundSpeed(this.salinity, this.salinity, this.pressure);

    let tempMap = map(this.temperature, 1, 20, 0, 255);
    let saliMap = map(this.salinity, .020, 0.05, 0, 255);
    let pressMap = map(this.pressure, 0, height, 0, 255);
    let SSPMap = map(getSoundSpeed(this.temperature, this.salinity, this.pressure), 1400, 1655, 0, 255);
    this.debug = function() {
      noStroke();

      if (temperatureViewBool) {
        fill(tempMap, 0, 0);
      } else if (salinityViewBool) {
        fill(0, saliMap, 0);
      } else if (pressureViewBool) {
        fill(0, 0, pressMap);
      } else if (SSPViewBool) {
        fill(SSPMap);
        //fill(tempMap,saliMap,pressMap);
      }

      rectMode(CORNER);
      rect(this.x, this.y, scl, scl);
      //textSize(10);
      //fill(255);
      //text(this.x + ", " + this.y, this.x, this.y);
      //text(nf(this.temperature, 2, 2), this.x, this.y + 16);
    }

    this.makeGraphics = function() {
      let tempMap = map(this.temperature, 0, 40, 0, 255);
      let saliMap = map(this.salinity, 0, 0.07, 0, 255);
      let pressMap = map(this.pressure, 0, height, 0, 255);
      pg.noStroke();
      pg.fill(saliMap, tempMap, pressMap);
      pg.rectMode(CORNER);
      pg.rect(this.x + scl / 3, this.y + scl / 2, scl, scl);
      pg.rect(this.x, this.y, scl - 1, scl - 1);
      pg.noFill();
      pg.fill(255);
      pg.textAlign(LEFT, TOP);
      pg.text(this.x + ", " + this.y, this.x, this.y);
      pg.text(nf(this.temperature, 2, 2), this.x, this.y + 16);
    }

  }
}

function makeOcean() {

  let saliIncrement = 0.05;
  let tempIncrement = 0.05;
  let saliY = 0;
  let tempY = 0;
  let temperature;

  for (let y = 0; y < height / scl; y++) {
    let saliX = 0;
    let tempX = 0;
    for (let x = 0; x < width / scl; x++) {

      //Supposed to account for the temperature of water being a constant 34F below 1500FT
      temperature = constrain(-y + map(noise(tempX, tempY), 0, 1, 1, 40), 1, 20);
      let salinity = constrain(noise(saliX, saliY) * .070, .030, .040);

      saliX += saliIncrement;
      tempX += tempIncrement;

      append(chunks, new Water(x * scl, y * scl, temperature, salinity, y * scl));
    }
    saliY += saliIncrement;
    tempY += tempIncrement;
  }
}

function makeBackground() {

  for (let i = 0; i < chunks.length; i++) {
    chunks[i].makeGraphics();
  }
}
