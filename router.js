const AuthenticationController = require('./controllers/authentication'),  
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport'),
      manageUser = require('./controllers/manageUsers'),
      managTask = require('./controllers/manageTask');

const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false });


module.exports = function(app) {  
  // Initializing route groups
  const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        taskRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);
  

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login );

  // Delete route
  apiRoutes.delete('/remove', requireAuth, manageUser.deleteMember );

  // Change role route
  apiRoutes.post('/change-role', requireAuth, manageUser.changeRole );

// Set auth routes as subgroup/middleware to task routes
  apiRoutes.use('/task',taskRoutes);

  // create task route
  taskRoutes.post('/create', requireAuth, managTask.createTasks );

  // Change task status
  taskRoutes.post('/status', requireAuth, managTask.taskStatus );

// Set url for API group routes
  app.use('/api', apiRoutes);
};