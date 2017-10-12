const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

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


//JWT Authorization
const checkAuth = (request, response, next) => {
  const token = request.body.token;

  if(!token) {
    response.status(403).json({ error: 'You must be authorized to hit this endpoint' })
  }

  jwt.verify(token, app.get('secretKey'), (err, decoded) => {
    if (err) {
      response.status(403).json({ error: 'Invalid token' });
    }

    if (!decoded.admin) {
      response.status(403).json({ error: 'You are not authorized as admin to this endpoint' })
    }
      next();
  })
};

const checkToken = (request, response, next) => {
  const token = request.body.token;

  if (!token) {
    response.status(403).json({ error: 'You must be authorized to hit this endpoint' });
  }

  jwt.verify(token, app.get('secretKey'), (err, decoded) => {
    if (err) {
      return response.status(403).json({ error: 'Invalid token' });
    }
      next();
  })
};



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
app.get('/api/v1/types', (request, response) => {
  database('types').select()
  .then(types => {
    if (!types.length) {
      return response.status(404).json({ error: 'No pokemon types found' })
    }
    response.status(200).json(types)
  })

  .catch(error => { response.status(500).json({ error }) })
});


  //GET Pokemon by region id
app.get('/api/v1/pokemon/:region_id', (request, response) => {
  const { region_id } = request.params;

  database('pokemon').where({ region_id }).select()
  .then(region => {
    response.status(200).json(region)
  })
  .catch(error => {
    response.status(500).json({ error })
  })
});

  //GET  Pokemon by name
// app.get('/api/v1/pokemon/:name', (request, response) => {
//   const { name } = request.params;
//
//   database('pokemon').where({ name }).select()
//   .then(name => {
//     response.status(200).json(name)
//   })
//   .catch(error => {
//     response.status(500).json({ error })
//   })
// });


//POST Endpoints

//PUT/PATCH Endpoints

//DELETE Endpoints
  //DELETE by pokemon region id
app.delete('/api/v1/pokemon/:region_id', (request, response) => {
  const { region_id } = request.params;

  database('pokemon').where({ region_id }).del()

  .then(response => {
    if(!response) {
      response.status(404).json({ error: 'Pokemon matching region id not found' })
    }
    response.sendStatus(204)
  })
  .catch( error => response.status(500).json({ error }) );
});


  //DELETE types
// app.delete('/api/v1/types/:type_label', (request, response) => {
//   const { type_label } = request.params;
//
//   database('types').where({ type_label }).del()
//
//   .then(response => {
//     if(!response) {
//       response.status(404).json({ error: 'Type matching label not found' })
//     }
//     response.sendStatus(204)
//    })
//   .catch( error => response.status(500).json({ error }) );
// });

module.exports = app;
