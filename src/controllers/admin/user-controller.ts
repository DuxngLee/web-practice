import {Request, Response} from 'express';
import {
    handleCreateUserService,
    getAllRolesService,
    getAllUsersService,
    handleDeleteUserService,
    getUserByIdService, handleUpdateUserService
} from "services/admin/user-service";
const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsersService();
    return res.render("admin/user/showUser", {
        users: users
    });
}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRolesService();
    return res.render("admin/user/createUser", {roles});
}

const postCreateUser = async (req: Request, res: Response) => {
    const {fullName, username, phone, roleId, address} = req.body;
    const file = req.file;
    const avatar = file?.filename ?? null;
    await handleCreateUserService(fullName, username, address, phone, avatar, Number(roleId));
    return res.redirect("/admin/user");
}

const postDeleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const {id} = req.params;
    await handleDeleteUserService(id);
    return res.redirect("/admin/user");
}

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    const {id} = req.params;
    const [user, roles] = await Promise.all([
        getUserByIdService(id),
        getAllRolesService()
    ]);

    return res.render("admin/user/detailUser", {
        user,
        roles
    })
}

const postUpdateUser = async (req: Request, res: Response) => {
    const {id, fullName, username, phone, roleId, address} = req.body;
    const file = req.file;
    const avatar = file?.filename;
    await handleUpdateUserService( Number(id), fullName, username, phone, Number(roleId), avatar, address );
    return res.redirect("/admin/user");
}

export {getAdminUserPage, getCreateUserPage, postCreateUser, postDeleteUser, getUserById, postUpdateUser};
