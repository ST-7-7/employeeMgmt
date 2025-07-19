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

export const updateEmployee = async (req, res) => {
  const { name, email, designation } = req.body;
  const { empid } = req.params;

  if (!empid) {
    return res.status(400).json({ message: "Empid is required!" });
  }

  try {
    const existEmployeeId = await Employee.findOnd({ where: { empid } });
    if (!existEmployeeId) {
      return res.status(404).json({ message: "No employee found!" });
    }
    await Employee.update({ name, email, designation });
    return res.status(200).json({ message: "Updated!" });
  } catch (err) {
    return res.status(500).json({ message: "Internal error!" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { empid } = req.params;
  if (!empid) {
    return res.status(400).json({ message: "Empid is required!" });
  }

  try {
    const existEmployeeId = await Employee.findOne({ where: { empid } });
    if (!existEmployeeId) {
      return res.status(404).json({ message: "No employee found!" });
    }
    await Employee.destroy({ empid });
  } catch (err) {
    return res.status(500).json({ message: "Internal error!" });
  }
};
