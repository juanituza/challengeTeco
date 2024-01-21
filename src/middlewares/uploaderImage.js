import multer from "multer";
import __dirname from "../utils.js";

// Configura la ubicación y el nombre de los archivos cargados
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define la carpeta donde se guardarán los archivos (ajusta la ruta según tus necesidades)
    cb(null, `${__dirname}/public/uploads/products`);
    
  },
  filename: (req, file, cb) => {
    // Define el nombre de los archivos cargados (puedes personalizarlo según tus necesidades)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename =
      file.fieldname + "-" + uniqueSuffix + "-" + file.originalname;
    cb(null, filename);
  },
});

// Configura Multer con la opción de almacenamiento
const uploadImage = multer({ storage: storage });




export default uploadImage;
