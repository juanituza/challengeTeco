import chai from "chai";
import { response } from "express";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing integrador de Products", function () {
  describe("Test de products", function () {
    it("Endpoint POST /api/products deberá crear correctamente un producto", async function () {
      const user = {
        email: "adminCoder@coder.com",
        password: "coder",
      };

      const login = await requester.post("/api/sessions/login").send(user);
      console.log(login.status);


      const mockProduct = {
        title: "Remera",
        description: "Los piojos",
        price: 100,
        thumbnail: ["Array"],
        code: "123aa",
        status: true,
        stock: 100,
        owner: "adminCoder@coder.com",
      };
      const response = await requester
        .post("/api/products")
        .send(mockProduct);
      const {status, _body}= response;


      expect(status).to.be.equal(200);
      expect(_body.payload._id).to.be.ok;
    });
  });
});
