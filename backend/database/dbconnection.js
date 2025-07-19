import { Sequelize } from "sequelize";
import { createEmpModel } from "../model/empSchema.js";

let Employee = null;
const databaseConnect = async (database, username, password) => {
  const sequelize = new Sequelize(database, username, password, {
    host: "localhost",
    dialect: "postgres",
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    Employee = await createEmpModel(sequelize);
    sequelize.sync({ alter: true });
    console.log("Table sync successful!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { databaseConnect, Employee };
