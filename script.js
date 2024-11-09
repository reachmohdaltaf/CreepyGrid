document.addEventListener("DOMContentLoaded", () => {
  // we have call the board fro html
  const board = document.querySelector("#board");
  const tilerow = 8; //tilerowcount
  const tilecolumn = 8; //tilecolumn count
  let bombCount = 10; //bomb count
  let square = []; //an array for square inside the tiles

  // we have create a board in which there are different
  // tile with  row and different
  // column and also append that in the board
  const createBoard = () => {
    // now we are creating an array in which there are shuffled bomb
    // so what we have done int this we have taken two arrays and shuffled them
    const bombArray = Array(bombCount).fill("bomb");
    const emptyArray = Array(tilerow * tilecolumn - bombCount).fill("valid");
    const concatArray = emptyArray.concat(bombArray);
    const shuffedArray = concatArray.sort(() => Math.random() - 0.5); // doubt here is why 0.5 and we cant use floor why

    // board is created here with forloop
    for (let i = 0; i < tilerow * tilecolumn; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.classList.add(shuffedArray[i]);
      tile.id = i;

      board.append(tile);
      square.push(tile); // we have also push the tiles to an
      //empty array so that we can work on it

      // now we are creating a click funtion on
      //every tile that will be clicked
      tile.addEventListener("click", () => {
        click(tile);
      });
    }
    updateNumber();
  };

  const updateNumber = () => {
    // now we are out of the for loop and we are
    //making number that will show near every bombCount and give hint to the user
    for (let i = 0; i < square.length; i++) {
      let total = 0; // Total count of bombs around the tile
      const currentTile = square[i]; // Current tile being checked
      console.log(currentTile);

      if (currentTile.classList.contains("bomb")) continue; // Skip this tile if it has a bomb

      const isLeftEdge = i % tilecolumn === 0; // True if tile is on the left edge
      const isRightEdge = i % tilecolumn === tilecolumn - 1; // True if tile is on the right edge

      // Check all surrounding tiles for bombs and storing in the variable in array
      const neighbors = [
        i - 1,
        i + 1,
        i - tilecolumn,
        i + tilecolumn,
        i - tilecolumn - 1,
        i - tilecolumn + 1,
        i + tilecolumn - 1,
        i + tilecolumn + 1,
      ];

      neighbors.forEach((neighbor) => {
        // Skip out-of-bounds neighbors
        if (neighbor < 0 || neighbor >= tilerow * tilecolumn) return;

        // Handle left and right edge cases
        if (
          (i % tilecolumn === 0 && neighbor % tilecolumn === tilecolumn - 1) ||
          (i % tilecolumn === tilecolumn - 1 && neighbor % tilecolumn === 0)
        ) {
          return;
        }

        if (square[neighbor] && square[neighbor].classList.contains("bomb"))
          total++;
      });

      // Hide the numbers until clicked
      if (total > 0) {
        currentTile.setAttribute("data", total); // Store bomb count as a data attribute
        currentTile.innerHTML = ""; // Keep it hidden initially
      }
    }
  };

  createBoard(); // Initialize the board
  console.log(board);

  function click(tile) {
    if (tile.classList.contains("revealed")) return; //if the tile is already revealed then it will not run now
    tile.classList.add("revealed");

    // If the tile has a bomb
    if (tile.classList.contains("bomb")) {
      tile.classList.add("addbomb");
      square.forEach((tile) => {
        if (tile.classList.contains("bomb")) {
          tile.classList.add("revealed");
          tile.classList.add("addbomb");
        }
      });
    } else {
      // Get the bomb count for the current tile
      const bombCount = tile.getAttribute("data");

      if (bombCount) {
        tile.innerHTML = bombCount; // Display the number
      } else {
        // If the tile is empty (no surrounding bombs), reveal neighboring tiles
        revealEmptyTiles(tile);
      }
    }
  }

  // Recursive function to reveal surrounding tiles if they are empty
  function revealEmptyTiles(tile) {
    const tileId = parseInt(tile.id); // Get the index of the tile
    const neighbors = [
      tileId - 1,
      tileId + 1,
      tileId - tilecolumn,
      tileId + tilecolumn,
      tileId - tilecolumn - 1,
      tileId - tilecolumn + 1,
      tileId + tilecolumn - 1,
      tileId + tilecolumn + 1,
    ];

    neighbors.forEach((neighbor) => {
      // Skip out-of-bounds neighbors
      if (neighbor < 0 || neighbor >= tilerow * tilecolumn) return;

      const neighborTile = square[neighbor];
      
      // Check if the neighbor tile is valid, not revealed, and not a bomb
      if (!neighborTile.classList.contains("revealed") && !neighborTile.classList.contains("bomb")) {
        neighborTile.classList.add("revealed");
        
        // If the neighbor is empty (no surrounding bombs), call the function recursively
        if (!neighborTile.getAttribute("data")) {
          revealEmptyTiles(neighborTile);
        } else {
          const neighborBombCount = neighborTile.getAttribute("data");
          neighborTile.innerHTML = neighborBombCount;
        }
      }
    });
  }
});
