export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getTicket = () => {
        return this.dao.getTicket();
    };

    createTicket = (params) => {
        return this.dao.createTicket(params);
    };

   
}