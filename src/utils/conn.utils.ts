import { createConnection, getConnection } from 'typeorm';

/**
 * Tenta recuperar uma conexão estabelecida com o banco de dados, caso
 * não exista uma conexão ativa, ela será criada.
 */
export async function retrieveConnection() {
    let connection = null;
    try {
        connection = getConnection();
        if ((!connection.isConnected)) await connection.connect();
    }
    catch (err) {
        connection = await createConnection();
    }
    return connection;
}