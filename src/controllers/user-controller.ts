import {Request, Response} from 'express';
import {handleCreateUserService} from "../services/user-service";

const getHomePage = (req: Request, res: Response) => {
    return res.render("home");
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