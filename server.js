const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

require('dotenv').config()
const secretKey = process.env.secretKey;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('secretKey', secretKey);
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

  jwt.verify(token, app.get('secretKey'), (error, decoded) => {
    if (error) {
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

  jwt.verify(token, app.get('secretKey'), (error, decoded) => {
    if (error) {
      return response.status(403).json({ error: 'Invalid token' });
    }
      next();
  })
};



//GET Endpoints
  //GET all pokemon
app.get('/api/v1/pokemon', (request, response) => {
  let { name } = request.query;

  const checkQuery = () => {
    if (name) {
      return database('pokemon').where('name', name).select()
    } else {
      return database('pokemon').select()
    }
  };

  checkQuery()

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
  let { type_label } = request.query;

  const checkQuery = () => {
    if (type_label) {
      return database('types').where('type_label', type_label).select()
    } else {
      return database('types').select()
    }
  };

  checkQuery()

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
    if (!region.length) {
      return response.status(404).json({ error: 'No pokemon with that region id found' })
    }
    response.status(200).json(region)
  })

  .catch(error => {
    response.status(500).json({ error })
  })
});

  //GET type by id
app.get('/api/v1/types/:id', (request, response) => {
  const { id } = request.params;

  database('types').where({ id }).select()

  .then(id => {
   if (!id.length) {
    return response.status(404).json({ error: 'No type with that id found' })
   }
   response.status(200).json(id)
 })

  .catch(error => {
    response.status(500).json({ error })
  })
});



//POST Endpoints
  //POST for authentication
app.post('/api/v1/authenticate', (request, response) => {
  const { email, app } = request.body;

  if(!email || !app) {
    return response.status(422).json({ error: 'Cannot authenticate: Email and App name are required' })
  }

  if(email.includes('turing.io')) {
    Object.assign(request.body, { admin: true })
  } else {
    Object.assign(request.body, { admin: false })
  }

	jwt.sign(request.body, secretKey, { expiresIn: '48h' }, (error, token) => {
		if(token) {
      response.status(200).json({ token })
    } else {
      response.status(404).json({ error })
    }
	})
});

  //POST new type
app.post('/api/v1/types', checkAuth, (request, response) => {
  const { type_label } = request.body;

  if(!type_label) {
    return response.status(422).json({ error: 'Missing required property: type label' })
  }

  database('types').insert({ type_label }, '*')

  .then(type => response.status(201).json(type))

  .catch(error => response.status(500).json({ error }))
});

  //POST new pokemon
app.post('/api/v1/pokemon', checkAuth, (request, response) => {
  const newPokemon = request.body;

  for (let pokeParameters of
    [ 'region_id', 'name', 'attack_power', 'defense_power', 'hp', 'power_total', 'type_id', 'primary_type' ]) {

      if (!newPokemon[pokeParameters]) {
        return response.status(422).send({ error: `Expected parameters: { region_id: <String>, name: <String>, attack_power: <String>, defense_power: <String>, hp: <String>, power_total: <String>, type_id: <Integer>, primary_type: <String> }. You're missing a ${pokeParameters}.` });
      }
  }

  database('pokemon').insert(newPokemon, '*')

  .then(pokemon => response.status(201).json(pokemon))

  .catch(error => response.status(500).json({ error }))
});


//PATCH/PUT Endpoints
app.patch('/api/v1/pokemon/:region_id', checkAuth, (request, response) => {
  const { region_id } = request.params;
  const { name, attack_power, defense_power, hp, power_total, type_id, primary_type } = request.body;

  if (!name && !attack_power && !defense_power && !hp && !power_total && !type_id && !primary_type) {
    return response.status(422).send({ error: "Partial update failed, missing a parameter" })
  }

  database('pokemon').where({ region_id })

  .update({ name, attack_power, defense_power, hp, power_total, type_id, primary_type }, '*')

  .then(patchedPokemon => response.status(200).json(patchedPokemon))

  .catch(error => response.status(500).json({ error }));
});

app.put('/api/v1/types/:id', checkAuth, (request, response) => {
  const { id } = request.params;
  const { type_label } = request.body;

  if (!type_label) {
    return response.status(422).send({ error: "Update failed" })
  }

  database('types').where({ id })

  .update({ type_label }, '*')

  .then(putType => response.status(200).json(putType))

  .catch(error => response.status(500).json({ error }));
});



//DELETE Endpoints
  //DELETE by pokemon region id
app.delete('/api/v1/pokemon/:region_id', checkAuth, (request, response) => {
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

  //DELETE by pokemon id
app.delete('/api/v1/pokemon/id/:id', checkAuth, (request, response) => {
  const { id } = request.params;

  database('pokemon').where({ id }).del()

  .then(response => {
    if(!response) {
      response.status(404).json({ error: 'Pokemon matching id not found' })
    }
    response.sendStatus(204)
  })
  .catch( error => response.status(500).json({ error }) );
});

module.exports = app;
