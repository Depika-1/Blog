const mysql2=require('mysql2')

const db=mysql2.createPool({
    host:'localhost',
    user:'root',
    password:'roots',
    database:'blog'
})

module.exports={db}
