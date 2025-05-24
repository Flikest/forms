import { config }from "dotenv"
config()

export const postgresConnection = {
    type: 'postgres',
    host: "localhost",
    port: 5433,
    username: "swintus",
    password: "qwer1234",
    database: "y_forms",
}