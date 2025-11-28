const express=require('express')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const app=express()
const userRouter=require('./routes/handleUserRoute')
const blogRouter=require('./routes/blogRouter')
const commentRouter=require('./routes/commentRouter')

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use(cookieParser())

app.use('/user',userRouter)
app.use('/blog',blogRouter)
app.use('/comment',commentRouter)

app.listen(3002,()=>console.log('running on port 3002'))
