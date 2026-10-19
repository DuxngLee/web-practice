import express, {Express} from 'express';
import {
    getAdminUserPage,
    getCreateUserPage,
    getUserById,
    postCreateUser,
    postDeleteUser,
    postUpdateUser
} from "controllers/user-controller";
import {getAdminPage} from "controllers/admin/admin-controller";
import fileUploadMiddleware from "../middleware/multer";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', (req, res) => res.redirect('/admin'));

    //admin route
    router.get('/admin', getAdminPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user', getCreateUserPage);
    router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postCreateUser);
    router.get('/admin/view-user/:id', getUserById);
    router.post('/admin/handle-update-user', postUpdateUser);
    router.post('/admin/delete-user/:id', postDeleteUser);

    app.use('/', router);
};

export default webRoutes;
