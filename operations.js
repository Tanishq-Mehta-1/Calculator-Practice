function isOperator(char) {
  return char in operators;
}

const operators = {
  '+': { precedence: 2, associativity: 'Left' },
  '-': { precedence: 2, associativity: 'Left' },
  '*': { precedence: 3, associativity: 'Left' },
  '/': { precedence: 3, associativity: 'Left' },
  '^': { precedence: 4, associativity: 'Right' }
};

function cleanString(expression) {
  let i = 0,
    n = expression.length,
    str1 = "";

  if (expression[0] === "+" || expression[0] === "-") {
    str1 += expression[0];
    i = 1;
  }

  while (i < n) {
    if (isOperator(expression[i])) break;
    str1 += expression[i];
    i++;
  }

  let op = expression[i];
  let str2 = expression.slice(i + 1);

  return { str1, op, str2 };
};

function evaluate(expression) {
  let clean = cleanString(expression);
  let a = Number(clean.str1);
  let b = Number(clean.str2);

  //check for valid
  if (isNaN(a) || isNaN(b)) {
    console.log("Invalid number used!\n");
    return "err";
  }

  let ans = shuntingYard(expression);
  console.log(ans);
  // console.log("answer: " + ans + "\n");
  return ans.toFixed(3);
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
