import { Router } from "express";
import userModel from "../dao/Mongo/models/user.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await userModel.find();
  res.send({ status: "success", payload: users });
});

router.post("/", async (req, res) => {
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
      password,
    };
    const result = await userModel.create(user);
    res.send({ status: "success", insert: result });
  } catch (error) {
    res.status(500).send({ error: "Internal error" });
  }
});

router.put("/:uid", async (req, res) => {
  try {
    const userId = req.params.uid;
    const userUpdate = req.body;
    const result = await userModel.updateOne(
      { _id: userId },
      { $set: userUpdate }
    );
    res.status(200).send({ payload: "User update" });
  } catch (error) {
    res.status(500).send({ error: "Internal error" });
  }
});

router.delete("/:uid", async (req, res) => {
  const userId = req.params.uid;
  const result = await userModel.deleteOne({ _id: userId });
  res.send({ status: "seccess", payload: "User removed" });
});

export default router;
