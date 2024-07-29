import express from 'express';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//Enables passing data to node
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//Static files
app.use(express.static('public'));

app.get('/', (request, response)=>
{
    response.setHeader('Content-Type', 'text/html');
    response.send("Hello world!");
});

app.listen(3000, ()=>
{
    console.log("server is running...");
});
