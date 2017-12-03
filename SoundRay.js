class SoundRay {

  constructor(x, y, angle, speed) {

    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;

    this.show = function() {
      noStroke();
      stroke(255);
      fill(255);
      ellipse(this.x, this.y, 4, 4);
      line(this.x, this.y, this.x + scl * Math.cos(this.angle), this.y +scl  * Math.sin(this.angle));
      //text(nf(this.angle, 2, 2) + "°", this.x + scl, this.y);
      //text(Math.round(this.speed) + "m/s", this.x + scl, this.y + scl);
    }

    this.update = function() {

      for (let i = 0; i < chunks.length; i++) {

        if (chunks[i].x+scl > this.x) {
          if (dist(chunks[i].x, chunks[i].y, this.x, this.y) < scl+scl/2) {

            let SSP = getSoundSpeed(chunks[i].temperature, chunks[i].salinity, chunks[i].pressure);
            this.angle = getAngle(this.speed, this.angle, SSP);
            this.speed = getSoundSpeed(chunks[i].temperature, chunks[i].salinity, chunks[i].pressure);

            //this.x += (this.speed / 1000) + Math.cos(this.angle);
            //this.y += (this.speed / 1000) + Math.sin(this.angle);
            this.x += Math.cos(this.angle);
            this.y += Math.sin(this.angle);
          }
        }
      }

    }

    this.isDead = function() {

      if (this.x >= width - scl || this.y >= height - scl || this.x == 0 || this.y == 0) {
        return true;
      } else {
        return false;
      }
    }
  }
}

///////////////////////////////////////////////////////////////////////////////

function getAngle(speed1, currentAngle, speed2) {
  return speed2 / (speed1 / currentAngle);
}

function getSoundSpeed(temperature, salinity, pressure) {
  return 1449.2 + (4.623 * temperature) - (0.0546 * (temperature * 2)) + 1.391 * (salinity * 1000 - 35) + 0.016 * pressure;
}

function getPressure(gravity, density, height) {
  return gravity * density * height;
}
