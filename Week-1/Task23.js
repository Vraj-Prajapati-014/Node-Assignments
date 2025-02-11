// Create a constructor function called Person that takes name and age as parameters and assigns them as properties. Add a method greet to the prototype of the constructor, which logs a greeting message using the person's name. Instantiate two objects using the Person constructor and call the greet method on both.

function person(name,age){
this.name=name;
this.age=age;
}
// Here when we use Prototype method it will share same copy with all the instances." Memory Efficient"
person.prototype.greet=function(){
    console.log(`Name:"${this.name}", Age:${this.age}`);
}

const V1=new person("Vraj",22);
const V2=new person("Aditya",20);

V1.greet();
V2.greet();

console.log(V1.greet===V2.greet);
