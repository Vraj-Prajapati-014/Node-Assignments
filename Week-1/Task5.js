// Create a program that demonstrates variable hoisting in JavaScript. Declare variables using both var and let within functions and blocks, and then attempt to access these variables before and after their declarations. Explain the behavior observed in the comments.

// Example 1: Hoisting with `var`
function hoistingWithVar() {
    console.log("Before declaration:", varVariable); // Outputs: undefined
    var varVariable = "I am a var variable";
    console.log("After declaration:", varVariable); // Outputs: "I am a var variable"
}
hoistingWithVar();

// Example 2: Hoisting with `let`
function hoistingWithLet() {
    console.log("Before declaration:", letVariable); // Error: Cannot access 'letVariable' before initialization
    let letVariable = "I am a let variable";
    console.log("After declaration:", letVariable); // Outputs: "I am a let variable"
}
hoistingWithLet();

// Example 3: Hoisting in a block scope
function blockScopeHoisting() {
    if (true) {
      
       // console.log(blockLet); // Error: Cannot access 'blockLet' before initialization
        console.log(blockVar); // Outputs: undefined
        var blockVar = "Block-scoped var";
        let blockLet = "Block-scoped let";
        console.log("After declaration (var):", blockVar); // Outputs: "Block-scoped var"
        console.log("After declaration (let):", blockLet); // Outputs: "Block-scoped let"
    }
}
blockScopeHoisting();



