const express = require('express')
const app = express()
require('./data/mongoose')

app.use(express.json())


const logMiddleware = require('./middlewares/middlewar')
const errorMiddleware = require('./middlewares/error')


const authMiddleware = require('./middlewares/authMidl');
const authorizationMiddleware = require('./middlewares/authorization');


app.use(authMiddleware.authenticateToken);
app.use(authorizationMiddleware.checkUserRole);


app.use(logMiddleware);
app.use(errorMiddleware);



const postRouter = require('./routes/postRoutes')
app.use('/posts', postRouter)

const userRouter = require('./routes/userRoutes');
app.use('/users', userRouter);

const AuthRouter = require('./routes/AuthRoutes')
app.use('/register', AuthRouter)

const LoginRouter = require('./routes/loginRoutes')
app.use('/login', LoginRouter)


app.listen(3001,()=>{
    console.log("Server is running")
})
