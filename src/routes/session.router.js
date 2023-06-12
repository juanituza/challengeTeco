import { Router } from "express";
import userModel from "../dao/Mongo/models/user.js";
import { createHash, validatePassword } from "../utils.js";

const router = Router();

router.post("/register", async (req, res) => {
    

    const {first_name,last_name,email,password} = req.body;
    const exist = await userModel.findOne({email});

    if (exist) return res.status(400).send({status:"error", error: "User already exist"});
    const hashedPassword = await createHash(password);
    const user = {
        first_name,
        last_name,
        email,
        password : hashedPassword
    }

    const result = await userModel.create(user);
    res.send({ status: "success", payload: result });
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    //defino el admin
    if (email ==="adminCoder@coder.com" && password === "coder") {
        req.session.user = {
            name: `Admin`,
            role:"admin",
            email: "..."
        }
        return res.status(200).send({ status: "success" });
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });

    const isValidPassword = await validatePassword(password,user.password);

    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Wrong password"});


    //creo la sesión
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
    }
    res.status(200).send({status:"success"});
});




export default router;
