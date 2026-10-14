import mysql from "mysql2/promise";
import getConnection from "config/database";
import {prisma} from "config/client";

const handleCreateUserService = async ( name: string, address: string) => {
    const newUser = await prisma.user.create({
        data: {
            fullName: name,
            address: address
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

const handleUpdateUserService = async (id: string, name: string, address: string) => {
    const updateUser = await prisma.user.update({
        where: {
            id: +id
        },
        data: {
            fullName: name,
            address: address
        }
    });
    return updateUser;
}

export { handleCreateUserService, getAllUsersService, handleDeleteUserService, getUserByIdService, handleUpdateUserService };