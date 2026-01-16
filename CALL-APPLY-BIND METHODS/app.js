const person1 = {
  name: "Saif",
  greet: function () {
    console.log(`Hi, I'm ${this.name}`);
  },
};
const person2 = {
  name: "Amina",
};
const aminaGreet = person1.greet.bind(person2);
aminaGreet();
person1.greet.call(person2);

class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }

  delayedGreet() {
    setTimeout(this.greet, 1000);
  }
}
const user = new User("Ali");

user.delayedGreet()

