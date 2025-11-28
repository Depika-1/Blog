const express = require('express')
const router = express.Router()
const path = require('path');
const { handleAddBlog, DisplayAllBlog, SpecificBlogDisplay } = require('../controller/handleBlog')

//to upload img file using multer

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads/')
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage })

router.post('/addblog', upload.single('image'), handleAddBlog)

router.get('/displayblog', DisplayAllBlog)

router.get('/:blogId', SpecificBlogDisplay)


module.exports = router