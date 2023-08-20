import { deleteImg } from "../helpers/deleteImg.js";
import { response } from "../helpers/response.js"
import { postModel } from "../models/postModel.js"
import { subirImageACloudinary } from "../helpers/cloudinaryActions.js";
import { eliminarImageCloudinary } from "../helpers/cloudinaryActions.js";

const postCtrl = {}

postCtrl.listar = async(req, reply) => {
    try {
        // const post = await postModel.find().populate("user").sort({createdAt: -1});
        const post = await postModel.find().populate({path: "user", select: "-password"}).sort({createdAt: -1});
        response(reply, 200, true, post, "Lista de posts")
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
};

postCtrl.listarPostLogin = async(req, reply) => {
    try {
        const post = await postModel.find({user: req.userId}).populate("user", {password: 0}).sort("-createdAt");
        response(reply, 200, true, post, "Lista de posts del usuario logueado")
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
};

postCtrl.listOne = async(req, reply) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);

        if(!post){
            return response(reply, 404, false, "", "Registro no encontrado");
        };

        return response(reply, 200, true, post, "Post encontrado")

    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
}

postCtrl.add = async(req, reply) => {
    try {
        const {title, description} = req.body
        const newPost = new postModel ({
            title,
            description,
            user: req.userId
        });

        // if(req.file){
        //     newPost.setImg(req.file.filename)
        // };

        // req.file && newPost.setImg(req.file.filename);

        if(req.file){
            const { secure_url, public_id } = await subirImageACloudinary(req.file);

            newPost.setImg({ secure_url, public_id });
        };

        await postModel.create(newPost);
        response(reply, 201, true, newPost, "Probando");

    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
};

postCtrl.update = async (req, reply) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);

        if(!post){
            return response(reply, 404, false, "", "Registro no encontrado");
        };

        if(req.file){
            // post.nameImage && deleteImg(post.nameImage);
            // post.setImg(req.file.filename);

            if(post.public_id){
                await eliminarImageCloudinary(post.public_id);
            };

            const { secure_url, public_id } = await subirImageACloudinary(req.file);

            post.setImg({ secure_url, public_id });

            await post.save()
        };

        await post.updateOne(req.body);
        response(reply, 200, true, "", "Post actualizado");

    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
}

postCtrl.delete = async(req,reply) => {
    try {
        const {id} = req.params;
        const post = await postModel.findById(id);

        if(!post){
            return response(reply, 404, false, "", "Registro no encontrado");
        };

        if(post.public_id){
            await eliminarImageCloudinary(post.public_id);
        };

        await post.deleteOne();

        return response (reply, 200, true, "", "Post eliminado")
        
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
};

export default postCtrl;
