const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
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


// describe('API Routes', () => {
//   before((done) => {
//     database.migrate.latest()
//       .then(() => done())
//   });
//
//   beforeEach((done) => {
//     database.seed.run()
//       .then(() => done())
//   });
//
//   describe('GET /api/v1/types', () => {
//     it('should retrieve all pokemon types', (done) => {
//       chai.request(server)
//       .get('/api/v1/types')
//       .end((error, response) => {
//         response.should.have.status(200);
//         response.should.be.json;
//         response.body.should.be.a('array');
//         response.body.length.should.equal(1);
//         // response.body[0].should.have.property('project_name');
//         // response.body[0].project_name.should.equal('Earthy');
//         done();
//       });
//     });
//
//     it('should error 404 if the url does not exist', (done) => {
//       chai.request(server)
//       .get('/api/v1/typedisaster')
//       .end((error, response) => {
//         response.should.have.status(404);
//         done();
//       });
//     });
//   });

// });
