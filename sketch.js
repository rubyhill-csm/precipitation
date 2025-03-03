console.log("javascript is working!");

let circles = [];
let trailCircles = [];
let maxCircleSize = 100;
let minCircleSize = maxCircleSize / 2;
let fadeSpeed = 5;    // Control how fast the circle fades away
let backgroundImage;  // Variable to hold the background image

// Preload the background image
function preload() {
  backgroundImage = loadImage('pave.jpg'); // Load the image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  // Draw the background image
  background(backgroundImage);

  // Adjust circle generation frequency based on mouseX position
  let frequency = map(mouseX, 0, width, 0.005, 1); 
  // On the left (low frequency), on the right (high frequency)

  // Randomly create new background circles based on frequency
  if (random(1) < frequency) {
    let newCircle = {
      x: random(width),
      y: random(height),
      size: random(minCircleSize, maxCircleSize),
      alpha: 255,
      isFading: true
    };
    circles.push(newCircle);
  }

  // Update and draw all background circles
  for (let i = circles.length - 1; i >= 0; i--) {
    let circle = circles[i];
    
    // Draw the circle with its current alpha value
    fill(80, 80, 80, circle.alpha);
    ellipse(circle.x, circle.y, circle.size);

    // Gradually decrease the alpha value to make it fade
    if (circle.isFading) {
      circle.alpha -= fadeSpeed;
      if (circle.alpha <= 0) {
        // Remove the circle once it has fully faded
        circles.splice(i, 1);
      }
    }
  }

  // Create a new trail circle following the mouse
  let newTrailCircle = {
    x: mouseX,
    y: mouseY,
    size: random(20, 50),  // Smaller size for mouse trail
    alpha: 255, // Start fully opaque
    isFading: true
  };
  trailCircles.push(newTrailCircle);

  // Update and draw all trail circles (mouse drawing effect)
  for (let i = trailCircles.length - 1; i >= 0; i--) {
    let circle = trailCircles[i];
    
    // Draw the circle with its current alpha value
    fill(80, 80, 80, circle.alpha);
    ellipse(circle.x, circle.y, circle.size);

    // Gradually decrease the alpha value to make it fade
    if (circle.isFading) {
      circle.alpha -= fadeSpeed;
      if (circle.alpha <= 0) {
        // Remove the trail circle once it has fully faded
        trailCircles.splice(i, 1);
      }
    }
  }
}
