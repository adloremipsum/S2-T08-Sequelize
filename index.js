const express = require("express");
const { Sequelize, Model, DataTypes } = require("sequelize");

const app = express();

// Establecer la conexión
const sequelize = new Sequelize("hack_academy", "root", "rootroot", {
  host: "127.0.0.1",
  dialect: "mysql",
});

app.set("view engine", "ejs");

// Crear el modelo User
class User extends Model {}

// Moldeamos este objeto que representará la entidad usuario
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize, // Pasamos la conexión
    modelName: "user", // Le creamos un alias a nuestro modelo
    timestamps: false, // Estamos diciendo que nuestra tabla no tiene timestamps
  }
);

class Product extends Model {}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "product",
  }
);

sequelize.sync().then(function () {
  console.log("Algunas tablas se han creado!!");
});

app.get("/usuarios", async function (req, res) {
  const users = await User.findAll();
  console.log(users);
  res.render("home", { users });
});

app.get("/usuarios/:id", async function (req, res) {
  const user = await User.findByPk(req.params.id);
  res.render("profile", { user });
});

app.post("/usuarios", async function (req, res) {
  const newUser = await User.create({
    firstname: "Pepe",
    lastname: "Milanesa",
    age: "70",
  });
  res.json("El usuario ha sido creado");
});

app.listen(3000, function () {
  console.log("Este servidor está en escucha");
});
