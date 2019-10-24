const express = require('express');
const app = express();
const port = process.env.port || 4000;
const urlMongoDB = 'mongodb+srv://rmtar:rmtar@usersdb-zepwb.mongodb.net/usersdb?retryWrites=true&w=majority';

app.use(express.static('public'));





app.get('/about', (req, res) => {
	res.sendFile(__dirname + '/public/about.html');
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');	
});


app.listen(port, () => {
	console.log(`---server start on port ${port}---`);
});