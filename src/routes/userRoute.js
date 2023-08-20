import userCtrl from "../controllers/userController.js";

const userRoutes = (fastify, opts, done) => {
    fastify.post("/login", userCtrl.login);

    fastify.post("/register", userCtrl.register);
    done();
};

export default userRoutes;