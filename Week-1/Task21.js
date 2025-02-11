// Create two objects user1 and user2 with similar properties. Write a function compareObjects that compares the properties of both objects. The function should log whether the objects are equal or not based on their properties. Test the function with user1 and user2

const user1={
    name:"vraj",
    age:22,
    display:function(){
        console.log(`name: ${this.name}\nage: ${this.age}\n`);
        
    }
}

const user2={
    name:"vraj",
    age:22,
    display:function(){
        console.log(`name: ${this.name}\nage: ${this.age}\n`);
        
    }
}

const user3={
    name:"vraj",
    age:22,
    hobby:"Cricket",
    display:function(){
        console.log(`name: ${this.name}\nage: ${this.age}\nhobby: ${this.hobby}\n`);
        
    }
}

user1.display();
user2.display();
user3.display();

const Compare=function (obj1,obj2){
   const ob1=Object.keys(obj1).sort();
   const ob2=Object.keys(obj2).sort();
   if(ob1.length!=ob2.length) {
    console.log("Both Objects Are Different!!");
    return false;
   }
   for(const keys of ob1){
    if(ob1[keys]!=ob2[keys]) {
        console.log("Both Objects Are Different!!") 
        return false;
    }
   }
   console.log("Both Objects Are Equal");
   
}

Compare(user1,user2);
Compare(user1,user3);