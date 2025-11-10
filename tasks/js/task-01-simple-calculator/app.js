function calculate() {
  // Get correct operator
  function getOpertaor() {
    validOperator = ["+", "-", "*", "/", "%"];
    let operator;
    do {
      operator = prompt(
        `Please enter a valid operator out of +, _, *, / and %`
      );
      if (operator === null) return null;
      operator = operator.trim();
      if (!validOperator.includes(operator)) {
        alert(`Invalid Operator! Please enter one of these (+, _, *, /, %)`);
      }
    } while (!validOperator.includes(operator));

    return operator;
  }

  // Get valid number
  function getNumber(promptText) {
    let input, num;
    do {
      input = prompt(promptText);
      if (input === null) return null;
      input = input.trim();
      num = Number(input);
      if (input === "" || Number.isNaN(num)) {
        alert(`Invalid number! Please enter a valid number`);
      } else {
        return num;
      }
    } while (true);
  }

  const num1 = getNumber(`Enter first number: `);
  if (num1 === null) return null;
  const num2 = getNumber(`Enter second number: `);
  if (num2 === null) return null;

  const operator = getOpertaor();

  if ((operator === "/" || operator === "%") && num2 === 0) {
    alert(`Error: You can not  divide by 0.`);
    calculate();
    return;
  }

  let result;
  switch (operator) {
    case "+":
      result = num1 + num2;
      alert(`Addiition result: ${result}`);
      break;
    case "-":
      result = num1 - num2;
      alert(`Substraction Result: ${result}`);
      break;
    case "*":
      result = num1 * num2;
      alert(`Product result: ${result}`);
      break;
    case "/":
      result = num1 / num2;
      alert(`Divison result: ${result}`);
      break;
    case "%":
      result = num1 % num2;
      alert(`Remainder result: ${result}`);
      break;
    default:
      alert(`Error: Something went wrong!`);
  }
}

calculate();
