// Create function that in which you have to pass number in diff function call and when you want result at the end you have to call function with no argument.
// Ex. magicFunction(2)(3)(4)(5)()
// output: 14

function magicFunction(num) {
  return function (nextNum) {
      if (nextNum === undefined) return num;
      return magicFunction(num + nextNum); 
  };
}


console.log(magicFunction(2)(3)(4)(5)());  
