// Write a script that utilizes const for declaring constants. Attempt to reassign values to these constants and observe the behavior. Include comments explaining the concept of immutability with const and when it is appropriate to use it.

// Example 1: Declaring a constant
const vraj = 22; 
console.log("Age of Vraj is:", vraj);

vraj=23;
//Error 
 
// Example 2: Const with objects
const car = {
    brand: "Toyota",
    model: "Corolla"
};

car.model = "Camry"; // Allowed: Properties of the object can be changed
console.log("Updated car object:", car);


const frozenCar = Object.freeze({
    brand: "Tesla",
    model: "Model S"
});

frozenCar.model = "Model 3"; // No error thrown, but the value won't change
console.log("Frozen car object:", frozenCar); // Outputs the original object

// Example 3: Const with arrays
const numbers = [1, 2, 3];

numbers.push(4); // Allowed: You can modify the contents of the array
console.log("Updated numbers array:", numbers); // Outputs: [1, 2, 3, 4]

numbers = [5, 6, 7]; // Error: Assignment to constant variable


// When to use `const`:
// 1. For values that should not be reassigned, like mathematical constants (`pi`) or configurations.
// 2. To improve code readability and prevent accidental reassignment.
// 3. For objects or arrays that are fixed in reference but may have mutable content.

