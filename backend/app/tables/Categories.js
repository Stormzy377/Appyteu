import { sql } from "../database/Connect.js";

sql`
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) UNIQUE NOT NULL
);`.then(() => {
  console.log("Tabela Criada com sucesso!");
});
