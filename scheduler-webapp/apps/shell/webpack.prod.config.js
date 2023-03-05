const { withModuleFederation } = require('@nrwl/angular/module-federation');
const config = require('./module-federation.config');
module.exports = withModuleFederation({
  ...config,
  remotes: [
    ['shopping-lists', 'http://localhost:3000/shopping-lists'],
    ['tasks', 'http://localhost:3000/tasks'],
  ],
});
