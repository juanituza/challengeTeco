import EErrors from "../constants/EErrors.js";



export default (error, req, res, next) => {
    console.log(error);
    res.status(error.status).send({ status: "error", error: error.name });
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