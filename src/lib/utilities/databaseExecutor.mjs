import fs from 'fs';
import mysql from 'mysql2/promise';

import { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from '$env/static/private';

let pool;
const certificate = `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUcfxNlR0oEtVo2CFL+xFZJyMHuJ4wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvOWNmOWJkNTUtMzQ3Yy00NGFlLTkwZWItZmQ1NTQ5NmJj
YzRhIFByb2plY3QgQ0EwHhcNMjQxMDE0MjAwNzU5WhcNMzQxMDEyMjAwNzU5WjA6
MTgwNgYDVQQDDC85Y2Y5YmQ1NS0zNDdjLTQ0YWUtOTBlYi1mZDU1NDk2YmNjNGEg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAL6v2xro
xixMrwQdFa02CFw6znqELtlrrFRbUh0FoLaNh/11bE81e8XICeB3Nc1TjB+5U4oU
1H67idTgbEbJEl1eabCc1pKxt0vjW8ctwwlTqlVoEhvR3Y0znS74XD2yFygEoveW
YIe7MxCo2XzBP3P+vESS4MUYAZF6YWDV1XY5Ak1Rf+UD+GWf6+6mYzIcSI83QPl4
P+LHqmoOr5D3P/N1cwB1MWV9mEc3IHoRmfNl7W+1GgWZLuNqChT1Os4Noten8ygw
/1j6ItFn735weOoJggwGCYPpKCUIZR1/C8eEdF1W61G+U+kAmw3tJ3WbTarFG2Sv
AK8iIcizkVqJu6rl0FTTrtqKGeTgSQ0t6SD2UAbr7nvTs8nbkBWNWFXtACRwXvXD
+6n4O/Kp9cB2M3sjEuRra1y+BjMx0M/Wa4PF+Uyi4b3qfPUrit2szaB0yVymOlKu
KiF8HWtFfvYFDAyuW5eSuKxpRYe5bWo2S9lu9vECTfOL1aypSInzoNRA1wIDAQAB
oz8wPTAdBgNVHQ4EFgQUWCe1Esp1PL5h/4QL9Wdz1hNG/lQwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAKivvhkrrCH0R8uX
QxlXj+mKF9TnwAAaqVJLzKFXVwKU4Kx1nHCx4/ThU7zFe9FyTThuOA80CeYfLoyz
QwWkBZ0gE5/B6N739vgzYD64S0TMn3+2BqhD62x9epg290LEpLLoDb6gp5tRWrIL
rapVbBR0qD3xI0TL7Sl68NWGy/ltCLtjfuUT1tXST9aOXa5gYC+ONsFf3cmL6wqw
Icc6Rv0sN1jMt8xidQk/zWuBUD8iaWalnvZ/vLd3XLXMUPgNXxLVd8fOed7vmd79
mFEfeeyKduUE0PcZGECbM2YkhUx5WOJNI3IqnunI586xOHIJC1or4OFJdGOxKvt6
VCvkdG9vajQtE3rPPmn8G7UYMjnANQiWrdGRPOYcFDNQp+acAR8MtIPRoG/pqnyD
PFkuiFn+Eyl1eBGkUmcO8ljOMI9R3P9S6xo77IC36gfLEd0m29wm5q4FMq+uXQpe
z7HoSVobjwylUOiWgZM9IsEHXjuFQvcqnoVpvXnz8F45JAGSrA==
-----END CERTIFICATE-----
`;

const initializeDatabase = async function () {
    pool = mysql.createPool({
        timezone: 'Z',
        host: MYSQL_HOST,
        user: MYSQL_USER,
        database: MYSQL_DATABASE,
        password: MYSQL_PASSWORD,
        port: MYSQL_PORT,
        connectionLimit: 50,
        ssl: {
            ca: certificate,
            rejectUnauthorized: true
        }
    })

    return true;
};


/**
 * Executes a SQL query against the MySQL database
 * @param {Object} params - The parameters object
 * @param {string} params.sql - The SQL query string with placeholders (?)
 * @param {Array<any>} params.values - Array of values to substitute into SQL placeholders
 * @returns {Promise<Array<Object>>} Promise that resolves to an array of result rows
 */
async function execute({sql, values}) {
    if( !pool ) {
        await initializeDatabase();
    }
    values = values.map((item) => {
        if (item === undefined) {
            return null;
        }
        return item;
    });
    const [rows, fields] = await pool.execute(sql, values);
    return rows;
}

async function shutdownDatabaseConnection() {
    if (pool) {
        await pool.end();
        pool = null;
    }
    return
}

export { execute };