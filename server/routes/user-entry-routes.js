const userEntryRouter = require('express').Router();

const userEntryController = require('../controllers/user-entry-controller');

userEntryRouter.get('/', userEntryController.userEntryIndex);
userEntryRouter.get('/latest-entry', userEntryController.latestEntry)
userEntryRouter.get('/latest-entry-with-training', userEntryController.latestEntryWithTraining)
userEntryRouter.get('/training-entries', userEntryController.trainingEntries);
userEntryRouter.get('/actual-entries', userEntryController.actualEntries);
userEntryRouter.get('/success-fail-ratio', userEntryController.successToFailRatio);

// TODO: Change to POST for better semantics
userEntryRouter.get('/create', userEntryController.createUserEntry);

// TODO: Change to DELETE for better semantics
userEntryRouter.get('/clear-entries', userEntryController.clearEntries)

module.exports = userEntryRouter;