import {prisma} from "config/client";
import {ACCOUNT_TYPE} from "config/constant";
import bcrypt from "bcrypt";

const handleCreateUserService = async (name: string, email: string, address: string, phone: string, avatar: string | null, roleId: number) => {
    const hashedPassword = await bcrypt.hash("123456", 10);
    const newUser = await prisma.user.create({
        data: {
            fullName: name,
            username: email,
            address: address,
            phone: phone,
            accountType: ACCOUNT_TYPE.SYSTEM,
            role: {
                connect: {id: roleId}
            },
            avatar: avatar,
            password: hashedPassword,
        }
    });
    return newUser;
}

const getAllRolesService = async () => {
    return prisma.role.findMany({
        orderBy: {name: "asc"}
    });
}

const getAllUsersService = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const handleDeleteUserService = async (id: string) => {
    const deleteUser = await prisma.user.delete({
        where: {
            id: +id
        }
    });
    return deleteUser;
}

const getUserByIdService = async (id: string) => {
    const getUser = await prisma.user.findUnique({
        where: {
            id: +id
        }
    });
    return getUser;
}

const handleUpdateUserService = async (id: number, fullName: string, username: string, phone: string, roleId: number, avatar: string | undefined, address: string) => {
    const updateUser = await prisma.user.update({
        where: {
            id: +id
        },
        data: {
            fullName: fullName,
            username: username,
            phone: phone,
            roleId: roleId,
            ...(avatar !== undefined && { avatar }),
            address: address
        }
    });
    return updateUser;
}

export {
    handleCreateUserService,
    getAllRolesService,
    getAllUsersService,
    handleDeleteUserService,
    getUserByIdService,
    handleUpdateUserService
};
