// server.js

const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();

const DIR = './assets/json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4242');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/api/upload', function(req, res) {
  console.log('GET RECEIVED');
  return res.send({
    success: true
  })
});

app.post('/api/upload', function(req, res) {
  if (!req.body) {
    console.log("No data received");
    return res.send({
      success: false
    });

  } else {
    console.log('Data received', req.body);
    fs.writeFile(path.resolve(DIR, 'peoples.json'), JSON.stringify(req.body), (err) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log('Peoples file save !');
      }
    });
    return res.send({
      success: true
    })
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('Node.js server is running on port ' + PORT);
});