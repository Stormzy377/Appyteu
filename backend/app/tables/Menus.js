import { sql } from "../database/Connect.js";

sql`
CREATE TABLE menus(
    id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    photo_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);`.then(() => console.log("Tabela Criada com sucesso!"));
