import mysql from "mysql2/promise";
import getConnection from "config/database";
import {prisma} from "config/client";
import {ACCOUNT_TYPE} from "config/constant";
import bcrypt from "bcrypt";

const handleCreateUserService = async ( name: string, email: string, address: string, phone: string, avatar: string | null ) => {
    const hashedPassword = await bcrypt.hash("123456", 10);
    const newUser = await prisma.user.create({
        data: {
            fullName: name,
            username: email,
            address: address,
            phone: phone,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            password: hashedPassword,
        }
    });
    return newUser;
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

const handleUpdateUserService = async (id: string, name: string, email: string, address: string) => {
    const updateUser = await prisma.user.update({
        where: {
            id: +id
        },
        data: {
            fullName: name,
            username: email,
            address: address
        }
    });
    return updateUser;
}

export {
    handleCreateUserService,
    getAllUsersService,
    handleDeleteUserService,
    getUserByIdService,
    handleUpdateUserService
};
