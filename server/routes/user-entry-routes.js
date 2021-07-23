const userEntryRouter = require('express').Router();

const userEntryController = require('../controllers/user-entry-controller');

userEntryRouter.get('/', userEntryController.userEntryIndex);

// TODO: Change to POST for better semantics
userEntryRouter.get('/create-user-entry', userEntryController.createUserEntry);

module.exports = userEntryRouter;