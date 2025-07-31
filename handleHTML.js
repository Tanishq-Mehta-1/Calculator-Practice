const numbers = document.querySelector(".numbers");

let count = 1;
for (let j = 0; j < 4; j++) {
  let row = document.createElement("div");
  row.classList.add("row_num");

  count = count >= 10 ? 0 : count;
  for (let i = 0; i < 3; i++) {
    const btn = document.createElement("button");
    let num = count.toString();

    if (j === 3 && i === 1) {
      num = "=";
      btn.classList.add("equate");
    }
    if (j === 3 && i === 2) {
      num = ".";
      btn.classList.add("decimal");
    }

    btn.classList.add("btn_num");
    btn.textContent = num;
    row.appendChild(btn);

    count++;
  }

  numbers.appendChild(row);
}

const num_btns = document.querySelectorAll(".btn_num");
const btns = document.querySelectorAll("button:not(.equate)");

let expression = "",
  toDisplay = "";

document.querySelector(".equate").addEventListener("click", () => {
  let ans = evaluate(expression);
  if (ans === "err") ans = "ERROR";
  document.querySelector(".display").textContent = ans;
  expression = toDisplay = "";
});

btns.forEach((item) => {
  item.addEventListener("click", () => {
    let num = item.textContent;
    if (isOperator(num) || isOperator(expression[expression.length - 1]))
      toDisplay += " ";

    expression += num;
    toDisplay += num;
    document.querySelector(".display").textContent = toDisplay;
    console.log(`${expression} ${toDisplay}`);
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
