import { Employee } from "../database/dbconnection.js";

export const getAllEmployee = async (req, res) => {
  try {
    const allEmployees = await Employee.findAll();
    if (allEmployees.length === 0) {
      return res.status(200).json({ message: "No employee entry!" });
    }
    return res.json(allEmployees);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal error!" });
  }
};

export const addEmployee = async (req, res) => {
  const { name, email, designation, empid } = req.body;
  if (!name || !email || !designation || !empid) {
    return res.status(500).json({ message: "All field is required" });
  }

  try {
    const existEmployeePid = await Employee.findOne({ where: { empid } });
    if (existEmployeePid) {
      return res
        .status(409)
        .json({ message: "Employee with this empid already exists!" });
    }
    const existEmployeeEmail = await Employee.findOne({ where: { empid } });
    if (existEmployeeEmail) {
      return res
        .status(409)
        .json({ message: "Employee with this email already exists!" });
    }

    await Employee.create(name, email, designation, empid);
    return res.status(200).json({ message: "Employee created!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal error!" });
  }
};
