import express, {Express} from 'express';
import {
    getCreateUserPage,
    getHomePage,
    getUserById,
    postCreateUser,
    postDeleteUser,
    postUpdateUser
} from "controllers/user-controller";
const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);
    router.get('/create-user', getCreateUserPage);
    router.get('/get-user-by-id/:id', getUserById);
    router.post('/handle-create-user', postCreateUser);
    router.post('/post-delete-user/:id', postDeleteUser);
    router.post('/handle-update-user', postUpdateUser);

    app.use('/', router);
};

export default webRoutes;

