import { sql } from "../database/Connect.js";

sql`

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    address TEXT,
    cuisine_type VARCHAR(50), -- ex: "Italiana", "Africana"
    price_range VARCHAR(20), -- ex: "Baixo", "Médio", "Alto"
    description TEXT,
    phone VARCHAR(20),
    is_premium BOOLEAN DEFAULT FALSE,
    geom GEOGRAPHY(POINT, 4326), -- latitude/longitude (PostGIS)
    avg_rating DECIMAL(2,1) DEFAULT 0.0,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);`.then(() => console.log("Tabela Criada com sucesso!"));
