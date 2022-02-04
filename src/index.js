const { query, request, response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
//v4 gera numeros randomicos
const app = express();

app.use(express.json());

const customers = [];

//Middleware
function verifyExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found" });
  }

  request.customer = customer;

  return next();
}
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

app.post("/account", (request, response) => {
  /**
   * cpf - string  * nome - setring  * id - uuid  * statement []
   */
  const { cpf, name } = request.body;

  //Verifica se existe cpf
  const customersAlreadyExists = customers.some(
    (customers) => customers.cpf === cpf
  );

  if (customersAlreadyExists) {
    return response.status(400).json({ error: "Customers already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

app.get("/statement/", verifyExistsAccountCPF, (request, response) => {
  const { customer } = request;
  console.log(customer.statement);
  return response.json(customer.statement);
});

app.post("/deposit/", verifyExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.listen(3333);
