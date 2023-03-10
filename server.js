// Import express package
const app = require("./app");
const sequelize = require("./config/connection");
const PORT = process.env.PORT || 3001;

// turn on connection to db and server
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});