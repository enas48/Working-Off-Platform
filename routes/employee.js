
import Validator from '../middleware/validator-middleware.js'
import { EmployeeValidations } from '../validators/index.js'
import express from 'express'
import  {
    createEmployee,
    getEmployeeById,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
} from '../services/employee.js'
const router=express.Router();

/**
 *@description to get employee
 *@api /employee
 *@access public (puplic)
 *@type Get
 */
router.get('/', async (req, res) => {
  await getAllEmployees(res)
})

/**
 *@description to get employee
 *@api /employee/:id
 *@access public (puplic)
 *@type Get
 */
router.get('/:id', async (req, res) => {
  let employeeId = req.params.id
  await getEmployeeById(employeeId, res)
})

/**
 *@description to create employee
 *@api /employee
 *@access public (puplic)
 *@type POST
 */
router.post('/', EmployeeValidations, Validator, async (req, res) => {
  await createEmployee(req.body, res)
})

/**
 *@description to get conference programmes
 *@api /:id
 *@access public
 *@type put
 */
router.put(
  '/:id',
  EmployeeValidations,
  Validator,
  async (req, res) => {
    let employeeId = req.params.id
    await updateEmployee(employeeId, req.body, res)
  }
)


/**
 *@description to delete employee
 *@api /employees/:id
 *@access public
 *@type DELETE
 */
 router.delete("/:id",  async (req, res) => {
    let employeeId = req.params.id
    await deleteEmployee(employeeId, res);
  });

export default router
