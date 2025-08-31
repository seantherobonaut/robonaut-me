//We probably don't need to explicitly import this unless it is needed
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from 'express';
import render from 'ejs'; //isn't always needed for basics

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware for processing incoming data (allows us to access request.body)    
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//Middleware for Static files
app.use(express.static('public'));

//Templating Engine
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views/');

app.get('/', (request, response)=>
{
    response.setHeader('Content-Type', 'text/html');

    let title = 'Home';

    response.render('index', {title});
});

app.get('/page/:id', (request, response)=>
{
    response.setHeader('Content-Type', 'text/html');

    //grab the "page"
    let title = request.params.id;
    title = title.toLocaleLowerCase();
    console.log(title);

    //fake database
    let pages = ['home', 'about'];
    let result = pages.includes(title);

    console.log("result: "+result);

    if(result)
    {
        if(result == "home")
            res.redirect('/');
        else
            response.render('index', {title});
    }
    else
    {
        response.status(404).render('404', {title:'Not Found'});
    }
});

app.use((request, response)=>
{
    response.status(404).render('404', {title:'Not Found'});
});

app.listen(PORT, ()=>
{
    console.log(`Server is running on port ${PORT}...`);
});
