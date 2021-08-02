const userEntryRouter = require('express').Router();

const userEntryController = require('../controllers/user-entry-controller');

// Generators and db helpers
userEntryRouter.get('/seed-user-entry', userEntryController.seedUserEntry);
userEntryRouter.post('/create', userEntryController.createUserEntry);
// TODO: Change to DELETE for better semantics
userEntryRouter.get('/clear-entries', userEntryController.clearEntries)
userEntryRouter.get('/', userEntryController.userEntryIndex);

userEntryRouter.get('/get-all-mouse-still-time', userEntryController.getAllMouseStillTime);
userEntryRouter.get('/get-all-mouse-travel-time', userEntryController.getAllMouseTravelTime);
userEntryRouter.get('/get-all-mouse-click-time', userEntryController.getAllMouseClickTime);
userEntryRouter.get('/get-all-mouse-total-time', userEntryController.getAllMouseTotalTime);

userEntryRouter.get('/get-average-travel-velocity', userEntryController.getAverageTravelVelocity);

module.exports = userEntryRouter;