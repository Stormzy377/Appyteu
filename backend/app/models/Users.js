import { sql } from "../database/Connect.js";

class User {
  async check() {}

  async create(user) {
    const { name, email, password } = user;
    await sql`insert into users (name, email, password_hash, created_at) values (${name}, ${email}, ${password}, ${Date.now()})`;
  }

  async show() {}
  async find(email) {
    this.user = await sql`select * from users where email = ${email}`;
    return this.user;
  }
  async update() {}

  async destroy() {}
}

export default new User();
