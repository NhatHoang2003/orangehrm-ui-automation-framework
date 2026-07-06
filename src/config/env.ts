import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), '.env')
});

export const ENV = {
    BASE_URL: process.env.BASE_URL ?? '',
    ADMIN_USERNAME: process.env.ADMIN_USERNAME ?? '',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? '',

    APP_TIMEOUT: Number(process.env.APP_TIMEOUT ?? 60000),
    APP_TIMEOUT_ACTION: Number(process.env.APP_TIMEOUT_ACTION ?? 15000),
    APP_TIMEOUT_NAVIGATE: Number(process.env.APP_TIMEOUT_NAVIGATE ?? 30000),
    APP_TIMEOUT_EXPECTED: Number(process.env.APP_TIMEOUT_EXPECTED ?? 15000)
};

if (!ENV.BASE_URL) {
    throw new Error('BASE_URL is missing. Please check your .env file.');
}