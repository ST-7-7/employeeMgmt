import { Router } from "express";
import { getAllEmployee, addEmployee } from "../controller/empController.js";
const router = Router();

router.get("/allemp", getAllEmployee);
router.post("/addemp", addEmployee);

export default router;
