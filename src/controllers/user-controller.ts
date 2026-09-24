import {Request, Response} from 'express';
import {
    handleCreateUserService,
    getAllUsersService,
    handleDeleteUserService,
    getUserByIdService, handleUpdateUserService
} from "services/user-service";
import getConnection from "config/database";

const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsersService();
    return res.render("home", {
        users: users
    });
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render("create-user");
}

const postCreateUser = async (req: Request, res: Response) => {
    const {name, email, address} = req.body;
    await handleCreateUserService(name, email, address);
    return res.redirect("/");
}

const postDeleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const {id} = req.params;
    await handleDeleteUserService(id);
    return res.redirect("/");
}

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    const {id} = req.params;
    const user = await getUserByIdService(id);
    return res.render("view-detail-user", {
        id : id,
        user: user
    })
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, name, email, address } = req.body;
    await handleUpdateUserService( id, name, email, address );
    return res.redirect("/");
}

export {getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getUserById, postUpdateUser};