import { sql } from "../database/Connect.js";

sql`
CREATE TABLE favorites (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, restaurant_id)
);
`.then(() => console.log("Tabela Criada com sucesso!"));
