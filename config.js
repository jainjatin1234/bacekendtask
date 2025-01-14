// const express = require('express')
// const app = express()
// const PORT = 3000


// app.listen(PORT,(req,res)=>{
//     console.log("serer started")
// })

const mysql = require('mysql')

const con = mysql.createConnection({
    host:'bprfjhj5ykwsrmrudbgs-mysql.services.clever-cloud.com',
    user:"urat1llefrgsgpuf",
    password:"Eg6on6y62dgS2o5rPA4Q",
    database:"bprfjhj5ykwsrmrudbgs"
})

con.connect((error)=>{
    if(error){
        console.log("error")
    }
    else{
        console.log(('connected'))  
    }
})


module.exports = con