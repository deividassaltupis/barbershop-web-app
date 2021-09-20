import { EMPLOYEE_ROLE } from "../utils/defines.js";

const employeeAuthorization = (req, res) => {
    // * applicantUser - Authentificated app user, who performs current request.
    const applicantUser = req.user;
    // - Checking if authentificated user is authorized to access current route.
    if (applicantUser.role !== EMPLOYEE_ROLE) {
        res.status(401).json({
            error: true,
            message:
                "Užklausos maršrutas prieinamas tik darbuotojo rolę turintiems vartotojams.",
        });
        return false;
    }
    return true;
};

export default employeeAuthorization;
