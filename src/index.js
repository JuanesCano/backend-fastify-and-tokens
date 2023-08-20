import Fastify from "fastify";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import multer from "fastify-multer";
import { connectDB } from "./database.js";
import userRoutes from "./routes/userRoute.js";
import postRoutes from "./routes/postRoute.js";
import fastifyEnv from "@fastify/env"
import { optionsEnv } from "./configEnv.js";

const fastify = Fastify({
    logger: true
});

fastify
    .register(fastifyEnv, optionsEnv)
    .ready((err) => {
        if (err) console.error(err)
    })

fastify.register(connectDB)
fastify.register(cors, { origin: "*" });
fastify.register(formBody);
fastify.register(multer.contentParser);

//RUTAS
fastify.register(userRoutes, { prefix: "/user" })
fastify.register(postRoutes, { prefix: "/post" })

const start = async () => {
    try {
        await fastify.ready()
        await fastify.listen({port: process.env.PORT, host: process.env.HOST })
        console.log(`escuchando por el puerto ${process.env.PORT}`)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()
