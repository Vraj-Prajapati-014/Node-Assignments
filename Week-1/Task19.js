// Create two objects named originalObject and modifiedObject. Assign the same properties to both objects. Modify one property in modifiedObject and observe how it affects the other object due to reference. Log the properties of both objects to the console.

const originalobject={
    name:"vraj",
    age:22,
    role:"student",
    hobby:{
       game:"cricket"
    },
    display:function(){
        console.log(`name: ${this.name}\nage: ${this.age} \nrole: ${this.role}\nhobby: ${this.hobby.game}\n`);
    }
}

originalobject.display();

//Shallow copy " Reference to same value "
 const modifiedObject=originalobject;
 modifiedObject.name="New name";
 modifiedObject.hobby.game="chess";

originalobject.display();
modifiedObject.display();

//Deep Copy " Create a new object "
// For main object " Deep copy" for Nested object " Deep Copy"
originalobject.name="Vraj";
originalobject.hobby.game="cricket";
originalobject.display();

const modifiedObject2={...originalobject};
 modifiedObject2.name="New name";
 modifiedObject2.hobby.game="chess";

originalobject.display();
modifiedObject2.display();