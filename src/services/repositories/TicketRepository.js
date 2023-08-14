export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getTicket = () => {
    return this.dao.getTicket();
  };
  getTicketsById = () => {
    return this.dao.getTicketsById();
  };

  createTicket = (params) => {
    return this.dao.createTicket(params);
  };
}