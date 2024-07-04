//creating a reading stream
// const fs=require('fs')
// const readstream=fs.createReadStream('./exe.txt',{encoding:'utf8'});
// readstream.on('data',(chunk)=>{
//     console.log('---NEW CHUNK---');
//     console.log(chunk.toString())
// })

//creating a writing stream
// const fs = require('fs')
// const writestream = fs.createWriteStream('./blog.txt')
// const readstream = fs.createReadStream("./file.txt")
// readstream.on('data', (chunk) => {
//     console.log(chunk)
//     writestream.write("\nNEW CHUNK\n");
//     writestream.write(chunk);
// });

//piping
const fs=require('fs');
const readstream=fs.createReadStream('./exe.txt')
const writestream=fs.createWriteStream('./blog2.txt')
readstream.pipe(writestream)