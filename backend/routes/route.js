import { Router } from "express";
import {
  getAllEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/empController.js";
const router = Router();

router.get("/allemp", getAllEmployee);
router.post("/addemp", addEmployee);
router.post("/updateemp/:empid", updateEmployee);
router.delete("/deleteemp/:empid", deleteEmployee);

export default router;
