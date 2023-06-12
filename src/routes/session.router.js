import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/register",passport.authenticate('register',{failureRedirect:'/api/sessions/registerFail'}), async (req, res) => {
    res.send({ status: "success", message:"Registered" });
});

router.get("/registerFail", (req,res)=>{
    console.log(req.session.message);
    res.status(400).send({status:"error",error:req.session.message});
});


router.post("/login",passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail'}), async (req, res) => {
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
   res.status(400).send({ status: "error", error: req.session.message });
});




export default router;
