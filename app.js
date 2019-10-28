const express = require('express');
const app = express();
const port = process.env.port || 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = express.json();
const urlMongoDB = 'mongodb+srv://rmtar:rmtar@cluster0-nw44p.mongodb.net/multfilmdb?retryWrites=true&w=majority';

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));


const multfilmSchema = mongoose.Schema({
	//_id: mongoose.Schema.Types.ObjectId,
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



mongoose.connect(urlMongoDB, {useNewUrlParser: true}, (err) => {
	if(err) {
		throw new Error('***ERR TO CONNECT DB***');
	}	else {
		console.log('connect successfully');		
	}

	app.listen(port, () => {
		console.log(`---server start on port ${port}---`);
	});

});



app.get('/about', (req, res) => {
	res.sendFile(__dirname + '/public/about.html');
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');	
});

app.post('/', (req, res) => {

  const newmultobj = new Multfilm({
		title: req.body.titlemultfilm,
		yearsOfIssue: req.body.dateofissue,
		duration: req.body.duration,
		source: req.body.source
	});

	newmultobj.save((err) => {
		if(err) {
			throw new Error('***ERR TO SAVE OBJ***');
		} else {
			console.log(`save successfully`);
		}
  });
  

  res.redirect('/');

});

