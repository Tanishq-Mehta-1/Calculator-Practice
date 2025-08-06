const numbers = document.querySelector(".numbers");

let count = 1;
for (let j = 0; j < 4; j++) {
  let row = document.createElement("div");
  row.classList.add("row_num");

  for (let i = 0; i < 4; i++) {
    count = count >= 10 ? 0 : count;

    const btn = document.createElement("button");
    let num = count.toString();

    if (j === 3 && i === 1) {
      num = ".";
      btn.classList.add("decimal");
    } else if (j === 3 && i === 2) {
      num = "=";
      btn.classList.add("equate");
    } else if (i == 3) {
      count--;
      switch (j) {
        case 0:
          num = "/";
          break;
        case 1:
          num = "*";
          break;
        case 2:
          num = "-";
          break;
        case 3:
          num = "+";
          break;
      }
    }

    btn.classList.add("btn_num");
    btn.textContent = num;
    row.appendChild(btn);

    count++;
  }

  numbers.appendChild(row);
}

const num_btns = document.querySelectorAll(".btn_num");
const op_btns = document.querySelectorAll(".operators button");
const all_btns = document.querySelectorAll("button:not(.equate, .clear)");

let expression = "",
  toDisplay = "";

// adding logic to '='
document.querySelector(".equate").addEventListener("click", () => {
  let ans = evaluate(expression);
  if (ans === "err") ans = "ERROR";
  document.querySelector(".display").textContent = ans;
  expression = toDisplay = "";
});

//handle AC
document.querySelector(".clear").addEventListener("click", () => {
  expression = toDisplay = "";
  document.querySelector(".display").textContent = toDisplay;
});

// live display of expression
all_btns.forEach((item) => {
  item.addEventListener("click", () => {
    let num = item.textContent;
    if (isOperator(num) || isOperator(expression[expression.length - 1]))
      toDisplay += " ";

    expression += num;
    toDisplay += num;
    document.querySelector(".display").textContent = toDisplay;
  });
});

// button click thing
op_btns.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.classList.add("btn_op_clicked");
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("btn_op_clicked");
  });
});

num_btns.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.classList.add("btn_num_clicked");
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("btn_num_clicked");
  });
});
