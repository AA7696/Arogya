import { verify } from "jsonwebtoken";
import ApiErrors from "../utils/ApiErrors.js";

const verifyToken = (roles = []) => {
    return (req, res, next) => {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiErrors(401, "Unauthorize request")
        }

        verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
            if (err) {
                throw new ApiErrors(403, "Invalid Token");
            }

            if (roles.length && !roles.includes(decoded.role)) {
                throw new ApiErrors(403, "Unauthorized role")
            }

            req.user = decoded;
            next();
        });
    };
};

export default verifyToken;
