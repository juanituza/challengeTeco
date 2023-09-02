import mongoose from "mongoose";
import { expect } from "chai";
import MongoSingleton from "../../src/mongoSingleton.js";
import UsersManager from "../../src/dao/Mongo/Managers/userManager.js";

MongoSingleton.getInstance();

describe("Testing usando CHAI", function () {
  this.timeout(10000);
  before(function () {
    this.usersManager = new UsersManager();
    mongoose.connection.collections.users.drop();
  });
  describe('Pruebas de usuarios',function (){
    it("El DAO debe devolver usuarios en formato de arreglo", async function () {
      const result = await this.usersManager.getUsers();
      expect(Array.isArray(result)).to.be.equal(true);
    });
    it("El DAO debe insertar correctamente un usuario", async function () {
      const mockUser = {
        first_name: "Cara",
        last_name: "De papa",
        email: "caradepapa@mail.com",
        age: 25,
        password: "123",
        cart: "64df754b079bff3699c95432",
        role: "user",
      };
      const result = await this.usersManager.createUser(mockUser);
      expect(result).to.have.property("_id");
    });
    it("El DAO debe modificar un parametro del usuario", async function () {
      const user = await this.usersManager.getUserBy({
        email: "caradepapa@mail.com",
      });
      const result = await this.usersManager.updateUser(user, {
        email: "cara@correo.com",
      });
      const updateUser = await this.usersManager.getUserBy({
        email: "cara@correo.com",
      });
      expect(updateUser.email).to.be.equal("cara@correo.com");
    });
  });
  describe('Más pruebas unitarias', function () {

  })
});
