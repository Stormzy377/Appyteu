import { sql } from "../database/Connect.js";

sql`
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    phone VARCHAR(20),
    website VARCHAR(150),
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    location_id INT REFERENCES locations(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`.then(() => console.log("Tabela Criada com sucesso!"));
