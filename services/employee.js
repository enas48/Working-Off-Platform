import  Employee  from '../models/employee.js'

/**
 * @DESC to create  employee
 */
export const createEmployee = async (employeeData, res) => {
    try {
      /*-------create new employee---------*/
      let employee = new Employee({ ...employeeData })
      await employee.save()
      let employeeId = employee._id
      if (!employeeId) {
        return res.status(400).json({
          success: false,
          message: "error can't create employee."
        })
      }
  
      return res.status(201).json({
        success: true,
        message: 'employee is created successfully',
        employee
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        message: `an error occured.  ${err}`
      })
    }
  }

  /**
 * @DESC to get all employees
 */
export const getAllEmployees = async res => {
    try {
      let employees = await Employee.find().populate({
        path: 'department',
        select: 'name'
      })
      return res.status(200).json({
        success: true,
        employees
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        message: `unable to get the employees. ${err}`
      })
    }
  }

/**
 * @DESC to get  employees by id
 */
export const getEmployeeById = async (employeeId, res) => {
  try {
    if (!employeeId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        success: false,
        message: `employee not found.`
      })
    }
    let employee = await Employee.findById(employeeId)
      .populate({
        path: 'department',
        select: 'name'
      })

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: `employee not found.`
      })
    }
    return res.status(200).json({
      success: true,
      employee: employee
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: `unable to get the employee. ${err}`
    })
  }
}

/**
 * @DESC to update employee
 */
export const updateEmployee = async (employeeId, employeeData, res) => {
  try {
    /*------check if employee is exist-----------*/
    if (!employeeId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        success: false,
        message: `employee not found.`
      })
    }
    let employee = await Employee.findById(employeeId)

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: `employee not found.`
      })
    }

    /*------- update employee---------*/
    let updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { ...employeeData },
      { new: true }
    )
    return res.status(200).json({
      success: true,
      message: 'employee updated successfully.',
      employee: updatedEmployee
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: `an error occured.  ${err}`
    })
  }
}

/**
 * @DESC to delete employee by id
 */
export const deleteEmployee = async (employeeId, res) => {
  try {
    /*------check if employee is exist-----------*/
    if (!employeeId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        success: false,
        message: `employee not found.`
      })
    }
    let employee = await Employee.findById(employeeId)

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: `employee not found.`
      })
    }

    await Employee.deleteOne({ _id: employeeId })

    return res.status(200).json({
      success: true,
      message: 'employee deleted successfully'
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: `unable to delete the employee.  ${err}`
    })
  }
}
