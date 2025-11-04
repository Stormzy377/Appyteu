import { sql } from "../database/Connect.js";

sql` 
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('client', 'owner', 'admin')) DEFAULT 'client',
    preferences JSONB, -- ex: ["vegetariana", "africana"]
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);`.then(() => {
  console.log("Tabela criada com sucesso!");
});
