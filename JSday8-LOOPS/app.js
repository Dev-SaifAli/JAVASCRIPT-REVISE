// LOOPS
// 1. for loop
// 2. while loop
// 3. do..while loop

// Example
// Table of 2
// 2 * 1 = 2
// 2 * 2 = 4
// 2 * 3 = 6
// 2 * 4 = 8
// forLoop

for (let counter = 1; counter < 11; counter++) {
  console.log(`2 * ${counter} = ${2 * counter}`);
}

for (let counter = 10; counter >= 1; counter--) {
  console.log(`2 * ${counter} = ${2 * counter}`);
}

// To print odd numbers
for (let i = 0; i < 16; i++) {
  if (i % 2 != 0) {
    console.log(i);
  }
}

for (let i = 1; i <= 15; i = i + 2) {
  console.log(i);
}
console.log("backwards");
for (let i = 15; i >= 1; i -= 2) {
  console.log(i);
}
