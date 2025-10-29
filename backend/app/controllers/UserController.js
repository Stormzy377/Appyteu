
class UserController {
  static index(req, res) {
    res.send("Olá do UserController!");
  }

  static show(req, res) {
    res.send(`Mostrando usuário com ID ${req.params.id}`);
  }
}
export default UserController