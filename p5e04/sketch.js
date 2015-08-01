var xspacing = 10,   // Distance between each horizontal location
    w,              // Width of entire wave
    maxwaves = 6,   // total # of waves to add together
    col = 0,
    colDiff = 0.01,
    colDiffDefault = 3,
    sp = 3,
    div = 1.1,
    offset = 50;

var theta = 0.0;
var amplitude = new Array(maxwaves);   // Height of wave
// Value for incrementing X, to be calculated
// as a function of period and xspacing
var dx = new Array(maxwaves);
// Using an array to store height values
// for the wave (not entirely necessary)
var yvalues;

function setup() {
  createCanvas(710, 400);
  frameRate(30);
  colorMode(RGB, 255, 255, 255, 100);
  w = width + 16;

  for (var i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10,30);
    var period = random(100,300); // Num pixels before wave repeats
    dx[i] = (TWO_PI / period) * xspacing;
  }

  yvalues = new Array(floor(w/xspacing));
}

function draw() {
  background(0);
  calcWave();
  renderWave();
}

function calcWave() {
  var i, j;
  // Increment theta (try different values
  // for 'angular velocity' here
  theta += 0.02;

  // Set all height values to zero
  for (i = 0; i < yvalues.length; i++) {
    yvalues[i] = 0;
  }

  // Accumulate wave height values
  for (j = 0; j < maxwaves; j++) {
    var x = theta;
    for (i = 0; i < yvalues.length; i++) {
      // Every other wave is cosine instead of sine
      if (j % 2 === 0)  yvalues[i] += sin(x)*amplitude[j];
      else yvalues[i] += cos(x)*amplitude[j];
      x+=dx[j];
    }
  }
}

function renderWave() {
  // A simple way to draw the wave with an ellipse at each location
  var innerCol = col;
  noStroke();
  ellipseMode(CENTER);
  colDiff = colDiffDefault;
  for (var x = 0; x < yvalues.length; x++) {
    innerCol += colDiff;
    fill(innerCol+=colDiff, 255-(innerCol+=colDiff), (innerCol+=colDiff)/div, 50);
    ellipse(x*xspacing,width/2+yvalues[x]-offset,16 + innerCol/(div * 4),16 + (255-innerCol)/(255 - div * 4));
    if (innerCol > 255) {
      innerCol = 255;
      colDiff *= -1;
      //console.log('div:' + div + ", " + "col:" + col);
    } else if (innerCol < 0) {
      col = 0;
      colDiff *= -1;
      console.log('div:' + div + ", " + "col:" + col + ", innerCol:" + innerCol);
    }
  }
  col += sp;
  if (col > 255) {
    col = 255;
    sp *= -1;
    console.log('div:' + div + ", " + "col:" + col);
  } else if (col < 0) {
    col = 0;
    sp *= -1;
    console.log('div:' + div + ", " + "col:" + col);
  }
}

function touchStarted()
{
  // create a random background color
  col = random(255);
  div = random(3) + 1.5;
  //console.log('div:' + div + ", " + "col:" + col);
}
