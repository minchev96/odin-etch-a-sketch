const gridPixelSizeWidth = 960;
const gridPixelSizeHeight = 800;
const container = document.querySelector(".container");
const gridButton = document.querySelector(".grid-button");
const darkButton = document.querySelector(".dark-button");
const size = 16;

let darkColorPaint = false;

createGrid(size);
draw();

gridButton.addEventListener("click", () => {
  let userGrid = prompt(
    "Insert desired rows/columns (maximum 100) for the new Grid.\nNote that the existing Grid will be cleared!!!"
  );
  if (Number(userGrid) > 100) {
    alert("Grid cannot be more than 100 rows or columns!!!");
    return;
  }
  createGrid(userGrid);
  draw();
});

darkButton.addEventListener("click", () => {
  darkColorPaint = true;
});

function createGrid(gridSize) {
  deleteGrid();
  let rows = Number(gridSize) + 1;
  for (let i = 0; i < rows * gridSize; i++) {
    let div = document.createElement("div");
    div.className = "grid";
    div.style.width = `${gridPixelSizeWidth / gridSize}px`;
    div.style.height = `${gridPixelSizeHeight / gridSize}px`;

    if (i % rows === 0) div.style.cssText = "border: 0; height: 0; width: 100%";
    container.appendChild(div);
  }
}

function draw() {
  const elements = document.getElementsByClassName("grid");

  for (let el of elements) {
    let opacity = 0.1;
    el.addEventListener("mouseover", (e) => {
      if (!darkColorPaint) e.target.style.backgroundColor = randomRGBColor();
      else {
        opacity += 0.1;
        e.target.style.backgroundColor = darkeningColor(
          (el.style.opacity = opacity)
        );
      }
    });
  }
}

function deleteGrid() {
  container.textContent = "";
}

function randomRGBColor() {
  const red = Math.random() * 255;
  const green = Math.random() * 255;
  const blue = Math.random() * 255;

  return `rgb(${red} ${green} ${blue})`;
}

function darkeningColor(opacity) {
  return `rgb(0, 0, 0, ${opacity})`;
}
