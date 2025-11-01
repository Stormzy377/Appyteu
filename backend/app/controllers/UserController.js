import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

class UserController {
  static async check(request, response) {
    try {
      const { email, password } = request.body;
      const user = await User.find(email);
      if (!user) {
        return response.status(404).json({
          message: "Usuário não encontrado!",
        });
      }

      const passwordCompare = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!passwordCompare) {
        return response.status(401).json({
          message: "Credenciais incorrectas!",
        });
      }

      if (!process.env.AUTHENTICATE_TOKEN) {
        throw new Error("JWT não foi configurado!");
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.AUTHENTICATE_TOKEN,
        { expiresIn: "2d" }
      );
      const { password_hash, ...data } = user;

      return response.status(200).json({
        data,
        token,
        message: "Parabéns você logou com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Erro de servidor! `,
      });
    }
  }

  static async create(request, response) {
    try {
      const { name, email, password, role } = request.body;
      const existingUser = await User.find(email);

      if (existingUser.length > 0) {
        return response.status(400).json({
          message: "Falha usuário já possui uma conta!",
        });
      }

      const encryptedPassword = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, encryptedPassword);

      const user = await User.create({
        name,
        email,
        hash,
        role,
      });

      if (!user.success) {
        return response.status(400).json({
          message: "Falha ao tentar registrar usuário!",
        });
      }

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
    try {
      const { id } = request.params;

      const user = await User.show(id);

      if (user.length === 0) {
        return response.status(404).json({
          message: "Usuário não encontrado!",
        });
      }
      const { password_hash, ...data } = user[0];

      return response.status(200).json({
        message: "Usuário encontrado com sucesso!",
        data,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Erro de servidor! `,
      });
    }
  }

  static async seeOne(request, response) {
    try {
      const { search } = request.query;

      const user = await User.search(search);
      if (user.length === 0) {
        return response.status(404).json({
          message: "Nenhum usuário encontrado!",
        });
      }
      return response.status(200).json({
        message: "Usuário encontrado com sucesso!",
        user,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Erro de servidor! `,
      });
    }
  }

  static async update(request, response) {
    try {
      const { id } = request.params;
      const { name, email, role } = request.body;

      const user = await User.update(id, {
        name,
        email,
        role,
      });
      if (!user.success) {
        return response.status(404).json({
          message: "Falha ao actualizar usuário!",
        });
      }
      return response.status(200).json({
        message: "Usuário actualizado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Erro de servidor! `,
      });
    }
  }

  static async destroy(request, response) {
    try {
      const { id } = request.params;

      const user = await User.destroyUser(id);
      if (!user) {
        return response.status(404).json({
          message: "Falha ao apagar usuário!",
        });
      }
      return response.status(200).json({
        message: "Usuário apagado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: `Erro de servidor! `,
      });
    }
  }
}
export default UserController;
