const express = require('express');
const router = express.Router();
const db = require('../db');

module.exports = () => {

// would not do this for the Web -> however, best solution for a small demo as it lets us demo through Postman to see all back end functionality

//=============================================================================
// Dropping tables in database
//=============================================================================
    router.get('/dropTables', async (req, res) => {
        try {
            console.log("Dropping tables");

            // Create the user table
            await db.dropTables();

            console.log("To do tables dropped");

            res.status(200).send({ 'message': 'Tables dropped' });

        } catch (err) {
            res.status(500).send({ 'message': 'Error creating tables: ' + err.message });
        }
    });    

//=============================================================================
// Creating tables in database
//=============================================================================
    router.get('/createTables', async (req, res) => {
        try {
            console.log("Creating tables");

            // Create the user table
            await db.createTables();

            console.log("Tables created");

            res.status(200).send({ 'message': 'Tables created' });

        } catch (err) {
            res.status(500).send({ 'message': 'Error creating tables: ' + err.message });
        }
    });

    return router;
}