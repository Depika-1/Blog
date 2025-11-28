const { db } = require('../models/db_connection')
const bcrypt = require('bcrypt')
const { createUserToken, validateToken } = require('../services/authentication')


const handleSignup = async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const sql = `insert into users(name,email,password,role) values (?,?,?,?)`
        db.query(sql, [name, email, hashedPassword, role], (err, result) => {
            if (err) {
                return res.status(400).json({ error: err.sqlMessage });
            }
            res.json({ status: 'success' })
        })
    } catch (err) {
        res.status(500).send('Error hashing password')
    }
}


const handleLogin = (req, res) => {
    const { email, password } = req.body
    const sql = `select * from users where email=?`
    db.query(sql, [email], async (err, result) => {
        if (err) {
            console.log("database error:", err)
            return res.status(500).json({ error: 'server error' })
        }
       
        if (result.length === 0)
            return res.status(401).json({ error: 'invalid email or password' })
        const user = result[0]
        console.log(user)
        const match = await bcrypt.compare(password, user.password)
        if (!match)
            return res.status(401).json({ error: 'invalid email or password' })
        const token = createUserToken(user)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false
        })
        res.json({
            status: 'success',
            user:{
                user_id:user.id,
                user_name:user.name,
                user_email:user.email,
                user_role:user.role
            }
        })
    })

}

const handleLogout=(req,res)=>{
    res.clearCookie('token')
    res.json({status:'success'})
}


module.exports = {
    handleSignup,
    handleLogin,
    handleLogout
}