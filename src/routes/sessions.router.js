import { Router } from "express";
import passport from "passport";
import userManager from "../dao/Managers/Mongo/userManager.js";
import { createHash, validatePassword } from "../utils.js";
import userModel from "../dao/Mongo/models/user.js";


const router = Router();
const um = new userManager();

router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/registerFail', failureMessage: true }), async (req, res) => {
    res.send({ status: "success", message:"Registered" });
});

router.get("/registerFail", (req,res)=>{
    console.log(req.session.message);
    res.status(400).send({status:"error",error:req.session.message});
});


router.post("/login",passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail', failureMessage:true}), async (req, res) => {
    // console.log(req.user);
    req.session.user = {
        name : req.user.name,
        role:  req.user.role,
        id: req.user.id,
        email :req.user.email  
    }
    res.status(200).send({status:"success"});
});

router.get("/loginFail", (req, res) => {
    console.log(req.session.messages);
    
    if (req.session.messages.length > 4) return res.status(400).send({ message: "BLOQUEA LOS INTENTOS YA!!!!!" })
       res.status(400).send({ status: "error", error: req.session.message });
});


router.post('/restorePassword', async(req,res) =>{
   const {email, password} = req.body;
    //Verifico si existe el usuario
    // const user = await um.getUserBy({email});
    const user = await userModel.findOne({email});

   

    if(!user) return res.status(400).send({status:"error", error:"User doesn't exist"});
    //Comparo password nuevo con el antiguo
    const isSamePassword = await validatePassword(password, user.password);
    if (isSamePassword) return res.status(400).send({ status: "error", error: "Cannot replace password with current password" })
    //Si es diferente actualizo password
    const newHashPassword = await createHash(password);//hasheo password nuevo
    // const result = await um.updateUser({ email }, { $set: { password:newHashPassword }});
    const result = await userModel.updateOne({ email }, { $set: { password:newHashPassword }});
    console.log(result);

    res.sendStatus(200);

})




export default router;
