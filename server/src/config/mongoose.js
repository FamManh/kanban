const mongoose = require('mongoose');
const {mongo, env} = require('./vars');
const logger = require('./logger')

// set mongoose Promise to bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', err => {
    logger.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
})

// print mongoose logs in dev env
if(env === 'development'){
    mongoose.set('debug', true);
}


exports.connect = ()=>{
    mongoose.connect(mongo.uri, {
        useCreateIndex: true,
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(()=> console.log('MongoDB connected ...'));
    return mongoose.connection;
}
