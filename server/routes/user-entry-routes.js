const userEntryRouter = require('express').Router();

const userEntryController = require('../controllers/user-entry-controller');

userEntryRouter.get('/', userEntryController.userEntryIndex);
// userEntryRouter.get('/latest-entry', userEntryController.latestEntry)
// userEntryRouter.get('/latest-entry-with-training', userEntryController.latestEntryWithTraining)
// userEntryRouter.get('/training-entries', userEntryController.trainingEntries);
// userEntryRouter.get('/actual-entries', userEntryController.actualEntries);
// userEntryRouter.get('/success-fail-ratio', userEntryController.successToFailRatio);

// Generators and db helpers
userEntryRouter.get('/seed-user-entry', userEntryController.seedUserEntry);
userEntryRouter.post('/create', userEntryController.createUserEntry);
// TODO: Change to DELETE for better semantics
userEntryRouter.get('/clear-entries', userEntryController.clearEntries)

// Obtaining data for 'actual' attempts
userEntryRouter.get('/get-all-mouse-still-time', userEntryController.getAllMouseStillTime);
userEntryRouter.get('/get-all-mouse-travel-time', userEntryController.getAllMouseTravelTime);
userEntryRouter.get('/get-all-mouse-click-time', userEntryController.getAllMouseClickTime);
userEntryRouter.get('/get-all-mouse-total-time', userEntryController.getAllMouseTotalTime);

module.exports = userEntryRouter;