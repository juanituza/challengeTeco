export default class UserDTO {
  constructor(user) {
    this.name = user.name
    this.email = user.email;
    this.cart = user.cart;
    this.id = user._id;
    this.role = user.role;
    this.status = user.status;
  }
}
