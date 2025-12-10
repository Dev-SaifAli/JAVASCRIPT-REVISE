// DOM (Document Object Model)
const DOM = {
  html: {
    head: {
      title: "heading 01",
    },
    body: {
      section: {
        h2: "Hero Section",
        p: "paragraph of the hero section",
      },
    },
  },
};

var myName = "Saif";
console.log(window);
console.log(window.document);
console.log(window.document.head);
console.log(window.document.body);
console.log(document.head);
console.log(document.body);
console.log(window.document.head.title.textContent);
console.log(document.head.title.innerText);
console.log(document.head.title.innerHTML);
console.log(document.body.h1);

// Getting elements
// ***getElementsByTagName("h1");
const elements = document.getElementsByTagName("h1");
console.log(elements); // array list
console.log(elements[0]);
console.log(elements[1]);
console.log(elements[2]);
console.log(elements[3]);

elements[0].innerText = "Hello There";
console.log(elements[0].innerText);
console.log(elements[0].innerHTML);
console.log(elements[0].textContent);

const firstElement = document.getElementById("title");
console.log(firstElement);
firstElement.innerText = "First Element Here...";
console.log(firstElement);

const moreElements = document.getElementsByName("heading");
console.log(moreElements);
console.log(moreElements[0]);

var classElement = document.getElementsByClassName("Heading 2");
console.log(classElement);

console.log("Query Elements...");
var moreQueryElements = document.querySelector("h1"); //tagName
console.log("Tag", moreQueryElements);
var moreQueryElements = document.querySelector("#title"); //id
console.log("Id", moreQueryElements);
var moreQueryElements = document.querySelector(".Heading"); //class
console.log("Class", moreQueryElements);

var allQueryElements = document.querySelectorAll("h1");
console.log("By Tag:", allQueryElements);
var allQueryElements = document.querySelectorAll("#title");
console.log("By Id:", allQueryElements);
var allQueryElements = document.querySelectorAll(".title");
console.log("By Class:", allQueryElements);

// Getting text
// by using querySelector we can change only first element
const singleElementWithQuery = document.querySelector(".content");
const singleIdElementWithQuery = document.querySelector("#text");
console.log({ singleElementWithQuery, singleIdElementWithQuery });

singleElementWithQuery.innerText = "Inner text changes...";
singleIdElementWithQuery.innerText = "Inner text changes here...";

const moreClassElements = document.querySelectorAll(".content");
const moreElementsWithQuery = document.querySelectorAll("#text");
console.log({ moreClassElements, moreElementsWithQuery });

moreClassElements[0].innerText = "All content Elements changes...";
moreClassElements[1].innerText = "All content Elements changes...";
moreClassElements[2].innerText = "All content Elements changes...";

moreElementsWithQuery[0].innerText = "Some text here...";
moreElementsWithQuery[1].innerText = "Some text here...";
moreElementsWithQuery[2].innerText = "Some text here...";

const elementsWithClass = document.querySelectorAll(".content"); // Node-list
elementsWithClass.forEach(function (element) {
  element.innerText = "Content Changes...using forEach Method...";
  console.log(
    (element.innerText = "Content Changes...using forEach Method...")
  );
});

const elementsWithID = document.querySelectorAll("#text");
elementsWithID.forEach((element) => {
  element.innerText = "Element getWithQuerySelector id...";
  console.log((element.innerText = "Element getWithQuerySelector id..."));
});

// Style
singleElementWithQuery.style.color = "white";
singleElementWithQuery.style.backgroundColor = "";
singleElementWithQuery.style.padding = "20px";
singleElementWithQuery.style.border = "2px";
singleElementWithQuery.style.borderStyle = "solid";
singleElementWithQuery.style.borderLeftColor = "red";
console.log({ style: singleElementWithQuery.style });
