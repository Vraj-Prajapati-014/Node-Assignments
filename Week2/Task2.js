// Create program of which required map, filter chaining, and after that replace that with reduce
// Ex. 
// const students = [
// { name: 'jeel', age: 21 },
// { name: 'franklin', age: 25 },
// { name: 'vivek', age: 26 },
// { name: 'hardik', age: 23 },
// ]

// create array of name of student  whose age is greater than 18.


const students = [
    { name: 'jeel', age: 21 },
    { name: 'franklin', age: 25 },
    { name: 'vivek', age: 11 },
    { name: 'hardik', age: 23 },
];

//filter chaning 
const filteredNames = students.filter(n => n.age>18).map(student => student.name);
console.log(filteredNames);

//reduce method
const filteredNamesReduce = students.reduce((acc, cur) => {
  if(cur.age>18) acc.push(cur.name);
  return acc;
},[])
console.log(filteredNamesReduce);
