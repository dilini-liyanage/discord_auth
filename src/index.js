require('dotenv').config();
const express = require('express');
const axios = require('axios');
const url = require('url');

const port = process.env.PORT || 1500;
const app = express();

const API_ENDPOINT = 'https://discord.com/api/v10';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:1500/api/auth/discord/redirect';

app.get('/api/auth/discord/redirect', async (req, res) => {
    const {code} = req.query;

    if(code){
        const formData = new url.URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        });

        console.log(`Code: ${code}`);
        console.log(`Redirect URI: ${REDIRECT_URI}`);
        console.log(`Client ID: ${CLIENT_ID}`);
        console.log(`Client Secret: ${CLIENT_SECRET}`);

        try {
            const response = await axios.post(`${API_ENDPOINT}/oauth2/token`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const access_token = response.data.access_token;
            console.log(`Access Token: ${access_token}`);
            res.send(access_token);
        } catch (error) {
            console.error(`Error: ${error}`);
            res.status(500).send('Error getting access token');
        }
    } else {
        res.status(400).send('No code provided');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});