import {Request, Response} from 'express';
import {handleCreateUserService, getAllUsersService} from "../services/user-service";

const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsersService();
    return res.render("home",{
        users: users});
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render("create-user");
}

const postCreateUser = (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    handleCreateUserService(fullName, email, password);
    return res.redirect("/");
}

export {getHomePage, getCreateUserPage, postCreateUser};