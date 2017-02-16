const apiCall = require('../routes/api')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const server = require('../app')

chai.use(chaiHttp)

describe('/fetch movie details from api ', () => {
      it(' should return 200 status on success', (done) => {
        chai.request(server)
            .get('/fetch')
            .end((err, res) => {
              expect(res.status).to.be.eqls(200)
              done()
            })
      })
  })

describe('/fetch movie details from db ', () => {
      it(' should return 200 status on success', (done) => {
        chai.request(server)
            .get('/movie/Movie 1')
            .end((err, res) => {
              expect(res.status).to.be.eqls(200)
              done()
            })
      })

      it('should return error status on success', (done) => {
        chai.request(server)
            .get('/movie/Movie 10')
            .end((err, res) => {
              //console.log(res)
              expect(res.status).to.be.eqls(404)
              expect(res.text).to.be.eqls('{"error":"Movie name not found"}')
              done()
            })
      })
      it('should return error status on success', (done) => {
        chai.request(server)
            .get('/movie/ ')
            .end((err, res) => {
              //console.log(res)
              expect(res.status).to.be.eqls(404)
              expect(res.text).to.be.eqls('Cannot GET /movie/\n')
              done()
            })
      })
  })