var col = 0,
    sp = 1,
    div = 3;

function setup() {
    createCanvas(350, 640);
    noStroke();
}

function draw() {
    background(col+=sp, 255-col, 255-col/div);
    if (col > 255 || col < 0) {
        sp *= -1;
    }
    fill(255-(col+=sp), col, col/div, 50);
    ellipse(175, 320, 175 + col/div, 320 + 76 - col/div);
}

function touchStarted()
{
  // create a random background color
  col = random(255);
  div = random(3) + 1.5;
  console.log('div:' + div + ", " + "col:" + col);
}
