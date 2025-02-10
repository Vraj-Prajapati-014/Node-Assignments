//Write a JavaScript program with comments explaining the differences between let, var, and const in terms of variable declaration. Include examples that showcase the scope of each type of variable and any restrictions they might have.

// Example 1: Scope and Declaration Differences Between var, let, and const
function scopeExample() {
    if (true) {
        var va = "Vraj"; // Function-scoped
        let le = "let"; // Block-scoped
        const co = "const"; // Block-scoped
    }

    console.log(va); 
    console.log(let);
    console.log(co); 
}
scopeExample();

// Example 2: Redeclaration
var x = 10;
var x = 20; // Allowed: var can be redeclared
console.log(x); // Outputs: 20

let y = 30;
let y = 40; // Error: let cannot be redeclared in the same scope

const z = 50;
const z = 60; // Error: const cannot be redeclared in the same scope

// Example 3: Reassignment
var a = 100;
a = 200; // Allowed: var can be reassigned
console.log(a); // Outputs: 200

let b = 300;
b = 400; // Allowed: let can be reassigned
console.log(b); // Outputs: 400

const c = 500;
// c = 600; // Error: const cannot be reassigned
console.log(c); // Outputs: 500

// Example 4: Use of const with Objects
const person = {
    name: "Vraj",
    age: 22
};

person.age = 31;
console.log(person); // Outputs: { name: "John", age: 31 }


person = { name: "Vraj2", age: 23 }; // Error: Assignment to constant variable


