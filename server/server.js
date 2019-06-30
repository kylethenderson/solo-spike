const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const Pool = pg.Pool;

const config = {
    database: 'cleanup_meetup',
    url: 'localhost',
    port: 5432,
}

const pool = new Pool(config);

const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'))

app.get('/api/data', (req, res) => {
    pool.query(`SELECT * FROM
    "pins" FULL JOIN "meetups" ON "pins"."pinId" = "meetups"."pin_id"
    ORDER BY "pins"."pinId";`)
        .then(result => {
            res.send(result.rows);
        })
})

app.post('/api/add-meetup', (req, res) => {
    const queryText = `INSERT INTO "meetups" ("pin_id", "organized_by", "date", "time", "supplies") VALUES
                        ($1, $2, $3, $4, $5);`
    pool.query(queryText, [req.body.pinId, req.body.userId, '7-6-2019', '10:00', 'trash bags, drinks, rubber gloves'])
        .then( result => {
            res.sendStatus(200)
        })
        .catch( error => {
            console.log('Error in posting to meetup table', error);
            res.sendStatus(500);
        })
})

app.post('/api/pins', (req, res) => {
    const queryText = `INSERT INTO "pins" ("longitude", "latitude", "description", "created_by") VALUES
    ($1, $2, $3, $4);`
    pool.query(queryText, [req.body.longitude, req.body.latitude, 'Stuff in a creek', 1])
        .then( result => {
            res.sendStatus(200);
        })
        .catch( error => {
            console.log('Error in posting to pins', error);
        })
})

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
})