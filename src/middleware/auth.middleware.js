import jwt from 'jsonwebtoken';

const auth = (req,res,next)=>{

    const {authorization} = req.headers

    if (!authorization.startsWith(process.env.BEARERTOKEN)){
    return res.json({message:"invalid authorization"});
    }
    const token = authorization.split(process.env.BEARERTOKEN)[1];

    const decoded = jwt.verify(token,process.env.LOGINSIG);
    req.id = decoded.id;
    next();
}
export default auth;