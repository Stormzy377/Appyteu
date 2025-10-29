import postgres from "postgres";
import "dotenv/config";

// Destruturando variáveis vindos do .dotenv
const { PGHOST, PGUSER, PGPASSWORD, PGDB } = process.env;

// String de conexão
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDB}`;

export const sql = postgres(URL, {
  ssl: "require",
});

// Teste rápido
console.log("Conectando em:", URL, PGDB, PGHOST, PGPASSWORD, PGUSER);
