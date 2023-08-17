export default class UserDTO {
  constructor(user) {
    this.name = user.name
    this.email = user.email;
    this.cart = user.cart;
    this.id = user.id;
    this.role = user.role;
  }
}
