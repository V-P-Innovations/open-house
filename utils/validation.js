const Joi = require('joi');

// Validação para login
const validateLogin = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

// Validação para adição de novo item
const validateNewItem = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),  // Nome do item é obrigatório
  });
  return schema.validate(data);
};

// Validação para seleção de item
const validateItemSelection = (data) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),  // O id do item deve ser um número inteiro
    selectedBy: Joi.string().required(),    // Nome da pessoa que selecionou o item
  });
  return schema.validate(data);
};

module.exports = {
  validateLogin,
  validateNewItem,
  validateItemSelection
};
