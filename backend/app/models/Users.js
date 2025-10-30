import { sql } from "../database/Connect.js";

class User {
  async create(user) {
    const { name, email, hash } = user;
    await sql`insert into users (name, email, password_hash, created_at) values (${name}, ${email}, ${hash}, ${Date.now()})`;
  }

  async show(id) {
    const user = await sql`select * from users where id = ${id}`;

    if (user.length === 0) {
      throw new Error("Sem usuários correspondentes");
    }
    return user;
  }
  async find(email) {
    this.user = await sql`select * from users where email = ${email}`;
    return this.user;
  }
  async update() {}

  async destroy() {}
}

export default new User();
