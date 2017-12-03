class Submarine {

  constructor(x, y) {
    this.x = x;
    this.y = y;


    this.update = function() {
      this.x++;
      if (this.x > width) {
        this.x = 0;
      }
      image(img, this.x, this.y, scl * 5, scl * 3);
    }

    this.detected = function() {
      for (let i = 0; i < rays.length; i++) {
        if (dist(rays[i].x, rays[i].y, this.x, this.y) < scl) {
          tint(0, 200, 0);
        }
      }
    }

  }

}
