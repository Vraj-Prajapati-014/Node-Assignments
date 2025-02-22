// - Learn about node cli and npm cli commands.
// - Create script named `name.js` that prints passed arguments in node command.
    
//            e.g ``node name.js {Pass your name here}`` that should print your name. 
    
//     You can play around with other command as well.
    
// - Create sample script named `simplescript.js` that prints current date and time and executes using node. print current time using **`momentjs`** library.
// - Explore package.json file and it’s properties.


const moment=require('moment');
const date=moment().format('yyyy-mm-dddd');
const time=moment().format("hh:mm:ss");
console.log("Date is:"+date);
console.log("Time is:"+time);

