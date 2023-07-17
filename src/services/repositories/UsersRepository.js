export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUsers = () => {
    return this.dao.getUsers();
  };
  getUserBy = (params) => {
    return this.dao.getUserBy(params);
  };
  createUser = (user) => {
    return this.dao.createUser(user);
  };
  updateUser = (email, password) => {
    return this.dao.updateUser(email, password);
  };
  deleteUser = (id) => {
    return this.dao.deleteUser(id);
  };
}
