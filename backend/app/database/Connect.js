import postgres from "postgres";
import "dotenv/config";

// Destruturando variáveis vindos do .dotenv
const { PGHOST, PGUSER, PGPASSWORD, PGDB } = process.env;

// String de conexão
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDB}`;

// Para uso local devo desabilitar o ssl -> se estiver true ou estiver como require mude para false
export const sql = postgres(URL, {
  ssl: false,
});

// Teste rápido
console.log("Conectando em:", URL, PGDB, PGHOST, PGPASSWORD, PGUSER);
