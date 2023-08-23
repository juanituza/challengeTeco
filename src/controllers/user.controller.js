// import { usersService } from "../dao/Managers/Mongo/index.js";
import { usersService } from "../services/repositories/index.js";
import usersDTO from "../dto/UserDTO.js";

const getUsers = async (req, res) => {
  const users = await usersService.getUsers();
  res.sendSuccessWithPayload({ users });
};
const saveUsers = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    if (!first_name || !last_name || !email || !password)
      return res
        .status(400)
        .send({ status: "error", payload: "Incomplete value" });

    const user = new usersDTO();

    const result = await usersService.createUser(user);
    res.sendSuccessWithPayload({ result });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};

const modificateRole = async (req, res) => {
  const userId = req.user.id;
  const { role } = req.body;
  try {
    if (role === "admin") {
      res.sendUnauthorized("you can't update a role admin");
    } else if (role !== "premium" && role !== "user") {
      res.sendUnauthorized("You can only change the role to premium or user");
    } else {
      const userUpdate = await usersService.updateUser(
        { _id: userId },
        { role: role }
      );
      res.sendSuccessWithPayload(userUpdate);
    }
  } catch (error) {
    LoggerService.error;
    res.sendInternalError("Internal server error, contact the administrator");
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
};

const deleteUsers = async (req, res) => {
  const userId = req.params.uid;
  const result = await usersService.deleteUser({ _id: userId });
  res.sendSuccess("User removed");
};

export default { getUsers, saveUsers, editUsers, deleteUsers, modificateRole };
