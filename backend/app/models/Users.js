import { sql } from "../database/Connect.js";

class User {
  async create(user) {
    const { name, email, hash, role, preferences } = user;
    await sql`insert into users (name, email, password_hash, role, preferences, created_at, updated_at) 
    values (${name}, ${email}, ${hash}, ${role}, ${preferences},${Date.now()},${Date.now()})`;
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

  async search(search = "") {
    let user;
    if (search) {
      user =
        await sql`select id, name, email, role, preferences, created_at from
	   users where unaccent(name) ilike unaccent(${"%" + search + "%"})`;
    } else {
      user =
        await sql`select id, name, email, , role, preferences, created_at from users`;
    }

    return user;
  }
  async update() {}

  async destroy() {}
}

export default new User();
