export default class UserDTO {
    constructor(user) {
        // this.name = name;
        // this.email = email;
        // this.cart = cart;
        // this.id = id;
        // this.role = role;
        this.name = user.name;
        this.email = user.email;
        this.cart = user.cart;
        this.id = user.id;
        this.role = user.role;
    }
    
}