import {
  Connection,
  ConnectionManager,
  createConnection,
  getConnectionManager,
} from "typeorm";
import "reflect-metadata";
import config from "../ormconfig";

export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = "default";

    let connection: Connection;

    if (this.connectionManager.has(CONNECTION_NAME)) {
      connection = this.connectionManager.get(CONNECTION_NAME);
      if (!connection.isConnected) {
        connection = await connection.connect();
      }

      return connection;
    } else {
      if (getConnectionManager().has("default")) {
        await getConnectionManager().get().close();
      }

      return createConnection(config);
    }
  }
}
