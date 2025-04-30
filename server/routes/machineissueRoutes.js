// const { Router } = require('express');
// const {
//   getMachineIssues,
//   createMachineIssue,
//   updateMachineIssue,
//   deleteMachineIssue,
// } = require('../controllers/machineissueControllers')

// const machineIssueRouter = Router();

// machineIssueRouter.get('/', getMachineIssues); // Handles GET requests to /api/machineissues
// machineIssueRouter.post('/', createMachineIssue); // Handles POST requests to /api/machineissues
// machineIssueRouter.patch('/:id', updateMachineIssue); // Handles PATCH requests to /api/machineissues/:id
// machineIssueRouter.delete('/:id', deleteMachineIssue); // Handles DELETE requests to /api/machineissues/:id

// module.exports = machineIssueRouter;


const { Router } = require('express');
const {
  getMachineIssues,
  createMachineIssue,
  updateMachineIssue,
  deleteMachineIssue,
} = require('../controllers/machineissueControllers');

const machineIssueRouter = Router();

// Handles GET requests to /api/machineissues
machineIssueRouter.get('/', getMachineIssues);

// Handles POST requests to /api/machineissues
machineIssueRouter.post('/', createMachineIssue);

// Handles PATCH requests to /api/machineissues/:id
machineIssueRouter.patch('/:id', updateMachineIssue);

// Handles DELETE requests to /api/machineissues/:id
machineIssueRouter.delete('/:id', deleteMachineIssue);

module.exports = machineIssueRouter;
