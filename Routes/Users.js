const express = require("express");
const jwt = require("jsonwebtoken");
const user = express.Router();
const db = require("../config/database");

user.post("/signin", async (req, res, next) => {
  const { full_name, user_name, user_password } = req.body;

  if (full_name && user_name && user_password) {
    let query = "INSERT INTO users(full_name, user_name, user_password) ";
    query += `VALUES ('${full_name}', '${user_name}', '${user_password}');`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res.status(200).json({
        code: 201,
        message: "Usuario creado",
        data: { nombre: `${full_name}`, user_name: `${user_name}` },
      });
    }
    return res.status(500).json({ code: 500, message: "Ocurrio un error aquí" });
  }
  return res.status(500).json({ code: 500, message: "Campos Incompletos" });
});

user.post("/login", async (req, res, next) => {
  const { user_name, user_password } = req.body;
  const query = `SELECT * FROM users WHERE user_name = '${user_name}' AND user_password = '${user_password}';`;
  const rows = await db.query(query);

  if (user_name && user_password) {
    if (rows.length == 1) {
      const token = jwt.sign(
        {
          user_id: rows[0].user_id,
          user_name: rows[0].user_name,
        },
        "debugkey"
      );
      return res.status(200).json({
        code: 200,
        message: token,
        data: { user_name: `${user_name}` },
      });
    } else {
      return res
        .status(200)
        .json({ code: 401, message: "Usuario y/o Contraseña incorrectos" });
    }
  }
  return res.status(500).json({ code: 500, message: "Campos Incompletos" });
});

module.exports = user;
