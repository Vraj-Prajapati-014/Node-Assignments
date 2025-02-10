// Create a program that utilizes the filter function to extract even numbers from an array of integers. Print the original array and the filtered array containing only even numbers.

const arr=[1,2,3,4,5,6,12,45,78,35];
const filteredarr=arr.filter((ele)=>ele%2==0);

console.log("Original Array:" ,arr);
console.log("Filtered Array:",filteredarr);

