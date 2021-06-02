let chai = require("chai");
let chaiHttp = require("chai-http");
let SessionsEndpoint = require("./../src/endpoints/Sessions.Endpoints");
let app = require("./../src/app");

//Assertion style
chai.should();
chai.use(chaiHttp);

describe("App pages", () => {
  describe("GET /", () => {
    it("it should return status(200)", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("POST /createSession", () => {
    it("Body should have 5 properties", (done) => {
      chai
        .request(SessionsEndpoint)
        .post("/createSession")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.should.have.property("courseName");
          response.body.should.have.property("classGroups");
          response.body.should.have.property("descriptionCourse");
          response.body.should.have.property("numOfBlocks");
          response.body.should.have.property("timeOfBlocks");
          done();
        });
    });
  });
});

