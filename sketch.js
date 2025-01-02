let b = [];
let mx;
let N = 10;
let slider;
let cheakbox;
let cnv1, cnv2;
function setup() {
  createCanvas(windowWidth, windowHeight);
  cnv1 = createGraphics(windowWidth, windowHeight);
  cnv1.clear();
  cnv2 = createGraphics(windowWidth, windowHeight);
  cnv2.clear();
  mx = windowWidth + windowHeight;
  for (let i = 0; i < N; i++) {
    b[i] = new bubble();
  }
  background(50);
  slider = createSlider(3, 100, 10);
  slider.position(0, 0);
  slider.input(() => {
    N = slider.value();
    if (N > b.length) {
      for (let i = b.length; i < N; i++) {
        b[i] = new bubble();
      }
    } else {
      for (let i = b.length - 1; i > N - 1; i--) {
        b.pop();
      }
    }
  });
  cheakbox = createCheckbox("Network", false);
  cheakbox.position(10, slider.height + 10);
}

function draw() {
  background(50);
  cnv1.clear();
  cnv2.clear();
  noStroke();
  textSize(20);
  fill(255);
  text(N, slider.width + 20, 20);
  textAlign(CENTER, CENTER);
  fill(155);
  text("Nearest Neighbor", width / 2, 20);
  let matrix = Array(N)
    .fill(0)
    .map(() => new Array(N));
  for (let i = 0; i < b.length; i++) {
    b[i].update();
    matrix[i][i] = mx;
    for (let j = i + 1; j < b.length; j++) {
      if (cheakbox.checked()) {
        stroke(255, 0, 0);
        line(b[i].pos.x, b[i].pos.y, b[j].pos.x, b[j].pos.y);
      }
      matrix[i][j] = b[i].pos.dist(b[j].pos);
      matrix[j][i] = matrix[i][j];
    }
    let m = i;
    for (let k = 0; k < N; k++) {
      if (matrix[i][k] < matrix[i][m]) {
        m = k;
      }
    }
    cnv1.stroke(0, 255, 0);
    cnv1.line(b[i].pos.x, b[i].pos.y, b[m].pos.x, b[m].pos.y);
    cnv2.noStroke();
    cnv2.circle(b[i].pos.x, b[i].pos.y, 10);
  }
  image(cnv1, 0, 0);
  image(cnv2, 0, 0);
}
