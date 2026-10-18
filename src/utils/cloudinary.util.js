const {v2 : cloudinary} = require('cloudinary')

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

async function uploadOnCloudinary(localfilepath){
    try {
        if(!localfilepath){
            return null
        }
        const response = cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})

        return response

    } catch (error) {
        return error
    }
}
module.exports = {uploadOnCloudinary}




/*
import {v2 as cloudinary} from "cloudinary"
// v2 means Cloudinary's version 2 API/module.
import fs from "fs"

    // Configuration
//     console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key exists:", !!process.env.CLOUDINARY_API_KEY);
// console.log("API Secret exists:", !!process.env.CLOUDINARY_API_SECRET);
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // file has been uploaded successfully
        // console.log("file is uploaded on cloudinary",response.url);
        fs.unlinkSync(localFilePath)
        // when the image is successfully uploaded on cloudinary then delete it from temp folder
        return response
    }  catch (error) {
    console.log("Cloudinary Upload Error:");
    console.log(error);

    fs.unlink(localFilePath, (err) => {
        if (err) console.log(err);
    });

    return null;
}
}

export {uploadOnCloudinary}
*/