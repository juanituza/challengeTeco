import BaseRouter from "./baseRouter.js";
import { usersService } from "../dao/Managers/Mongo/index.js";

// const router = Router();

export default class UserRouter extends BaseRouter{
  init(){

      this.get("/", async (req, res) => {
        const users = await usersService.getUserBy();
        res.send({ status: "success", payload: users });
      });
      

      this.post("/", async (req, res) => {
        try {
          const { first_name, last_name, email, password } = req.body;
          if (!first_name || !last_name || !email || !password)
            return res
              .status(400)
              .send({ status: "error", payload: "Incomplete value" });
      
          const user = {
            first_name,
            last_name,
            email,
            cart,
            password,
          };
          
          const result = await usersService.createUser(user);
          res.send({ status: "success", insert: result });
        } catch (error) {
          res.status(500).send({ error: "Internal error" });
        }
      });

      this.put("/:uid", async (req, res) => {
        try {
          const userId = req.params.uid;
          const userUpdate = req.body;
          const result = await usersService.updateUser(
            { _id: userId },
            { $set: userUpdate }
          );
          res.status(200).send({ payload: "User update" });
        } catch (error) {
          res.status(500).send({ error: "Internal error" });
        }
      });

      this.delete("/:uid", async (req, res) => {
        const userId = req.params.uid;
        const result = await usersService.deleteUser({ _id: userId });
        res.send({ status: "seccess", payload: "User removed" });
      });
      
  }
}

