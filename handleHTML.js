const numbers = document.querySelector(".numbers");

let count = 1;
for (let j = 0; j < 4; j++) {
  let row = document.createElement("div");
  row.classList.add("row_num");

  count = count >= 10 ? 0 : count;
  for (let i = 0; i < 3; i++) {
    const btn = document.createElement("button");
    let num = count.toString();
    btn.classList.add("btn_num");
    btn.textContent = num;
    row.appendChild(btn);

    if (j === 3 && count == 0) break;
    count++;
  }

  numbers.appendChild(row);
}

const num_btns = document.querySelectorAll(".btn_num");
const btns = document.querySelectorAll("button");

let expression = '';

btns.forEach((item) => {

  item.addEventListener("click", ()=>{
    let num = item.textContent;
    expression += num;
    console.log(expression);
  })
  
})

num_btns.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.classList.add("btn_num_clicked");
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("btn_num_clicked");
  });
});


