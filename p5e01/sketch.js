// color variable
var c;

function setup()
{
  // set canvas size
  createCanvas(400, 200);

  // set default background color
  c = color(255, 255, 255);
}
function draw()
{
  // clear background
  background(c);

  // touch coordiantes
  fill(0);
  text('X: ' + touchX + ' Y: ' + touchY, 25, 25);

}

function touchStarted()
{
  // create a random background color
  c = color(random(255), random(255), random(255));
}
