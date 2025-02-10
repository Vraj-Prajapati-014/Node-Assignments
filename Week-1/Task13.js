// Develop a script that employs the reduce function to find the sum of all elements in an array. Print the original array and the final sum.

const arr=[10,15,24,63,12,78,41];
const sum=arr.reduce((acc,cur)=>acc+cur,0);
console.log("Sum of all Elements of Array:" ,sum);
