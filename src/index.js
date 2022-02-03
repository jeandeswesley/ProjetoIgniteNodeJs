const { query } = require("express");
const express = require("express");

const app = express();

app.use(express.json());

/**
 * Importante:
 * GET - Buscar uma informação dentro do servidor
 * POST - Inserir uma informação no servidor
 * PUT - Alterar uma informação no servidor
 * PATCH - Alterar uma informação especifica
 * DELETE - Deletar uma informação no servidor
 */

/**
 * Tipos de Parametros
 *
 * Route Params => Identificar um recurso editar/deletar/buscar
 * Query Params => Paginação / Filtro
 * Body Params => Os objetos inserção/alteração
 */

app.get("/courses", (request, response) => {
  const query = request.query;
  console.log(query);
  return response.json(["curso1", "curso2"]);
});

app.post("/courses", (request, response) => {
  const body = request.body;
  console.log(body);
  return response.json(["curso1", "curso2", "curso3"]);
});

app.put("/courses/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  return response.json(["curso1", "curso2", "Curso4"]);
});

app.patch("/courses/:id", (request, response) => {
  return response.json(["curso7", "curso2"]);
});

app.delete("/courses/:id", (request, response) => {
  return response.json(["curso1"]);
});

app.listen(3333);
