// get user by id
import {Response} from "express";
import userModel from "../models/user-model";

export const getUserbyId = async (id: string, res: Response) => {
    const  user = await userModel.findById(id);
    res.status(200).json({
        success: true,
        user
    })
}