
import { usersService } from "../services/repositories/index.js";



const homeView = async (req, res) => {
  const userData = req.user;
  const userRole = {
    role: "premium", // Debes obtener el rol del usuario desde tus datos
  };
  res.render("home", { user: userData, userRole });
};

const adminView = async(req,res) => {
  
  const users = await usersService.getUsers();

  res.render("admin", { Users: users });
}

const restoreRequest = async (req, res) => {
  res.render("restoreRequest");
};

const restorePassword = async (req, res) => {
    const userData = req.user;
  res.render("restorePassword", {user : userData});
};


export default {
  homeView,
  restoreRequest,
  restorePassword,
  adminView,
 
};
