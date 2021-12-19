const express = require('express')
const  MongoClient  = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4xoys.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const app = express()
app.use(cors())

const port = 5000

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
          res.send(result.insertedCount)
      })
  })
});

app.listen(process.env.PORT||port)