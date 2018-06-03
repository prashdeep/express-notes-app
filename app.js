const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('views','./views/');
app.set('view engine', 'pug');

let notes=[
    {"title":"Reminder","body":"session on Full Stack"},
    {"title":"Luch","body":"Lunch with Ramesh"},
    {"title":"Movie","body":"Movie with family"},
    {"title":"roaming","body":"roaming in Lalbaug"}
];

let requestTime = function(req, res, next){
    console.log("Tracking request time ..");
    req.requestTime = Date.now();
    next();
}

app.use(requestTime);

app.use('/', function(req, res, next) {
    console.log('came inside the middleware function');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
  console.log('Came inside');
  //res.sendFile(__dirname+"/index.html");
  //res.status(200).send(notes);
  res.render('welcome', notes)
});

app.post('/api/notes',(req, res)=>{
    console.log('came inside the post method');
    let newNote = req.body;
    console.log('req ', req.body);
    console.log(newNote);
    notes.push(newNote);
    console.log(notes);
    console.log("Request time : ", req.requestTime);
    res.status(201).send("Notes added successfully");
});

app.put('/api/notes/:id', (req, res)=>{

    console.log('called inside the put method...');
    console.log('Put method called for ', req.params.id);
    console.log('Request body' , req.body);
    let notesId = req.params.id;
    notes[notesId] = req.body;
    res.status(200).send("updated");

});
app.get('/api/notes',(req, res)=>{
    console.log('came inside the get method');
    console.log("Request time : ", req.requestTime);
    res.status(200).send(notes);
})

app.listen(3000);
console.log('App is listening on Port 3000');