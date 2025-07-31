// let expression = prompt("Enter the expression: ", "0+0");

function isOperator(char) {
  return char === "+" || char === "-" || char === "*" || char === "/";
}

function evaluate(expression) {
  let clean = (function (expression) {
    let i = 0,
      n = expression.length;
    let str1 = "";
    while (i < n) {
      if (isOperator(expression[i])) break;
      str1 += expression[i];
      i++;
    }

    let op = expression[i];
    let str2 = expression.slice(i + 1);

    return { str1, op, str2 };
  })(expression);

  console.log(clean);

  let a = Number(clean.str1);
  let b = Number(clean.str2);

  //check for valid
  if (isNaN(a) || isNaN(b)) {
    console.log("Invalid number used!\n");
    return "";
  }

  let ans;
  switch (clean.op) {
    case "-":
      ans = subtract(a, b);
      break;
    case "+":
      ans = add(a, b);
      break;
    case "/":
      ans = divide(a, b);
      break;
    case "*":
      ans = multiply(a, b);
      break;
    default:
      console.log("Invalid operator used!\n");
      return "";
  }

  console.log("answer: " + ans + "\n");
}

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function divide(a, b) {
  if (b === 0) return "";
  return a / b;
}
function multiply(a, b) {
  return a * b;
}
