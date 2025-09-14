import jwt from "jsonwebtoken";

const JWT_SECRET = 'grijgiwergnwiorgwigjnw';

export const generateToken = (payload: { user: object }) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign(payload, secret, { expiresIn: '30d' })
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export const decodeToken = (token: string) => {
    return jwt.decode(token);
};
