// src/usingDB/models/index.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


//calling the database

/**
 * DB Query
 * @param {object} req
 * @param {object} res
 * @returns {object} object 
 */
function query(text, params) {
    return new Promise((resolve, reject) => {
        pool.query(text, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}


//=============================================================================
// This DB admin utility will create all the tables for the todo app
//=============================================================================
async function createTables() {
    const usersCreateQuery =
        `CREATE TABLE IF NOT EXISTS
        users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(128) NOT NULL,
            password VARCHAR(128) NOT NULL
        )`;

    await this.query(usersCreateQuery);

    const todosCreateQuery =
        `CREATE TABLE IF NOT EXISTS
        todos(
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            title VARCHAR(128) NOT NULL,
            description VARCHAR(256),
            status VARCHAR(32) NOT NULL,
            due_date DATE,
            category VARCHAR(128)
        )`;

    await this.query(todosCreateQuery);
}


//=============================================================================
// This DB admin utility will drop all the tables for the todo app
//=============================================================================
async function dropTables() {
    await this.query('DROP TABLE todos');
    await this.query('DROP TABLE users');
}

module.exports = {
    query,
    createTables,
    dropTables
}