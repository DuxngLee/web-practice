export const ACCOUNT_TYPE = {
    SYSTEM: "SYSTEM",
    GOOGLE: "GOOGLE",
    GITHUB: "GITHUB",
};

export const PRODUCT_FACTORY_OPTIONS = {
    APPLE: "Apple (MacBook)",
    ASUS: "Asus",
    LENOVO: "Lenovo",
    DELL: "Dell",
    LG: "LG",
    ACER: "Acer"
} as const;

export const PRODUCT_TARGET_OPTIONS = {
    GAMING: "Gaming",
    "SINHVIEN-VANPHONG": "Sinh viên - Văn phòng",
    "THIET-KE-DO-HOA": "Thiết kế đồ họa",
    "MONG-NHE": "Mỏng nhẹ"
} as const;

export type ProductFactory = keyof typeof PRODUCT_FACTORY_OPTIONS;
export type ProductTarget = keyof typeof PRODUCT_TARGET_OPTIONS;
