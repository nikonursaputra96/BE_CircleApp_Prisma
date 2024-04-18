// import {v2 as cloudinary} from "cloudinary"

// class Cloudinary {
//     config () {
//         cloudinary.config({
//             cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//             api_key: process.env.CLOUDINARY_API_KEY,
//             api_secret: process.env.CLOUDINARY_API_SECRET
//             })
//     }
// }

// export default new Cloudinary ()

import { v2 } from "cloudinary";

const cloudinary = v2;
// Return "https" URLs by setting secure: true
cloudinary.config({
   secure: true,
});

// Log the configuration

const uploadImage = async (imagePath: string) => {
   // Use the uploaded file's name as the asset's public ID and
   // allow overwriting the asset with new versions
   const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
   };

   try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
   } catch (error) {
      console.error(error);
   }
};
