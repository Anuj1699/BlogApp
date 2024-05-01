import pg from "pg";

const {Pool} = pg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "users",
    password: "12345",
    port: 5432,
})

pool.connect();

export default pool;