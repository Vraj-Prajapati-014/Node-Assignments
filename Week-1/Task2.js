// Create a program that uses a while loop to iterate through an array of strings. Inside the loop, use forEach to print each string with an appended exclamation mark. The loop should terminate once the length of the current string exceeds 8 characters. Comment on the differences between while and forEach in this context.

const arr=["Vraj","Abc","Xyz","vrajAbcXyz"];
let len=arr.length;
let i=0;
while(len>0){
    if(arr[i].length>8) {
        console.log(`Terminates At: ${arr[i]}`);
        break;
    }
    else{
    [arr[i]].forEach((ele)=>{
    console.log(ele+"!");
    })
    len--;
    i++;
}
}

//Difference between While and ForEach loop
// While loop is used when we don't know the number of iterations to be performed. It is used when we have to iterate through an array of strings and we don't know the number of strings in the array.
//It is used when we have to iterate through an array of strings and we know the number of strings in the array. It is used when we have to perform the same operation on each element of the array.
//[arr[i]] here is used to convert the string into an array of strings.otherwise it will give an error as forEach is a method of an array.