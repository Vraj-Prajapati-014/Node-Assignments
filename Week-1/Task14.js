// Create an object called person with properties name and age. Add a method named introduce to the object, which logs a message using the "this" keyword to reference the name and age properties. Call the introduce method to introduce the person.

const Person={
  name:"vraj",
  age:22,
  introduce:function(){
    console.log(`My name is ${this.name} and age is ${this.age}.`);
    }
}
Person.introduce();