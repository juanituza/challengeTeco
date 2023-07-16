// import { usersService } from "../dao/Managers/Mongo/index.js";
import { usersService } from "../services/index.js";


const getUsers = async (req,res) => {
    const users = await usersService.getUsers();    
    res.sendSuccessWithPayload({ users });
}
const saveUsers = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password)
            return res
                .status(400)
                .send({ status: "error", payload: "Incomplete value" });

        const user = {
            first_name,
            last_name,
            email,
            cart,
            password,
        };

        const result = await usersService.createUser(user);
        res.sendSuccessWithPayload({ result });
    } catch (error) {
        res.sendInternalError("Internal error");
    }
};

const editUsers = async (req, res) => {
    try {
        const userId = req.params.uid;
        const userUpdate = req.body;
        const result = await usersService.updateUser(
            { _id: userId },
            { $set: userUpdate }
        );
        res.sendSuccessWithPayload({ result });
        res.sendSuccess("User update");
    } catch (error) {
        res.sendInternalError("Internal error");
    }
}
const deleteUsers = async (req, res) => {
    const userId = req.params.uid;
    const result = await usersService.deleteUser({ _id: userId });
    res.sendSuccess("User removed");
}

export default {getUsers,saveUsers,editUsers,deleteUsers,};
