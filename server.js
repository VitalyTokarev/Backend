require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let port = process.argv[2] || process.env.port;

app.use(bodyParser.json());

const users = [];
 
app.get("/Object",  (request, response) => {
    response.send(JSON.stringify(users));
});

app.post("/Object",  (request, response) => {
    if(!request.body) return response.sendStatus(400);
    users.push(request.body);
});

app.put("/Object",  (request, response) => {
    if(!request.body) return response.sendStatus(400);

    let editIndex = users.findIndex(m => m.id === request.body.id)

    if(editIndex!==-1) {
        users[editIndex].value = request.body.value;
        users[editIndex].type = request.body.type;
        users[editIndex].fruit = request.body.fruit;
    }
});

app.delete("/Object",  (request, response) => {
    if(!request.body) return response.sendStatus(400);

    let editIndex = users.findIndex(m => m.id === request.body.id)

    if(editIndex !==-1) {
        users.splice( editIndex, 1);
    }
});

app.listen(port);