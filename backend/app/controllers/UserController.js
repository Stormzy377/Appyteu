import bcrypt from "bcrypt";
import User from "../models/Users.js";

class UserController {
  static async index(request, response) {
    response.send("Olá do UserController!");
  }

  static async create(request, response) {
    try {
      const { name, email, password } = request.body;
      const existingUser = await User.find(email);

      if (existingUser.length > 0) {
        return response.status(400).json({
          message: "Não foi possível criar usuário!",
        });
      }

      const encriptedPassword = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, encriptedPassword);

      const user = await User.create({
        name,
        email,
        password: hash,
      });

      if (!user) {
        return response.status(400).json({
          message: "Ocorreu algum erro ao tentar criar o usuário!",
        });
      }
    } catch (error) {
      return response.status(500).json({
        message: `Ocorreu algum erro `,
      });
    }
  }

  static async show(request, response) {
    response.send(`Mostrando usuário com ID ${response.params.id}`);
  }
}
export default UserController;
