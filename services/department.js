import  Department  from '../models/department.js'

/**
 * @DESC to create  department
 */
export const createDepartment = async (departmentData, res) => {
    try {
      /*-------create new department---------*/
      let department = new Department({ ...departmentData })
      await department.save()
      let departmentId = department._id
      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message: "error can't create department."
        })
      }
  
      return res.status(201).json({
        success: true,
        message: 'department is created successfully',
        department
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
 * @DESC to get all departments
 */
export const getAllDepartments = async res => {
    try {
      let departments = await Department.find().populate({
        path: 'employees',
        select: 'name'
      })
      return res.status(200).json({
        success: true,
        departments
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        message: `unable to get the departments. ${err}`
      })
    }
  }

/**
 * @DESC to get  departments by id
 */
export const getDepartmentById = async (departmentId, res) => {
  try {
    if (!departmentId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        success: false,
        message: `department not found.`
      })
    }
    let department = await Department.findById(departmentId)
      .populate({
        path: 'employees',
        select: 'name'
      })

    if (!department) {
      return res.status(404).json({
        success: false,
        message: `department not found.`
      })
    }
    return res.status(200).json({
      success: true,
      department: department
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: `unable to get the department. ${err}`
    })
  }
}


/**
 * @DESC to get department by id
 */
export const getDepartmentEmployees = async (id, res) => {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({
          success: false,
          message: `department not found.`
        })
      }
      let department = await Department.findById(id)
  
      if (!department) {
        return res.status(404).json({
          success: false,
          message: `department not found.`
        })
      }
      return res.status(200).json({
        success: true,
        department: department.populate({
            path: 'employees',
            select: 'name'
          })
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        message: `unable to get the employees in  department.  ${err}`
      })
    }
  }

/**
 * @DESC to update department
 */
export const updateDepartment = async (departmentId, departmentData, res) => {
  try {
    /*------check if department is exist-----------*/
    if (!departmentId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        success: false,
        message: `department not found.`
      })
    }
    let department = await Department.findById(departmentId)

    if (!department) {
      return res.status(404).json({
        success: false,
        message: `department not found.`
      })
    }

    /*------- update department---------*/
    let updatedDepartment = await Department.findByIdAndUpdate(
      departmentId,
      { ...departmentData },
      { new: true }
    )
    return res.status(200).json({
      success: true,
      message: 'department updated successfully.',
      department: updatedDepartment
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
 * @DESC to delete department by id
 */
export const deleteDepartment = async (departmentId, res) => {
  try {
    /*------check if department is exist-----------*/
    if (!departmentId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        success: false,
        message: `department not found.`
      })
    }
    let department = await Department.findById(departmentId)

    if (!department) {
      return res.status(404).json({
        success: false,
        message: `department not found.`
      })
    }

    await Department.deleteOne({ _id: departmentId })

    return res.status(200).json({
      success: true,
      message: 'department deleted successfully'
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: `unable to delete the department.  ${err}`
    })
  }
}

