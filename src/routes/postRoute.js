import postCtrl from '../controllers/postController.js';
import { upload } from '../middleware/imgUpload.js';
import { verifyToken } from '../middleware/auth.js';

const middleware = (req, reply, done) => {
    verifyToken(req, reply, done)
};

const postRoutes = (fastify, opts, done) => {
    fastify.get('/', {preHandler: [middleware]}, postCtrl.listar);
    fastify.get('/:id', {preHandler: [middleware]}, postCtrl.listOne);
    fastify.get('/user', {preHandler: [middleware]}, postCtrl.listarPostLogin);

    fastify.post("/", {preHandler: [middleware, upload.single("img")]}, postCtrl.add);

    fastify.put('/:id', {preHandler: [middleware, upload.single("img")]}, postCtrl.update);

    fastify.delete('/:id', {preHandler: [middleware]}, postCtrl.delete);

    done()
};

export default postRoutes;