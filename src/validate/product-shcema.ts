import {z} from "zod";
import {
    PRODUCT_FACTORY_OPTIONS,
    PRODUCT_TARGET_OPTIONS,
    ProductFactory,
    ProductTarget
} from "config/constant";

const productFactories = Object.keys(PRODUCT_FACTORY_OPTIONS) as [ProductFactory, ...ProductFactory[]];
const productTargets = Object.keys(PRODUCT_TARGET_OPTIONS) as [ProductTarget, ...ProductTarget[]];
const DATABASE_INT_MAX = 2_147_483_647;
const DATABASE_VARCHAR_MAX = 255;
const DATABASE_MEDIUMTEXT_MAX = 16_777_215;

const requiredText = (fieldName: string) =>
    z.string({required_error: `${fieldName} is required`})
        .trim()
        .min(1, `${fieldName} is required`)
        .max(DATABASE_VARCHAR_MAX, `${fieldName} must be at most ${DATABASE_VARCHAR_MAX} characters`);

const requiredLongText = (fieldName: string) =>
    z.string({required_error: `${fieldName} is required`})
        .trim()
        .min(1, `${fieldName} is required`)
        .max(DATABASE_MEDIUMTEXT_MAX, `${fieldName} is too long`);

const requiredDatabaseInt = (fieldName: string, minimum: number) =>
    z.preprocess(value => value === "" ? undefined : Number(value), z.number({
        required_error: `${fieldName} is required`,
        invalid_type_error: `${fieldName} must be a number`
    })
        .finite(`${fieldName} must be a finite number`)
        .int(`${fieldName} must be an integer`)
        .min(minimum, `${fieldName} must be at least ${minimum}`)
        .max(DATABASE_INT_MAX, `${fieldName} cannot exceed ${DATABASE_INT_MAX.toLocaleString("en-US")}`));

export const productSchema = z.object({
    name: requiredText("Name"),
    price: requiredDatabaseInt("Price", 1),
    detailDesc: requiredLongText("Detail description"),
    shortDesc: requiredText("Short description"),
    quantity: requiredDatabaseInt("Quantity", 0),
    factory: z.enum(productFactories, {
        errorMap: () => ({message: "Please choose a valid factory"})
    }),
    target: z.enum(productTargets, {
        errorMap: () => ({message: "Please choose a valid target"})
    })
});

export type TProductSchema = z.infer<typeof productSchema>;
export type TProductFormData = Record<keyof z.input<typeof productSchema>, string>;
