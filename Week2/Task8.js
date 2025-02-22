//Create sleep function which can stop for loop for given amount of time


function sleep(time) {
  return new Promise(resolve => setTimeout(resolve,time))
}

async function loop() {
  console.log("start");
  for(let i=1;i<20;i++){
    await sleep(1000); 
    console.log(i);

  }
  console.log("stop");
}
loop();
