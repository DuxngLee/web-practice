import mysql from "mysql2/promise";
import getConnection from "../config/database";

const handleCreateUserService = ( fullName: string, email: string, address: string) => {
    console.log("ok");
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
export { handleCreateUserService, getAllUsersService };