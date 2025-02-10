// Develop a script that uses an array to store the days of the week. Use array methods such as push, pop, shift, or unshift to modify the array. Print the array after each modification. Additionally, use the indexOf method to find the index of a specific day.

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
console.log("original Array:" , daysOfWeek);

daysOfWeek.push("NewDay");
console.log("Array after push:", daysOfWeek);

daysOfWeek.pop();
console.log("Array after pop:", daysOfWeek);

daysOfWeek.shift();
console.log("Array after shift:", daysOfWeek);

daysOfWeek.unshift("Monday")
console.log("Array after Unshift", daysOfWeek);

console.log("Index of Thursday is:" ,daysOfWeek.indexOf("Thursday"));
 
console.log("Index of Sunday is:" ,daysOfWeek.indexOf("Sunday"));
