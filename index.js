import express from 'express';
import expressLayout from 'express-ejs-layouts';

//We probably don't need to explicitly import this unless it is needed
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
const PORT = 3000 || process.env.PORT;

//Middleware for processing incoming data (allows us to access request.body)    
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//Middleware for Static files
app.use(express.static('public'));

//Templating Engine
// app.use(expressLayout); //something is wrong with this line
// app.set('layout', './views/layouts/main');
app.set('view engine', 'ejs');

app.get('/', (request, response)=>
{
    response.setHeader('Content-Type', 'text/html');
    let title = "Home";

    response.render("index", {
        title
    });
});

app.listen(PORT, ()=>
{
    console.log(`Server is running on port ${PORT}...`);
    console.log(new Date().getFullYear());
});
