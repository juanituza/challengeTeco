import userModel from "../../Mongo/models/user.js";

export default class userManager {
    getUsers = async () => {
        return await userModel.find().lean();
    };
    getuserBy = async (uid) => {

        return await userModel.findById(uid);
    };
    createUser = async (user) => {
        return await userModel.create(user);
    };
    updateUser = async (id, user) => {
        return await userModel.findByIdAndUpdate(id, { $set: user });
    };
    deleteUser = async (user) => {
        return await userModel.findByIdAndDelete(user);
    }
}