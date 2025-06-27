// import { usersService } from "../dao/Managers/Mongo/index.js";
import { usersService } from "../services/repositories/index.js";
import usersDTO from "../dto/UserDTO.js";
import { documentsExist } from "../constants/userError.js";
import ErrorService from "../services/ErrorServicer.js";
import EErrors from "../constants/EErrors.js";
import LoggerService from "../dao/MySql/Managers/LoggerManager.js";

const getUsers = async (req, res) => {
  const users = await usersService.getUsers();
  const userParser = users.map((user) => new usersDTO(user));
  
  res.sendSuccessWithPayload(userParser);
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
  const userId = req.user._id;
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
    const userUpdate = req.body.role;
    const result = await usersService.updateUser(
      { _id: userId },
      { role: userUpdate }
    );
  
    // res.sendSuccessWithPayload({ result });
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

const uploadFiles = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
   
    const uploadedFiles = req.files;
   

    // Verificar si el usuario ya tenía documentos cargados
    const userHadDocuments =
      Array.isArray(user.documents) && user.documents.length > 0;

    // Obteniendo la información de los archivos cargados y agregándolos al array "documents"
    const documents = userHadDocuments ? user.documents : []; // Utiliza los documentos existentes si el usuario ya los tenía

    

    // Obteniendo la información de los archivos cargados y agregandolos al array "documents"
    // const documents = user.documents || []; // Se obtiene el array de documentos existente o se crea uno nuevo

    
    
    const requiredReferences = ["identification", "address", "count"];
    uploadedFiles.forEach((file, index) => {
      const reference =
        index < requiredReferences.length
          ? requiredReferences[index]
          : file.originalname;

      // Verificar si la referencia ya existe en los documentos cargados
      const referenceExists = documents.some(
        (doc) => doc.reference === reference
      );
 
      if (referenceExists) {
        return ErrorService.createError({
          name: "File already uploaded",
          cause: documentsExist(reference),
          message: `documents ${reference}  is already loaded`,
          code: EErrors.DOCUMENT_ALREADY_LOADED,
          status: 400,
        });
      } else {
        documents.push({ name: file.originalname, reference: reference });
      }
    });

    // Verificar si se han cargado los tres documentos requeridos
    const uploadedReferences = documents.map((doc) => doc.reference);
    const hasRequiredDocuments = requiredReferences.every((docRef) =>
      uploadedReferences.includes(docRef)
    );

    // Actualizar el estado del usuario si se han cargado los tres documentos
    if (hasRequiredDocuments) {
      user.status = true;
      
    }
    // Actualizando el usuario en la base de datos con el nuevo array "documents"
    const updatedUser = await usersService.updateUser(
      { _id: userId },
      {
        documents,
        status: user.status,
        // role: "premium",
      },
      
    );
    const newUser = new usersDTO(await usersService.getUserBy(updatedUser._id));
    res.sendSuccessWithPayload({ newUser });
  } catch (error) {
    LoggerService.error(error);
    res.status(error.status).send({ status: "error", error: error.message });
  }
};

export default {
  getUsers,
  saveUsers,
  editUsers,
  deleteUsers,
  modificateRole,
  uploadFiles,
};
