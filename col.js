function detectCollision(rect1, rect2) {
    // Check for overlap on the x-axis
    if (rect1.x + rect1.width < rect2.x || rect2.x + rect2.width < rect1.x) {
      return false;
    }
    
    // Check for overlap on the y-axis
    if (rect1.y + rect1.height < rect2.y || rect2.y + rect2.height < rect1.y) {
      return false;
    }
    
    // Collisions occur if both x and y overlap
    return true;
  }

const rect1 = { x: 10, y: 10, width: 10, height: 10 };
const rect2 = { x: 0, y: 20, width: 10, height: 10 };

const collision = detectCollision(rect1, rect2);

if (collision) {
  console.log("Collision detected!");
} else {
  console.log("No collision detected.");
}