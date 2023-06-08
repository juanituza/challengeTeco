import { Router } from "express";
import userModel from "../dao/Mongo/models/user.js";

const router = Router();

router.post("/register", async (req, res) => {
  const result = await userModel.create(req.body);
  res.send({ status: "success", payload: result });
});

export default router;
