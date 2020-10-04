const fs = require("fs")
const path = require("path")

//let fileContent = fs.readFileSync(path.join(__dirname, "Luda/book/1.txt"), "utf8");
//console.log(fileContent)

fs.readFile("./Luda/book/5.txt", "utf8",(err, fileContent)=>{
    if(err){
        console.log("Error: " + err.message)
        return
    }
    console.log(fileContent)
})