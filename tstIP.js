// require("os").networkInterfaces()[Object.keys(require("os").networkInterfaces())[0]][1].address + ":8080"

const res =require("os").networkInterfaces()[Object.keys(require("os").networkInterfaces())[1]][0].address

console.log(res)
