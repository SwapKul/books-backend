import { Sequelize } from "sequelize";

// Option 1: Passing a connection URI
const sequelize = new Sequelize(
    "books-db",
    "root",
    "",
    {
        dialect: "mysql",
        host: "localhost"
    }
) 
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
// sequelize.sync();
export default sequelize;