
export var UserMode = {
    STUDENT: 1,
    STAFF: 2,
    ADMIN: 3,
};

export var appUserMode = UserMode.STUDENT;
let environmentVariable = process.env.REACT_APP_USERMODE
if (environmentVariable === undefined) {
    environmentVariable = "student"
} 

if (environmentVariable.toLowerCase() === "staff") {
    appUserMode = UserMode.STAFF;
} 
