import { sql } from "../database/Connect.js"

sql`
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    country VARCHAR(80),
    city VARCHAR(80),
    neighborhood VARCHAR(80),
    street VARCHAR(120),
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    geom GEOGRAPHY(Point, 4326) NOT NULL
);`.then(() => console.log("Tabela Criada com sucesso!")); 