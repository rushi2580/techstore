import jwt from 'jsonwebtoken';

const generatetoken = (user)=>{
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {

    });
}
export default generatetoken;