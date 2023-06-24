import userModel from "../../Mongo/models/user.js";

export default class userManager {
    getUsers = async () => {
        return await userModel.find().lean();
    };
    getUserBy = async (uid) => {

        return await userModel.findOne(uid);
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