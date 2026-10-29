import express, {Express} from 'express';
import {
    getAdminUserPage,
    getCreateUserPage,
    getUserById,
    postCreateUser,
    postDeleteUser,
    postUpdateUser
} from "controllers/admin/user-controller";
import {
    getAdminPage,
    getAdminProductPage,
    getCreateProductPage,
    getProductById,
    postCreateProduct, postDeleteProduct, postUpdateProduct
} from "controllers/admin/product-admin-controller";
import fileUploadMiddleware from "../middleware/multer";
import {getClientPage, getDetailProductPage} from "controllers/client/client-controller";
const router = express.Router();

const webRoutes = (app: Express) => {
    // client route
    router.get('/',getClientPage);
    router.get('/product/:id', getDetailProductPage);

    //admin product
    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/create-product', getCreateProductPage);
    router.post('/admin/handle-create-product', fileUploadMiddleware('image', 'images/image-product'), postCreateProduct);
    router.get('/admin/view-product/:id', getProductById);
    router.post('/admin/handle-update-product', fileUploadMiddleware('image', 'images/image-product'), postUpdateProduct);
    router.post('/admin/delete-product/:id', postDeleteProduct);

    //admin route
    router.get('/admin', getAdminPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user', getCreateUserPage);
    router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postCreateUser);
    router.get('/admin/view-user/:id', getUserById);
    router.post('/admin/handle-update-user', fileUploadMiddleware('avatar'), postUpdateUser);
    router.post('/admin/delete-user/:id', postDeleteUser);

    app.use('/', router);
};

export default webRoutes;
