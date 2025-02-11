// Create an object called book with properties title, author, and pages. Add a method called displayInfo to the object, which logs a message using the properties to display information about the book. Instantiate the object with sample values and call the displayInfo method.

const properties={
    title:"Vraj's Magical World",
    author:null,
    pages:50,
    displayoinfo:function(){
        console.log(`\nBook name is ${this.title} written by ${this.author} having total ${this.pages} pages. `);
        }
}
properties.displayoinfo();
properties.author="Vraj"
properties.displayoinfo();