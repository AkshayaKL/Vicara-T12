const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('./routes/authentication');
const cors = require('cors')
const config = require('config');
const debug = require('debug')('app:startup');
const welcomePage = require('./routes/welcomePage');
const users = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors())

app.use(helmet());
app.use('/', welcomePage);
app.use('/api/users', users);
app.use('/api/auth',auth);

// Db settings.
const mongoose = require('mongoose');
// To get rid of deprecation warning
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/userAuthenticate', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to Mongodb!') )
    .catch(err => console.error('Could not connect to Mongodb!', err));

// Setting the html using pug 
app.set('view engine', 'pug');
app.set('views','./views');

//Config check for pvt key 
if(!config.get('jwtPrivateKey')){
    console.error(' jwtPrivateKey is not defined.')
    process.exit(1);
}

// To logg our requests on console. Change during production. Not needed
if( app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled')
}

//Define env var for PORT or run default on 3000.
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(` Listening on port ${port} `);
});
