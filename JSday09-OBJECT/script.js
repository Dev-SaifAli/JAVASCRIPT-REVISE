// Objects
const person = {
  // Properties
  personName: "Raheel",
  height: 6,
  weight: 80,
  male: true,
  female: false,
  // Methods
  heWalks: function (username) {
    // personName = username;
    this.personName = username;
    console.log(username);
    console.log(`${this.personName} walks...`);
    console.log(`${person.personName} walks...`);
    console.log(`${person["personName"]} walks...`);
    return `${person["personName"]}`;
  },
};
console.log(person.personName);
person.heWalks("Rehman");
console.log(person.personName);

const someOne = "personName";
console.log("Person", person);
console.log("Person", person[someOne]);
console.log("Person", person.personName);
console.log("Person", person.height);

person.personName = "John";
person["personName"] = "Celine";
delete person.personName;
delete person["name"];
person.profession = "Developer";
person["age"] = 40;
console.log("PersonName:", person.personName);

console.log("Person", person.heWalks("AMINA SHAFIQUE & SAIF"));

// Practice
const user = {
  firstName: "Saif",
  lastName: "Ali",
  age: 22,
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};
console.log("\nUser details:", user);

// Update user details
user.education = "BSCS";
user.isStudent = true;
user["university"] = "Government College University Faisalabad";
console.log("User details:", user);
console.log("User fullname:", user.fullName());

const personDetails = {
  userName: "Saif Ali",
  age: 22,
  city: "faisalabad",
};
console.log("\n", personDetails);
personDetails.userName = "Amina";
personDetails.age = 22;
personDetails.city = "gujrat";
console.log(personDetails);

const car = {
  brand: "toyota",
  model: "corolla",
  year: 2018,
};
const date = new Date();
const year = date.getFullYear();
console.log(year);

console.log("carDetails:", car);
car.year = year;
car.color = "black";
car["registration-status"] = "✅ Active";
console.log("\ncarDetails:", car);

// Objects within objects
const vehicle = {
  brand: "Toyota",
  model: "Camry",
  specifications: {
    engine: "2.5L",
    horsepower: 203,
    fuelType: "Gasoline",
  },
};
console.log("\n", vehicle);
console.log("\n", vehicle.specifications.horsepower);
console.log("\n");

// School Object
const school = {
  name: "Refulgent Public High School",
  location: "faisalabad",
  students: {
    count: 500,
    gradeLevels: ["9th", "10th", "11th", "12th"],
  },
};

console.log(school);
console.log(school.students.count);
console.log(school.students.gradeLevels[2]);
console.log("\n");

const recipe = {
  title: "Pancakes",
  ingredients: {
    flour: "2 cups",
    eggs: "2",
    milk: "1 cup",
  },
  cookingTime: "15 minutes",
};

console.log(recipe);
console.log(recipe.ingredients.flour);
console.log(recipe.ingredients.eggs);
console.log(recipe.ingredients.milk);
console.log("\n");

const wife = {
  name: "Amina Shafique",
  age: 22,
  address: {
    city: "gujrat",
    country: "pakistan",
  },
  education: {
    degree: "BSCS",
    college: "Govt graduate college",
  },
};
console.log(wife.address.city);
console.log(wife.education.degree);

console.log("\n");

const book = {
  title: "The Great Gatsby",
  author: {
    firstName: "F. Scott",
    lastName: "Fitzgerald",
  },
  year: 2025,
};

console.log(book.title);
console.log(book.author.firstName);
console.log(book.year);

// Animal object
const animal = {
  animalName: "Lion",
  sound: function (newSound) {
    animal.animalName = newSound; // property value update;
    console.log(newSound);
    console.log(`${this.animalName} roars...`);
    console.log(`${animal.animalName} roars...`);
    console.log(`${animal["animalName"]} roars...`);
  },
};

console.log(`${animal.animalName} roars...`);

animal.sound("Tiger");
console.log(`${animal.animalName} roars...`);

console.log("\n");
{
  const car = {
    model: "Toyota",

    start: function (newModel) {
      this.model = newModel;
      console.log(newModel);
      console.log(`${car.model} starts..`);
      console.log(`${this.model} starts... `);
      console.log(`${car["model"]} starts....`);
    },
  };
  car.start("Corolla");
  // console.log(car.start("Honda")); undefined bcz method doesn't return any value...
}

const student = {
  // Property.
  name: "Laiba",
  // Method defined.
  study: function (newName) {
    student.name = newName;
    console.log(newName);
    console.log(`${student.name} studies...📖`);
    console.log(`${this.name} studies...`);
    console.log(`${student["name"]} studies...`);
  },
};

// Method call
student.study("Amina");

// Key takeaway: 'this' keyword is used to refer to the current object within its method. It allows access to the object's
{
  const book = {
    title: "Javascript basics",
    author: "John Doe",
    printDetails: function () {
      console.log(`Title: ${this.title}`);
      console.log(`Author: ${this.author}`);
    },
  };
  book.printDetails();

  const movie = {
    title: "Inception",
    year: 2010,
    getDetails: function () {
      console.log(`Title: ${this.title}`);
      console.log(`Year: ${this.year}`);
    },
  };
  movie.getDetails();

  const laptop = {
    brand: "Dell",
    model: "Inspiron",
    showSpecs: function () {
      console.log(`Brand: ${this.brand}`);
      console.log(`Model : ${this.model}`);
    },
  };
  laptop.showSpecs();

  const car = {
    brand: "Honda",
    speed: 0,
    showSpeed: function (newSpeed) {
      car.speed = newSpeed;
      console.log(`${this.brand} is now going at ${this.speed} km/h`);
    },
  };
  car.showSpeed(180);
  console.log("\n");
  console.log("\n");
  const system = {
    brand: "Lenovo",
    ram: 8,
    upgradeRAM: function (newRAM) {
      system.ram = newRAM;
      console.log(`${this.brand} now has ${this.ram}GB of RAM.`);
    },
  };

  system.upgradeRAM(16);

  const bankAccount = {
    owner: "Alice",
    balance: 1000,
    deposit: function (newBalance) {
      bankAccount.balance = newBalance;
      console.log(
        `${this.owner} deposited $${this.balance}. New balance: $${this.balance} `
      );
    },
  };

  bankAccount.deposit(5000);
}
