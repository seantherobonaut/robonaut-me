import express from 'express';

const app = express();
const PORT = process.env.PORT || 3010;

//Middleware for processing incoming data (allows us to access request.body)    
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//Middleware for Static files
app.use(express.static('public'));

//Templating Engine
app.set('view engine', 'ejs');
app.set('views', './views/');

//Home page
app.get('/', (request, response)=>
{
    let page = 'home';
    console.log(`Accessing route: /${page}`);

    response.render('index', {page});
});

//Content pages
app.get('/page/:id', (request, response, next)=>
{
    let url = request.protocol+'://'+request.get('host');

    //Grab the "page"
    let page = request.params.id;
    page = page.toLocaleLowerCase();
    console.log(`Accessing route: /${page}`);

    //Fake database lookup
    let pages = ['home', 'about'];
    let result = pages.includes(page);

    //Check if page exists otherwise return 404
    if(result)
    {
        //Redirect to home if some joker puts in /page/home
        if(page == "home")                    
            response.redirect('/');
        else
            response.render('index', {page, url});
    }
    else
        next(); //404 response
});

//404 Page
app.use((request, response)=>
{
    response.status(404).render('404', {title:'Not Found', page:'404'});
});

//Start the server
app.listen(PORT, ()=>
{
    console.log(`Server is running on port ${PORT}...`);
});
