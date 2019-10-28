const mongoose = require('mongoose');
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

module.exports = Multfilm;