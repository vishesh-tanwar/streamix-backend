import jwt from "jsonwebtoken";

const JWT_SECRET = 'grijgiwergnwiorgwigjnw';

export const generateToken = (payload: { user: object }) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' })
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
