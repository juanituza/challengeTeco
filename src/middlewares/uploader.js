import multer from "multer";
import __dirname from "../utils.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = determineFolder(file.fieldname); // Función para determinar la carpeta según el campo del archivo
    cb(null, `${__dirname}/public/uploads/${folder}`);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });



// Función para determinar la carpeta según el campo del archivo
const determineFolder = (fieldname) => {
  switch (fieldname) {
    case "profileImage":
      return "profile";
    case "products":
      return "products";
    case "documents":
      return "documents";
    default:
      return "others"; // Carpeta por defecto si no coincide con ninguno de los casos
  }
}


export default upload;
