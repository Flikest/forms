import { config }from "dotenv"
config()


export const postgresConnection = {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: String(process.env.PG_PASSWORD),
    database: process.env.PG_DB,
}