import "dotenv/config";
import { prisma } from "./client";

const roles = [
    {
        name: "ADMIN",
        description: "Quản trị viên hệ thống"
    },
    {
        name: "USER",
        description: "Người dùng hệ thống"
    }
];

const seedRoles = async () => {
    for (const role of roles) {
        const existingRole = await prisma.role.findFirst({
            where: { name: role.name }
        });

        if (existingRole) {
            await prisma.role.update({
                where: { id: existingRole.id },
                data: { description: role.description }
            });
        } else {
            await prisma.role.create({ data: role });
        }
    }
};

const main = async () => {
    await seedRoles();
    console.log("Seeded roles: ADMIN, USER");
};

main()
    .catch((error) => {
        console.error("Seed failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
