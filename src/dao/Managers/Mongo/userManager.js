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
    updateUser = async (camp, item) => {
        return await userModel.updateOne(camp, { $set: {item} });
    };
    deleteUser = async (user) => {
        return await userModel.findByIdAndDelete(user);
    }
}