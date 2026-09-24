import mysql from "mysql2/promise";
import getConnection from "config/database";

const handleCreateUserService = async ( fullName: string, email: string, address: string) => {
    const connection = await getConnection();
    try {
        const sql = 'INSERT INTO `users`(`name`, `email`, `address`) VALUES (?, ?, ?)';
        const values = [fullName, email, address];
        const [result] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        return [];
    }
}

const getAllUsersService = async () => {
    const connection = await getConnection();
    try {
        const [results] = await connection.query(
            'SELECT * FROM `users`'
        );
        return results
    } catch (err) {
        return [];
    }
}

const handleDeleteUserService = async (id: string) => {
    try {
        const connection = await getConnection();
        const sql = 'DELETE FROM `users` WHERE `id` = ? LIMIT 1';
        const values = [id];

        const [result] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        return [];
    }
}

export { handleCreateUserService, getAllUsersService, handleDeleteUserService };