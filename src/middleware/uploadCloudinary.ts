import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../lib/cloudinary/cloudinary";
import path from "path";
import { NextFunction, Request, Response } from "express";

cloudinaryConfig()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../assets"));
    },
    filename :(req, file, cb) => {
        const uniqueSuffix = Date.now()
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname.replace(/\s/g, ""))
    }
})

const uploadFile = multer({storage: storage,
    limits: {
        fileSize: 1024 * 1024 *  2
    },
}).fields([
    {
        name:"image",
        maxCount: 4,
    },
    {
        name: "avatar",
        maxCount: 1,
    },
    {
        name: "cover",
        maxCount: 1
    }
])

const multerMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        uploadFile(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(401).json({
                        status: false,
                        message: "File too large"
                    });
                }
                return res.status(500).json({
                    status: false,
                    message: err.message
                });
            } else if (err) {
                return res.status(500).json({
                    status: false,
                    message: err
                });
            }


            if (req.files) {
                try {
                    const files = req.files as { [fieldName: string]: Express.Multer.File[] }
                    const { image, avatar, cover } = files
                    if (image && image.length > 0) {
                        const imagesUrls = await Promise.all(image.map(async (img) => {
                            try {
                                const imageUrl = await cloudinary.uploader.upload(img.path, { folder: "Threads" });
                                const images = {
                                    image: imageUrl.secure_url
                                };
                                return images;
                            } catch (error) {
                                console.log(error);
                                throw error;
                            }
                        }));
                        req.body.images = imagesUrls
                    }

                    if (avatar && avatar.length > 0) {
                        const avatarUrl = await cloudinary.uploader.upload(avatar[0].path, { folder: "Profiles" })
                        req.body.avatar = avatarUrl.secure_url
                    }

                    if (cover && cover.length > 0) {
                        const coverUrl = await cloudinary.uploader.upload(cover[0].path, { folder: "Profiles" })
                        req.body.cover = coverUrl.secure_url
                    }

                } catch (error) {
                    console.log(error);
                }
            }

            next();
        });
    };
};


export default multerMiddleware