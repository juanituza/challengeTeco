export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getTicket = () => {
        return this.dao.getProducts();
    };

    createTicket = (params) => {
        return this.dao.createTicket(params);
    };

   
}