// const { Router } = require('express');
// const {
//     getDepartments,
//     createDepartment,
//     updateDepartment,
//     deleteDepartment,
// } = require('../controllers/department_controller');

// const departmentRouter = Router();

// departmentRouter.get('/departments', getDepartments); // Handles GET requests to /api/departments
// departmentRouter.post('/departments', createDepartment); // Handles POST requests to /api/departments
// departmentRouter.patch('/departments:id', updateDepartment); // Handles PATCH requests to /api/departments/:id
// departmentRouter.delete('/departments:id', deleteDepartment); // Handles DELETE requests to /api/departments/:id

// module.exports = departmentRouter;

// const { Router } = require('express');
// const {
//   getDepartments,
//   createDepartment,
//   updateDepartment,
//   deleteDepartment,
// } = require('../controllers/department_controller');

// const departmentRouter = Router();

// departmentRouter.get('/', getDepartments);               
// departmentRouter.post('/', createDepartment);            
// departmentRouter.patch('/:id', updateDepartment);       
// departmentRouter.delete('/:id', deleteDepartment);       

// module.exports = departmentRouter;



const { Router } = require('express');
const {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
} = require('../controllers/department_controller');

const departmentRouter = Router();

departmentRouter.get('/', getDepartments); // Handles GET requests to /api/departments
departmentRouter.post('/', createDepartment); // Handles POST requests to /api/departments
departmentRouter.patch('/:id', updateDepartment); // Handles PATCH requests to /api/departments/:id
departmentRouter.delete('/:id', deleteDepartment); // Handles DELETE requests to /api/departments/:id

module.exports = departmentRouter; 