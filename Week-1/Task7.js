// Develop a program that highlights the differences in scoping between let and var. Create a block-scoped variable using let and a function-scoped variable using var. Attempt to access these variables outside their respective scopes and explain the results in the comments.

// Example 1: Function Scope vs Block Scope
function scopeDifference() {
    if (true) {
        var functionScoped = "I am function-scoped (var)";
        let blockScoped = "I am block-scoped (let)";
        console.log("Inside the block:");
        console.log(functionScoped); // Accessible here
        console.log(blockScoped);   // Accessible here
    }

    console.log("Outside the block:");
    console.log(functionScoped); // Accessible because `var` is function-scoped

     console.log(blockScoped); // Error: blockScoped is not defined (block-scoped)
}

scopeDifference();


// Example 2: Global Scope
if (true) {
    var globalVar = "I am globally scoped (var)";
    let blockLet = "I am block-scoped (let)";
}
// here we can see BlockLet in green color which says that is it defined but never used as we can"t access this outside of the block.

console.log("\nGlobal Scope:");
console.log(globalVar); // Accessible because `var` leaks to the global scope

 console.log(blockLet); // Error: blockLet is not defined (block-scoped)


// Example 3: Loop Scoping
console.log("\nLoop Scoping:");
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(`var i: ${i}`), 100); // Logs: 3, 3, 3 
}
//here var is global so it maintain only one copy of i and it is 3 at the end of loop

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(`let j: ${j}`), 100); // Logs: 0, 1, 2 
}
//here let is block scoped so it maintain different copy of j for each iteration of loop
