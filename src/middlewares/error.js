import EErrors from "../constants/Eerrors.js";



export default (error,req,res,next) => {  
    res.status(error.status).send({status:"error",error:error.message});
    // switch (error.code) {
    //     case EErrors.INCOMPLETE_DATA:
    //         res.send({ status: "error", error: error.name })
    //         break;
    //     case EErrors.ID_NOT_FOUND:
    //         res.send({ status: "error", error: error.name })
    //         break;
    //     default:
    //         res.send({ status: "error", error: "Unhandled error" })
    //         break;
    // }
    
}