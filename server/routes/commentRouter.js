const express = require('express')
const router = express.Router()
const {handleAddComment,handledisplayComments}=require('../controller/handleComment')

router.post('/addcomment',handleAddComment)
router.get('/:blogid',handledisplayComments)

module.exports=router