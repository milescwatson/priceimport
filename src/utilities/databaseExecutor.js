import fs from 'fs';
import mysql from 'mysql2/promise';
import { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from '$env/static/private';

let pool;

const initializeDatabase = async function () {
    pool = mysql.createPool({
        timezone: 'Z',
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        connectionLimit: 50,
        ssl: {
            ca: fs.readFileSync('./ca-certificate.crt', 'utf8'),
            rejectUnauthorized: true
        }
    })
    return true;
};

async function executeCallableStatement(query) {
    const [rows, fields] = await pool.execute(query.sql, query?.values);
    return rows;
}

async function shutdownDatabaseConnection() {
    if (pool) {
        await pool.end();
        pool = null;
    }
}

export { initializeDatabase, executeCallableStatement, shutdownDatabaseConnection };