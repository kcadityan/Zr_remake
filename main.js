// // JavaScript (main.js) with jQuery
// const gameContainer = $('#game-container');
// const player = $('#player');

// // Set initial position and size of the player
// let playerX;
// let playerY;
// const playerSize = 80; // Adjust player size as needed
// const playerSpeed = 5;
// let keysPressed = {}; // Track pressed keys

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   playerX = width / 2;
//   playerY = height / 2;
// }

// function draw() {
//   background(240);
//   updatePlayerPosition(); // Call updatePlayerPosition function in draw loop
//   drawPlayer();
//   checkCollision(); // Check collision in the draw loop
// }

// function drawPlayer() {
//   const dx = mouseX - playerX;
//   const dy = mouseY - playerY;
//   const playerAngle = atan2(dy, dx); // Calculate angle between player and mouse
//   player.css({
//     left: playerX + 'px',
//     top: playerY + 'px',
//     transform: `rotate(${playerAngle}rad)` // Rotate player to face the mouse
//   });
// }

// function updatePlayerPosition() {
//   if (keysPressed['ArrowUp']) {
//     playerY -= playerSpeed;
//   }
//   if (keysPressed['ArrowDown']) {
//     playerY += playerSpeed;
//   }
//   if (keysPressed['ArrowLeft']) {
//     playerX -= playerSpeed;
//   }
//   if (keysPressed['ArrowRight']) {
//     playerX += playerSpeed;
//   }
// }

// // Event listeners for keydown and keyup
// $(document).keydown(function (event) {
//   keysPressed[event.key] = true;
// });

// $(document).keyup(function (event) {
//   delete keysPressed[event.key];
// });

// function spawnTree() {
//   const tree = $('<div class="tree"></div>');
//   const treeX = Math.random() * window.innerWidth;
//   const treeY = Math.random() * window.innerHeight;
//   tree.css({
//     left: treeX + 'px',
//     top: treeY + 'px'
//   });
//   gameContainer.append(tree);
// }

// function checkCollision() {
//   const trees = $('.tree');
//   trees.each(function () {
//     const treeX = parseFloat($(this).css('left'));
//     const treeY = parseFloat($(this).css('top'));
//     const treeWidth = $(this).width();
//     const treeHeight = $(this).height();
//     if (
//       playerX < treeX + treeWidth &&
//       playerX + playerSize > treeX &&
//       playerY < treeY + treeHeight &&
//       playerY + playerSize > treeY
//     ) {
//       console.log('Collision detected!');
//     }
//   });
// }

// function spawnInitialTrees() {
//   for (let i = 0; i < 10; i++) {
//     spawnTree();
//   }
// }

// // Spawn initial trees
// spawnInitialTrees();



// JavaScript (main.js) with jQuery
const gameContainer = $('#game-container');
const player = $('#player');

// Set initial position and size of the player
let playerX;
let playerY;
const playerSize = 80; // Adjust player size as needed
const playerSpeed = 4;
let keysPressed = {}; // Track pressed keys

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerX = width / 2;
  playerY = height / 2;
}

function draw() {
  background(240);
  updatePlayerPosition(); // Call updatePlayerPosition function in draw loop
  drawPlayer();
  checkCollision(); // Check collision in the draw loop
}

function drawPlayer() {
  const dx = mouseX - playerX;
  const dy = mouseY - playerY;
  const playerAngle = atan2(dy, dx); // Calculate angle between player and mouse
  player.css({
    left: playerX + 'px',
    top: playerY + 'px',
    transform: `rotate(${playerAngle}rad)` // Rotate player to face the mouse
  });
}

function updatePlayerPosition() {
  let newX = playerX;
  let newY = playerY;
  
  if (keysPressed['ArrowUp']) {
    newY -= playerSpeed;
  }
  if (keysPressed['ArrowDown']) {
    newY += playerSpeed;
  }
  if (keysPressed['ArrowLeft']) {
    newX -= playerSpeed;
  }
  if (keysPressed['ArrowRight']) {
    newX += playerSpeed;
  }
  
  // Check if the new position will cause collision with trees
  const trees = $('.tree');
  let collision = false;
  trees.each(function () {
    const treeX = parseFloat($(this).css('left'));
    const treeY = parseFloat($(this).css('top'));
    const treeWidth = $(this).width();
    const treeHeight = $(this).height();

    //added

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


    const rect1 = { x: treeX + 50, y: treeY + 50, width: 100 , height: 100};
    const rect2 = { x: newX , y: newY, width: playerSize, height: playerSize};
    const collision = detectCollision(rect1, rect2);

    if (collision) {
    newX = playerX
    newY = playerY
    console.log("Collision detected!");
    } else {
    console.log("No collision detected.");
    }

    //end of added

    // if (
    //   newX < treeX + treeWidth &&
    //   newX + playerSize > treeX &&
    //   newY < treeY + treeHeight &&
    //   newY + playerSize > treeY
    // ) {
    //   // Collision detected, prevent movement
    //   return false; // Exit the loop early since we only need to detect one collision
    // }
  });
  
  // Update player position if there's no collision
  if (!collision) {
    playerX = newX;
    playerY = newY;
  }
}

// Event listeners for keydown and keyup
$(document).keydown(function (event) {
  keysPressed[event.key] = true;
});

$(document).keyup(function (event) {
  delete keysPressed[event.key];
});

function spawnTree() {
  const tree = $('<div class="tree"></div>');
  const treeX = Math.random() * window.innerWidth;
  const treeY = Math.random() * window.innerHeight;
  tree.css({
    left: treeX + 'px',
    top: treeY + 'px'
  });
  gameContainer.append(tree);
}

function checkCollision() {
  const trees = $('.tree');
  trees.each(function () {
    const treeX = parseFloat($(this).css('left'));
    const treeY = parseFloat($(this).css('top'));
    const treeWidth = $(this).width();
    const treeHeight = $(this).height();
    if (
      playerX < treeX + treeWidth &&
      playerX + playerSize > treeX &&
      playerY < treeY + treeHeight &&
      playerY + playerSize > treeY
    ) {
    }
  });
}

function spawnInitialTrees() {
  for (let i = 0; i < 10; i++) {
    spawnTree();
  }
}

// Spawn initial trees
spawnInitialTrees();
