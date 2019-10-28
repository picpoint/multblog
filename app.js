const express = require('express');
const app = express();
const port = process.env.port || 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = express.json();
const urlMongoDB = 'mongodb+srv://rmtar:rmtar@cluster0-nw44p.mongodb.net/multfilmdb?retryWrites=true&w=majority';
const Multfilm = require('./schems/multfilmSchema.js');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));



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


app.get('/records', (req, res) => {
  res.sendFile(__dirname + '/public/records.html');
    
  Multfilm.find({}, (err, docs) => {
    mongoose.disconnect();
    if(err) {
      throw new Error('Err to find records');
    } else {
      for(let i = 0; i < docs.length; i++) {
        console.log(docs[i]);
      }
    }
    
  });
  9
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
    mongoose.disconnect();
		if(err) {
			throw new Error('***ERR TO SAVE OBJ***');
		} else {
			console.log(`save successfully`);
		}
  });

  res.redirect('/');

});

