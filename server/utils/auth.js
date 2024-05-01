import jwt from "jsonwebtoken";

export const generateToken = (username, email, user_id, avatar, full_name, role) =>{
    const payload = {
        username,
        email,
        user_id,
        avatar,
        full_name,
        role
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.username;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}