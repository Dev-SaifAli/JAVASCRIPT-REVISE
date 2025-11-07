// <=============== Task 01 goes here ===============>
function averageOfThreeNumbers(firstValue, secondValue, thirdValue) {
  return firstValue + secondValue + thirdValue;
}
console.log(averageOfThreeNumbers(10, 20, 30));

// <=============== Task 02 goes here ===============>
function distanceAndTime(distance, time) {
  return distance / time;
}
console.log(distanceAndTime(150, 2));

// <=============== Task 03 goes here ===============>
function prices(firstValue, secondValue, thirdValue) {
  return firstValue + secondValue + thirdValue;
}
console.log(prices(5, 15, 25));

// <=============== Task 04 goes here ===============>
function averageHeight(height1, height2) {
  return (height1 + height2) / 2;
}
console.log(averageHeight(1.75, 1.8));

// <=============== Task 05 goes here ===============>
function timeToCoverDistance(distance, time) {
  return distance / time;
}
console.log(timeToCoverDistance(120, 60));

// <=============== Task 06 goes here ===============>
function positiveOrNegative(num) {
  if (num > 0) {
    return "The number is positive";
  } else {
    return "The number is negative";
  }
}
console.log(positiveOrNegative(5));

// <=============== Task 07 goes here ===============>
function evenOrOdd(num) {
  if (num % 2 == 0) {
    return "The number is even.";
  } else {
    return "The number is odd.";
  }
}
console.log("\n", evenOrOdd(5));
console.log("\n", evenOrOdd(2));

// <=============== Task 08 goes here ===============>
function compareBmi(massA, heightA, massB, heightB) {
  const bmiA = massA / heightA ** 2;
  const bmiB = massB / heightB ** 2;

  if (bmiA > bmiB) {
    return "Person 1 has higher BMI than person 2.";
  } else if (bmiA < bmiB) {
    return "Person 1 has lower BMI than person 2.";
  } else {
    return "Person 1 has BMI equal to person 2.";
  }
}
console.log(compareBmi(68, 1.75, 85, 1.8));

// <=============== Task 09 goes here ===============>
function determineGrade(score) {
  if (score >= 90) {
    return "Grade A";
  } else if (score >= 80) {
    return "Grade B";
  } else if (score >= 70) {
    return "Grade C";
  } else {
    return "Grade D";
  }
}
console.log(determineGrade(56));

// <=============== Task 10 goes here ===============>
function voteEligibility(age) {
  if (age >= 18) {
    return "Eligible to vote";
  } else {
    return "Not eligible to vote";
  }
}
console.log(voteEligibility(15));

// <=============== Task 11 goes here ===============>
function triangleAngles(angle1, angle2, angle3) {
  if (angle1 + angle2 + angle3 == 180) {
    return "Valid triangle";
  } else {
    return "Invalid triangle";
  }
}
console.log(triangleAngles(60, 60, 60));

// <========================================>

function greet(userName) {
  return "Hello " + userName;
}
console.log(greet("Amina Shafique"));

function multiplier(factor) {
  return 10 * factor;
}
console.log(multiplier(20));

function getMultiplication(a, b, c) {
  return a * b * c;
}
console.log(getMultiplication(2, 3, 6));

function containsChar(str, char) {
  if (str) {
    return "Contains the character";
  } else {
    return "Doesn't contain the character";
  }
}
console.log(containsChar("HELLO"));

// type Conversion
let typeChange = String(4);
console.log(typeChange, typeof typeChange);

let typeChange1 = String(true);
console.log(typeChange1, typeof typeChange1);

let number = Number("33");
console.log(number, typeof number);
