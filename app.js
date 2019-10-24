const express = require('express');
const app = express();
const port = process.env.port || 4000;
const mongoose = require('mongoose');
const urlMongoDB = 'mongodb+srv://rmtar:rmtar@cluster0-nw44p.mongodb.net/multfilmdb?retryWrites=true&w=majority';
let collection = null;

app.use(express.static('public'));


const multfilmSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	cover: Buffer,
	title: String,
	yearsOfIssue: Date,
	duration: String,
	source: String,
	created: {
		type: Date,
		default: Date.now
	}	
});

const Multfilm = mongoose.model('Multfilm', multfilmSchema);


let kolobok = new Multfilm({
	_id: new mongoose.Types.ObjectId(),
	title: 'Колобок',
	yearsOfIssue: '1974',
	duration: '35 мин'
});

kolobok.save((err) => {
	if(err) {
		throw new Error(`***ERR TO SAVE MULTFILM KOLOBOK***`);
	} else {
		console.log('KOLOBOK IS SAVE');
	}
});


let zibilPes = new Multfilm({
	_id: new mongoose.Types.ObjectId,
	title: 'Жил был пёс',
	yearsOfIssue: '1985',
	duration: '22 мин'
});

zibilPes.save((err) => {
	if(err) {
		throw new Error(`***ERR TO SAVE MULTFILM ZILBILPES***`);
	} else {
		console.log('ZILBILPES IS SAVED');
	}
});





mongoose.connect(urlMongoDB, {useNewUrlParser: true}, (err) => {
	if(err) {
		throw new Error('***ERR TO CONNECT DB***');
	}	else {
		console.log('connect successfully');
		
	}
});



app.get('/about', (req, res) => {
	res.sendFile(__dirname + '/public/about.html');
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');	
});


app.listen(port, () => {
	console.log(`---server start on port ${port}---`);
});