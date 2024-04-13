import connectDB from './../db/connection.js';
import AuthRouter from './modules/auth/auth.router.js';
import UserRouter from './modules/user/user.router.js';
import MessageRouter from './modules/message/message.router.js';

const initApp=(app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/message',MessageRouter)
    app.use('/auth',AuthRouter)
    app.use('/user',UserRouter)
    app.use("*",(req,res)=>{
        return res.json({messag:"page not found"});
    })
}

export default initApp;