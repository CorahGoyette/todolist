const bcrypt = require('bcrypt');
const db = require('../db'); 

//=============================================================================
// This user service will allow users to login
//=============================================================================
async function login(body) {
    let results = null;
    let email = body.email.trim().toLowerCase();
    let password =  body.password.trim();

    const userQuery = `
      SELECT * FROM users
      WHERE users.email = $1
      LIMIT 1
    `;

    const userInfo = await db.query(userQuery, [email]);
    const response = userInfo.rows[0];

    if (response !== undefined && bcrypt.compareSync(password, response.password)) {
        results = {
            userId: response.id, 

        // hard coded authorization - in real life, would use Java Web Token(JWT) to generate token
            authorization: '1392891324890128938129839182hjjhdsjdj0'
        }
    } else {
        throw new Error ("Invalid email or password");
    }

    return results;
}

//=============================================================================
// This user service will allow users to register
//=============================================================================
async function register(body) {
    let email = body.email.trim().toLowerCase();
    let password =  body.password.trim();

    const userQuery = `
      SELECT * FROM users
      WHERE users.email = $1
      LIMIT 1
    `;

    const userInfo = await db.query(userQuery, [email]);
    if (userInfo.rows.length > 0) {
        throw new Error ("Email is already registered");
    } else {
        // hash password for security
        const hashedPassword = bcrypt.hashSync(password,10);

        const insertQuery = `
            INSERT INTO users (email, password)
            VALUES ($1, $2)
        `;
        await db.query(insertQuery, [email, hashedPassword])
    }
}

module.exports = {
    login,
    register
}

