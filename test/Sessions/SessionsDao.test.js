import mongoose from "mongoose";
import MongoSingleton from "../../src/mongoSingleton.js";
import UsersManager from "../../src/dao/Mongo/Managers/userManager.js";
import Assert from "assert";

MongoSingleton.getInstance();

const assert = Assert.strict;

describe("Testing del DAO de usuarios", function () {
  this.timeout(10000);
  before(function () {
    this.usersManager = new UsersManager();
    mongoose.connection.collections.users.drop();
  });
  beforeEach(function () {});

  it("El DAO debe devolver usuarios en formato de arreglo", async function () {
    const result = await this.usersManager.getUsers();
    assert.strictEqual(Array.isArray(result), true);
  });
  it("El DAO debe inserta correctamente un usuario", async function () {
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
    assert.ok(result._id);
  });
  it("El DAO debe poder obtenet un usuario por email", async function () {
    const user = await this.usersManager.getUserBy({
      email: "caradepapa@mail.com",
    });
    assert.strictEqual(typeof user, "object");
  });
  it("El DAO debe modificar un parametro del usuario", async function () {
    const user = await this.usersManager.getUserBy({
      email: "caradepapa@mail.com",
    });

    const result = await this.usersManager.updateUser(
      { email: user.email },
      { $set: "cara@correo.com" }
    );
    assert.strictEqual(typeof result, "object");
  });
});
