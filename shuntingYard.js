function tokenize(expression) {
  const tokens = [];
  let number = "";

  for (let char of expression.replace(/\s+/g, "")) {
    if (/\d|\./.test(char)) {
      number += char;
    } else {
      if (number) {
        tokens.push(number);
        number = "";
      }
      tokens.push(char);
    }
  }
  if (number) tokens.push(number);
  return tokens;
}

function shuntingYard(expression) {
  if (expression === "") {
    console.log("Invalid expression!\n");
    return "err";
  }
  const tokens = tokenize(expression); // Fix: use tokenizer
  const stack = [];
  const output = [];

  for (let char of tokens) {
    if (!isNaN(char)) {
      output.push(char);
    } else if (isOperator(char)) {
      while (
        stack.length &&
        isOperator(stack.at(-1)) &&
        ((operators[char].associativity === "Left" &&
          operators[char].precedence <= operators[stack.at(-1)].precedence) ||
          (operators[char].associativity === "Right" &&
            operators[char].precedence < operators[stack.at(-1)].precedence))
      ) {
        output.push(stack.pop());
      }
      stack.push(char);
    } else if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      while (stack.length && stack.at(-1) !== "(") {
        output.push(stack.pop());
      }
      if (stack.length && stack.at(-1) === "(") {
        stack.pop(); // remove the '('
      } else {
        console.log("Mismatched parentheses");
        return "err";
      }
    } else {
      console.log("Invalid token:", char);
      return "err";
    }
  }

  while (stack.length) {
    const top = stack.pop();
    if (top === "(" || top === ")") {
      console.log("Mismatched parentheses");
      return "err";
    }
    output.push(top);
  }

  return output;
}

function evaluatePostfix(expression) {
  const stack = [];

  for (let token of expression) {
    if (!isNaN(token)) {
      stack.push(Number(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        case "^":
          stack.push(a ** b);
          break;
        default:
          console.log("Invalid Operator Found!\n");
          return "err";
      }
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid postfix expression");
  }
  
  let num = Math.floor(stack[0] * 1000) / 1000;

  console.log(`Pre-processed: ${stack[0]}, Processed: ${num}`);

  return num;
}
