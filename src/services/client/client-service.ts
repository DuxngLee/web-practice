import {prisma} from "config/client";

const getAllProductsService = () => prisma.product.findMany({
    orderBy: {id: "asc"}
});

const getProductDetailService = (id: number) => prisma.product.findUnique({
    where: {id}
});

const getRelatedProductsService = (id: number, factory?: string | null) => prisma.product.findMany({
    where: {
        id: {not: id},
        ...(factory ? {factory} : {})
    },
    orderBy: {id: "desc"},
    take: 4
});

export {getAllProductsService, getProductDetailService, getRelatedProductsService};
