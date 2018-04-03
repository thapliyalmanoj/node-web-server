//configure various routes 
//thing link route of the website
//pages
//start a server binding a port on machine
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
//setup a http request handler
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine', 'hbs');



app.use((req, res, next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log', log + '\n', (err) => {
	if(err){
		console.log('Unable to append server.log');
	}
} );
next();
});

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
return new Date().getFullYear() 
});

hbs.registerHelper('screamIt', (text) => {
return text.toUpperCase() 
});


app.get('/', (req, res) => {
//res.send('Hello Express');
// res.send({name:'manoj',likes:['city','bikes']});

res.render('home.hbs',{
	welcomeMessage: 'Welcome',
	pageTitle: 'home page',
	// currentYear: new Date().getFullYear()
});

});

app.get('/about', (req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About page',
		// currentYear: new Date().getFullYear()
	});

});

//bind application on port in  machine
app.listen(port,()=>{
	console.log(`Server is up on port ${port}`);
});