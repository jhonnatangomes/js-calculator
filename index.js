const operations = ['+', '-', '*', '/'];
toggleContainer.addEventListener('click', switchToggle);
screen.addEventListener('keydown', ({ key }) => key === 'Enter' && equal());

function switchToggle() {
  const togglePosition = toggle.style.left;
  if (togglePosition === '3px' || !togglePosition) {
    applyTheme('2');
    return (toggle.style.left = '18px');
  }
  if (togglePosition === '18px') {
    applyTheme('3');
    return (toggle.style.left = '33px');
  }
  applyTheme('1');
  return (toggle.style.left = '3px');
}

function printNumber(number) {
  if (screen.value === '0') return (screen.value = number);
  screen.value = formatNumbers(unformatNumbers(screen.value) + number);
}

function groupNumberParts(number) {
  const parts = [];
  const [real, decimal] = separateRealAndDecimal(number);
  const rest = real.length % 3;
  if (rest) parts.push(real.substr(0, rest));
  for (let i = rest; i < real.length; i += 3) {
    parts.push(real.substr(i, 3));
  }
  return decimal ? `${parts.join(',')}.${decimal}` : parts.join(',');
}

function separateRealAndDecimal(number) {
  return number.split('.');
}

function formatNumbers(numbers) {
  return splitOperations(numbers)
    .map((el) => (!isOperator(el) ? groupNumberParts(el) : el))
    .join('');
}

function unformatNumbers(numbers) {
  return splitOperations(numbers)
    .map((el) => (!isOperator(el) ? removeCommas(el) : el))
    .join('');
}

function removeCommas(number) {
  const [real, decimal] = separateRealAndDecimal(number);
  return number.includes('.')
    ? `${real.split(',').join('')}.${decimal}`
    : real.split(',').join('');
}

function isOperator(char) {
  return operations.includes(char);
}

function addDot() {
  screen.value += '.';
}

function splitOperations(numbers) {
  const nums = [];
  let num = '';
  for (let i = 0; i < numbers.length; i++) {
    if (!isOperator(numbers[i])) num += numbers[i];
    else {
      nums.push(num);
      num = '';
      nums.push(numbers[i]);
    }
  }
  nums.push(num);
  return nums.filter(Boolean);
}

function convertToOperationLinkedList(numbers) {
  const numsArray = splitOperations(unformatNumbers(numbers));
  const operationsObjects = [];
  const linkedList = { head: null };
  let i = 0;
  while (i < numsArray.length) {
    const operationObject = { value: Infinity, operation: '', next: null };
    if (numsArray[i] === '+' || numsArray[i] === '-') {
      operationObject.value = 0;
      operationObject.operation = numsArray[i];
      i++;
    } else if (
      numsArray[i] === '*' ||
      numsArray[i] === '/' ||
      isNaN(parseInt(numsArray[i]))
    ) {
      throw new Error('Invalid Operation');
    } else {
      operationObject.value = parseFloat(numsArray[i]);
      operationObject.operation = numsArray[i + 1] || '';
      i += 2;
    }
    operationsObjects.push(operationObject);
  }
  if (operationsObjects[operationsObjects.length - 1].operation !== '')
    throw new Error('Invalid Operation');
  for (let i = 0; i < operationsObjects.length - 1; i++) {
    operationsObjects[i].next = operationsObjects[i + 1];
  }
  linkedList.head = operationsObjects[0];
  return linkedList;
}

function evaluateExpression(linkedList) {
  let current = linkedList.head;
  while (current !== null) {
    const next = current.next;
    if (current.operation !== '*' && current.operation !== '/') {
      current = current.next;
    } else {
      if (current.operation === '*') current.value = current.value * next.value;
      if (current.operation === '/') current.value = current.value / next.value;
      current.operation = next.operation;
      current.next = next.next;
    }
  }
  current = linkedList.head;
  while (current !== null) {
    const next = current.next;
    if (current.operation !== '+' && current.operation !== '-') {
      current = current.next;
    } else {
      if (current.operation === '+') current.value = current.value + next.value;
      if (current.operation === '-') current.value = current.value - next.value;
      current.operation = next.operation;
      current.next = next.next;
    }
  }
  return linkedList.head.value;
}

function equal() {
  try {
    if (screen.value === '') return;
    screen.value = formatNumbers(
      evaluateExpression(convertToOperationLinkedList(screen.value)).toString()
    );
  } catch (error) {
    screen.value = error.message;
  }
}

function writeOperator(operator) {
  screen.value += operator;
}

function del() {
  screen.value = formatNumbers(unformatNumbers(screen.value).slice(0, -1));
}

function clearScreen() {
  screen.value = '';
}
