import {Request, Response} from 'express';

const getAdminPage = (req: Request, res: Response) => {
    return res.render("admin/dashboard");
};

export {getAdminPage};