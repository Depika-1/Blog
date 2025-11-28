const { db } = require('../models/db_connection')

const handleAddComment = (req, res) => {
    const { comment, blogId, userid } = req.body
    const sql = 'insert into comments(comment,blogid,created_by) values (?,?,?)'
    db.query(sql, [comment, blogId, userid], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ Error: 'not inserted' })
        }
        res.json({ status: 'success' })
    })
}

const handledisplayComments = (req, res) => {
    const {blogid}=req.params
    const sql =  `
        SELECT comments.*, users.name 
        FROM comments 
        JOIN users ON comments.created_by = users.id where comments.blogid=? `
    db.query(sql,[blogid], (err, result) => {

        console.log(err)
        console.log(result)
        res.json(result)
    })
}

module.exports = {
    handleAddComment,
    handledisplayComments
}