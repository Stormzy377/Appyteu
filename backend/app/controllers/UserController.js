import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

class UserController {
  static async check(request, response) {
    try {
      const { email, password } = request.body;
      const user = await User.find(email);
      if (user.length == 0) {
        return response.status(404).json({
          message: "Usuário não encontrado!",
        });
      }

      const passwordCompare = await bcrypt.compare(
        password,
        user[0].password_hash
      );

      if (!passwordCompare) {
        return response.status(401).json({
          message: "Credenciais incorrectas and !",
        });
      }

      if (!process.env.AUTHENTICATE_TOKEN) {
        throw new Error("JWT não foi configurado!");
      }

      const token = jwt.sign(
        { id: user[0].id },
        process.env.AUTHENTICATE_TOKEN,
        { expiresIn: "2d" }
      );
      const { password_hash, ...data } = user[0];

      return response.status(200).json({
        data,
        token,
        message: "Parabéns vocÊ logou com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Ocorreu algum erro `,
      });
    }
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
        hash,
      });

      return response.status(201).json({
        message: "Usuário registrado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Erro de servidor! `,
      });
    }
  }

  static async show(request, response) {
    response.send(`Mostrando usuário com ID ${response.params.id}`);
  }
}
export default UserController;
