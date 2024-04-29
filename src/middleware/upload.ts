import { NextFunction, Request, Response } from 'express'
import  multer from 'multer'
import  path from 'path'
import {v2 as cloudinary} from "cloudinary"

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//             api_key: process.env.CLOUDINARY_API_KEY,
//             api_secret: process.env.CLOUDINARY_API_SECRET
//  });

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

    const uploadMiddleware = (fieldname : string) => {
        return (req :Request, res: Response, next:NextFunction) => {
            uploadFile(req,res,(err) => {
                if(err instanceof multer.MulterError) {
                    if(err.code === "LIMIT_FILE_SIZE") {
                        return res.status(400).json({
                            status : false,
                            message: "File too large!"
                        })
                    }
                    return res.status(500).json({
                        status:false,
                        message: err.message
                    })
                }
    
                
                // if(!req.file) {
                //     res.locals.filename = undefined
                // } else {
                //     res.locals.filename = req.file.filename
                // }
    
               return  next()
    
            })
        }
    }

    export default uploadMiddleware