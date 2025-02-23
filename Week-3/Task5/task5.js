const fs=require("fs");
const path=require("path");

const sourcepath=path.join(__dirname,"sourse.txt");
const destinationpath=path.join(__dirname,"destination.txt");

const read=fs.createReadStream(sourcepath);
read.on("data",(data)=>{
    console.log(data);
    console.log("");
    console.log("string data is:"+data.toString());
    
});

read.on("end",()=>{console.log("Data Read Successfully");
})

const write=fs.createWriteStream(destinationpath);

read.pipe(write);
write.on("finish",()=>{
    console.log("data transfered Successfully");
    
})