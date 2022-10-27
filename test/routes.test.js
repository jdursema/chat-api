const chai = require('chai');
const should = chai.should('should');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);

describe('Client Routes', () => {

  describe('GET /users', () => {

    it('should return all users', () => {
      return chai.request(server)
      .get('/users')
      .then(response => {
        should.exist(response);
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('username');
        response.body[0].should.have.property('created_at');
      })
    })
  });

  describe('POST /users', () => {

    it('should successfully be able to post a new user', () => {
      return chai.request(server)
      .post('/users')
      .send({
        username: 'jeff'
      })
      .then(response => {
        should.exist(response);
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('username');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('created_at');
      })
    })
  });

  describe('GET /messages', () => {

    it('should return all users', () => {
      return chai.request(server)
      .get('/messages')
      .then(response => {
        should.exist(response);
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('recipientid');
        response.body[0].should.have.property('senderid');
        response.body[0].should.have.property('text');
      })
    })
  });

  describe('POST /messages', () => {

    it('should successfully be able to post a new message', () => {
      return chai.request(server)
      .post('/messages')
      .send({
        text: 'hello',
        recipientId: '1',
        senderId: '2'
      })
      .then(response => {
        should.exist(response);
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('text');
        response.body[0].should.have.property('recipientid');
        response.body[0].should.have.property('senderid');
        response.body[0].should.have.property('created_at');
      })
    })
  });
})