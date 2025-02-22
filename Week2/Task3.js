//Create simple function that will run only once while we start program.

// It can create by IIFE(Immediately Invoked Function Expressions) which is defined and invoked immediately after its declaration.


// IIFE function
(function(x, y){
  let sum = x+y;
  console.log(sum);
  })(5,3); 


// it is used to create a blockscoped variable
var counter = (function (){
  let count = 0;
  return{
    //count:0,
    increment : function(){
      count++;
    },
    decrement : function(){
      count--;
    },
    getcount : function(){
      return count;
    }
  };
})();

counter.increment();
counter.increment();
counter.increment();
console.log(counter.getcount()); // output = 3
counter.decrement();
console.log(counter.getcount()); // output = 2
console.log(counter.count); // undefined

