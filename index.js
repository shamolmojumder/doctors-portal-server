const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const  MongoClient  = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4xoys.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('doctors'));
app.use(fileUpload());
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const appointmentCollection = client.db("doctorsportal").collection("appointments");

  app.post('/addAppointment',(req,res)=>{
      const appointment=req.body;
      console.log(appointment);
      appointmentCollection.insertOne(appointment)
      .then(result=>{
        console.log(result);
          res.send(result.acknowledged)
      })
  })
      //  allPatient
      app.get('/allPatient',(req,res)=>{
        
      })
      // appointmentsByDate 
      app.post('/appointmentsByDate',(req,res)=>{
          const date=req.body;
          console.log(date.date);
          appointmentCollection.find({date:date.date})
          .toArray((err,documents)=>{
            res.send(documents)
          })
      })
      app.post('/addADoctor',(req,res)=>{
        const file=req.files.file;
        const name=req.files.name;
        const email=req.files.email;
        console.log(name,email,file);
      })
});

app.listen(process.env.PORT||port) 