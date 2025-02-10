// Write a JavaScript program that uses a for loop to iterate over an array of numbers. Within the loop, implement a condition to break out of the loop when a number greater than 5 is encountered. Additionally, use continue to skip the iteration when the number is exactly 3. Print the elements before and after applying these control flow statements.

const arr=[1,2,3,4,5,6,7];
console.log(`Before control flow statements: ${arr}`);
console.log("After control flow statements:");
for(let i=0;i<arr.length;i++){
    if(arr[i]>5) break;
    if(arr[i]==3) continue;
    console.log(`${arr[i]}`);
}