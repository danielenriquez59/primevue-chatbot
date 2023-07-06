// models.js
class Model {
  constructor({ name, tokens, systemprompt }) {
    this.name = name;
    this.tokens = tokens;
  }
}

export const models = {
  default: new Model({
    name: "gpt-3.5-turbo",
    tokens: 3096,
  }),
  model01: new Model({
    name: "gpt-3.5-turbo-16k",
    tokens: 16384,
  }),
  model02: new Model({
    name: "gpt-4",
    tokens: 8192,
  }),
};
