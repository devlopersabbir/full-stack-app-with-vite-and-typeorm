import "reflect-metadata";
import { DataSource } from "typeorm";
import { Books } from "./entity/Books";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "youtube",
  synchronize: false,
  logging: false,
  entities: [Books],
});
