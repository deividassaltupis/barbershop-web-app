import { User } from "../../models/User.js";
import { EMPLOYEE_ROLE } from "../../utils/defines.js";
import { getCleanUser } from "../../utils/auth.js";

const getEmployeesController = async (req, res) => {
    const employees = await User.find({ role: EMPLOYEE_ROLE });
    const clearEmployeeArr = [];
    employees.forEach((employee) => {
        // - Removing sensitive information such as user password.
        const cleanEmployee = getCleanUser(employee);
        clearEmployeeArr.push(cleanEmployee);
    });
    res.json({ employees: clearEmployeeArr });
};

export default getEmployeesController;
