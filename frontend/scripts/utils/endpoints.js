const SERVER_ADRESS = "http://localhost:5000";

// PUBLIC ENDPOINTS
export const USER_VERIFICATION_URI = SERVER_ADRESS + "/api/users/verify_token/";
export const USER_LOGIN_URI = SERVER_ADRESS + "/api/users/login/";
export const GET_ALL_SERVICES_URI = SERVER_ADRESS + "/api/services/";
export const GET_ALL_EMPLOYEES_URI = SERVER_ADRESS + "/api/employees/";
export const GET_FREE_REGISTRATION_DATES_AND_TIMES_URI =
    SERVER_ADRESS + "/api/get_free_registration_dates_and_times/";
export const ADD_NEW_REGISTRATION_URI =
    SERVER_ADRESS + "/api/add_registration/";

// EMPLOYEE
// services
export const EMPLOYEE_ADD_SERVICE_URI =
    SERVER_ADRESS + "/api/employee/add_service/";
export const EMPLOYEE_ADD_EXISTING_SERVICE_URI =
    SERVER_ADRESS + "/api/employee/add_existing_service/";
export const EMPLOYEE_GET_OWN_SERVICES_URI =
    SERVER_ADRESS + "/api/employee/get_services/";
export const EMPLOYEE_GET_SINGLE_SERVICE_URI =
    SERVER_ADRESS + "/api/employee/get_service/";
export const EMPLOYEE_UPDATE_SINGLE_SERVICE_URI =
    SERVER_ADRESS + "/api/employee/update_service/";

// schedules
export const EMPLOYEE_ADD_SCHEDULE_URI =
    SERVER_ADRESS + "/api/employee/add_schedule/";
export const EMPLOYEE_GET_SCHEDULES_URI =
    SERVER_ADRESS + "/api/employee/get_schedules/";
export const EMPLOYEE_DELETE_SCHEDULE_URI =
    SERVER_ADRESS + "/api/employee/delete_schedule/";

// registrations
export const EMPLOYEE_GET_REGISTRATIONS_URI =
    SERVER_ADRESS + "/api/employee/get_registrations/";

// CUSTOM ENDPOINTS FOR ALL AUTHENTIFICATED USERS
export const GET_USER_URI = SERVER_ADRESS + "/api/user/";
export const UPDATE_USER_URI = SERVER_ADRESS + "/api/user/";
