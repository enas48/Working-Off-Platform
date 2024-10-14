import { check } from "express-validator";

const name = check("name", "name is Required.").not().isEmpty();
const surname = check("surname", "surname is Required.").not().isEmpty();
const department = check("department", "department is Required.").not().isEmpty();

export const EmployeeValidations = [name,surname,department];
