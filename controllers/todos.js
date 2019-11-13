const express = require('express');
const router = express.Router();
const db = require('../db');

module.exports = () => {

    // Create route to return to dos for the currrent user
    router.get('/', async (req, res) => {
        try {
            console.log("Getting todos");

            // Setup base query
            let query = 'SELECT * FROM todos WHERE user_id=$1';
            let params = [req.headers.userid];

            // Did user specify a category
            let category = req.query.category;
            let status = req.query.status;

            if ((category != null && category.length > 0) && (status != null & status.length > 0)) {
                query = query + ' AND category=$2 AND status=$3';
                params.push(category);
                params.push(status);
            } else if (category != null && category.length > 0) {
                query = query + ' AND category=$2';
                params.push(category);
            } else if (status != null && status.length > 0) {
                query = query + ' AND status=$2';
                params.push(status);
            }          

            // Query for all matching TODOs for this user and optional category
            let resultSet = await db.query(query, params);

            res.status(200).send(resultSet.rows);

        } catch (err) {
            res.status(500).send({ 'message': 'Error creating tables: ' + err.message });
        }
    });  
    

    // Create a new todo
    router.post('/', async (req, res) => {
        try {
            console.log("Adding todos");

            const insertString = `
                INSERT INTO todos (user_id, title, description, status, due_date, category)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id
            `;

            //for each to do -> we have a userID, title, description, status, duedate and category
            let insertParameters = [
                req.headers.userid, 
                req.body.title, 
                req.body.description, 
                req.body.status, 
                req.body.dueDate,
                req.body.category
            ];

            // Insert To do
            resultSet = await db.query(insertString, insertParameters);
            data = resultSet.rows[0];

            console.log("To do added");

            res.status(200).send({ 'message': 'To Do Added' });

        } catch (err) {
            res.status(500).send({ 'message': 'Error creating to do: ' + err.message });
        }
    });   
    

    // Update the status of a to do
    router.put('/:id', async (req, res) => {
        try {
            console.log("Updating status of to do");

            const insertString = `UPDATE todos SET status=$2 WHERE id=$1`;

            // Insert new status in To do list
            await db.query(insertString, [req.params.id, req.body.status]);

            console.log("To do updated");

            res.status(200).send({ 'message': 'To Do Updated' });

        } catch (err) {
            res.status(500).send({ 'message': 'Error updating to do: ' + err.message });
        }
    });


    // Delete a to do 
    router.delete('/:id', async (req, res) => {
        try {
            console.log("Deleting to do");

            const insertString = `DELETE FROM todos WHERE id=$1`;

            // Deleted to do
            await db.query(insertString, [req.params.id]);

            console.log("To Do deleted");

            res.status(200).send({ 'message': 'To Do Deleted' });

        } catch (err) {
            res.status(500).send({ 'message': 'Error deleting To Do: ' + err.message });
        }
    })

    return router;
}