import jwt from "jsonwebtoken"

const Authprovider = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Access denied! user is not authorize" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "User is not authorize" })
    }
}

export { Authprovider };