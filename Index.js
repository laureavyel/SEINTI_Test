const express = require("express");
const app = express();

const user = require("./Routes/Users");

const auth = require("./middleware/auth");
const notFound = require("./middleware/notFound");
const index = require("./middleware/index");
const cors = require("./middleware/cors");

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);

app.use("/user", user);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor funcionando en el puerto 3000");
});
