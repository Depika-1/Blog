const { db } = require('../models/db_connection')
const { validateToken } = require('../services/authentication')


const handleAddBlog = (req, res) => {
    const { title, body } = req.body
    const token=req.cookies.token
    const user=validateToken(token)
    const user_id=user.id
    const coverImage = req.file ? `uploads/${req.file.filename}` : null
    const sql = `insert into blogs(title,body,cover_img,created_by) values (?,?,?,?)`
    db.query(sql, [title, body, coverImage,user_id], (err, result) => {
        if (err)
            console.log(err)
        res.json({ status: "success" })
    })
    console.log(req.file)

}

const DisplayAllBlog = (req, res) => {
    
    const sql = 'select * from blogs order by created_at desc'
    db.query(sql, (err, result) => {
        res.json(result)
    })
}

const SpecificBlogDisplay=(req,res)=>{
    const blogid = req.params.blogId
    const sql = 'select * from blogs where id=?'
    db.query(sql, [blogid], (err, result) => {
        if (err){
            console.error("Database error:", err);
            return res.status(404).send(err)
        }
        if(result.length===0)
            return res.send('no blog found')
        res.send(result[0])
    })
}

module.exports = {
    handleAddBlog,
    DisplayAllBlog,
    SpecificBlogDisplay
}