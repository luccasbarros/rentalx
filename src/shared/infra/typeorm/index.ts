import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOption = await getConnectionOptions();

  const configDatabase = Object.assign(defaultOption, {
    host: process.env.NODE_ENV === "test" ? "localhost" : host,
    database:
      process.env.NODE_ENV === "test" ? "rentx_test" : defaultOption.database,
  });

  return createConnection(configDatabase);
};
