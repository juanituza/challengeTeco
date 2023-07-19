import { ticketService }  from "../services/repositories/index.js";
const getTicket = async (req, res) => {
    try {
        // const ticket = await ticketService.gettTicket();
        res.sendSuccessWithPayload();
    } catch (error) {
        res.sendInternalError("Internal server error, contact the administrator");
    }
};



export default { getTicket };



