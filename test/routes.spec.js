const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should retrieve the homepage with an authorization form at /', (done) => {
    chai.request(server)
    .get('/')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.should.include('Poke150-API Authorization Form');
      done();
    });
  });

  it('should return a 404 route that does not exist', (done) => {
    chai.request(server)
    .get('/partyhard')
    .end( (error, response) => {
      response.should.have.status(404);
      done();
    });
  });
});


describe('API Routes', () => {
  let token;

  before((done) => {
    database.migrate.latest()
      .then(() => done())

    chai.request(server)
      .post('/api/v1/authenticate')
      .send({ app: 'My App', email: 'Laura@turing.io' })
      .end((error, response) => token = JSON.parse(response.text).token);
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
  });

  describe('GET /api/v1/types', () => {
    it('should retrieve all pokemon types', (done) => {
      chai.request(server)
      .get('/api/v1/types')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(14);
        response.body[0].should.have.property('type_label');
        response.body[0].type_label.should.equal('sparkling');
        done();
      });
    });

    it('should error 404 if the url does not exist', (done) => {
      chai.request(server)
      .get('/api/v1/typedisaster')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/v1/pokemon', () => {
    it('should retrieve all pokemon', (done) => {
      chai.request(server)
      .get('/api/v1/pokemon')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(151);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Blastoise');
        done();
      });
    });

    it('should error 404 if the url does not exist', (done) => {
      chai.request(server)
      .get('/api/v1/typedisaster')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/v1/pokemon/:region_id', () => {
    it('should retrieve pokemon by region id', (done) => {
      chai.request(server)
      .get('/api/v1/pokemon/026')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Raichu');
        done();
      });
    });

    it('should error 404 if the url does not exist', (done) => {
      chai.request(server)
      .get('/api/v1/pokemon/100000')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/v1/types/:id', () => {
    it('should retrieve a type by id', (done) => {
      chai.request(server)
      .get('/api/v1/types/71')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('type_label');
        response.body[0].type_label.should.equal('icey');
        done();
      });
    });

    it('should error 404 if the url does not exist', (done) => {
      chai.request(server)
      .get('/api/v1/types/100000')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('POST /api/v1/authenticate', () => {
    it('should generate a JWT', (done) => {
      chai.request(server)
        .post('/api/v1/authenticate')
        .send({
          app: 'LauraApp',
          email: 'laura@turing.io'
        })
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('token');
          done();
        });
    });

    it('should not generate token if missing required params', (done) => {
      chai.request(server)
        .post('/api/v1/authenticate')
        .send({
          name: 'Iris'
        })
        .end((error, response) => {
          response.should.have.status(422);
          done();
        });
    });
  });


  describe('POST /api/v1/types', () => {
    it('should POST a new type to the database', (done) => {
      chai.request(server)
      .post('/api/v1/types')
      .send({
        token,
        type_label: 'sparkling'
      })
      .end((error, response) => {
        response.body.should.be.a('array');
        done();
      });
    });


    it('should not POST a type with missing parameters', (done) => {
      chai.request(server)
      .post('/api/v1/types')
      .send({
        token
      })
      .end((error, response) => {
        response.should.have.status(422);
        done();
      });
    });
  });

  describe('POST /api/v1/pokemon', () => {
    it('should POST a new pokemon to the database', (done) => {
      chai.request(server)
      .post('/api/v1/pokemon')
      .send({
        token,
        region_id: '201',
        name: 'Lauramonn',
        attack_power: '300000',
        defense_power: '3',
        hp: '2',
        power_total: '3000000000',
        type_id: 71,
        primary_type: 'ice'
      })
      .end((error, response) => {
        response.body.should.be.a('object');
        done();
      });
    });


    it('should not POST a type with missing parameters', (done) => {
      chai.request(server)
      .post('/api/v1/pokemon')
      .send({
        token,
        region_id: '201'
      })
      .end((error, response) => {
        response.should.have.status(422);
        done();
      });
    });
  });


  describe('PATCH /api/v1/pokemon/:region_id', () => {
    it('should be able to update values of a pokemon given the region ID', (done) => {
      chai.request(server)
      .patch('/api/v1/pokemon/150')
      .send({
        token,
        name:'Staticmon'
      })
      .end((error, response) => {
        response.should.have.status(200);
        chai.request(server)
        .get('/api/v1/pokemon/150')
        .end((error, response) => {
        response.body.should.be.a('array');
        done();
      });
    });
  });
});

  describe('PUT /api/v1/types/:id', () => {
    it('should be able to update a type given the ID', (done) => {
      chai.request(server)
      .patch('/api/v1/types/71')
      .send({
        token,
        type_label: 'unicorns'
      })
      .end((error, response) => {
        chai.request(server)
        .get('/api/v1/types/71')
        .end((error, response) => {
        done();
        });
      });
    });
  });

  describe('DELETE /api/v1/pokemon/:region_id', () => {
    it('should delete a pokemon with a matching region ID', (done) => {
      chai.request(server)
      .delete('/api/v1/pokemon/066')
      .send({
        token
      })
      .end((error, response) => {
        response.body.should.be.a('object');
        chai.request(server)
        .get('/api/v1/pokemon')
        .end( (error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        done();
        });
      });
    });
  });

  describe('DELETE /api/v1/pokemon/id/:id', () => {
    it('should delete a pokemon with a matching ID', (done) => {
      chai.request(server)
      .delete('/api/v1/pokemon/id/504')
      .send({
        token
      })
      .end((error, response) => {
        response.body.should.be.a('object');
        chai.request(server)
        .get('/api/v1/pokemon')
        .end( (error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        done();
        });
      });
    });
  });
});
