import jwt from "jsonwebtoken";
import { response } from "../helpers/response.js";
import { userModel } from "../models/userModel.js";

const messageNoAuth = (reply) => {
    response(reply, 401, false, "", "No estas autorizado")
}

export const verifyToken = async (req, reply, done) => {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET, async (err, payload) => {
            if (err) {
                return messageNoAuth(reply)
            }

            const user = await userModel.findById({ _id: payload.user })
            if (!user) {
                return messageNoAuth(reply)
            }

            req.userId = payload.user;
            done();
        });
    }

    if (!token) {
        return messageNoAuth(reply)
    }
};