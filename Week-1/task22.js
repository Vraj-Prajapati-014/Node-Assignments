// Create an object called student with properties name, age, and an array grades. Add a method named calculateAverage to the object, which calculates and returns the average of the grades. Iterate through the object properties using a loop and log each property and its value. Call the calculateAverage method and log the result.

const student={
    name:"vraj",
    age:22,
    grades:[65,89,73,60,92],
    calculateAverage:function(){
        const sum=this.grades.reduce((acc,cur)=>acc+cur,0)
        const avg=sum/this.grades.length;
        console.log(`\nAverage Grade: ${avg}\n`);
    }
}
// console.log(student);
student.calculateAverage();

for(keys in student){
    console.log(`Property:${keys}, value:"${student[keys]}"\n` );  
}
