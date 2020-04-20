require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    port = process.argv[2] || process.env.PORT,
    objectRouter = require('./Routes/objects');;

app.use(bodyParser.json());
app.use('/', objectRouter);

mongoose.connect(process.env.CONNECTION_STRING, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false  
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(err.message);
});;
 
app.listen(port);