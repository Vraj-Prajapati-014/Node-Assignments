const process=require("process");

function calc(n1,n2,op){
    switch(op.toLowerCase()){
        case "plus":
            return n1+n2;
        case "minus":
            return n1-n2;
        case "multiply":
            return n1*n2;
        case "divide":
            return n1/n2;
        default:
            return "valid operations are: plus,minus,multiply,divide."
    }
}
const arg=process.argv.slice(2);
if(arg.length!==3) console.log("Give Valid Arguments");


const [num1, num2, operation] = arg;

const a = parseFloat(num1);
const b = parseFloat(num2);

if (isNaN(num1) || isNaN(num2)) {
    console.log("Error: The first two arguments must be valid numbers");
} else {
    const result = calc(a,b, operation);
    console.log(`Result: ${result}`);
}