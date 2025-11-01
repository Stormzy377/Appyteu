import { sql } from "../database/Connect.js";

class User {
  async create(data) {
    const { name, email, hash, role } = data;

    //  Se algum await dêr errado ao salvar no banco ele faz um rollback dos dados
    const transation = await sql.begin(async (query) => {
      //   Query para inserir o usuário no banco de dados e retornar o último id inserido
      const [user] =
        await query`insert into users (name, email, password_hash, created_at) 
    	  values (${name}, ${email}, ${hash}, NOW()) RETURNING id;`;
      //   Query para inserir o tipo de usuário, aceita somente 3 tipos ["Administrator", "customer", "owner"]
      const [user_role] =
        await query`insert into user_roles (name, user_id) values (${role}, ${user.id}) RETURNING id, name;`;

      //  Retornando os dados para verificação na controller
      return {
        success: true,
        id: user.id,
        role: user_role.name,
      };
    });
    //   Fazendo o rollback dos dados caso algum erro ocorra!
    return transation;
  }

  async show(id) {
    const user =
      await sql`select users.id, users.name, users.email, users.password_hash, users.created_at, user_roles.name as role_name from 
	users inner join user_roles on users.id = user_roles.user_id where id = ${id}`;

    if (user.length === 0) {
      throw new Error("Sem usuários correspondentes");
    }
    return user;
  }
  async find(email) {
    [this.user] =
      await sql`select users.id, users.name, users.email, users.password_hash, users.created_at, user_roles.name as role_name from 
	users inner join user_roles on users.id = user_roles.user_id where email = ${email}`;
    return this.user;
  }

  async search(search = "") {
    let user;
    if (search) {
      user =
        await sql`select id, name, email, role, preferences, created_at from
	   users where unaccent(name) ilike unaccent(${"%" + search + "%"})`;
    } else {
      user =
        await sql`select id, name, email, role, preferences, created_at from users`;
    }

    return user;
  }
  async update(id, user) {
    //   Desestruturando o objecto vindo por parâmetro
    const { name, email, role } = user;
    // Função de rollback dos dados caso ocorra algum erro
    const transation = await sql.begin(async (query) => {
      //  Query para actualizar o usuário
      await query`update users set name = ${name}, email = ${email} where id = ${id}`;
      //  Query para actualizar o tipo de usuário
      await query`update user_roles set name = ${role} where user_id = ${id}`;

      return {
        success: true,
      };
    });
    return transation;
  }

  async destroyUser(id) {
    const user = await sql`delete from users where id = ${id} returning id`;
    return user.length > 0;
  }
}

export default new User();
