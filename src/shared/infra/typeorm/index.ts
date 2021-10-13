import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOption = await getConnectionOptions();

  const configDatabase = Object.assign(defaultOption, {
    database:
      process.env.NODE_ENV === "test" ? "rentx_test" : defaultOption.database,
  });

  return createConnection(configDatabase);
};
