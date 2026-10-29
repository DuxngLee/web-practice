import {Request, Response} from 'express';
import {getAllProductsService, getProductDetailService, getRelatedProductsService} from "services/client/client-service";


const getClientPage = async (req: Request, res: Response) => {
    const products = await getAllProductsService();
    return res.render("client/product/homePage", {products});
};

const getDetailProductPage = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(404).send("Sản phẩm không tồn tại.");
    }

    const product = await getProductDetailService(id);
    if (!product) {
        return res.status(404).send("Sản phẩm không tồn tại.");
    }

    const relatedProducts = await getRelatedProductsService(id, product.factory);
    return res.render("client/product/detail-product", {product, relatedProducts});
};

export {getClientPage, getDetailProductPage};
