require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');

const app = express();
app.use(cors());
app.use(express.json());


const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

const FANDOM_API = 'https://lol.fandom.com/api.php';


async function loginToFandom() {
    try {
        console.log("Attempting to log into Leaguepedia...");

        const tokenRes = await client.get(FANDOM_API, {
            params: { action: 'query', meta: 'tokens', type: 'login', format: 'json' }
        });
        const loginToken = tokenRes.data.query.tokens.logintoken;

     
        const loginData = new URLSearchParams({
            action: 'login',
            lgname: process.env.FANDOM_USERNAME,
            lgpassword: process.env.FANDOM_PASSWORD,
            lgtoken: loginToken,
            format: 'json'
        });

        const loginRes = await client.post(FANDOM_API, loginData);

        if (loginRes.data.login && loginRes.data.login.result === 'Success') {
            console.log(" Successfully logged into Leaguepedia with Bot limits!");
        } else {
            console.error(" Login failed:", loginRes.data);
        }
    } catch (error) {
        console.error(" Login error:", error.message);
    }
}

loginToFandom();


app.get('/api/cargo', async (req, res) => {
    try {
       
        const response = await client.get(FANDOM_API, {
            params: {
                action: 'cargoquery',
                format: 'json',
                ...req.query 
            }
        });

        
        res.json(response.data);
    } catch (error) {
        console.error("Proxy Error:", error.message);
        res.status(500).json({ error: "Failed to fetch from Fandom" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Proxy server running on http://localhost:${PORT}`);
});