import mysql from 'mysql2/promise';
import fs from 'fs';
import { initializeDatabase } from './utilities/databaseExecutor.js';
import { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from '$env/static/private';

export async function handle({ event, resolve }) {
    initializeDatabase();
    return resolve(event);
    // const cookies = parse(event.request.headers.get('cookie') || '');
    // event.locals.session = cookies.session || null;

    // const response = await resolve(event);

    // // Example: setting a cookie on login
    // if (event.url.pathname === '/login-success') {
    //     response.headers.append('set-cookie', serialize('session', 'your-session-token', {
    //         path: '/',
    //         httpOnly: true,
    //         sameSite: 'lax',
    //         secure: true,
    //         maxAge: 60 * 60 * 24  // 1 day
    //     }));
    // }

    // return response;
}

export async function init() {
    // await db.connect();
}
