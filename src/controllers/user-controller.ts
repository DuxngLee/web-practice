import e, {Request, Response} from 'express';
import {
    handleCreateUserService,
    getAllUsersService,
    handleDeleteUserService,
    getUserByIdService, handleUpdateUserService
} from "services/user-service";
import {ACCOUNT_TYPE} from "config/constant";
const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsersService();
    return res.render("admin/user/showUser", {
        users: users
    });
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render("admin/user/createUser");
}

const postCreateUser = async (req: Request, res: Response) => {
    const {fullName, username, phone, role, address} = req.body;
    const file = req.file;
    const avatar = file.fieldname ?? null;
    await handleCreateUserService(fullName, username, address, phone, avatar);
    return res.redirect("/admin/user");
}

const postDeleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const {id} = req.params;
    await handleDeleteUserService(id);
    return res.redirect("/admin/user");
}

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    const {id} = req.params;
    const user = await getUserByIdService(id);
    return res.render("admin/user/detailUser", {
        id : id,
        user: user
    })
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, name, email, address } = req.body;
    await handleUpdateUserService( id, name, email, address );
    return res.redirect("/admin/user");
}

export {getAdminUserPage, getCreateUserPage, postCreateUser, postDeleteUser, getUserById, postUpdateUser};
