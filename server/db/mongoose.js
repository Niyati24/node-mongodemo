const mongoose= require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodaApp');
mongoose.connect(process.env.MONGODB_URI);

module.exports ={mongoose};