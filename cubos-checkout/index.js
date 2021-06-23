const express = require("express");
const roteador = require("./roteador")
const intermediarios = require("./intermediarios");

const app = express();
app.use(express.json());

app.use(intermediarios.logarRequisicao);

app.use(roteador);

app.listen(8000);