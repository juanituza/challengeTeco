export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getTicket = () => {
        return this.dao.getProducts();
    };

    createticket = (params) => {
        return this.dao.createticket(params);
    };

   
}