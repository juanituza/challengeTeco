import UsersManager from "../../dao/MySql/Managers/userManager.js";
import UsersRepository from "./UsersRepository.js";



export const usersService = new UsersRepository(new UsersManager());



