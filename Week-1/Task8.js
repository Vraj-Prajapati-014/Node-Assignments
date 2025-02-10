// Create a document outlining best practices for variable declaration in modern JavaScript. Include guidelines on when to use let, var, or const, taking into consideration block scoping, hoisting, and the immutability of constants. Provide code examples to illustrate each best practice.

//  " VAR "
//We can use this when we want to reassign and redeclare variable (Not good Practice)
//it is functional scoped and Global if assign globally 
//Hoisted top of the functional scope but don't use TDZ so give Undefined 
//Avoid using in modern JS

var x = 10;
var x = 20; // Allowed: var can be redeclared
console.log(x);

//  " Let "
//We can use this when we want to only re-assign variable (not redeclare in same scope)
//it is Block scoped and When declared globally, it does not create a property on the global `window` object, unlike `var`.
//Hoisted top of the Block scope and  use TDZ so give Reference Error if use before initialize
//Mostly use in modern JS

let y = 30;
//let y = 40; // Error: let cannot be redeclared in the same scope
console.log(y);


//  " Const "
// We can use this to declare variables that should not be reassigned (immutable references).
// It is block-scoped 
// When declared globally, it does not create a property on the global `window` object, unlike `var`.
// `const` is hoisted to the top of its block scope but remains in the Temporal Dead Zone (TDZ) until initialized.
// The reference of a `const` variable cannot be reassigned, but its contents (like objects or arrays) can be mutated.


const z = 50;
//const z = 60;
console.log(z);