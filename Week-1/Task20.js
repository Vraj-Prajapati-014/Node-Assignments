// Create an object called originalPerson with properties name, age, and an array hobbies. Use both shallow copy and deep copy techniques to create a new object called shallowCopyPerson and deepCopyPerson. Modify the hobbies array in one of the copies and observe how it affects the original object. Log the properties of all three objects. 

const originalPerson={
    name:"varj",
    age:22,
    hobbies:["cricket","drawing","painting"]
}

//shallow copy using ... because it is a nested object
console.log(originalPerson);
const shallowCopyPerson={...originalPerson};
shallowCopyPerson.hobbies.push("Chess");
console.log(originalPerson);
console.log(shallowCopyPerson);

// deep copy using jason method 
const deepCopyPerson=JSON.parse(JSON.stringify(originalPerson));
deepCopyPerson.hobbies.push("Football");
console.log(deepCopyPerson);
console.log(originalPerson);




