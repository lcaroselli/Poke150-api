const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Poke150 API';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});


//GET Endpoints
  //GET all pokemon
app.get('/api/v1/pokemon', (request, response) => {
  database('pokemon').select()
  .then(pokemon => {
    if (!pokemon.length) {
      return response.status(404).json({ error: 'No pokemon found' })
    }
    response.status(200).json(pokemon)
  })

  .catch(error => { response.status(500).json({ error }) })
});


  //GET all types
// app.get('api/v1/pokemon?type=grass', (request, response) => {
//   database('types').select()
//   .then(type => {
//     if (!type.length) {
//       return response.status(404).json({ error: 'No type found' })
//     }
//     response.status(200).json(type)
//   })
//
//   .catch(error => { response.status(500).json({ error }) })
// });

  //GET Pokemon by region id
// app.get('/api/v1/pokemon/:id', (request, response) => {
//   response.send('PokeID');
// });

  //GET  Pokemon by name
// app.get('/api/v1/pokemon/:name', (request, response) => {
//   response.send('PokeName');
// });

//POST Endpoints

//PUT/PATCH Endpoints

//DELETE Endpoints

module.exports = app;
