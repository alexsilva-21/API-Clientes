//cliente.js
const sqlite3 = require('sqlite3').verbose();
const dbPath = './infra/database.db';
// Função para abrir conexão com o banco de dados
function openDbConnection() {
    let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error('Erro ao abrir o banco de dados:', err.message);
        }
    });
    return db;
}
// Função para buscar todos os clientes
function getAllClientes(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM clientes", [], (err, rows) => {
        db.close();
        callback(err, rows);
    });
}
// Função para buscar um cliente por ID
function getClienteById(id, callback) {
    const db = openDbConnection();
    db.get("SELECT * FROM clientes WHERE id = ?", [id], (err, row) => {
        db.close();
        callback(err, row);
    });
}
// Função para criar um novo cliente
function createCliente(cliente, callback) {
    const { nome, cpf, email, telef } = cliente;
    const db = openDbConnection();
    db.run("INSERT INTO clientes (nome, cpf, email, telef) VALUES (?, ?, ?, ?)", [nome, cpf, email, telef], function (err) {
        db.close();
        callback(err, { id: this.lastID });
    });
}
// Função para atualizar um cliente existente
function updateCliente(id, cliente, callback) {
    const { nome, cpf, email, telef } = cliente;
    const db = openDbConnection();
    db.run("UPDATE clientes SET nome = ?, cpf = ?, email = ?, telef = ? WHERE id = ?", [nome, cpf, email, telef, id], function (err) {
        callback(err, { changes: this.changes });
    });
}

// Função para deletar um cliente
function deleteCliente(id, callback) {
    const db = openDbConnection();
    db.run("DELETE FROM clientes WHERE id = ?", [id], function (err) {
        db.close();
        callback(err, { changes: this.changes });
    });
}
module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};