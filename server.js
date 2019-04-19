'use strict';

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.static('./public'));//browser looks in public as the home folder
app.use(express.urlencoded({extended: true})); //turns anything we get into request.body

app.post('/unicorns', (req, res) => {
  console.log('saving unicorns');
  fs.writeFile('./public/data/unicorns.json', JSON.stringify(req.body), (err, data) => {
      if(err){
        console.error(err);
        return res.status(500).send('error');
      }

      return res.send({});
  });
})

app.listen(PORT, () => console.log(`App is up on http://localhost:${PORT}`));