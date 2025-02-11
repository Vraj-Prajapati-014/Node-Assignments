// Define an object called calculator with properties x and y. Add a method named calculate to the object, which takes an operation string ("add", "subtract", "multiply", "divide") and uses an arrow function to perform the corresponding operation on x and y. Inside the arrow function, use the "this" keyword to access the object properties. Test the calculator with different operations.


//We can Do this  with a concept of closure. where arrow function can access the variable of lexical scope (calculate) which refer to the object.
const calculator={
    x:25,
    y:10,
    calculate(arg){
        const calc=()=>{
          switch (arg){
            case "sum": return `Sum of ${this.x} and ${this.y} is: ${this.x+this.y}`;
            case "subtract": return `Subtraction of ${this.x} and ${this.y} is: ${this.x-this.y}`;
            case "multiply": return `Multiplication of ${this.x} and ${this.y} is: ${this.x*this.y}`;
            case "divide": return `Division of ${this.x} and ${this.y} is: ${this.x/this.y}`;
            default: return "Invalid operation";
          }
        };
        return calc();
    }
}
console.log(calculator.calculate("sum"));
console.log(calculator.calculate("subtract"));
console.log(calculator.calculate("multiply"));
console.log(calculator.calculate("divide"));
console.log(calculator.calculate("power"));