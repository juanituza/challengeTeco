import userModel from "../../Mongo/models/user.js";

export default class UsersManager {
    getUsers = async () => {
        return await userModel.find().lean();
    };
    getUserBy = async (params) => {

        return await userModel.findOne(params).lean(); 
    };
    createUser = async (user) => {
        return await userModel.create(user);
    };
    updateUser = async (email,password) => {
        return await userModel.updateOne(email, { $set: password});
    };
  
    deleteUser = async (id) => {
        return await userModel.findByIdAndDelete(id);
    }
}