//Create a function that takes an array and a callback function specifying the operation to be performed on each element of the array. The function should return a new modified array using JS. (Don’t use map)

function fun(arr, callback){
  let r = [];
  for(let i=0;i<arr.length;i++){
    r.push(callback(arr[i]));
  }
  return r;
}

const numbers = [1,2,3,4,5,6,7,8,9,10];

function double(num){
  return num * 2;
}
function square(num){
  return num * num;
}

console.log(fun(numbers, double));
console.log(fun(numbers, square));