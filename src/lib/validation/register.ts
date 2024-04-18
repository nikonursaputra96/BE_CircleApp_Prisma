import joi from "joi";
import { IRegister } from "../../type/app";

export const registerValidation = joi.object<IRegister>({
    username: joi.string().required(),
    email: joi.string().email().required(),
    fullname: joi.string().required(),
    password: joi.string().required()
})