
const fs = require('fs');

console.log("Sync Read Started");
const data = fs.readFileSync('./sample.txt', 'utf-8');
console.log("File Content:", data);
console.log("Sync Read Finished");


setTimeout(() => {
  console.log("setTimeout after 2 seconds");
}, 2000);


let count = 0;
const interval = setInterval(() => {
  console.log(`setInterval Count: ${++count}`);
  if (count === 3) clearInterval(interval);
}, 1000);


const fakePromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Promise Resolved after 1.5 seconds");
  }, 1500);
});

fakePromise.then(console.log);
