
const fs = require('fs'); //fs is the built in function

//synchronous fn : this throw error if happens
fs.writeFileSync('./name.txt', "manish"); // this will create a file and with string manish

//async function : needs to handle the error by yourself
fs.writeFile("./number.txt", "mk:098978", (err) => {});

//for reading the file

//sync : Blocking Operation
const result = fs.readFileSync('./name.txt', "utf-8");
console.log(result);

//async : Non Blocking Operation 
fs.readFile('./number.txt', 'utf-8', (err,result) => {
    if(!err){
        console.log(err);
    } else {
        console.log(result);
    }
})

//not only this ther are many function in the fs directory 