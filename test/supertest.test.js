import chai from "chai";
import { response } from "express";
import supertest from "supertest";
import { passportCall } from "../src/utils.js";
const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing integrador de Products", function () {
  
  describe("Test de products", function () {
    // it("endpoint POST /api/seesions/login para loguear un usuario", async function (){
      
    // })
    it("Endpoint POST /api/products deberá crear correctamente un producto", async function () {     
      const user = {
        email: "adminCoder@coder.com",
        password: "coder",
        role: "ADMIN",
      };

      const login = await requester.post("/api/sessions/login").send(user);
      const { header } = login;

      expect(header["set-cookie"]).to.be.ok;

      const mockProduct = {
        title: "Remera",
        description: "Los piojos",
        price: 100,
        thumbnail: ["https://d3ugyf2ht6aenh.cloudfront.net/stores/533/443/products/674706-m…"],
        code: "123aa",
        status: true,
        stock: 100,
      };
      const response = await requester
        .post("/api/products")
        .set("Cookie", header["set-cookie"]) 
        .send(mockProduct);

      const {status, _body}= response;
      expect(status).to.be.equal(200);
      expect(_body.payload).to.be.ok;
    });
  });
});
