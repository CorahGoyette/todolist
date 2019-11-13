const express = require('express');
const router = express.Router();
const userServices = require('../services/userServices');

module.exports = () => {

    // Create route to login user
    router.post('/login', async (req, res) => {
        try {
            console.log("Logging in user");
            let results = await userServices.login(req.body);
            
            res.status(200).send(results);

        } catch (err) {
            res.status(401).send({ 'message': 'Error logging in: ' + err.message });
        }
    });  

    // Create route to register user
    router.post('/register', async (req, res) => {
        try {
            console.log("Registering user");
            await userServices.register(req.body);
            
            res.status(200).send({ 'message': 'User registered'});

        } catch (err) {
            res.status(401).send({ 'message': 'Error registering: ' + err.message });
        }
    });

    return router;
}