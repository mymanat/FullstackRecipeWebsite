const express = require('express');
const cors = require('cors');
const { dbService } = require('./services/database.service');
const { RecipesController } = require('./controllers/recipes.controller');
const { ContactsController } = require('./controllers/contacts.controller');

const PORT = 5000;
const app = express();
const SIZE_LIMIT = '50mb';
const recipesController = new RecipesController();
const contactsController = new ContactsController();

/**
 * Initialiser les différents middlewares et routes
 */

// afficher chaque nouvelle requête dans la console
app.use((request, response, next) => {
  // eslint-disable-next-line no-console
  console.log(`New HTTP request: ${request.method} ${request.url}`);
  next();
});

app.use(cors());

app.use(express.json({ limit: SIZE_LIMIT, extended: true }));
app.use(express.urlencoded({ limit: SIZE_LIMIT, extended: true }));

// Routing
app.use('/api/recettes', recipesController.router);
app.use('/api/contacts', contactsController.router);

/**
 * Se produit lorsque le serveur commence à écouter sur le port.
 */
const server = app.listen(PORT, () => {
  dbService.connectToServer().then(() => {
    recipesController.recipesService.populateDb();
    contactsController.contactsService.populateDb();
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}.`);
  });
});

module.exports = server;
