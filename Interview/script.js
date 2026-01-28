const numbers = [1, 2, 3, 4, 5];
let sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log(sum);

// Maximum value
{
  const numbers = [5, 120, 8, 130, 44];
  let max = numbers.reduce((maximum, currentValue) => {
    return currentValue > maximum ? currentValue : maximum;
  }, numbers[0]);
  console.log(max);
}

// Find occurrences
{
  const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
  let count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
  }, {});
  console.log(count);
}

// Flatten array
const nested = [
  [10, 20],
  [30, 40],
  [50, 60],
];
const flat = nested.reduce((acc, value) => {
  return acc.concat(value);
});
console.log(flat);

const students = [
  { name: "Saif", grade: "A" },
  { name: "Ali", grade: "B" },
  { name: "Sara", grade: "A" },
  { name: "Ahmed", grade: "B" },
];
const grouped = students.reduce((acc, student) => {
  const grade = student.grade;
  if (!acc[grade]) {
    acc[grade] = [];
  }
  const name = student.name;
  acc[grade].push(name);
  return acc;
}, {});
console.log(grouped);
