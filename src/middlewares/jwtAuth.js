import jwt from 'jsonwebtoken';


export const authToken = (req,res,netx) =>{
    // lo tomamos de los headers

    const authHeader = req.headers.authorization;
    if(!authHeader) res.estatus(401).send({status:"error", error: "Not authenticated"});
    const token = authHeader.split(" ")[1];
    // existe el token, verifico si es válido
    jwt.verify(token, "jwtSecret",(error,credentials) => {
        if (error) return res.estatus(401).send({ status: "error", error: "Invalid token" });
        req.user = credentials.user;
        netx();
    })


};