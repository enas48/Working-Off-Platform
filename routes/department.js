
import Validator from '../middleware/validator-middleware.js'
import { DepartmentValidations } from '../validators/index.js'
import express from 'express'
import {
    createDepartment,
    getDepartmentById,
    getAllDepartments,
    getDepartmentEmployees,
    updateDepartment,
    deleteDepartment
} from '../services/department.js'
const router=express.Router();

/**
 *@description to get department
 *@api /department
 *@access public (puplic)
 *@type Get
 */
router.get('/', async (req, res) => {
  await getAllDepartments(res)
})

/**
 *@description to get department
 *@api /department/:id
 *@access public (puplic)
 *@type Get
 */
router.get('/:id', async (req, res) => {
  let departmentId = req.params.id
  await getDepartmentById(departmentId, res)
})


/**
 *@description to get department employees
 *@api /departments/:id/employees
 *@access public
 *@type GET
 */
 router.get('/:id/employees', async (req, res) => {
  let departmentId = req.params.id
  await getDepartmentEmployees(departmentId, res)
})


/**
 *@description to create department
 *@api /department
 *@access public (puplic)
 *@type POST
 */
router.post('/', DepartmentValidations, Validator, async (req, res) => {
  await createDepartment(req.body, res)
})

/**
 *@description to get conference programmes
 *@api /:id
 *@access public
 *@type put
 */
router.put(
  '/:id',
  DepartmentValidations,
  Validator,
  async (req, res) => {
    let departmentId = req.params.id
    await updateDepartment(departmentId, req.body, res)
  }
)


/**
 *@description to delete department
 *@api /departments/:id
 *@access public
 *@type DELETE
 */
 router.delete("/:id",  async (req, res) => {
    let departmentId = req.params.id
    await deleteDepartment(departmentId, res);
  });

export default router
