require('dotenv').config();

const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')
    cookieParser = require('cookie-parser'),
    createError = require('http-errors'),
    app = express(),
    port = process.argv[2] || process.env.PORT,
    routerUser = require('./Routes/user'),
    routerObject = require('./Routes/object'),
    routerAtcionsObject = require('./Routes/object/actionsObject'),
    routerAdmin = require('./Routes/admin');

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/user', routerUser);
app.use('/', routerObject);
app.use('/object', routerAtcionsObject);
app.use('/admin/users', routerAdmin);

app.use((req, res, next) => next( createError(404) ));
app.use((error, req, res, next) => {
    console.log(error.status, error.message);
    res.status(error.status || 500)
    res.json({
      status: error.status,
      message: error.message,
    })
});
 
app.listen(port, async () => {
    console.log('Server start at port:', port);

    mongoose.connect(process.env.CONNECTION_STRING, { 
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,  
    })
    .then(() => {
        console.log('DB Connected!');
    })
    .catch(err => {
    console.log(err.message);
    });
});