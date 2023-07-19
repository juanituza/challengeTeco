import productDTO  from "../dto/productDTO.js";
export default class TicketDTO {
    constructor(ticket) {
        this.code = ticket.code;
        this.purchase_datetime = ticket.purchase_datetime;
        this.amount = ticket.amount;
        this.purchaser = ticket.purchaser;
        this.products = ticket.products.map((item) => {
            const { quantity, product } = item;
            const newProduct = {
                quantity,
                product: new productDTO(product),
            };

            return newProduct;
        });
    }
}