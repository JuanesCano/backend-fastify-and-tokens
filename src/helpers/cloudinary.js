import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    // cloud_name : "dc5fwdxda",
    // api_key : "843494854667733",
    // api_secret: "M5v5Jg-l3qtbUAwfQY58xmDRZdM",
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export default cloudinary;