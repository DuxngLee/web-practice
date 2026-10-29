import {prisma} from "config/client";
import {TProductSchema} from "../../validate/product-shcema";

const getAllProductsService = () => prisma.product.findMany({
    orderBy: {id: "asc"}
});

const handleCreateProductService = (product: TProductSchema, image: string | null) => {
    const newProduct = prisma.product.create({
        data: {
            name: product.name,
            price: product.price!,
            detailDesc: product.detailDesc,
            shortDesc: product.shortDesc,
            quantity: product.quantity!,
            factory: product.factory,
            target: product.target,
            ...(image !== null && {image})
        }
    });
    return newProduct;
};

const hamdleDetailProuctByIdService = (id: number) => {
    const getProduct = prisma.product.findUnique({
        where: {
            id: +id
        }
    });
    return getProduct;
}

const handleUpdateProductService = (id: number, product: TProductSchema, image: string | null) => {
    const updateProduct = prisma.product.update({
        where: {
            id: +id
        },
        data: {
            name: product.name,
            price: product.price!,
            detailDesc: product.detailDesc,
            shortDesc: product.shortDesc,
            quantity: product.quantity!,
            factory: product.factory,
            target: product.target,
            ...(image !== null && {image})
        }
    });
    return updateProduct;
}

const handleDeleteProductService = (id: number) => {
    const deleteProduct = prisma.product.delete({
        where: {
            id: +id
        }
    });
    return deleteProduct;
}

export {getAllProductsService, handleCreateProductService, hamdleDetailProuctByIdService, handleUpdateProductService, handleDeleteProductService};
