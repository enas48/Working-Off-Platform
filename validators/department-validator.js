import { check } from "express-validator";

const name = check("name", "name is Required.").not().isEmpty();

export const DepartmentValidations = [name];
