import {Request, Response} from 'express';
import {productSchema, TProductFormData} from "../../validate/product-shcema";
import {
    getAllProductsService,
    hamdleDetailProuctByIdService,
    handleCreateProductService, handleDeleteProductService, handleUpdateProductService
} from "services/admin/product-service";
import {unlink} from "node:fs/promises";
import {PRODUCT_FACTORY_OPTIONS, PRODUCT_TARGET_OPTIONS} from "config/constant";

const productSelectOptions = {
    factoryOptions: Object.entries(PRODUCT_FACTORY_OPTIONS),
    targetOptions: Object.entries(PRODUCT_TARGET_OPTIONS)
};

const emptyProduct: TProductFormData = {
    name: "", price: "", detailDesc: "", shortDesc: "", quantity: "",
    factory: Object.keys(PRODUCT_FACTORY_OPTIONS)[0],
    target: Object.keys(PRODUCT_TARGET_OPTIONS)[0]
};

const getAdminPage = (req: Request, res: Response) => {
    return res.render("admin/dashboard/show");
};

const getCreateProductPage = (req: Request, res: Response) => {
    return res.render("admin/product/createProduct", {
        product: emptyProduct,
        errors: {},
        imageWasDiscarded: false,
        ...productSelectOptions
    });
};

const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getAllProductsService();
    return res.render("admin/product/showProduct", {products});
};

const postCreateProduct = async (req: Request, res: Response) => {
    const product = req.body as TProductFormData;
    const result = productSchema.safeParse(product);

    if (!result.success) {
        if (req.file?.path) {
            await unlink(req.file.path).catch(() => undefined);
        }
        return res.status(422).render("admin/product/createProduct", {
            product,
            errors: result.error.flatten().fieldErrors,
            imageWasDiscarded: Boolean(req.file),
            ...productSelectOptions
        });
    }

    await handleCreateProductService(result.data, req.file?.filename ?? null);
    return res.redirect("/admin/product");
};

const getProductById = async (req: Request<{ id: string }>, res: Response) => {
    const {id} = req.params;
    const product = await hamdleDetailProuctByIdService(Number(id));

    if (!product) {
        return res.status(404).send("Product not found");
    }

    return res.render("admin/product/detailProduct", {
        product,
        errors: {},
        imageWasDiscarded: false,
        ...productSelectOptions
    });
}

const postUpdateProduct = async (req: Request, res: Response) => {
    const {id} = req.body;
    const result = productSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(422).render("admin/product/detailProduct", {
            product: {...req.body, id: Number(id)},
            errors: result.error.flatten().fieldErrors,
            imageWasDiscarded: false,
            ...productSelectOptions
        });
    }

    await handleUpdateProductService(Number(id), result.data, req.file?.filename ?? null);
    return res.redirect("/admin/product");
}

const postDeleteProduct = async (req: Request<{ id: string }>, res: Response) => {
    const {id} = req.params;
    await handleDeleteProductService(Number(id));
    return res.redirect("/admin/product");
}

export {getAdminPage, getCreateProductPage, getAdminProductPage, postCreateProduct, getProductById, postUpdateProduct, postDeleteProduct};
