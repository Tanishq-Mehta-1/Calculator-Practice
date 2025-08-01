function isOperator(char) {
  return char in operators;
}

const operators = {
  "+": { precedence: 2, associativity: "Left" },
  "-": { precedence: 2, associativity: "Left" },
  "*": { precedence: 3, associativity: "Left" },
  "/": { precedence: 3, associativity: "Left" },
  "^": { precedence: 4, associativity: "Right" },
};

function inputParse(expression) {
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
}

function evaluate(expression) {
  let postfix = shuntingYard(expression);
  let ans = evaluatePostfix(postfix);

  console.log(ans);
  if (ans !== "err") return ans.toFixed(3);
  else return ans;
}
