import express from 'express';
import {MongoClient} from 'mongodb';

const MONGO_URL = process.env.PLURALSIGHT_MONGO_1

let app = express();

app.use(express.static('public'));

let db;

MongoClient.connect(MONGO_URL, (err, database) => {
  if (err) throw err;
  db = database;
  app.listen(3000, () => console.log('listening on port 3000'))
});


app.get('/data/links', (req, res) => {
  db.collection('links').find({}).toArray((err, links) => {
    if (err) throw err;
    res.json(links);
  })
})
