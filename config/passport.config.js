import passport from "passport";
import local from 'passport-local';
import userModel from "../src/dao/Mongo/models/user.js";
import { createHash, validatePassword } from '../src/utils.js';


const LocalStrategy= local.Strategy;


const initializePassportStrategies = () =>{
    passport.use('register', new LocalStrategy({passReqToCallback:true , usernameField: 'email'},async (req,email,password,done)=>{
       try {
           const { first_name, last_name } = req.body;

           const exist = await userModel.findOne({ email });

           if (exist) return done(null, false, { message: 'User exist' });
           const hashedPassword = await createHash(password);
           const user = {
               first_name,
               last_name,
               email,
               password: hashedPassword
           }

           const result = await userModel.create(user);
           done(null,result);
       } catch (error) {
            done(error);
       }

    }));

    passport.use('login', new LocalStrategy({usernameField:'email'},async (email,password,done)=>{
    

        //defino el admin
        if (email === "adminCoder@coder.com" && password === "coder") {
            const user = {
                id: 0,
                name: `Admin`,
                role: "admin",
                email: "..."
            }
            return done(null,user);
        }
        let user;
        user = await userModel.findOne({ email });
        if (!user) return done(null, false, { message: "Incorrect credentials" });
        

        const isValidPassword = await validatePassword(password, user.password);

        if (!isValidPassword) return done(null, false, { message: "Wrong password" });
        


        //creo la sesión
        user = {
            id: user._id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role
        }
        return done(null,user);
    }));

    passport.serializeUser(function (user,done) {
        return done(null,user.id);
    })
    passport.deserializeUser(async function(id,done){
        if (id === 0) {
            return done(null, {
                role: "admin",
                name: "Admin"
            })
        }
        const user = await userModel.findOne({_id:id});
        return done(null,user);
    })


};

export default initializePassportStrategies;