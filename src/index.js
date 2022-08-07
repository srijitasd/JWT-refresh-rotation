//* Require path
const path = require("path");

//* Require express.js
const express = require("express");
const App = express();

//* Cookie parser
const cookieParser = require("cookie-parser");

//* Require handlebars
const hbs = require("hbs");

//* SET BODY-PARSER
App.use(express.json());
App.use(
  express.urlencoded({
    extended: true,
  })
);
App.use(cookieParser());

//* SET HBS and public files
App.set("view engine", "hbs");
const staticPath = path.join(__dirname, "../", "/public");
const partialsPath = path.join(__dirname, "../", "/templates/partials");
const viewsPath = path.join(__dirname, "../", "templates/views");
hbs.registerPartials(partialsPath);
App.use(express.static(staticPath));
App.set("views", viewsPath);

//* Requires routes
const userRoutes = require("./routes/routes");

//* Connect user routes
App.use(userRoutes);

//* PORT
const PORT = process.env.PORT || 3000;

//* START EXPRESS APP
App.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
