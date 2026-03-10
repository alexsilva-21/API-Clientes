// Importa o pacote “sqlite3” e habilita o modo verbose para mensagens detalhadas de log
const sqlite3 = require('sqlite3').verbose();

// Cria uma conexão com o banco de dados, que será criado no arquivo 'database.db' se não existir
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {

if (err) {
return console.error('Erro ao abrir o banco de dados:', err.message);
}


console.log('Conectado ao banco de dados SQLite.');
});